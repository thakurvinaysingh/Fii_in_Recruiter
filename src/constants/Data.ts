import {
  chat1,
  chat2,
  chat3,
  chat4,
  chat5,
  exp,
  history,
  location,
  postedJob,
  work,
} from '../components/store/ImageStore';

const BASE_URL = 'https://fillin.mobilesapplication.com/api/recruiter/';
const REGEX_ALPHABETS = /^[a-zA-Z\s]*$/;
const REGEX_EMAIL =
  /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
const GOOGLE_API_KEY = 'AIzaSyBaY4m_2RbttS9JFE-DBXkbFPa28kqOT1k';
const REGEX_MOBILE = /^[6-9]\d{9}$/;
const SOCKET_URL = 'https://fillin.mobilesapplication.com:6001';

const URL_REGEX =
  /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.(com|net|org|io|in|co|edu|gov)(:[0-9]{1,5})?(\/[^\s]*)?$/;
const candidateProfilesData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'General Dentist',
    exp: 3,
    img: require('../assets/images/main/recent_app1.png'),
  },
  {
    id: 2,
    name: 'Dr. Michal Thomsan',
    role: 'Dental Expert',
    exp: 4.5,
    img: require('../assets/images/main/recent_app2.png'),
  },
  {
    id: 3,
    name: 'Dr. Himani Alei',
    role: 'Expert in Dental health',
    exp: 4.5,
    img: require('../assets/images/main/recent_app1.png'),
  },
];

const candidateCategories = [
  {
    id: 1,
    name: 'Dentist',
    profileCount: 45,
    img: require('../assets/images/main/category1.png'),
  },
  {
    id: 2,
    name: 'Dental Assistant',
    profileCount: 175,
    img: require('../assets/images/main/category2.png'),
  },
  {
    id: 3,
    name: 'Dental Hygienist',
    profileCount: 2345,
    img: require('../assets/images/main/category3.png'),
  },
  {
    id: 4,
    name: 'Dental Specialist',
    profileCount: 8,
    img: require('../assets/images/main/category4.png'),
  },
  {
    id: 5,
    name: 'Dental Assistant',
    profileCount: 34,
    img: require('../assets/images/main/category1.png'),
  },
];

const postedJobs = [
  {
    id: 1,
    title: 'Senior Dental Hygienist',
    hospital: 'Dental Care Hospital',
    address: 'San Francisco, CA',
    type: 'Full Time',
    freshNess: '2 hours ago',
    exp: 3,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 12,
  },
  {
    id: 2,
    title: 'Junior Dental Assistant',
    hospital: 'Smile Bright Clinic',
    address: 'Los Angeles, CA',
    type: 'Part Time',
    freshNess: '5 hours ago',
    exp: 1,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 32,
  },
  {
    id: 3,
    title: 'Pediatric Dentist',
    hospital: 'Happy Kids Dental',
    address: 'New York, NY',
    type: 'Full Time',
    freshNess: '1 day ago',
    exp: 5,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 7,
  },
  {
    id: 4,
    title: 'Orthodontic Specialist',
    hospital: 'Perfect Smile Dental',
    address: 'Chicago, IL',
    type: 'Full Time',
    freshNess: '3 days ago',
    exp: 4,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 128,
  },
  {
    id: 5,
    title: 'Periodontist',
    hospital: 'Gum Care Experts',
    address: 'Houston, TX',
    type: 'Full Time',
    freshNess: '6 hours ago',
    exp: 6,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 876,
  },
  {
    id: 6,
    title: 'Dental Receptionist',
    hospital: 'Pearl Dental Clinic',
    address: 'Seattle, WA',
    type: 'Part Time',
    freshNess: '2 hours ago',
    exp: 1,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 0,
  },
  {
    id: 7,
    title: 'Cosmetic Dentist',
    hospital: 'Aesthetic Dental Studio',
    address: 'Miami, FL',
    type: 'Full Time',
    freshNess: '5 days ago',
    exp: 7,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 86,
  },
  {
    id: 8,
    title: 'Endodontist',
    hospital: 'Root Canal Experts',
    address: 'Boston, MA',
    type: 'Full Time',
    freshNess: '8 hours ago',
    exp: 5,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 8645,
  },
  {
    id: 9,
    title: 'Dental Lab Technician',
    hospital: 'Precision Dental Labs',
    address: 'Denver, CO',
    type: 'Contract',
    freshNess: '1 week ago',
    exp: 2,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 478,
  },
  {
    id: 10,
    title: 'Oral Surgeon',
    hospital: 'Advanced Dental Surgery',
    address: 'Phoenix, AZ',
    type: 'Full Time',
    freshNess: '2 days ago',
    exp: 8,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 97,
  },
  {
    id: 11,
    title: 'Dental Office Manager',
    hospital: 'Bright Smile Dentistry',
    address: 'Austin, TX',
    type: 'Full Time',
    freshNess: '4 days ago',
    exp: 3,
    img: postedJob,
    locationImg: location,
    typeImg: work,
    historyImg: history,
    expImg: exp,
    applicants: 2375,
  },
];

