import {RegisterIF} from '../types/AuthTypes';
import {createClinicIF} from '../types/CreateClinicTypes';
import {CreateJobIF} from '../types/CreateJobTypes';
import {
  AddReportIF,
  AddReviewIF,
  LoginParamIF,
  ScheduleInterviewIF,
} from '../types/DataTypes';
import {UpdateProfileIF} from '../types/UpdateProfileTypes';
import ApiClient from './ApiClient';

// REGISTER API
const register = async ({
  name,
  email,
  password,
  phone,
  password_confirmation,
}: RegisterIF) => {
  try {
    const response = await ApiClient.post('registraion', {
      name,
      email,
      password,
      phone,
      password_confirmation,
    });
    console.log(response,'responseresponse')
    return {success: true, data: response?.data};
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// SENDING OTP
const sendingOTP = async (email: string) => {
  try {
    const response = await ApiClient.post('send-otp', {email});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// VERIFYING OTP
const verifyingOTP = async (email: string, otp: string) => {
  try {
    const response = await ApiClient.post('verify-otp', {email, otp});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// LOGIN OTP
const login = async ({email, password, fcm_token, device_id}: LoginParamIF) => {
  try {
    const response = await ApiClient.post('login', {
      email,
      password,
      fcm_token,
      device_id,
    });
    return {success: true, data: response?.data};
  } catch (err: any) {
    console.log(err,'err')
    const errMsg =
      err;
    return {success: false, err: errMsg};
  }
};

// CHANGE PASSWORD
const changePass = async (
  email: string,
  password: string,
  password_confirmation: string,
) => {
  try {
    const response = await ApiClient.post('change-password', {
      email,
      password,
      password_confirmation,
    });
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// GET PERSONAL PROFILE DATA
const personalProfile = async () => {
  try {
    const response = await ApiClient.get('view-profile');
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Something went wrong in get personal profile with no message';
    return {success: false, err: errMsg};
  }
};

const changingEmailOTP = async (email: string, otp: number) => {
  try {
    const response = await ApiClient.post('change-email', {email, otp});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// UPDATE PERSONAL PROFILE DATA
const updatePersonalProfile = async (profile: UpdateProfileIF) => {
  try {
    const response = await ApiClient.post('update-profile', profile);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Something went wrong in get personal profile with no message';
    return {success: false, err: errMsg};
  }
};

const gettingDynamicData = async () => {
  try {
    const response = await ApiClient.post(`get-dropdown-data`);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in job list with no message';
    return {success: false, err: errMsg};
  }
};

const viewApplicants = async (
  candidateId: number,
  {job_id}: {job_id: number},
) => {
  try {
    const response = await ApiClient.get(`view-applicants/${candidateId}`, {
      params: {job_id},
    });
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in job list with no message';
    return {success: false, err: errMsg};
  }
};

const schedulingInterview = async (scheduleInterview: ScheduleInterviewIF) => {
  try {
    const response = await ApiClient.post(
      'schedule-interview',
      scheduleInterview,
    );
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in job list with no message';
    return {success: false, err: errMsg};
  }
};

const gettingScheduleInterview = async (id: number) => {
  try {
    const response = await ApiClient.get(`interView-details/${id}`);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in job list with no message';
    return {success: false, err: errMsg};
  }
};

// REPORT CANDIDATE
const reportingJob = async ({
  title,
  candidate_id,
  description,
}: AddReportIF) => {
  try {
    const response = await ApiClient.post('report', {
      title,
      candidate_id,
      description,
    });
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// CREATE OR UPDATE JOB
const creatingJob = async ({
  id,
  title,
  vacancy,
  address,
  profession,
  salary_range_from,
  salary_range_to,
  experiance_level,
  job_description,
  benefits,
  shift,
  latitude,
  longitude,
  software,
  urgent,
}: CreateJobIF) => {
  try {
    const response = await ApiClient.post('create-job', {
      id,
      title,
      vacancy,
      address,
      profession,
      salary_range_from,
      salary_range_to,
      experiance_level,
      job_description,
      benefits,
      shift,
      latitude,
      longitude,
      software,
      urgent,
    });

    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// GET CREATE JOB DROPDOWN DATA
const gettingCreateJobData = async () => {
  try {
    const response = await ApiClient.post('get-dropdown-data');

    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// CREATE/UPDATE CLINIC
const creatingUpdatingClinic = async ({
  id,
  name,
  email,
  phone,
  bio,
  location,
  document,
  logo,
  document_name,
}: createClinicIF) => {
  try {
    const response = await ApiClient.post('create-update-clinic', {
      id,
      name,
      email,
      phone,
      bio,
      location,
      document,
      logo,
      document_name,
    });

    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// CREATE/UPDATE CLINIC
const gettingClinicData = async () => {
  try {
    const response = await ApiClient.get('view-clinic');
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// GETTING ALL JOBS
const gettingAllJobs = async () => {
  try {
    const response = await ApiClient.get('job-list');
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// GETTING ALL JOBS APPLIED CANDIDATE
const gettingJobsAppliedCandidate = async (id: number) => {
  try {
    const response = await ApiClient.get(`candidate-applied-jobs/${id}`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// GETTING ALL CANDIDATE
const gettingAllCandidate = async () => {
  try {
    const response = await ApiClient.get('all-candidate');
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// VIEWING THE CREATED JOB
const gettingOrUpdatingJobDetail = async (id: number | string | undefined) => {
  try {
    const response = await ApiClient.get(`job-detail/${id}`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// DELETE JOB
const deletingJob = async (id: number | string | undefined) => {
  try {
    const response = await ApiClient.post(`delete-jobs/${id}`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// GET APPLICANTS BY ID
const gettingApplicantsById = async (id: number) => {
  try {
    const response = await ApiClient.get(`job-candidates/${id}`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// // GET JOBS ON WHICH CANDIDATE APPLIED
// const gettingJobsCanidatedApplied = async (id: number) => {
//   try {
//     const response = await ApiClient.get(`candidate-applied-jobs/${id}`);
//     return {success: true, data: response.data};
//   } catch (err: any) {
//     const errMsg =
//       err?.response?.data?.message ||
//       'Error in Create/Update with no error message';
//     return {success: false, err: errMsg};
//   }
// };

// INTERVIEW LIST
const gettingInterviewList = async () => {
  try {
    const response = await ApiClient.get(`interview-list`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// INTERVIEW LIST FOR A DATE RANGE (USED BY CALENDAR – ONE MONTH AT A TIME)
// EXAMPLE: GET /interview-list?from=2026-04-01&to=2026-04-30
const gettingInterviewListByRange = async (from: string, to: string) => {
  try {
    const response = await ApiClient.get(`interview-list`, {
      params: {from, to},
    });
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// RESCHEDULE AN ALREADY SCHEDULED INTERVIEW
// PATH: POST /reschedule-interview/{id}
// BODY: same shape as schedule-interview (date YYYY-MM-DD, time HH:mm:ss / HH:mm)
const reschedulingInterview = async (
  id: number,
  payload: {
    candidate_id: number;
    job_id?: number;
    title: string;
    date: string;
    time: string;
    end_time: string;
    link: string;
    notes: string;
  },
) => {
  try {
    const response = await ApiClient.post(
      `reschedule-interview/${id}`,
      payload,
    );
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in reschedule interview with no message';
    return {success: false, err: errMsg};
  }
};

// GETTING ABOUT US AND PRIVACY POLICY DATA
const gettingSettingsData = async () => {
  try {
    const response = await ApiClient.get(`setting`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// MARK AS COMPLETE API FOR INTERVIEW STATUS
const markingAsComplete = async (interviewId: number) => {
  try {
    const response = await ApiClient.get(`complete-interview/${interviewId}`);
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// ADD REVIEW
const addingReview = async ({
  rate,
  candidate_id,
  comment,
  image,
}: AddReviewIF) => {
  try {
    const response = await ApiClient.post('add-review', {
      rate,
      candidate_id,
      comment,
      image,
    });
    return {success: true, data: response.data};
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.message ||
      'Error in Create/Update with no error message';
    return {success: false, err: errMsg};
  }
};

// VERIFYING PHONE OTP
const verfiyingPhoneOTP = async (phone: string, otp: number) => {
  try {
    const response = await ApiClient.post('change-phone', {phone, otp});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// SENDING OTP TO PHONE
const sendingPhoneOTP = async (type: string, phone: string) => {
  try {
    const response = await ApiClient.post('send-otp', {type, phone});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in otp with no message';
    return {success: false, err: errMsg};
  }
};

// SEND MESSAGE
const sendingMessage = async (recruiter_id: string, message: string) => {
  try {
    const response = await ApiClient.post('chat', {recruiter_id, message});
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in otp with no message';
    return {success: false, err: errMsg};
  }
};

// GET CHAT HISTORY
const gettingChatHistory = async (id: string) => {
  try {
    const response = await ApiClient.post(`chat-history/${id}`);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in otp with no message';
    return {success: false, err: errMsg};
  }
};

// POPULAR AND RECENT SEARCHES
const gettingPopularSearches = async () => {
  try {
    const response = await ApiClient.get('search-terms');
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// GETTING PROFILE IMAGE AND PROFILE ID
const gettingProfileId = async () => {
  try {
    const response = await ApiClient.get('recruiter-profile');
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in register with no message';
    return {success: false, err: errMsg};
  }
};

// GETTING NOTIFICATION LIST
const gettingNotification = async () => {
  try {
    const response = await ApiClient.get('notification-list');
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in notification with no message';
    return {success: false, err: errMsg};
  }
};

// GETTING CHATS LIST
const gettingChatsList = async () => {
  try {
    const response = await ApiClient.get('chat-users');
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in chat with no message';
    return {success: false, err: errMsg};
  }
};

// MARK AS READ NOTIFICAITON
const markingAsReadNotification = async (id: string) => {
  try {
    const response = await ApiClient.get(`notifications/mark-as-read/${id}`);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in chat with no message';
    return {success: false, err: errMsg};
  }
};

// MARK AS READ NOTIFICAITON
const markingAsReadChat = async (id: number) => {
  try {
    const response = await ApiClient.get(`chat/mark-as-read/${id}`);
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in chat with no message';
    return {success: false, err: errMsg};
  }
};

// UPDATE JOB STATUS LIKE "APPLICATION VIEWED"
const updattingJobStatus = async (
  candidateId: number,
  {job_id, status}: {job_id: number; status: string},
) => {
  try {
    const response = await ApiClient.post(`update-job-status/${candidateId}`, {
      job_id,
      status,
    });
    return {success: true, data: response?.data};
  } catch (err: any) {
    const errMsg =
      err.response?.data?.message ||
      'Something went wrong in chat with no message';
    return {success: false, err: errMsg};
  }
};
export {
  updattingJobStatus,
  reportingJob,
  gettingJobsAppliedCandidate,
  markingAsReadChat,
  markingAsReadNotification,
  gettingChatsList,
  gettingNotification,
  gettingProfileId,
  gettingChatHistory,
  gettingPopularSearches,
  sendingMessage,
  addingReview,
  markingAsComplete,
  deletingJob,
  register,
  sendingOTP,
  verifyingOTP,
  login,
  changePass,
  personalProfile,
  updatePersonalProfile,
  creatingJob,
  gettingCreateJobData,
  creatingUpdatingClinic,
  gettingClinicData,
  gettingAllJobs,
  gettingOrUpdatingJobDetail,
  gettingDynamicData,
  gettingAllCandidate,
  viewApplicants,
  schedulingInterview,
  reschedulingInterview,
  gettingApplicantsById,
  gettingInterviewList,
  gettingInterviewListByRange,
  gettingSettingsData,
  gettingScheduleInterview,
  changingEmailOTP,
  verfiyingPhoneOTP,
  sendingPhoneOTP,
};
