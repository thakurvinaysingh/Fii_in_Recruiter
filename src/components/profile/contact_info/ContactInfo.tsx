import {Text, View} from 'react-native';
import React, {useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Dropdown, Input} from '../../store/ComponentStore';
import {useSelector, useDispatch} from '../../store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
import {
  setContactName,
  setContactNameError,
  setEmail,
  setOtherRoles,
  setPhone,
  setRole,
  setWebLink,
  setWebLinkError,
} from '../../../redux/slices/ProfileSlice';
import {DynamicDataIF} from '../../../types/DropdownTypes';
import {pencil} from '../../store/ImageStore';
import {
  setIsChangeEmailOpen,
  setIsChangePhoneOpen,
  setIsOTPVerifiedSucess,
} from '../../../redux/slices/CommonSlice';
import {URL_REGEX} from '../../../constants/Data';
const ContactInfo = ({dynamicData}: {dynamicData: DynamicDataIF}) => {
  const dispatch = useDispatch();
  const [isOtherRoles, setIsOtherRoles] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const {newChangedEmail, newChangedPhone} = useSelector(
    (state: RootState) => state.commonSlice,
  );

  const {
    contactName,
    otherRoles,
    email,
    phone,
    contactNameError,
    selectedRole,
    webLink,
    webLinkErr,
  } = useSelector((state: RootState) => state.profileSlice.contactInformation);

  // OPEN CHANGE EMAIL POPUP
  const handleEditEmail = () => {
    dispatch(setIsChangeEmailOpen(true));
    dispatch(setIsOTPVerifiedSucess(false));
  };

  // OPEN CHANGE PHONE POPUP
  const handleEditPhone = () => {
    dispatch(setIsChangePhoneOpen(true));
    dispatch(setIsOTPVerifiedSucess(false));
  };
  const onChangeOtherRoles = (val: string) => {
    dispatch(setOtherRoles(val));
  };

  const onChangeEmail = (val: string) => {
    dispatch(setEmail(val));
  };

  const onChangePhone = (val: string) => {
    dispatch(setPhone(val));
  };

  const onChangeWebURL = (val: string) => {
    dispatch(setWebLink(val.toLowerCase()));
    if (val && !URL_REGEX.test(val)) {
      dispatch(setWebLinkError('Website URL must be valid'));
    } else {
      dispatch(setWebLinkError(''));
    }
  };
  const onChangeContactName = (val: string) => {
    dispatch(setContactName(val));
    if (val) {
      dispatch(setContactNameError(''));
    }
    if (URL_REGEX.test(val)) {
    }
  };

  const handleRoleSelection = (item: number) => {
    dispatch(setRole(item));
    setIsRoleOpen(false);
  };

  const handleShowHideRoleOpen = () => {
    setIsRoleOpen(!isRoleOpen);
  };
  return (
    <View style={GLOBALSTYLE.mg_top_s}>
      <View style={GLOBALSTYLE.mg_bottom_xs}>
        <Text style={GLOBALSTYLE.authTitle_medium}>Contact Information</Text>
      </View>

      {/* CONTACT NAME */}
      <Input
        _WIDTH={'100%'}
        _ONCHANGE={onChangeContactName}
        _PLACEHOLDER="Enter contact name"
        _VALUE={contactName}
        _LABEL={
          <>
            Contact Name <Text style={GLOBALSTYLE.required}>*</Text>
          </>
        }
      />

      {contactNameError && (
        <Text style={GLOBALSTYLE.error_text}>{contactNameError}</Text>
      )}
      {/* ROLES IN PRACTICE */}
      <Dropdown
        _DATA={[...dynamicData.practiceRole]}
        _LABLE={
          <>
            Position <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
          </>
        }
        _ITEM_PLACEHOLDER="Select your position"
        _SELECTED_ITEM={selectedRole}
        _IS_DROPDOWN_OPEN={isRoleOpen}
        _HANDLE_ITEM_SELECTION={handleRoleSelection}
        _SHOW_HIDE_DROPDOWN={handleShowHideRoleOpen}
      />
      {/* QUALIFICATION OTHER */}
      {isOtherRoles && (
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangeOtherRoles}
          _PLACEHOLDER="Enter roles"
          _VALUE={otherRoles}
        />
      )}

      {/* EMAIL */}
      <View style={GLOBALSTYLE.mg_top_xs}>
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangeEmail}
          _PLACEHOLDER="Enter your email"
          _VALUE={newChangedEmail ? newChangedEmail : email}
          _EDITABLE={false}
          _IMG={pencil}
          _HANDLE_SECURE={handleEditEmail}
          _LABEL={
            <>
              Email Address <Text style={GLOBALSTYLE.required}>*</Text>
            </>
          }
        />
      </View>

      {/* PHONE */}
      <View style={GLOBALSTYLE.mg_top_xs}>
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangePhone}
          _PLACEHOLDER="Enter phone"
          _KEYBOARDTYPE="number-pad"
          _EDITABLE={false}
          _HANDLE_SECURE={handleEditPhone}
          _VALUE={newChangedPhone ? newChangedPhone : phone}
          _IMG={pencil}
          _LABEL={
            <>
              Mobile Number <Text style={GLOBALSTYLE.required}>*</Text>
            </>
          }
        />
      </View>

      {/* WEB LINK */}
      <View style={GLOBALSTYLE.mg_top_xs}>
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangeWebURL}
          _PLACEHOLDER="Enter website url"
          _VALUE={webLink}
          _LABEL={
            <>
              Website URL{' '}
              <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
            </>
          }
        />
        <Text style={GLOBALSTYLE.error_text}>{webLinkErr}</Text>
      </View>
    </View>
  );
};

export default ContactInfo;
