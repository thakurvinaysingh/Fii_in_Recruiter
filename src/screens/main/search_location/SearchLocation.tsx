import {BackHandler, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  setCity,
  setLatitude,
  setLocation,
  setLocationError,
  setLongitude,
} from '../../../redux/slices/ProfileSlice';
import styles from './StyleSearchLocation';
import {
  NativeStackNavigationProp,
  useDispatch,
  useNavigation,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {RootState} from '../../../redux/store/Store';
import Theme from '../../../theme/Theme';
import {GOOGLE_API_KEY} from '../../../constants/Data';


type navigationProp = NativeStackNavigationProp<MainStackIF>;
const SearchLocation = () => {
  const navigation = useNavigation<navigationProp>();
  const dispatch = useDispatch();
  const location = useSelector(
    (state: RootState) => state.profileSlice.practiceInformation.location,
  );

  //  const {latitude, longitude} = useSelector((state:RootState) => state.profileSlice.practiceInformation)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  // EXTRACTING CITY FROM THE SELECTED LOCATION BY USER
  const getCityFromDetails = (details: any): string | null => {
    const components = details?.address_components;
    if (!Array.isArray(components)) return null;

    const cityComponent = components.find(
      (component: any) =>
        Array.isArray(component.types) &&
        (component.types.includes('locality') ||
          component.types.includes('administrative_area_level_2')),
    );

    return cityComponent ? cityComponent.long_name : null;
  };
  return (
    <SafeAreaView style={GLOBALSTYLE.safeContainer}>
      {/* HEADER */}
      <View style={GLOBALSTYLE.container}>
        <GooglePlacesAutocomplete
          placeholder="Find Your Place"
          predefinedPlaces={[]}
          onPress={(data, details: any) => {
            const city = getCityFromDetails(details);
            dispatch(setCity(city));
            dispatch(setLocation(data.description));
            dispatch(setLocationError(''));
            dispatch(setLatitude(details.geometry.location.lat));
            dispatch(setLongitude(details.geometry.location.lng));
            navigation.goBack();
          }}
          keyboardShouldPersistTaps="handled"
          listViewDisplayed="auto"
          enablePoweredByContainer={false}
          debounce={400}
          minLength={2}
          timeout={20000}
          styles={{
            container: {
              flex: 0,
              zIndex: 1,
            },
            textInputContainer: {
              width: '100%',
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: styles.input_style_without_border,
            listView: {
              backgroundColor: Theme.COLORS.WHITE,
              borderRadius: 8,
              marginTop: 4,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              maxHeight: 300,
            },
            row: {
              backgroundColor: Theme.COLORS.WHITE,
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 1,
              backgroundColor: Theme.COLORS.LIGHT_GREY,
            },
            description: {
              fontSize: 16,
              color: Theme.COLORS.BLACK,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          textInputProps={{
            defaultValue: location,
            autoFocus: true,
            placeholderTextColor: Theme.COLORS.GREY,
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
            types: '(cities)',
          }}
          fetchDetails={true}
          onFail={error => console.log('Google Places Error:', error)}
          onNotFound={() => console.log('no results')}
          listEmptyComponent={() => (
            <View style={{padding: 20}}>
              <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
                No results were found
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchLocation;
