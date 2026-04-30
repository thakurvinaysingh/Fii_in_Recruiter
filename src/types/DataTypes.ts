import {ImageProps} from 'react-native';
import {HTMLSource} from 'react-native-render-html';

export interface RecentApplicantsIF {
  id: number;
  name: string;
  role: string;
  exp: number;
  img: ImageProps;
}

export interface CandidateCategoriesIF {
  id: number;
  name: string;
  profileCount: number;
  img: ImageProps;
}

export interface JobType {
  id: number;
  title: string;
  clinic: string;
  clinic_logo: string;
  specialization_id: number;
  specialization: string;
  salary_range_from: string;
  salary_range_to: string;
  experiance_level: string;
  profession: any[];
  vacancy: number;
  address: string;
  job_description: string;
  benefits: string[];
  expire_date: string;
  require_document: string | null;
  candidates_count: number;
  created_at: string;
  shift: string[];
}

export interface AddReportIF {
  title: string | undefined;
  candidate_id: number | undefined;
  description: string | undefined;
}

interface NotificationDetailIF {
  id: number;
  title: string;
  description: string;
  icon: ImageProps;
}
export interface NotificationIF {
  date: string;
  items: NotificationDetailIF[];
}
export interface SearchIF {
  id: number;
  search: string;
}

export interface EmployementTypeIF {
  key: string;
  value: number;
}

export interface AddBenifitsIF {}

export interface RequiredDetailIF {
  id: number;
  detail: string;
}

export interface RequiredDocIF {
  id: number;
  doc: string;
  img: ImageProps;
}

export interface MessagesIF {
  id: number;
  sender: string;
  message: string;
  timeAgo: string;
  avatar: ImageProps;
  isVerified: boolean;
}

export interface ApplicantsIF {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  status: string;
  avatar: ImageProps;
}

export interface InterviewIF {
  id: number;
  time: string;
  doctor: string;
  specialty: string;
  status: string;
  mode: string;
  patient: string;
}

export interface RatingReviewsIF {
  id: number;
  clinic: string;
  dentist: string;
  rating: number;
  review: string;
  date: number;
  image: ImageProps;
}

export interface ExpertiseIF {
  id: number;
  title: string;
  img: ImageProps;
}

export interface AppStatussIF {
  id: number;
  status: string;
}

export interface CandidateIF {
  id: number;
  name: string;
  location: string | null;
  hourly_rate: string;
  profile: string;
  year_of_experiance: string;
  rating: number;
  review_count: number;
  profession: string;
}
type TimeSlot = {
  from: string;
  to: string;
};

export type AvailabilityTimes = {
  mon?: TimeSlot[];
  tue?: TimeSlot[];
  wed?: TimeSlot[];
  thu?: TimeSlot[];
  fri?: TimeSlot[];
  sat?: TimeSlot[];
  sun?: TimeSlot[];
};

export type CandidateFormData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  type_of_experiance: string;
  year_of_experiance: string;
  other_qualification: string;
  other_software: string;
  other_vaccination: string;
  hourly_rate: string;
  availability_time: string;
  short_notice: string;
  permanent_opportunities: string;
  childrens_check: string;
  valid_police_check: string;
  first_aid_certicate: string;
  working_in_dentistry: string;
  environment_thrive: string[];
  fun_fact: string;
  document_name: string;
  profession: string;
  software_experiance: string[];
  qualification: string[];
  vaccination: string[];
  language: string[];
  profile: string;
  rating: number;
  review_count: number;
  document: string;
  reviews: Review[];
  is_review: number;
  applied_our_Job: number;
  is_schedule: number;
  is_report: number;
  candidate_availibity: AvailabilityTimes;
};

export interface ScheduleInterviewIF {
  id?: number;
  candidate_id: number;
  job_id?: number;
  date: string;
  time: string;
  link: string;
  notes: string;
}

export interface ApplicantsByIdIF {
  id: number;
  name: string;
  profile: ImageProps;
  location: string;
  hourly_rate: number;
  year_of_experiance: string;
  rating: number;
  review_count: number;
  profession: string;
  applied_track: string[];
  applied_date: string;
}

export interface aboutUsIF {
  about_us: HTMLSource;
}

