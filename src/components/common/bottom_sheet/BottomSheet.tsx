import {
  Alert,
  Keyboard,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import styles from './StyleBottomSheet';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  ChooseImagePopup,
  ToastPopup,
  TransparentButton,
} from '../../store/ComponentStore';
import {camera, closeRed, starBlank, starFilled} from '../../store/ImageStore';
import {requestPermissions} from '../../../screens/main/profile/CameraPermission';
import {
  ImagePicker,
  NativeStackNavigationProp,
  RBSheet,
  RNFS,
} from '../../store/ExternalLibrary';
import {
  setChoosePhotoOpen,
  setReviewPhoto,
} from '../../../redux/slices/ProfileSlice';
import {
  useSelector,
  useDispatch,
  useNavigation,
} from '../../store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
import {addingReview} from '../../../api/ApiServices';
import Theme from '../../../theme/Theme';
import {Review, ReviewsIF} from '../../../types/DataTypes';
import {MainStackIF} from '../../../types/MainStackTypes';
import {setIsReviewAdded} from '../../../redux/slices/CommonSlice';
type navigationType = NativeStackNavigationProp<MainStackIF>;

interface paramType {
  name: string;
  profession: string;
  review_count: number;
  rating: number;
  reviews: Review[];
  profile: string;
}