const jobsCategoryFilter = [
  {
    id: 1,
    filter: 'All',
  },
  {
    id: 2,
    filter: 'Part Time',
  },
  {
    id: 3,
    filter: 'Full Time',
  },
  {
    id: 4,
    filter: 'Hourly',
  },
];

const reviewsFilterData = [
  {
    id: 1,
    filter: 'All',
  },
  {
    id: 2,
    filter: 'Most Recent',
  },
  {
    id: 3,
    filter: 'Highest Rated',
  },
  {
    id: 4,
    filter: 'Less Rated',
  },
];

const applicantsFilterData = [
  {
    id: 1,
    filter: 'All',
  },
  {
    id: 2,
    filter: 'New',
  },
  {
    id: 3,
    filter: 'In Review',
  },
  {
    id: 4,
    filter: 'Accepted',
  },
];

const messageFilterData = [
  {
    id: 1,
    filter: 'All',
  },
  {
    id: 2,
    filter: 'Read',
  },
  {
    id: 3,
    filter: 'Undread',
  },
  {
    id: 4,
    filter: 'Blocked',
  },
];
const notifications = [
  {
    date: 'Today',
    items: [
      {
        id: 1,
        title: 'Profile Create Successfully',
        description:
          'Lorem Ipsum is simply dummy text of typesetting industry.',
        icon: require('../assets/images/main/notification_success.png'),
      },
      {
        id: 2,
        title: 'Dental Job Post',
        description: 'Lorem Ipsum is and typesetting industry.',
        icon: require('../assets/images/main/notification_dental.png'),
      },
      {
        id: 3,
        title: 'Successfully Password Change',
        description: 'Printing and typesetting industry.',
        icon: require('../assets/images/main/notification_correct.png'),
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        id: 4,
        title: 'Join Your Interview',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        icon: require('../assets/images/main/notification_care.png'),
      },
      {
        id: 5,
        title: 'Password Change Successfully',
        description: 'Lorem Ipsum is simply dummy text of the industry.',
        icon: require('../assets/images/main/notification_success.png'),
      },
      {
        id: 6,
        title: 'Dental Job Post',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the printing and typesetting industry.',
        icon: require('../assets/images/main/notification_dental.png'),
      },
    ],
  },

  {
    date: 'Last Week',
    items: [
      {
        id: 7,
        title: 'Join Your Interview',
        description: 'Lorem Ipsum is simply dummy text of the printing',
        icon: require('../assets/images/main/notification_care.png'),
      },
      {
        id: 8,
        title: 'Password Change Successfully',
        description: 'Lorem Ipsum is simply dummy text of the industry.',
        icon: require('../assets/images/main/notification_success.png'),
      },
      {
        id: 9,
        title: 'Dental Job Post',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry text of the printing and typesetting industry.',
        icon: require('../assets/images/main/notification_dental.png'),
      },
    ],
  },
];

