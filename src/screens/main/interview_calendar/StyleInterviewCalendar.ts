import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH, RW} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  // ===== TOP HEADER ROW (Month nav) =====
  month_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RH(1.5),
    paddingHorizontal: RH(1),
  },
  month_title: {
    fontSize: RH(2.1),
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    color: Theme.COLORS.BLACK,
  },
  arrow_btn: {
    width: RH(4.5),
    height: RH(4.5),
    borderRadius: RH(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
  },
  arrow_text: {
    fontSize: RH(2.4),
    color: Theme.COLORS.DARK_BLUE,
    fontFamily: Theme.FONT_FAMILY.BOLD,
  },

  // ===== CALENDAR CARD =====
  calendar_card: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1.5),
    paddingVertical: RH(1.2),
    paddingHorizontal: RH(1),
    borderColor: Theme.COLORS.LIGHT_GREY,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Week-day labels row (Sun, Mon, …)
  weekdays_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RH(0.8),
  },
  weekday_text: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: RH(1.5),
    color: Theme.COLORS.GREY,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },

  // Calendar grid
  calendar_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day_cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day_circle: {
    width: RH(4),
    height: RH(4),
    borderRadius: RH(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  day_text: {
    fontSize: RH(1.7),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },
  day_text_other_month: {
    color: Theme.COLORS.MEMIUM_GREY,
  },
  day_text_today: {
    color: Theme.COLORS.DARK_BLUE,
    fontFamily: Theme.FONT_FAMILY.BOLD,
  },
  day_circle_today: {
    borderColor: Theme.COLORS.DARK_BLUE,
    borderWidth: 1,
  },
  day_circle_selected: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
  },
  day_text_selected: {
    color: Theme.COLORS.WHITE,
    fontFamily: Theme.FONT_FAMILY.BOLD,
  },
  // Tiny dot indicating an interview exists on that date
  event_dot_wrap: {
    flexDirection: 'row',
    marginTop: RH(0.3),
    height: RH(0.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  event_dot: {
    width: RH(0.6),
    height: RH(0.6),
    borderRadius: RH(0.6),
    backgroundColor: Theme.COLORS.DARK_BLUE,
    marginHorizontal: 1,
  },
  event_dot_selected: {
    backgroundColor: Theme.COLORS.WHITE,
  },

  // ===== Selected-day section =====
  selected_day_label: {
    marginTop: RH(2),
    marginBottom: RH(1),
    fontSize: RH(1.9),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
  },
  empty_state: {
    paddingVertical: RH(2),
    alignItems: 'center',
  },
  empty_text: {
    fontSize: RH(1.7),
    color: Theme.COLORS.GREY,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },

  // ===== Existing interview row =====
  interview_card: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    padding: RH(1.5),
    borderRadius: RH(1),
    marginBottom: RH(1),
  },
  interview_top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interview_title: {
    fontSize: RH(1.8),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    flex: 1,
    marginRight: RH(1),
  },
  interview_time: {
    fontSize: RH(1.5),
    color: Theme.COLORS.DARK_BLUE,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },
  interview_meta: {
    fontSize: RH(1.5),
    color: Theme.COLORS.GREY,
    marginTop: RH(0.4),
    fontFamily: Theme.FONT_FAMILY.REGULAR,
  },

  // ===== CTA button (Schedule / Reschedule) =====
  cta_wrap: {
    marginTop: RH(2),
    marginBottom: RH(2),
  },

  // ===== Form modal styles =====
  modal_backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal_card: {
    backgroundColor: Theme.COLORS.WHITE,
    borderTopLeftRadius: RH(2),
    borderTopRightRadius: RH(2),
    padding: RH(2),
    maxHeight: '92%',
  },
  modal_handle: {
    width: RW(12),
    height: RH(0.6),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    borderRadius: RH(0.6),
    alignSelf: 'center',
    marginBottom: RH(1.5),
  },
  modal_title: {
    fontSize: RH(2.1),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    marginBottom: RH(1.2),
  },

  // ===== Input rows in modal =====
  field_label: {
    fontSize: RH(1.6),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    marginBottom: RH(0.6),
  },
  field_box: {
    borderWidth: 1,
    borderColor: Theme.COLORS.BLUE,
    borderRadius: RH(1),
    paddingHorizontal: RH(1.2),
    paddingVertical: RH(1.2),
    marginBottom: RH(1.2),
    backgroundColor: Theme.COLORS.WHITE,
  },
  field_value: {
    fontSize: RH(1.7),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },
  field_value_placeholder: {
    color: Theme.COLORS.GREY,
    fontFamily: Theme.FONT_FAMILY.REGULAR,
  },
  text_input_box: {
    borderWidth: 1,
    borderColor: Theme.COLORS.BLUE,
    borderRadius: RH(1),
    paddingHorizontal: RH(1.2),
    paddingVertical: RH(1),
    marginBottom: RH(1.2),
    fontSize: RH(1.7),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    backgroundColor: Theme.COLORS.WHITE,
  },
  notes_box: {
    minHeight: RH(10),
    textAlignVertical: 'top',
  },
  error_text: {
    color: Theme.COLORS.DARK_RED,
    fontSize: RH(1.4),
    marginTop: RH(-0.8),
    marginBottom: RH(0.8),
    fontFamily: Theme.FONT_FAMILY.REGULAR,
  },
  modal_actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RH(1.2),
    marginTop: RH(0.5),
  },
  btn_cancel: {
    flex: 1,
    paddingVertical: RH(1.4),
    borderRadius: RH(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.LIGHT_GREY,
  },
  btn_save: {
    flex: 1,
    paddingVertical: RH(1.4),
    borderRadius: RH(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.DARK_BLUE,
  },
  btn_cancel_text: {
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.7),
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
  },
  btn_save_text: {
    color: Theme.COLORS.WHITE,
    fontSize: RH(1.7),
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
  },

  // ===== JS time spinner (zero native deps) =====
  spinner_card: {
    marginTop: RH(-0.4),
    marginBottom: RH(1.2),
    paddingVertical: RH(1.2),
    paddingHorizontal: RH(1),
    borderRadius: RH(1),
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
  },
  spinner_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  spinner_col: {
    alignItems: 'center',
    minWidth: RH(7),
  },
  spinner_arrow_btn: {
    paddingVertical: RH(0.4),
    paddingHorizontal: RH(1.2),
  },
  spinner_arrow_text: {
    fontSize: RH(2.4),
    color: Theme.COLORS.DARK_BLUE,
    fontFamily: Theme.FONT_FAMILY.BOLD,
  },
  spinner_value_text: {
    fontSize: RH(2.6),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    paddingVertical: RH(0.2),
  },
  spinner_colon: {
    fontSize: RH(2.6),
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    paddingHorizontal: RH(0.4),
  },
  spinner_ampm_btn: {
    paddingVertical: RH(0.5),
    paddingHorizontal: RH(1.2),
    borderRadius: RH(0.6),
    marginVertical: RH(0.2),
    backgroundColor: Theme.COLORS.WHITE,
    borderWidth: 1,
    borderColor: Theme.COLORS.BLUE,
  },
  spinner_ampm_btn_active: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    borderColor: Theme.COLORS.DARK_BLUE,
  },
  spinner_ampm_text: {
    fontSize: RH(1.6),
    color: Theme.COLORS.DARK_BLUE,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
  },
  spinner_ampm_text_active: {
    color: Theme.COLORS.WHITE,
  },
  spinner_done_btn: {
    marginTop: RH(1),
    alignSelf: 'flex-end',
    paddingVertical: RH(0.6),
    paddingHorizontal: RH(1.6),
    backgroundColor: Theme.COLORS.DARK_BLUE,
    borderRadius: RH(0.8),
  },
  spinner_done_text: {
    color: Theme.COLORS.WHITE,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.5),
  },
});

export default styles;
