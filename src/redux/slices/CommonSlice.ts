import {createSlice} from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    intro_step: 1,
    auth_token: '',
    isReviewBottomSheetOpen: false,
    isLogoutPopOpen: false,
    isProfileImgPopOpen: false,
    isLoading: false,
    timeLeft: 30,
    isTimeRunning: false,
    isLoginSuccess: false,
    isLogoutSuccess: false,
    isOTPSentSuccess: false,
    isPassChangedSuccess: false,
    isForgotPassOTPSent: false,
    isOTPVerified: false,
    isClinicCreated: false,
    employmentType: [],
    clinicProfile: '',
    clinicName: '',
    isDeletePopOpen: false,
    isOTPInvalid: false,
    isInterviewScheduled: false,
    isReviewAdded: 0,
    profileNotComplete: true,
    newChangedEmail: '',
    newChangedPhone: '',
    isChangeEmailOpen: false,
    isChangePhoneOpen: false,
    isOTPVerifiedSucess: false,
    isOTPVerifiedSucessEmail: false,
    isUnsavedSuccess: false,
    isSavedSuccess: false,
    fcmToken: '',
    profileImg: '',
    profileId: '',
    notificationUnreadLenght: 0,
    notificationCliked: 0,
    isProfileCompleted: 0,
    isReportJobOpen: false,
    isReportSuccess: false,
    isCandidateAppliedJobsViewing: false,
    isInterviewDetailsChanged: 0,
    urgent: 'NO',
  },
  reducers: {
    increaseIntroStep: state => {
      state.intro_step += 1;
    },

    decreaseIntroStep: state => {
      state.intro_step -= 1;
    },
    setAuthToken: (state, action) => {
      state.auth_token = action.payload;
    },
    setIsReviewBottomSheetOpen: (state, action) => {
      state.isReviewBottomSheetOpen = action.payload;
    },
    setIsLogoutPopOpen: (state, action) => {
      state.isLogoutPopOpen = action.payload;
    },
    setIsProfileImgPopOpen: (state, action) => {
      state.isProfileImgPopOpen = action.payload;
    },
    setIsUnsavedSuccess: (state, action) => {
      state.isUnsavedSuccess = action.payload;
    },
    setIsSavedSuccess: (state, action) => {
      state.isSavedSuccess = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setIsTimeRunning: (state, action) => {
      state.isTimeRunning = action.payload;
    },
    setIsLoginSuccess: (state, action) => {
      state.isLoginSuccess = action.payload;
    },
    setIsLogoutSuccess: (state, action) => {
      state.isLogoutSuccess = action.payload;
    },
    setIsOTPSentSuccess: (state, action) => {
      state.isOTPSentSuccess = action.payload;
    },
    setIsPassChangedSuccess: (state, action) => {
      state.isPassChangedSuccess = action.payload;
    },
    setIsForgotPassOTPSent: (state, action) => {
      state.isForgotPassOTPSent = action.payload;
    },
    setIsOTPInvalid: (state, action) => {
      state.isOTPInvalid = action.payload;
    },
    setIsOTPVerified: (state, action) => {
      state.isOTPVerified = action.payload;
    },
    setClininc: (state, action) => {
      state.isClinicCreated = action.payload;
    },
    setEmployementType: (state, action) => {
      state.employmentType = action.payload;
    },
    setClinicProfile: (state, action) => {
      state.clinicProfile = action.payload;
    },
    setClinicName: (state, action) => {
      state.clinicName = action.payload;
    },
    setDeletePopOpen: (state, action) => {
      state.isDeletePopOpen = action.payload;
    },
    setIsInterviewScheduled: (state, action) => {
      state.isInterviewScheduled = action.payload;
    },
    setIsReviewAdded: (state, action) => {
      state.isReviewAdded = action.payload;
    },

    setProfileNotComplete: (state, action) => {
      state.profileNotComplete = action.payload;
    },

    setNewChangedEmail: (state, action) => {
      state.newChangedEmail = action.payload;
    },

    setNewChangedPhone: (state, action) => {
      state.newChangedPhone = action.payload;
    },
    setIsChangeEmailOpen: (state, action) => {
      state.isChangeEmailOpen = action.payload;
    },

    setIsChangePhoneOpen: (state, action) => {
      state.isChangePhoneOpen = action.payload;
    },
    setIsOTPVerifiedSucess: (state, action) => {
      state.isOTPVerifiedSucess = action.payload;
    },
    setIsOTPVerifiedSucessEmail: (state, action) => {
      state.isOTPVerifiedSucessEmail = action.payload;
    },
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setNotificationUnredLength: (state, action) => {
      state.notificationUnreadLenght = action.payload;
    },
    setNotificationCliked: (state, action) => {
      state.notificationCliked = action.payload;
    },
    setIsProfileCompleted: (state, action) => {
      state.isProfileCompleted = action.payload;
    },
    setIsReportJobOpen: (state, action) => {
      state.isReportJobOpen = action.payload;
    },
    setIsReportSuccess: (state, action) => {
      state.isReportSuccess = action.payload;
    },
    setIsCandidateAppliedJobsViewing: (state, action) => {
      state.isCandidateAppliedJobsViewing = action.payload;
    },
    setUrgent(state, action) {
      state.urgent = action.payload;
    },
  },
});

export const {
  setUrgent,
  setIsCandidateAppliedJobsViewing,
  setIsReportSuccess,
  setIsReportJobOpen,
  setIsProfileCompleted,
  setNotificationUnredLength,
  setNotificationCliked,
  setProfileImg,
  setProfileId,
  setIsOTPVerifiedSucessEmail,
  setIsOTPVerifiedSucess,
  setIsChangePhoneOpen,
  setIsChangeEmailOpen,
  increaseIntroStep,
  decreaseIntroStep,
  setAuthToken,
  setIsReviewBottomSheetOpen,
  setIsLogoutPopOpen,
  setIsProfileImgPopOpen,
  setIsLoading,
  setTimeLeft,
  setClininc,
  setIsTimeRunning,
  setIsLoginSuccess,
  setIsLogoutSuccess,
  setIsOTPSentSuccess,
  setIsPassChangedSuccess,
  setIsForgotPassOTPSent,
  setIsOTPVerified,
  setEmployementType,
  setClinicName,
  setClinicProfile,
  setDeletePopOpen,
  setIsOTPInvalid,
  setIsInterviewScheduled,
  setIsReviewAdded,
  setProfileNotComplete,
  setNewChangedEmail,
  setNewChangedPhone,
  setIsUnsavedSuccess,
  setIsSavedSuccess,
  setFCMToken,
} = commonSlice.actions;
export default commonSlice.reducer;