const employmentType = [
  {
    id: 1,
    employementType: 'Full Time',
  },
  {
    id: 2,
    employementType: 'Part Time',
  },
  {
    id: 3,
    employementType: 'Contract',
  },
  {
    id: 4,
    employementType: 'Internship',
  },
  {
    id: 5,
    employementType: 'Other',
  },
];

const benifits = [];

const requiredDetails = [
  {
    id: 1,
    detail: 'Dentist',
  },
  {
    id: 2,
    detail: 'Care',
  },
  {
    id: 3,
    detail: 'Health',
  },
];

const requiredDocs = [
  {
    id: 1,
    doc: 'Resume/CV',
    img: require('../assets/images/main/resume_icon.png'),
  },
  {
    id: 2,
    doc: 'Portfolio',
    img: require('../assets/images/main/portfolio_icon.png'),
  },
  {
    id: 3,
    doc: 'Cover Letter',
    img: require('../assets/images/main/cover_letter_icon.png'),
  },
  {
    id: 4,
    doc: 'References',
    img: require('../assets/images/main/references_icon.png'),
  },
];

const messages = [
  {
    id: 1,
    sender: 'Dental Care Clinic',
    message: 'has viewed your application',
    timeAgo: '2h ago',
    avatar: chat1,
    isVerified: true,
  },
  {
    id: 2,
    sender: 'Job Alert',
    message: 'New the match Senior Dentist position at Bright Smile Dental',
    timeAgo: '4h ago',
    avatar: chat2,
    isVerified: false,
  },
  {
    id: 3,
    sender: 'Dr. Sarah Wilson',
    message:
      'Thanks for your interest in our clinic. We love to schedule an interview with you next',
    timeAgo: '6h ago',
    avatar: chat4,
    isVerified: true,
  },
  {
    id: 4,
    sender: 'Bright Smile Dental',
    message: 'Interview Invitation for Senior Dentist Position',
    timeAgo: '3h ago',
    avatar: chat3,
    isVerified: false,
  },
  {
    id: 5,
    sender: 'Dr. Michael Chen',
    message:
      'Hi, I saw your profile and I think you would be a great fit for our practice.',
    timeAgo: '6h ago',
    avatar: chat4,
    isVerified: true,
  },
  {
    id: 6,
    sender: 'Dental Care Clinic',
    message: 'has viewed your application',
    timeAgo: '2h ago',
    avatar: chat5,
    isVerified: true,
  },
];

const applicants = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentist',
    experience: 5,
    status: 'New',
    avatar: chat1,
  },
  {
    id: 2,
    name: 'Dr. Micheal Chen',
    specialty: 'Pediatric Dentist',
    experience: 8,
    status: 'In Review',
    avatar: chat3,
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Dental Surgeon',
    experience: 6,
    status: 'Accepted',
    avatar: chat2,
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentist',
    experience: 5,
    status: 'New',
    avatar: chat4,
  },
  {
    id: 5,
    name: 'Dr. Micheal Chen',
    specialty: 'Pediatric Dentist',
    experience: 8,
    status: 'In Review',
    avatar: chat5,
  },
];

const interviewsData = [
  {
    id: 1,
    time: '09:00 AM',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Senior Dentist Expert',
    status: 'Upcoming',
    mode: 'Video Calling',
    patient: 'Mike Chen',
  },
  {
    id: 2,
    time: '09:00 AM',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Senior Dentist Expert',
    status: 'Completed',
    mode: 'Video Calling',
    patient: 'Mike Chen',
  },
];

