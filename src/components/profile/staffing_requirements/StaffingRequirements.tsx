import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  Checkbox,
  Input,
  Radio,
  RenderCheckbox,
} from '../../store/ComponentStore';
import {lookingForData, workingHours} from '../../../constants/Data';
import {useSelector, useDispatch, RH} from '../../store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
import {
  setLookingFor,
  setSoftwarePractice,
  setSoftwarePracticeOther,
  setStaff,
  setStaffOther,
  setWorkingHours,
  setWorkingHoursError,
} from '../../../redux/slices/ProfileSlice';
import {DynamicDataIF} from '../../../types/DropdownTypes';
const StaffingRequirements = ({dynamicData}: {dynamicData: DynamicDataIF}) => {
  const [isOtherStaff, setIsOtherStaff] = useState(false);
  const [isOtherSoftware, setIsOtherSoftware] = useState(false);
  const dispatch = useDispatch();
  const {
    selectedStaff,
    staffOther,
    selectedLookingFor,
    selectedWorkingHours,
    selectedSoftwarePractice,
    softwarePracticeOther,
  } = useSelector(
    (state: RootState) => state.profileSlice.staffingRequirements,
  );

  useEffect(() => {
    dispatch(setWorkingHoursError(''));
  }, []);

  const workingError = useSelector(
    (state: RootState) =>
      state.profileSlice.practiceInformation.wrokingHoursError,
  );

  const handleLookingForSelection = (item: string) => {
    dispatch(setLookingFor(item));
  };
  const onChangeOtherStaff = (val: string) => {
    dispatch(setStaffOther(val));
  };

  const onChangeOtherSoftware = (val: string) => {
    dispatch(setSoftwarePracticeOther(val));
  };
  const handleStaffSelection = (value: number) => {
    let updatedValues: number[];

    if (!selectedStaff.includes(value)) {
      updatedValues = [...selectedStaff, value];
    } else {
      updatedValues = selectedStaff.filter(item => item !== value);
    }

    // Store directly
    dispatch(setStaff(updatedValues));
    // "Other" logic
    if (updatedValues.includes(-1)) {
      setIsOtherStaff(true);
    } else {
      setIsOtherStaff(false);
      dispatch(setStaffOther(''));
    }
  };

  const handleSoftwareSelection = (value: number) => {
    let updatedValues: number[];

    if (!selectedSoftwarePractice.includes(value)) {
      updatedValues = [...selectedSoftwarePractice, value];
    } else {
      updatedValues = selectedSoftwarePractice.filter(item => item !== value);
    }

    // Store directly
    dispatch(setSoftwarePractice(updatedValues));

    // "Other" logic
    if (updatedValues.includes(-1)) {
      setIsOtherSoftware(true);
    } else {
      setIsOtherSoftware(false);
      dispatch(setSoftwarePracticeOther(''));
    }
  };
  const handleWorkingHoursSelection = (key: string) => {
    let updatedValues: string[];
    dispatch(setWorkingHoursError(''));
    if (!selectedWorkingHours.includes(key)) {
      updatedValues = [...selectedWorkingHours, key];
    } else {
      updatedValues = selectedWorkingHours.filter(item => item !== key);
    }

    // Store directly
    dispatch(setWorkingHours(updatedValues));
  };

  return (
    <View style={GLOBALSTYLE.mg_top_s}>
      <View style={GLOBALSTYLE.mg_bottom_xs}>
        <Text style={GLOBALSTYLE.authTitle_medium}>Staffing Requirements</Text>
        <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.mg_top_xxs]}>
          Staffing Needs & Preference
        </Text>
      </View>

      {/* STAFF YOU LOOKING FOR YOU */}
      <Checkbox
        _DATA={[...dynamicData.profession, {key: 'Other', value: -1}]}
        _HANDLE_SELECTION={handleStaffSelection}
        _SELECTED_ITEM={selectedStaff}
        _TITLE={
          <>
            What types of staff are you looking for:
            <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
          </>
        }
        _TWO_COLUMNS={true}
      />
      {/* QUALIFICATION OTHER */}
      {isOtherStaff && (
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangeOtherStaff}
          _PLACEHOLDER="Other staff"
          _VALUE={staffOther}
        />
      )}

      {/* PRIMARY LOOKING FOR */}
      <View style={GLOBALSTYLE.mg_top_s}>
        <Radio
          _DATA={lookingForData}
          _HANDLE_SELECTION={handleLookingForSelection}
          _SELECTED_ITEM={selectedLookingFor}
          _TITLE={
            <>
              Are you primarly looking for:{' '}
              <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
            </>
          }
          // _TITLE={'Are you primarly looking for:'}
        />
      </View>
      {/* WORKING HOURS */}
      <View style={GLOBALSTYLE.mg_top_s}>
        <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
          Typical working hours <Text style={GLOBALSTYLE.required}>*</Text>
        </Text>
        <FlatList
          data={workingHours}
          numColumns={2}
          columnWrapperStyle={{marginBottom: RH(1.3)}}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => (
            <RenderCheckbox
              item={item}
              _HANDLE_SOFTWARE_SELECTION={() =>
                handleWorkingHoursSelection(item.key)
              }
              isSelected={selectedWorkingHours?.includes(item.key)}
              _TWO_COLUMNS={true}
            />
          )}
        />
        {workingHours && (
          <Text style={GLOBALSTYLE.error_text}>{workingError}</Text>
        )}
      </View>

      {/* STAFF YOU LOOKING FOR YOU */}
      <View style={GLOBALSTYLE.mg_top_xs}>
        <Checkbox
          _DATA={[...dynamicData.software, {key: 'Other', value: -1}]}
          _HANDLE_SELECTION={handleSoftwareSelection}
          _SELECTED_ITEM={selectedSoftwarePractice}
          _TITLE={
            <>
              What Software does your practice use?
              <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
            </>
          }
          _TWO_COLUMNS={true}
        />
        {/* QUALIFICATION OTHER */}
        {isOtherSoftware && (
          <Input
            _WIDTH={'100%'}
            _ONCHANGE={onChangeOtherSoftware}
            _PLACEHOLDER="Other software"
            _VALUE={softwarePracticeOther}
          />
        )}
      </View>
    </View>
  );
};

export default StaffingRequirements;
