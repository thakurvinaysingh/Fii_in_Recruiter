# Recruiter Interview Calendar — Backend Integration Notes

This screen (`InterviewCalendar.tsx`) calls three endpoints on
`https://fillin.mobilesapplication.com/api/recruiter/`. The wrappers live in
`src/api/ApiServices.ts`:

| Wrapper                          | Method | Path                                |
|----------------------------------|--------|-------------------------------------|
| `gettingInterviewListByRange`    | GET    | `interview-list?from=…&to=…`        |
| `schedulingInterview`            | POST   | `schedule-interview`                |
| `reschedulingInterview`          | POST   | `reschedule-interview/{id}`         |

If `gettingInterviewListByRange` is unreachable the calendar falls back to a
local demo dataset so the UI stays interactive. Replace the demo when the
endpoint is live — no other code changes required.

---

## Date / Time format the client sends

The mobile client uses **ISO-style strings, no timezone**, exactly as in the
sample payloads:

| Field      | Format       | Example       | Notes                          |
|------------|--------------|---------------|--------------------------------|
| `date`     | `YYYY-MM-DD` | `2026-04-29`  | Always 24-hour calendar date.  |
| `time`     | `HH:mm`      | `14:30`       | 24-hour, zero-padded.          |
| `end_time` | `HH:mm`      | `15:30`       | 24-hour, zero-padded.          |

> The reschedule sample on the spec doc shows `HH:mm:ss`. The mobile app
> sends `HH:mm`. **Backend should accept both `HH:mm` and `HH:mm:ss`** and
> normalise on storage. If only one form is supported, please accept `HH:mm`.

The `from` / `to` query params on `interview-list` are also `YYYY-MM-DD`.
The client always queries a full month (1st → last day).

---

## 1. `GET /interview-list?from=YYYY-MM-DD&to=YYYY-MM-DD`

Used when the calendar loads and every time the recruiter changes month.

### Expected response

```json
{
  "statusCode": 200,
  "status": "success",
  "message": "Record Found.",
  "data": [
    {
      "id": 143,
      "candidate_id": 104,
      "job_id": 203,
      "title": "Initial screening with John",
      "job_name": "Software engineer",
      "date": "2026-04-29",
      "time": "14:30",
      "end_time": "15:30",
      "link": "https://meet.google.com/abc-defg-hij",
      "type": "Today",
      "interview_status": "1",
      "candidate": "Test User",
      "profile": "https://.../candidate.png",
      "candidate_profession": "Dentist",
      "notes": "..."
    }
  ]
}
```

The client renders dots on dates where any interview exists and lists all
items for the selected day. `title` may be `null` — the UI shows
"Untitled interview" in that case.

---

## 2. `POST /schedule-interview`

Called when the recruiter creates a new interview.

### Request body

```json
{
  "candidate_id": 104,
  "job_id": 203,
  "title": "Initial screening with John",
  "date": "2026-04-29",
  "time": "14:30",
  "end_time": "15:30",
  "link": "https://meet.google.com/abc-defg-hij",
  "notes": "Discuss compliance docs and availability"
}
```

### Expected response

```json
{
  "statusCode": 200,
  "status": "success",
  "message": "Interview Schedule Successfully."
}
```

---

## 3. `POST /reschedule-interview/{id}`

Called when the recruiter taps **Reschedule Interview** (the button label on
the candidate profile flips automatically once an interview is scheduled).

### Request body — same shape as schedule

```json
{
  "candidate_id": 104,
  "job_id": 203,
  "title": "Rescheduled interview",
  "date": "2026-05-04",
  "time": "11:00",
  "end_time": "11:45",
  "link": "https://meet.google.com/xyz",
  "notes": "Updated"
}
```

### Expected response

```json
{
  "statusCode": 200,
  "status": "success",
  "message": "Interview Rescheduled Successfully."
}
```

---

## Validation handled on the client (so backend doesn't have to)

- `title` is required.
- `link` is required (backend rejects empty `link` with "The link field is required").
- `link` must start with `http://` or `https://`.
- `time` must be at least 10 minutes before `end_time`.
- New schedules can't be in the past (existing reschedules can move forward).

Backend should still validate authoritatively. Error shape we currently
surface is `{ message: string }` taken from `response.data.message`.

---

## How the candidate-profile button decides Schedule vs Reschedule

The candidate profile reads `is_schedule` (already returned by
`view-applicants/{id}`):

- `is_schedule == 0`  →  button text is **Schedule Interview**
- `is_schedule != 0`  →  button text is **Reschedule Interview**

So when a recruiter successfully books or reschedules and revisits the
profile, the same button updates without any frontend tweak.