const ratingAndReviews = [
  {
    id: 1,
    clinic: 'Bright Smile Dental',
    dentist: 'Senior Dentist',
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    date: 2,
    image: chat1,
  },
  {
    id: 2,
    clinic: 'Pearl Dental Care',
    dentist: 'Orthodontist',
    rating: 5,
    review:
      'Had a great experience! The staff was very professional, and they made sure I was comfortable throughout my treatment.',
    date: 1,
    image: chat2,
  },
  {
    id: 3,
    clinic: 'Happy Teeth Clinic',
    dentist: 'Pediatric Dentist',
    rating: 4,
    review:
      'The dentist was amazing with my kids. She made them feel at ease, and the treatment was quick and painless!',
    date: 5,
    image: chat3,
  },
  {
    id: 4,
    clinic: 'White Pearl Dentistry',
    dentist: 'Cosmetic Dentist',
    rating: 4.8,
    review:
      'My teeth look better than ever! The whitening treatment was excellent, and I received great advice on maintaining my smile.',
    date: 3,
    image: chat4,
  },
  {
    id: 5,
    clinic: 'Healthy Smile Dental',
    dentist: 'Endodontist',
    rating: 4.7,
    review:
      'Needed a root canal and was terrified, but the procedure was smooth, and I felt no pain at all. Highly recommend!',
    date: 1,
    image: chat2,
  },
  {
    id: 6,
    clinic: 'Care Dental Solutions',
    dentist: 'General Dentist',
    rating: 5,
    review:
      'Professional and friendly service. They took the time to explain everything to me, and my treatment went smoothly.',
    date: 4,
    image: chat5,
  },
];

const expertiesData = [
  {
    id: 1,
    img: require('../assets/images/main/expertise1.png'),
    title: 'Dentistry',
  },
  {
    id: 2,
    img: require('../assets/images/main/expertise2.png'),
    title: 'Dental Implants',
  },
  {
    id: 3,
    img: require('../assets/images/main/expertise3.png'),
    title: 'General Dentistry',
  },
  {
    id: 4,
    img: require('../assets/images/main/expertise4.png'),
    title: 'Pediatric Care',
  },
];
const applicationStatus = [
  {
    id: 1,
    status: 'Review',
  },
  {
    id: 2,
    status: 'Shortlisted',
  },
  {
    id: 3,
    status: 'Offer Shared',
  },
  {
    id: 4,
    status: 'Offer Accepted',
  },
];

const departmentData = [
  {
    id: 1,
    item: 'Pediatric Dentist',
  },
  {
    id: 2,
    item: 'General Dentist',
  },
  {
    id: 3,
    item: 'Orthodontist',
  },
  {
    id: 4,
    item: 'Prosthodontist',
  },
  {
    id: 5,
    item: 'sdkj Public Health Specialist',
  },
  {
    id: 6,
    item: 'Dental Public Health Specialist',
  },
  {
    id: 7,
    item: 'Dental Public Health Specialist',
  },
  {
    id: 8,
    item: 'Dental Public Health Specialist',
  },
];

const experienceLevel = [
  {
    value: 1,
    key: '0 to 1 Year',
  },
  {
    value: 2,
    key: '1 to 3 Years',
  },
  {
    value: 3,
    key: '3 to 5 Years',
  },
  {
    value: 4,
    key: '5 to 10 Years',
  },
  {
    value: 5,
    key: '10+ Years',
  },
];

const gender = [
  {
    id: 1,
    item: 'Male',
  },
  {
    id: 2,
    item: 'Female',
  },
  {
    id: 3,
    item: 'Other',
  },
];

const serviceData = [
  {
    key: 'General',
    value: 1,
  },
  {
    key: 'Pediatric',
    value: 2,
  },
  {
    key: 'Endodontic',
    value: 3,
  },
  {
    key: 'Otherdontic',
    value: 4,
  },
];

const teamSizeData = [
  {
    key: 'Solo Practice',
    value: 1,
  },
  {
    key: 'Small Team (2-5)',
    value: 2,
  },
  {
    key: 'Medium Team (6-10)',
    value: 3,
  },
  {
    key: 'Large Team (10+)',
    value: 4,
  },
];

const rolesData = [
  {
    key: 'Practice Manager',
    value: 1,
  },
  {
    key: 'Owner/Dentist',
    value: 2,
  },
  {
    key: 'HR Coordinator',
    value: 3,
  },
];

