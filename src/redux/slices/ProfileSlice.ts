import {createSlice} from '@reduxjs/toolkit';
interface profileIF {
  choosePhotoOpen: boolean;
  profile: string;
  profileId: number;
  reviewPhoto: string;
  id: number | string;
  isRewvied: boolean;
  city: string;
  phoneErr: string;
  anyInterviewCompleted: boolean;
  practiceInformation: {
    practiceName: string;
    selectedService: number[];
    establishedYear: string;
    serviceOther: string;
    location: string;
    pinCode: string;
    latitude: string;
    longitude: string;
    selectedTeamSize: string;
    doc: string;
    docName: string;
    descriptionInput: string;

    practiceNameError: string;
    establishedYearError: string;
    locationError: string;
    postcodeError: string;
    wrokingHoursError: string;
  };
  contactInformation: {
    contactName: string;
    selectedRole: string;
    otherRoles: string;
    email: string;
    phone: string;
    contactNameError: string;
    webLink: string;
    webLinkErr: string;
  };
  staffingRequirements: {
    selectedStaff: number[];
    staffOther: string;
    selectedLookingFor: string;
    selectedWorkingHours: string[];
    selectedSoftwarePractice: number[];
    softwarePracticeOther: string;
  };
  filter: {
    softwareExpFilter: number[];
    professionFilter: number[];
    shiftFilter: string[];
    experienceFilter: string[];
    typesOfExpFilter: string[];
    permanentOppFilter: string;
    languageFilter: number[];
    ratingFilter: string[];
  };
}
const initialState: profileIF = {
  profileId: 0,
  choosePhotoOpen: false,
  reviewPhoto: '',
  profile: '',
  id: '',
  city: '',
  anyInterviewCompleted: false,
  isRewvied: false,
  phoneErr: '',

  practiceInformation: {
    practiceName: '',
    establishedYear: '',
    selectedService: [],
    serviceOther: '',
    selectedTeamSize: '',
    location: '',
    latitude: '',
    longitude: '',
    pinCode: '',
    doc: '',
    docName: '',
    practiceNameError: '',
    establishedYearError: '',
    locationError: '',
    postcodeError: '',
    wrokingHoursError: '',
    descriptionInput: '',
  },
  contactInformation: {
    contactName: '',
    selectedRole: '',
    otherRoles: '',
    email: '',
    phone: '',
    contactNameError: '',
    webLink: '',
    webLinkErr: '',
  },
  staffingRequirements: {
    selectedStaff: [],
    staffOther: '',
    selectedLookingFor: '',
    selectedWorkingHours: [],
    selectedSoftwarePractice: [],
    softwarePracticeOther: '',
  },
  filter: {
    softwareExpFilter: [],
    professionFilter: [],
    shiftFilter: [],
    experienceFilter: [],
    typesOfExpFilter: [],
    permanentOppFilter: '',
    languageFilter: [],
    ratingFilter: [],
  },
};
export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setChoosePhotoOpen(state, action) {
      state.choosePhotoOpen = action.payload;
    },
    setPracticeName(state, action) {
      state.practiceInformation.practiceName = action.payload;
    },
    setSelectedService(state, action) {
      state.practiceInformation.selectedService = action.payload;
    },
    setServiceOther(state, action) {
      state.practiceInformation.serviceOther = action.payload;
    },
    setTeamSize(state, action) {
      state.practiceInformation.selectedTeamSize = action.payload;
    },
    setContactName(state, action) {
      state.contactInformation.contactName = action.payload;
    },
    setRole(state, action) {
      state.contactInformation.selectedRole = action.payload;
    },
    setOtherRoles(state, action) {
      state.contactInformation.otherRoles = action.payload;
    },
    setEmail(state, action) {
      state.contactInformation.email = action.payload;
    },
    setPhone(state, action) {
      state.contactInformation.phone = action.payload;
    },
    setStaff(state, action) {
      state.staffingRequirements.selectedStaff = action.payload;
    },
    setStaffOther(state, action) {
      state.staffingRequirements.staffOther = action.payload;
    },
    setLookingFor(state, action) {
      state.staffingRequirements.selectedLookingFor = action.payload;
    },
    setWorkingHours(state, action) {
      state.staffingRequirements.selectedWorkingHours = action.payload;
    },
    setSoftwarePractice(state, action) {
      state.staffingRequirements.selectedSoftwarePractice = action.payload;
    },
    setSoftwarePracticeOther(state, action) {
      state.staffingRequirements.softwarePracticeOther = action.payload;
    },
    setLocation(state, action) {
      state.practiceInformation.location = action.payload;
    },
    setPinCode(state, action) {
      state.practiceInformation.pinCode = action.payload;
    },
    setEstablishedYear(state, action) {
      state.practiceInformation.establishedYear = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setDoc(state, action) {
      state.practiceInformation.doc = action.payload;
    },
    setDocName(state, action) {
      state.practiceInformation.docName = action.payload;
    },

    setPracticeNameError(state, action) {
      state.practiceInformation.practiceNameError = action.payload;
    },
    setLocationError(state, action) {
      state.practiceInformation.locationError = action.payload;
    },
    setPostCodeError(state, action) {
      state.practiceInformation.postcodeError = action.payload;
    },
    setEstablishedError(state, action) {
      state.practiceInformation.establishedYearError = action.payload;
    },
    setContactNameError(state, action) {
      state.contactInformation.contactNameError = action.payload;
    },
    setWebLinkError(state, action) {
      state.contactInformation.webLinkErr = action.payload;
    },
    setWorkingHoursError(state, action) {
      state.practiceInformation.wrokingHoursError = action.payload;
    },
    setReviewPhoto(state, action) {
      state.reviewPhoto = action.payload;
    },
    setIsReviewed(state, action) {
      state.isRewvied = action.payload;
    },
    setLatitude(state, action) {
      state.practiceInformation.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.practiceInformation.longitude = action.payload;
    },
    setWebLink(state, action) {
      state.contactInformation.webLink = action.payload;
    },
    setDescriptionInput(state, action) {
      state.practiceInformation.descriptionInput = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setAnyInterviewCompleted(state, action) {
      state.anyInterviewCompleted = action.payload;
    },
    setPhoneErr: (state, action) => {
      state.phoneErr = action.payload;
    },
    setSoftwareExpFilter: (state, action) => {
      state.filter.softwareExpFilter = action.payload;
    },
    setProfessionFilter: (state, action) => {
      state.filter.professionFilter = action.payload;
    },
    setShiftFilter: (state, action) => {
      state.filter.shiftFilter = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.filter.experienceFilter = action.payload;
    },
    setTypesOfExpFilter: (state, action) => {
      state.filter.typesOfExpFilter = action.payload;
    },
    setPermanentOppFilter: (state, action) => {
      state.filter.permanentOppFilter = action.payload;
    },
    setLanguageFilter: (state, action) => {
      state.filter.languageFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filter.ratingFilter = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
  },
});

export const {
  setWebLinkError,
  setRatingFilter,
  setLanguageFilter,
  setPermanentOppFilter,
  setTypesOfExpFilter,
  setAnyInterviewCompleted,
  setCity,
  setLatitude,
  setDescriptionInput,
  setLongitude,
  setReviewPhoto,
  setEstablishedError,
  setContactNameError,
  setPostCodeError,
  setLocationError,
  setPracticeNameError,
  setEstablishedYear,
  setSoftwarePractice,
  setWorkingHours,
  setLookingFor,
  setStaff,
  setPracticeName,
  setChoosePhotoOpen,
  setSelectedService,
  setServiceOther,
  setTeamSize,
  setContactName,
  setRole,
  setOtherRoles,
  setEmail,
  setPhone,
  setStaffOther,
  setPinCode,
  setLocation,
  setSoftwarePracticeOther,
  setProfile,
  setDoc,
  setDocName,
  setIsReviewed,
  setWorkingHoursError,
  setWebLink,
  setPhoneErr,
  setSoftwareExpFilter,
  setProfessionFilter,
  setShiftFilter,
  setExperienceFilter,
  setProfileId,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