export interface InterviewListIF {
  id: number;
  candidate_id: number;
  candidate: string;
  job_id: number;
  job_name: string;
  clinic: string;
  date: string;
  time: string;
  link: string;
  notes: string;
  type: string;
  candidate_profession: string;
  title: string;
  profile: string;
}

export type InterviewJobDetails = {
  Experience: string;
  candidate: string;
  candidate_email: string;
  candidate_id: number;
  candidate_profession: string;
  created_at: string;
  date: string;
  end_time: string;
  id: number;
  job_description: string;
  job_id: number;
  job_name: string;
  link: string;
  location: string;
  notes: string;
  time: string;
  title: string;
  type: string;
};

export interface ReviewsIF {
  id: number;
  candidate_id: number;
  comment: string;
  image: string;
  clinic_name: string;
  rate: string;
  recruiter_name: string;
  created: string;
  candidate_image: string;
  profession: string;
}

export interface AddReviewIF {
  rate: number;
  candidate_id: number;
  comment: string;
  image: string;
}

export interface Review {
  id: number;
  candidate_id: number;
  recruiter_name: string;
  clinic_name: string;
  rate: string;
  comment: string;
  image: string;
  created: string;
  candidate_image: string;
  Clinic_profile: string;
  profession: string;
}

export interface MyReviews {
  id: number;
  candidate_id: number;
  candidate_name: string;
  profession: string;
  rate: number;
  comment: string;
  image: string | null;
  created: string;
}

export type CandidateReview = {
  id: number;
  candidate_id: number;
  candidate_name: string;
  candidate_image: string | null;
  profession: string;
  rate: string;
  comment: string;
  image: string | null;
  created: string;
};

export interface UserData {
  id: number;
  name: string;
  email: string;
  practice_name: string;
  established_year: string;
  practice_size: string;
  primarly_looking: string;
  working_hours: string[];
  other_dentistry: string | null;
  other_practice_role: string | null;
  address: string;
  postcode: string;
  phone: string;
  profile: string;
  document: string | null;
  document_name: string | null;
  reviews: Review[];
  rating: number;
  review_count: number;
  phone_verified: number;
  created_at: string;
  looking: number[];
  dentistry: number[];
  practice_role: number[];
  use_software: number[];
}

export interface CategoryIF {
  id: number;
  name: string;
  icon: string;
  job_count: number;
  candidate_count: number;
}

export interface LoginParamIF {
  email: string;
  password: string;
  fcm_token: string;
  device_id: string;
}

// DATA TYPES FOR CHAT

export interface ChatMessage {
  id: string;
  senderId?: string;
  content?: string;
  timestamp?: string;
  isMe?: boolean;
  datelabel?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'failed';
  type?: 'message' | 'date';
}

// Alternatively, if you prefer a more minimal approach:
export interface BasicChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

// For the typing indicator
export interface TypingIndicator {
  userId: string;
  isTyping: boolean;
  userName?: string;
}

// For the chat room/thread
export interface ChatThread {
  id: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  unreadCount?: number;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  redirect_url: string;
  icone: string;
  type: string;
  uniqe_id: number;
  read_at: string | null;
  created_at: string;
}
export interface NotificationSection {
  datelabel: string;
  data: NotificationItem[];
}

export type FlatNotificationItem =
  | {type: 'label'; label: string}
  | ({type: 'notification'} & NotificationItem);

export interface NotificationResponseIF {
  data: NotificationSection[];
}

export interface ChatsIF {
  id: number;
  message: string;
  candidate_id: number;
  msgStatus: string;
  time: string;
  candidate: string;
  profile: string;
  created_at: string;
  status: string;
  unseen_count: number;
}

export interface EmploymentType {
  value: number;
  key: string;
}
export interface JobIF {
  id: number;
  title: string;
  clinic_id: number;
  clinic: string;
  clinic_logo: string;
  recruiter_id: number;
  specialization_id: number;
  specialization: string;
  salary_range_from: string;
  salary_range_to: string;
  experiance_level: string;
  employmentTypes: EmploymentType[];
  vacancy: number;
  require_document: string | null;
  address: string | null;
  job_description: string;
  benefits: string[];
  expire_date: string;
  created_at: string;
  applied: number;
  applied_track: string;
  candidates_count: null | number;
  practice_size: string;
  is_saved: number;
  is_report: number;
  clinic_description: string;
  web_link: string;
  shift: string[];
  software: string[];
  is_edit: number;
}