const lookingForData = [
  {
    key: 'Temporary Fill-Ins',
    value: 1,
  },
  {
    key: 'Permanent Hires',
    value: 2,
  },
  {
    key: 'Both',
    value: 3,
  },
];

const urgentData = [
  {
    key: 'YES',
    value: 1,
  },
  {
    key: 'NO',
    value: 2,
  },
];

const workingHours = [
  {
    key: 'Weekdays',
    value: 1,
  },
  {
    key: 'Weekends',
    value: 2,
  },
  {
    key: 'Morning',
    value: 3,
  },
  {
    key: 'Afternoon',
    value: 4,
  },
  {
    key: 'Evening',
    value: 5,
  },
  {
    key: 'Flexible',
    value: 6,
  },
];

const chatFilterData = [
  {
    value: 1,
    key: 'Read',
  },
  {
    value: 1,
    key: 'Unread',
  },
];

const chatData = [
  {
    id: 60,
    message: 'hi',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:21 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:21:35.000000Z',
  },
  {
    id: 61,
    message: "Hello, I'm available now.",
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:25 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:25:12.000000Z',
  },
  {
    id: 62,
    message: 'Can you share the job details?',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:30 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:30:03.000000Z',
  },
  {
    id: 63,
    message: 'Sure, I will send them shortly.',
    candidate_id: 2,
    msgStatus: 'receive',
    time: '06:32 AM',
    candidate: 'Recruiter John',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/recruiter/john123.jpg',
    created_at: '2025-06-24T06:32:47.000000Z',
  },
  {
    id: 64,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 65,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 66,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 67,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 68,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 69,
    message: 'Got it. Thanks!',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
  {
    id: 70,
    message: 'Got it. Thanks! Last',
    candidate_id: 1,
    msgStatus: 'send',
    time: '06:35 AM',
    candidate: 'New Candidate with q9@',
    profile:
      'https://fillin-admin.cyberxinfosolution.com/storage/images/candidate/33471747913302.octet-stream',
    created_at: '2025-06-24T06:35:29.000000Z',
  },
];

const experienceYearsSingle = [
  '0-1 Years',
  '1-3 Years',
  '3-5 Years',
  '5-10 Years',
  '10+ Years',
];
const workingHoursSingle = [
  'Weekdays',
  'Weekends',
  'Morning',
  'Afternoon',
  'Evening',
  'Flexible',
];

const typesOfExp = ['Public', 'Private'];

const permanentOpp = ['YES', 'NO'];
const reating = ['1 & Above', '2 & Above', '3 & Above', '4 & Above', '5'];

const environmentData = [
  {
    key: 'Fast-Paced',
    value: 1,
  },
  {
    key: 'Collaborative',
    value: 2,
  },
  {
    key: 'Patient-Focused',
    value: 3,
  },
  {
    key: 'Technology-Driven',
    value: 4,
  },
  {
    key: 'Structured',
    value: 5,
  },
  {
    key: 'Flexible',
    value: 6,
  },
];

const interviewStatusData = ['Upcoming', 'Completed', 'Expired', 'Today'];
export {
  interviewStatusData,
  environmentData,
  workingHours,
  lookingForData,
  rolesData,
  teamSizeData,
  serviceData,
  gender,
  applicants,
  candidateProfilesData,
  candidateCategories,
  postedJobs,
  jobsCategoryFilter,
  notifications,
  employmentType,
  benifits,
  requiredDetails,
  requiredDocs,
  messageFilterData,
  messages,
  applicantsFilterData,
  interviewsData,
  reviewsFilterData,
  ratingAndReviews,
  expertiesData,
  applicationStatus,
  departmentData,
  BASE_URL,
  REGEX_ALPHABETS,
  REGEX_EMAIL,
  GOOGLE_API_KEY,
  REGEX_MOBILE,
  experienceLevel,
  experienceYearsSingle,
  workingHoursSingle,
  typesOfExp,
  permanentOpp,
  reating,
  chatFilterData,
  chatData,
  SOCKET_URL,
  URL_REGEX,
  urgentData,
};
