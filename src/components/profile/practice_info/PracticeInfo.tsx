import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Dropdown, Input} from '../../store/ComponentStore';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store/Store';
import {
  setDoc,
  setDocName,
  setEstablishedError,
  setEstablishedYear,
  setPinCode,
  setPostCodeError,
  setPracticeName,
  setPracticeNameError,
  setTeamSize,
  setDescriptionInput,
} from '../../../redux/slices/ProfileSlice';
import 'react-native-get-random-values';
import {
  // DocumentPicker,
  // DocumentPickerResponse,
  NativeStackNavigationProp,
  RNFS,
  SegmentedPicker,
  useNavigation,
} from '../../store/ExternalLibrary';
import styles from '../StyleProfileSection';
import {calendarBlue, document, locationBlue} from '../../store/ImageStore';
import {teamSizeData} from '../../../constants/Data';
import {DynamicDataIF} from '../../../types/DropdownTypes';
import {MainStackIF} from '../../../types/MainStackTypes';
type navigationProp = NativeStackNavigationProp<MainStackIF>;
const PracticeInfo = ({dynamicData}: {dynamicData: DynamicDataIF}) => {
  const dispatch = useDispatch();
  const [isOtherService, setIsOtherService] = useState(false);
  const [isTeamSizePopOpen, setIsTeamSizePopOpen] = useState(false);
  const pickerRef = useRef<any>(null);
  const navigation = useNavigation<navigationProp>();

  const currentYear = new Date().getFullYear();

  const years = Array.from({length: 200}, (_, i) => ({
    label: `${currentYear - i}`,
    value: `${currentYear - i}`,
  }));

  const openPicker = () => {
    pickerRef.current?.show();
  };

  const onConfirm = (selections: {[key: string]: string}) => {
    dispatch(setEstablishedYear(selections.year));
    dispatch(setEstablishedError(''));
    pickerRef.current?.hide();
    if (!selections.year) {
      dispatch(setEstablishedYear(''));
    }
  };
  const {
    practiceName,
    selectedTeamSize,
    location,
    pinCode,
    docName,
    establishedYear,
    practiceNameError,
    establishedYearError,
    locationError,
    postcodeError,
    descriptionInput,
  } = useSelector((state: RootState) => state.profileSlice.practiceInformation);
  // SERVICE SELECTION
  const handlLocationSearch = () => {
    navigation.navigate('SEARCH_LOCATION');
  };

  console.log('selectedTeamSize:', selectedTeamSize);

  const handleTeamSizeSelection = (item: number, key: string) => {
    dispatch(setTeamSize(key));
    setIsTeamSizePopOpen(false);
  };

  const handleChangeDescription = (val: string) => {
    dispatch(setDescriptionInput(val));
  };

  const handleShowHideTeamSize = () => {
    setIsTeamSizePopOpen(!isTeamSizePopOpen);
  };

  const onChangePinCode = (val: string) => {
    dispatch(setPinCode(val));
    if (val) {
      dispatch(setPostCodeError(''));
    }
  };

  const onChangePracticeName = (val: string) => {
    dispatch(setPracticeName(val));
    if (val) {
      dispatch(setPracticeNameError(''));
    }
  };

  // PICKING UP THE DOCUMENT
  const handleDocumentPicker = useCallback(async () => {
    // try {
    //   const response: DocumentPickerResponse[] = await DocumentPicker.pick({
    //     type: [
    //       DocumentPicker.types.doc,
    //       DocumentPicker.types.docx,
    //       DocumentPicker.types.pdf,
    //     ],
    //     presentationStyle: 'fullScreen',
    //   });

    //   const doc = response[0];
    //   // setDocName(doc.name);
    //   dispatch(setDocName(doc.name));

    //   let base64Doc: string | null = null;

    //   try {
    //     const destPath = `${RNFS.TemporaryDirectoryPath}/${doc.name}`;

    //     // Always copy first (Android & iOS)
    //     await RNFS.copyFile(doc.uri, destPath);

    //     const fileData = await RNFS.readFile(destPath, 'base64');
    //     base64Doc = `data:${doc.type};base64,${fileData}`;

    //     console.log('Base64Doc snippet:', base64Doc.substring(0, 100));
    //   } catch (error) {
    //     console.error('Error reading base64:', error);
    //   }

    //   if (base64Doc) {
    //     dispatch(setDoc(base64Doc));
    //   }
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log('User canceled document picker');
    //   } else {
    //     console.warn('Error picking document:', err);
    //   }
    // }
  }, []);

  return (
    <>
      <View style={GLOBALSTYLE.mg_top_s}>
        <View style={GLOBALSTYLE.mg_bottom_s}>
          <Text style={GLOBALSTYLE.authTitle_medium}>Practice Information</Text>
          <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.mg_top_xxs]}>
            Complete your practice details
          </Text>
        </View>

        {/* NAME */}
        <Input
          _WIDTH={'100%'}
          _ONCHANGE={onChangePracticeName}
          _PLACEHOLDER="Enter practice name"
          _VALUE={practiceName}
          _LABEL={
            <>
              Practice Name <Text style={GLOBALSTYLE.required}>*</Text>
            </>
          }
        />

        {practiceNameError && (
          <Text style={GLOBALSTYLE.error_text}>{practiceNameError}</Text>
        )}

        {/* ESTABLISHED YEAR */}
        <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_top_xs]}>
          Established Year<Text style={GLOBALSTYLE.required}>*</Text>
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openPicker}
          style={[
            styles.lable_box,
            GLOBALSTYLE.row,
            GLOBALSTYLE.gap_s,
            GLOBALSTYLE.mg_top_xs,
          ]}>
          <Image source={calendarBlue} style={styles.calender_img} />
          <Text
            style={[
              establishedYear
                ? GLOBALSTYLE.small_title
                : GLOBALSTYLE.small_title_grey,
            ]}>
            {establishedYear ? establishedYear : 'Choose Year & Month'}
          </Text>
        </TouchableOpacity>
        {establishedYearError && (
          <Text style={GLOBALSTYLE.error_text}>{establishedYearError}</Text>
        )}

        <SegmentedPicker
          ref={pickerRef}
          onConfirm={onConfirm}
          onCancel={() => pickerRef.current?.hide()}
          confirmText="Done"
          defaultSelections={{year: `${currentYear}`}}
          options={[
            {
              key: 'year',
              items: years,
            },
          ]}
        />

        {/* PRACTICE LOCATION */}
        <Text
          style={[
            GLOBALSTYLE.input_label,
            GLOBALSTYLE.mg_top_xs,
            GLOBALSTYLE.mg_bottom_xs,
          ]}>
          Practice Location<Text style={GLOBALSTYLE.required}>*</Text>
        </Text>

        <TouchableOpacity
          style={GLOBALSTYLE.dropdown_container}
          activeOpacity={0.7}
          onPress={handlLocationSearch}>
          <View style={GLOBALSTYLE.flex}>
            {!location ? (
              <View style={GLOBALSTYLE.row}>
                <Image source={locationBlue} style={styles.input_img} />
                <Text style={GLOBALSTYLE.input_title_grey}>
                  Search Location
                </Text>
              </View>
            ) : (
              <View style={GLOBALSTYLE.row}>
                <Image source={locationBlue} style={styles.input_img} />
                <Text style={GLOBALSTYLE.input_title}>{location}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {locationError && (
          <Text style={GLOBALSTYLE.error_text}>{locationError}</Text>
        )}

        {/* PIN CODE */}
        <View style={GLOBALSTYLE.mg_top_xxs}>
          <Input
            _WIDTH={'100%'}
            _ONCHANGE={onChangePinCode}
            _PLACEHOLDER="Enter zip code*"
            _VALUE={pinCode}
            _MAX_LENGTH={8}
            _KEYBOARDTYPE="number-pad"
          />
        </View>
        {postcodeError && (
          <Text style={GLOBALSTYLE.error_text}>{postcodeError}</Text>
        )}

        {/* TEAM SIZE */}
        <Dropdown
          _DATA={teamSizeData}
          _LABLE={
            <>
              Team Size <Text style={GLOBALSTYLE.italic_font}>(Optional)</Text>
            </>
          }
          _ITEM_PLACEHOLDER="Select your team size"
          _SELECTED_ITEM={selectedTeamSize}
          _IS_DROPDOWN_OPEN={isTeamSizePopOpen}
          _HANDLE_ITEM_SELECTION={handleTeamSizeSelection}
          _SHOW_HIDE_DROPDOWN={handleShowHideTeamSize}
          _ISBORDER={false}
        />

        <View style={GLOBALSTYLE.mg_top_xs}>
          <Text
            style={[
              GLOBALSTYLE.input_label,
              GLOBALSTYLE.mg_top_xs,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            Your Practice Logo (Personal)
          </Text>
          <TouchableOpacity
            onPress={handleDocumentPicker}
            style={styles.dropdown_container}
            activeOpacity={0.7}>
            <View style={styles.text_img_container}>
              <Image
                source={document}
                style={[styles.gallery_icon, {alignSelf: 'center'}]}
              />
              {!docName ? (
                <>
                  <Text
                    style={[
                      GLOBALSTYLE.small_text_grey,
                      GLOBALSTYLE.mg_top_xs,
                    ]}>
                    Select file
                  </Text>
                </>
              ) : (
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'middle'}
                    style={[
                      GLOBALSTYLE.small_text_grey,
                      GLOBALSTYLE.mg_top_xs,
                    ]}>
                    {docName ? docName : 'Choose File'}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={[GLOBALSTYLE.mg_top_s]}>
          <Text
            style={[
              GLOBALSTYLE.input_label,
              GLOBALSTYLE.mg_top_xs,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            Tell Us About Your Clinic (Optional)
          </Text>
          <TextInput
            value={descriptionInput}
            onChangeText={handleChangeDescription}
            placeholder="Write something here"
            placeholderTextColor={'grey'}
            multiline
            style={styles.input_area}
          />
        </View>
      </View>
    </>
  );
};

export default PracticeInfo;
