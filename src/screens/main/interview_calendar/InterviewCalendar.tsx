/**
 * InterviewCalendar.tsx
 * ----------------------------------------------------------------------------
 * Recruiter "Schedule / Reschedule Interview" calendar screen.
 *
 * Flow:
 *   - Recruiter taps "Schedule Interview" on the candidate profile.
 *   - This screen opens with a month-view calendar.
 *   - On mount + on every month change we fetch the month's interviews:
 *       GET /interview-list?from=YYYY-MM-01&to=YYYY-MM-{lastDay}
 *   - Dates that already have interviews are marked with a dot.
 *   - Tapping a date selects it; existing interviews on that date are listed.
 *   - The bottom CTA opens a modal to enter Title, Time, End Time, Link, Notes.
 *   - Save:
 *       POST /schedule-interview                  (new)
 *       POST /reschedule-interview/{id}           (edit existing)
 *
 * Demo / fallback data is used when the API is unreachable so the UI is
 * always interactive even before the backend ships these endpoints.
 *
 * NOTE FOR PHP DEV (date/time format used by this client):
 *   - date     : "YYYY-MM-DD"  e.g. "2026-04-29"
 *   - time     : "HH:mm"       (24-hour)  e.g. "14:30"
 *   - end_time : "HH:mm"       (24-hour)  e.g. "15:30"
 *   The reschedule sample shows "HH:mm:ss"; this client sends "HH:mm".
 *   Backend should accept both ("HH:mm" and "HH:mm:ss") for safety.
 * ----------------------------------------------------------------------------
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import Theme from '../../../theme/Theme';
import styles from './StyleInterviewCalendar';
import {backMain} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '../../../components/store/ExternalLibrary';
import {Button, ToastPopup} from '../../../components/store/ComponentStore';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  gettingInterviewListByRange,
  reschedulingInterview,
  schedulingInterview,
} from '../../../api/ApiServices';

type InterviewCalendarRouteProp = RouteProp<MainStackIF, 'INTERVIEW_CALENDAR'>;

// Shape of items returned from /interview-list (kept local so we don't
// touch the shared types file – per the "don't modify unrelated code" rule).
interface CalendarInterviewItem {
  id: number;
  candidate_id: number;
  job_id: number;
  title: string | null;
  job_name?: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  end_time?: string; // "HH:mm"
  link?: string;
  notes?: string;
  type?: string;
  candidate?: string;
  profile?: string;
  candidate_profession?: string;
  interview_status?: string;
}

// ----------------------------------------------------------------------------
// Demo fallback data – used when the live API call fails.
// Lets the UI render cleanly during local dev / before backend is ready.
// ----------------------------------------------------------------------------
const buildDemoData = (year: number, month: number): CalendarInterviewItem[] => {
  const monthStr = String(month + 1).padStart(2, '0');
  return [
    {
      id: 9001,
      candidate_id: 104,
      job_id: 203,
      title: 'Initial screening',
      job_name: 'Software engineer',
      date: `${year}-${monthStr}-${String(
        Math.min(15, new Date(year, month + 1, 0).getDate()),
      ).padStart(2, '0')}`,
      time: '11:00',
      end_time: '11:45',
      link: 'https://meet.google.com/demo',
      notes: 'Demo interview (fallback data – API offline).',
      type: 'Upcoming',
      candidate: 'Demo Candidate',
      candidate_profession: 'Dentist',
    },
  ];
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const pad = (n: number) => String(n).padStart(2, '0');

// "YYYY-MM-DD"
const formatYMD = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// "HH:mm" (24h)
const formatHM = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// "10:30 AM"
const format12h = (d: Date) => {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${pad(m)} ${ampm}`;
};

// Parse "HH:mm" or "HH:mm:ss" into a Date (today's date).
const parseTimeStr = (timeStr: string): Date => {
  const [hStr = '0', mStr = '0'] = (timeStr || '').split(':');
  const d = new Date();
  d.setHours(parseInt(hStr, 10) || 0);
  d.setMinutes(parseInt(mStr, 10) || 0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
};

// First/last day for a given month → for the API range query.
const monthRange = (viewDate: Date) => {
  const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const last = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  return {from: formatYMD(first), to: formatYMD(last)};
};

const URL_BASIC = /^https?:\/\/.+/i;

// ----------------------------------------------------------------------------
// Pure-JS time spinner.
//
// We deliberately avoid @react-native-community/datetimepicker here because
// in some local builds the native module (RNCDatePicker) isn't registered,
// which crashes the screen the moment a DateTimePicker is mounted.
// This component uses only JS – no native bridge calls – so it works on
// every device regardless of native autolinking state.
// ----------------------------------------------------------------------------
interface JsTimeSpinnerProps {
  value: Date;
  onChange: (d: Date) => void;
  onDone?: () => void;
}
const JsTimeSpinner: React.FC<JsTimeSpinnerProps> = ({
  value,
  onChange,
  onDone,
}) => {
  const hour24 = value.getHours();
  const minute = value.getMinutes();
  const isPm = hour24 >= 12;
  const hour12 = hour24 % 12 || 12; // 1..12 instead of 0

  const apply = (h12: number, m: number, pm: boolean) => {
    const next = new Date(value);
    let h24 = h12 % 12; // 12 → 0
    if (pm) h24 += 12;
    next.setHours(h24);
    next.setMinutes(m);
    next.setSeconds(0);
    next.setMilliseconds(0);
    onChange(next);
  };

  const incHour = () => apply(hour12 === 12 ? 1 : hour12 + 1, minute, isPm);
  const decHour = () => apply(hour12 === 1 ? 12 : hour12 - 1, minute, isPm);
  const incMin = () => {
    const m = (minute + 5) % 60; // step by 5
    apply(hour12, m, isPm);
  };
  const decMin = () => {
    const m = (minute - 5 + 60) % 60;
    apply(hour12, m, isPm);
  };

  return (
    <View style={styles.spinner_card}>
      <View style={styles.spinner_row}>
        {/* Hour */}
        <View style={styles.spinner_col}>
          <TouchableOpacity
            style={styles.spinner_arrow_btn}
            activeOpacity={0.6}
            onPress={incHour}>
            <Text style={styles.spinner_arrow_text}>▲</Text>
          </TouchableOpacity>
          <Text style={styles.spinner_value_text}>{pad(hour12)}</Text>
          <TouchableOpacity
            style={styles.spinner_arrow_btn}
            activeOpacity={0.6}
            onPress={decHour}>
            <Text style={styles.spinner_arrow_text}>▼</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.spinner_colon}>:</Text>

        {/* Minute */}
        <View style={styles.spinner_col}>
          <TouchableOpacity
            style={styles.spinner_arrow_btn}
            activeOpacity={0.6}
            onPress={incMin}>
            <Text style={styles.spinner_arrow_text}>▲</Text>
          </TouchableOpacity>
          <Text style={styles.spinner_value_text}>{pad(minute)}</Text>
          <TouchableOpacity
            style={styles.spinner_arrow_btn}
            activeOpacity={0.6}
            onPress={decMin}>
            <Text style={styles.spinner_arrow_text}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* AM / PM */}
        <View style={styles.spinner_col}>
          <TouchableOpacity
            style={[
              styles.spinner_ampm_btn,
              !isPm && styles.spinner_ampm_btn_active,
            ]}
            activeOpacity={0.7}
            onPress={() => apply(hour12, minute, false)}>
            <Text
              style={[
                styles.spinner_ampm_text,
                !isPm && styles.spinner_ampm_text_active,
              ]}>
              AM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.spinner_ampm_btn,
              isPm && styles.spinner_ampm_btn_active,
            ]}
            activeOpacity={0.7}
            onPress={() => apply(hour12, minute, true)}>
            <Text
              style={[
                styles.spinner_ampm_text,
                isPm && styles.spinner_ampm_text_active,
              ]}>
              PM
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!!onDone && (
        <TouchableOpacity
          style={styles.spinner_done_btn}
          activeOpacity={0.8}
          onPress={onDone}>
          <Text style={styles.spinner_done_text}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ----------------------------------------------------------------------------
const InterviewCalendar = () => {
  const route = useRoute<InterviewCalendarRouteProp>();
  const params = route.params || ({} as InterviewCalendarRouteProp['params']);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();

  // --- Calendar view state ---
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewDate, setViewDate] = useState<Date>(today); // controls visible month
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [interviews, setInterviews] = useState<CalendarInterviewItem[]>([]);

  // --- Loading / toasts ---
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('Interview saved');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- Form modal state ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>(
    params.interviewId,
  );
  const [titleInput, setTitleInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [formTime, setFormTime] = useState<Date>(() => {
    const d = new Date();
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  });
  const [formEndTime, setFormEndTime] = useState<Date>(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [formErr, setFormErr] = useState({
    title: '',
    time: '',
    endTime: '',
    link: '',
  });

  // ---------------------------------------------------------------
  // FETCH MONTH INTERVIEWS
  // ---------------------------------------------------------------
  const fetchMonth = useCallback(async (forDate: Date) => {
    const {from, to} = monthRange(forDate);
    setIsLoading(true);
    try {
      const res = await gettingInterviewListByRange(from, to);
      if (res.success) {
        const list: CalendarInterviewItem[] = res.data?.data || [];
        setInterviews(list);
      } else {
        // Fallback to demo data so the calendar still feels alive
        // when the backend isn't ready yet.
        setInterviews(
          buildDemoData(forDate.getFullYear(), forDate.getMonth()),
        );
      }
    } catch (e) {
      setInterviews(
        buildDemoData(forDate.getFullYear(), forDate.getMonth()),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonth(viewDate);
  }, [fetchMonth, viewDate]);

  // ---------------------------------------------------------------
  // CALENDAR GRID BUILDER (current month + leading/trailing blanks)
  // ---------------------------------------------------------------
  const grid = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay(); // 0..6 (Sun=0)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: {date: Date; inMonth: boolean}[] = [];

    // Leading days from previous month
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      cells.push({date: d, inMonth: false});
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({date: new Date(year, month, d), inMonth: true});
    }
    // Trailing days to fill 6 rows of 7 (=42 cells max) – clamp to 42
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const next = new Date(last);
      next.setDate(last.getDate() + 1);
      cells.push({date: next, inMonth: false});
    }
    return cells;
  }, [viewDate]);

  // Map of dates with interviews (for dots)
  const interviewDateSet = useMemo(() => {
    const set = new Set<string>();
    interviews.forEach(i => set.add(i.date));
    return set;
  }, [interviews]);

  // Selected day's interviews
  const selectedDayInterviews = useMemo(() => {
    const key = formatYMD(selectedDate);
    return interviews.filter(i => i.date === key);
  }, [interviews, selectedDate]);

  // ---------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------
  const goPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  const goNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDayPress = (d: Date, inMonth: boolean) => {
    if (!inMonth) {
      // Switch month if user tapped trailing/leading day
      setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    setSelectedDate(d);
  };

  const openFormForCreate = () => {
    setEditingId(undefined);
    setTitleInput('');
    setLinkInput('');
    setNotesInput('');
    const start = new Date(selectedDate);
    start.setHours(10, 0, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(10, 30, 0, 0);
    setFormTime(start);
    setFormEndTime(end);
    setFormErr({title: '', time: '', endTime: '', link: ''});
    setIsFormOpen(true);
  };

  const openFormForEdit = (item: CalendarInterviewItem) => {
    setEditingId(item.id);
    setTitleInput(item.title || '');
    setLinkInput(item.link || '');
    setNotesInput(item.notes || '');
    setFormTime(parseTimeStr(item.time));
    setFormEndTime(parseTimeStr(item.end_time || item.time));
    setFormErr({title: '', time: '', endTime: '', link: ''});
    setIsFormOpen(true);
  };

  // The CTA button: Schedule (no existing interview today) OR Reschedule.
  // We also key off the route param so this screen is reusable from the
  // candidate profile when an interviewId is already known.
  const ctaLabel = useMemo(() => {
    if (selectedDayInterviews.length > 0 || editingId || params.interviewId) {
      return 'Reschedule Interview';
    }
    return 'Schedule Interview';
  }, [selectedDayInterviews.length, editingId, params.interviewId]);

  const handleCtaPress = () => {
    // If the recruiter arrived with a specific interview to edit, open that one.
    if (params.interviewId && !editingId) {
      const existing = interviews.find(i => i.id === params.interviewId);
      if (existing) {
        // Sync calendar to that interview's date
        const d = new Date(existing.date);
        if (!isNaN(d.getTime())) {
          setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
          setSelectedDate(d);
        }
        openFormForEdit(existing);
        return;
      }
    }
    if (selectedDayInterviews.length > 0) {
      // Reschedule the most recent interview on the selected day
      openFormForEdit(selectedDayInterviews[0]);
    } else {
      openFormForCreate();
    }
  };

  // ---------------------------------------------------------------
  // VALIDATION + SAVE
  // ---------------------------------------------------------------
  const validate = (): boolean => {
    const next = {title: '', time: '', endTime: '', link: ''};
    let ok = true;

    if (!titleInput.trim()) {
      next.title = 'Title is required*';
      ok = false;
    }

    // No past dates for new schedules
    if (!editingId) {
      const todayKey = formatYMD(today);
      if (formatYMD(selectedDate) < todayKey) {
        next.time = 'Please pick a current or future date';
        ok = false;
      }
    }

    // End must be after start (≥10 minutes)
    const diffMin =
      (formEndTime.getTime() - formTime.getTime()) / (1000 * 60);
    if (diffMin < 10) {
      next.endTime = 'End time must be at least 10 minutes after start';
      ok = false;
    }

    // Backend requires `link` – mirror the same rule on the client so the
    // recruiter sees the error immediately instead of after a server round-trip.
    if (!linkInput.trim()) {
      next.link = 'Meeting link is required*';
      ok = false;
    } else if (!URL_BASIC.test(linkInput)) {
      next.link = 'Enter a valid URL (https://…)';
      ok = false;
    }

    setFormErr(next);
    return ok;
  };

  const handleSave = async () => {
    if (!validate()) return;
    if (isLoading) return; // prevent double-submit
    setIsLoading(true);
    try {
      // Build payload — only include job_id when we actually have one,
      // so the JSON body never sends `null` to the backend.
      const payload: {
        candidate_id: number;
        job_id?: number;
        title: string;
        date: string;
        time: string;
        end_time: string;
        link: string;
        notes: string;
      } = {
        candidate_id: params.candidateId,
        title: titleInput.trim(),
        date: formatYMD(selectedDate),
        time: formatHM(formTime),
        end_time: formatHM(formEndTime),
        link: linkInput.trim(),
        notes: notesInput.trim(),
      };
      if (typeof params.jobId === 'number') {
        payload.job_id = params.jobId;
      }

      let res;
      if (editingId) {
        res = await reschedulingInterview(editingId, payload as any);
      } else {
        res = await schedulingInterview(payload as any);
      }

      if (res.success) {
        setSuccessMsg(
          editingId
            ? 'Interview rescheduled successfully'
            : 'Interview scheduled successfully',
        );
        setShowSuccess(true);
        setIsFormOpen(false);
        setEditingId(undefined);
        // Refresh month so the new/updated interview appears
        await fetchMonth(viewDate);
        setTimeout(() => setShowSuccess(false), 2500);
      } else {
        setErrorMsg(res.err || 'Failed to save interview');
        setShowError(true);
        setTimeout(() => setShowError(false), 2500);
      }
    } catch (e: any) {
      setErrorMsg('Network error – please try again');
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------------
  const renderDayCell = ({date, inMonth}: {date: Date; inMonth: boolean}) => {
    const key = formatYMD(date);
    const isToday = formatYMD(today) === key;
    const isSelected = formatYMD(selectedDate) === key;
    const hasEvent = interviewDateSet.has(key);

    return (
      <TouchableOpacity
        key={key + (inMonth ? '_in' : '_out')}
        activeOpacity={0.7}
        style={styles.day_cell}
        onPress={() => handleDayPress(date, inMonth)}>
        <View
          style={[
            styles.day_circle,
            isToday && !isSelected && styles.day_circle_today,
            isSelected && styles.day_circle_selected,
          ]}>
          <Text
            style={[
              styles.day_text,
              !inMonth && styles.day_text_other_month,
              isToday && !isSelected && styles.day_text_today,
              isSelected && styles.day_text_selected,
            ]}>
            {date.getDate()}
          </Text>
        </View>
        <View style={styles.event_dot_wrap}>
          {hasEvent && (
            <View
              style={[
                styles.event_dot,
                isSelected && styles.event_dot_selected,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // ---------------------------------------------------------------
  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          {/* ===== Top header: back + title ===== */}
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>Interview Calendar</Text>
            <Text />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* ===== Month navigation ===== */}
            <View style={styles.month_header}>
              <TouchableOpacity
                style={styles.arrow_btn}
                activeOpacity={0.7}
                onPress={goPrevMonth}>
                <Text style={styles.arrow_text}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.month_title}>
                {`${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
              </Text>
              <TouchableOpacity
                style={styles.arrow_btn}
                activeOpacity={0.7}
                onPress={goNextMonth}>
                <Text style={styles.arrow_text}>›</Text>
              </TouchableOpacity>
            </View>

            {/* ===== Calendar card ===== */}
            <View style={styles.calendar_card}>
              <View style={styles.weekdays_row}>
                {WEEKDAYS.map(w => (
                  <Text key={w} style={styles.weekday_text}>
                    {w}
                  </Text>
                ))}
              </View>
              <View style={styles.calendar_grid}>
                {grid.map(cell => renderDayCell(cell))}
              </View>
            </View>

            {/* ===== Selected day section ===== */}
            <Text style={styles.selected_day_label}>
              {`Interviews on ${selectedDate.getDate()} ${
                MONTH_NAMES[selectedDate.getMonth()]
              } ${selectedDate.getFullYear()}`}
            </Text>

            {selectedDayInterviews.length === 0 ? (
              <View style={styles.empty_state}>
                <Text style={styles.empty_text}>
                  No interviews scheduled yet
                </Text>
              </View>
            ) : (
              <FlatList
                data={selectedDayInterviews}
                scrollEnabled={false}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => openFormForEdit(item)}
                    style={styles.interview_card}>
                    <View style={styles.interview_top}>
                      <Text style={styles.interview_title} numberOfLines={1}>
                        {item.title || 'Untitled interview'}
                      </Text>
                      <Text style={styles.interview_time}>
                        {`${item.time}${
                          item.end_time ? ` – ${item.end_time}` : ''
                        }`}
                      </Text>
                    </View>
                    {!!item.candidate && (
                      <Text style={styles.interview_meta}>
                        {item.candidate}
                        {item.candidate_profession
                          ? ` · ${item.candidate_profession}`
                          : ''}
                      </Text>
                    )}
                    {!!item.job_name && (
                      <Text style={styles.interview_meta}>{item.job_name}</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            )}

            {/* ===== CTA: same button used for Schedule + Reschedule ===== */}
            <View style={styles.cta_wrap}>
              <Button
                _TEXT={ctaLabel}
                _ONPRESS={handleCtaPress}
                _BTNSTYLE={GLOBALSTYLE.btn_container}
                _TEXT_STYLE={GLOBALSTYLE.button}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* ===== Schedule / Reschedule form modal ===== */}
      <Modal
        visible={isFormOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFormOpen(false)}>
        <View style={styles.modal_backdrop}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setIsFormOpen(false)}
          />
          <View style={styles.modal_card}>
            <View style={styles.modal_handle} />
            <Text style={styles.modal_title}>
              {editingId ? 'Reschedule Interview' : 'Schedule Interview'}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Date – read-only, comes from selected calendar day */}
              <Text style={styles.field_label}>Date</Text>
              <View style={styles.field_box}>
                <Text style={styles.field_value}>
                  {`${selectedDate.getDate()} ${
                    MONTH_NAMES[selectedDate.getMonth()]
                  } ${selectedDate.getFullYear()}`}
                </Text>
              </View>

              {/* Title */}
              <Text style={styles.field_label}>Title*</Text>
              <TextInput
                style={styles.text_input_box}
                placeholder="e.g. Initial screening with John"
                placeholderTextColor={Theme.COLORS.GREY}
                value={titleInput}
                onChangeText={setTitleInput}
              />
              {!!formErr.title && (
                <Text style={styles.error_text}>{formErr.title}</Text>
              )}

              {/* Start time */}
              <Text style={styles.field_label}>Start Time*</Text>
              <TouchableOpacity
                style={styles.field_box}
                activeOpacity={0.7}
                onPress={() => {
                  setShowEndPicker(false);
                  setShowStartPicker(prev => !prev);
                }}>
                <Text style={styles.field_value}>{format12h(formTime)}</Text>
              </TouchableOpacity>
              {showStartPicker && (
                <JsTimeSpinner
                  value={formTime}
                  onChange={setFormTime}
                  onDone={() => setShowStartPicker(false)}
                />
              )}

              {/* End time */}
              <Text style={styles.field_label}>End Time*</Text>
              <TouchableOpacity
                style={styles.field_box}
                activeOpacity={0.7}
                onPress={() => {
                  setShowStartPicker(false);
                  setShowEndPicker(prev => !prev);
                }}>
                <Text style={styles.field_value}>
                  {format12h(formEndTime)}
                </Text>
              </TouchableOpacity>
              {showEndPicker && (
                <JsTimeSpinner
                  value={formEndTime}
                  onChange={setFormEndTime}
                  onDone={() => setShowEndPicker(false)}
                />
              )}
              {!!formErr.endTime && (
                <Text style={styles.error_text}>{formErr.endTime}</Text>
              )}
              {!!formErr.time && (
                <Text style={styles.error_text}>{formErr.time}</Text>
              )}

              {/* Meeting link */}
              <Text style={styles.field_label}>Meeting Link*</Text>
              <TextInput
                style={styles.text_input_box}
                placeholder="https://meet.google.com/..."
                placeholderTextColor={Theme.COLORS.GREY}
                autoCapitalize="none"
                value={linkInput}
                onChangeText={setLinkInput}
              />
              {!!formErr.link && (
                <Text style={styles.error_text}>{formErr.link}</Text>
              )}

              {/* Notes */}
              <Text style={styles.field_label}>Notes</Text>
              <TextInput
                style={[styles.text_input_box, styles.notes_box]}
                placeholder="Any specific detail?"
                placeholderTextColor={Theme.COLORS.GREY}
                multiline
                value={notesInput}
                onChangeText={setNotesInput}
              />

              {/* Action buttons */}
              <View style={styles.modal_actions}>
                <TouchableOpacity
                  style={styles.btn_cancel}
                  activeOpacity={0.8}
                  disabled={isLoading}
                  onPress={() => setIsFormOpen(false)}>
                  <Text style={styles.btn_cancel_text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn_save}
                  activeOpacity={0.8}
                  disabled={isLoading}
                  onPress={handleSave}>
                  <Text style={styles.btn_save_text}>
                    {isLoading
                      ? 'Saving…'
                      : editingId
                      ? 'Update'
                      : 'Schedule'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

          </View>
        </View>
      </Modal>

      {/* ===== Loader & toasts ===== */}
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color={Theme.COLORS.DARK_BLUE} />
        </View>
      )}

      {showSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2={successMsg}
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={2500}
        />
      )}

      {showError && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Error"
          _TEXT2={errorMsg}
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style_error}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={2500}
        />
      )}
    </>
  );
};

export default InterviewCalendar;