const BottomSheet = ({
  candidateId,
  paramsToPass,
  refRBSheet,
}: {
  candidateId: number;
  paramsToPass: paramType;
  refRBSheet: typeof RBSheet | any;
}) => {
  const [descriptionInput, setDescriptionInput] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isSucess, setIsSucess] = useState(false);
  const {choosePhotoOpen, reviewPhoto} = useSelector(
    (state: RootState) => state.profileSlice,
  );
  const [isError, setIsError] = useState(true);
  const navigation = useNavigation<navigationType>();

  const [isSpinner, setIsSpinner] = useState(false);
  const handleNavigateToReview = () => {
    navigation.navigate('RATING_REVIEWS', {
      name: paramsToPass.name,
      profession: paramsToPass.profession,
      reviewCount: paramsToPass.review_count,
      rating: paramsToPass.rating,
      reviews: paramsToPass.reviews,
      profile: paramsToPass.profile,
    });
  };
  const addReviewParam = {
    rate: rating,
    candidate_id: candidateId,
    comment: descriptionInput,
    image: reviewPhoto,
  };

  const dispatch = useDispatch();
  const handleChangeDescription = (val: string) => {
    setDescriptionInput(val);
    setIsError(false);
    if (!val) {
      setIsError(true);
    }
  };

  const handleImagePicker = () => {
    // dispatch(setChoosePhotoOpen(true));
    handleProfilePicker();
  };

  const handleReviewPress = () => {
    if (!descriptionInput && !rating) {
      setIsError(true);
    } else if (!rating) {
      return false;
    } else {
      addReview();
    }
  };

  // CLOSING THE POPUP
  const handleClose = () => {
    dispatch(setChoosePhotoOpen(false));
  };
  // OPENING THE POPUP
  const handleOpen = () => {
    dispatch(setChoosePhotoOpen(true));
  };

  // CAPTURING THE PROFILE IMAGE
  const handleCaptureImg = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera or Storage permission is required.',
      );
      return;
    }
    try {
      dispatch(setChoosePhotoOpen(false));
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.5,
      }).then(async (image: any) => {
        const base64 = await RNFS.readFile(image?.path, 'base64');
        const ext = image?.path?.split('.').pop();
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        const fullBase64 = `data:${mime};base64,${base64}`;
        dispatch(setReviewPhoto(fullBase64));
      });
    } catch (err) {
      console.log('Error while picking up the picture', err);
    }
  };

  // PICKING UP THE PROFILE IMAGE FROM GALLERY
  const handleProfilePicker = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera or Storage permission is required.',
      );
      return;
    }
    try {
      dispatch(setChoosePhotoOpen(false));
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.5,
      }).then(async (image: any) => {
        const base64 = await RNFS.readFile(image.path, 'base64');
        const ext = image.path.split('.').pop();
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        const fullBase64 = `data:${mime};base64,${base64}`;
        dispatch(setReviewPhoto(fullBase64));
      });
    } catch (err) {
      console.log('Error while picking up the picture', err);
    }
  };

  const handleDeleteImage = () => {
    dispatch(setReviewPhoto(''));
  };

  // STARS FOR RATING SELECTION COMPONENT
  const StarRating = ({
    rating,
    setRating,
  }: {
    rating: number;
    setRating: (value: number) => void;
  }) => {
    return (
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_m, styles.center]}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={0.7}>
            <Image
              source={star <= rating ? starFilled : starBlank}
              style={styles.star_img}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // ADDING REVIEW API
  const addReview = async () => {
    setIsSpinner(true);
    try {
      const res = await addingReview(addReviewParam);
      if (res.success) {
        console.log('res of add review:', res.data);
        setIsSpinner(false);
        setIsSucess(true);
        dispatch(setIsReviewAdded(Date.now()));
        refRBSheet.current?.close();
      } else {
        console.error('Error in add review:', res.err);
        setIsSpinner(false);
      }
    } catch (err: any) {
      console.error('Error in add review else:', err);
      setIsSpinner(false);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.bottom_sheet}>
          <Text
            style={[GLOBALSTYLE.authTitle_medium_2, GLOBALSTYLE.text_center]}>
            Your opinion matters!
          </Text>

          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_m, styles.center]}>
            <StarRating rating={rating} setRating={setRating} />
          </View>
          <View style={styles.width}>
            <Text
              style={[
                GLOBALSTYLE.small_title_bigger,
                GLOBALSTYLE.text_center,
                GLOBALSTYLE.mg_top_xxs,
              ]}>
              Please share your opinion about the product
            </Text>
          </View>

          <View style={[GLOBALSTYLE.mg_top_s]}>
            <TextInput
              value={descriptionInput}
              onChangeText={handleChangeDescription}
              placeholder="Write something here*"
              placeholderTextColor={'grey'}
              multiline
              style={[styles.input_area]}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[reviewPhoto ? styles.photo_box : styles.box]}
            onPress={handleImagePicker}>
            {reviewPhoto && (
              <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={20}
                onPress={handleDeleteImage}>
                <Image source={closeRed} style={styles.close_img} />
              </TouchableOpacity>
            )}
            {!reviewPhoto ? (
              <View style={GLOBALSTYLE.gap_s}>
                <Image source={camera} style={styles.camera_img} />
                <Text style={[GLOBALSTYLE.small_title]}>Add Photo</Text>
              </View>
            ) : (
              <Image source={{uri: reviewPhoto}} style={styles.added_img} />
            )}
          </TouchableOpacity>

          <View style={GLOBALSTYLE.mg_top_s}>
            <TransparentButton
              _HANDLEPRESS={isError ? () => {} : handleReviewPress}
              _TEXT={
                isSpinner ? (
                  <ActivityIndicator
                    color={Theme.COLORS.WHITE}
                    size={'small'}
                  />
                ) : (
                  'Add Review'
                )
              }
              _BTN_STYLE={
                isError ? styles.btn_transparent_fade : styles.btn_transparent
              }
              _TEXT_STYLE={styles.btn_text}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {choosePhotoOpen && (
        <ChooseImagePopup
          _TITLE="Choose Picture"
          _SUBTITLE="Select source"
          _HANDLE_CAMERA={handleCaptureImg}
          _HANDLE_GALLERY={handleProfilePicker}
          _HANDLE_OPEN={handleOpen}
          _HANLDE_CLOSE={handleClose}
        />
      )}

      {isSucess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Review added successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default BottomSheet;
