import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './StyleReportPopup';
import {Input, Button} from '../../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import Theme from '../../../../theme/Theme';
import {reportingJob} from '../../../../api/ApiServices';
import {AddReportIF} from '../../../../types/DataTypes';
import {closePopup} from '../../../../components/store/ImageStore';
import {useDispatch} from '../../../../components/store/ExternalLibrary';
import {
  setIsReportJobOpen,
  setIsReportSuccess,
} from '../../../../redux/slices/CommonSlice';
const ReportPopup = ({candidateId}: {candidateId: number | undefined}) => {
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);
  const dispatch = useDispatch();
  const onChangeTitle = (val: string) => {
    const filteredName = val.replace(/[^a-zA-Z\s]/g, '');
    setTitleInput(filteredName);
    if (val === ' ') {
      setTitleInput('');
    } else if (val.length > 0 && val.length < 3) {
      setErr(prevState => ({
        ...prevState,
        titleErr: 'Must atleast 3 characters long',
      }));
    } else if (val.length > 0 && val.length > 30) {
      setErr(prevState => ({
        ...prevState,
        titleErr: 'Should no longer than 30 character',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        titleErr: '',
      }));
    }
  };
  const onChangeDescInput = (val: string) => {
    setDescInput(val);
    if (val) {
      setErr(prevState => ({
        ...prevState,
        descErr: '',
      }));
    }
  };
  const [err, setErr] = useState({titleErr: '', descErr: ''});

  const reportParams = {
    title: titleInput,
    candidate_id: candidateId,
    description: descInput,
  };

  const reportJob = async (reportParams: AddReportIF) => {
    setIsSpinner(true);
    try {
      const res = await reportingJob(reportParams);
      if (res.success) {
        console.log('res of report job:', res.data);
        dispatch(setIsReportJobOpen(false));
        dispatch(setIsReportSuccess(true));
        setIsSpinner(false);
      } else {
        console.error('Error in report job:', res.err);
        // setIsReportError(false)
        setIsSpinner(false);
      }
    } catch (err: any) {
      console.error('Error in report job:', err);
      setIsSpinner(false);
    }
  };
  const handleReport = () => {
    if (!titleInput) {
      setErr(prevState => ({
        ...prevState,
        titleErr: 'Please enter title*',
      }));
    } else if (!descInput) {
      setErr(prevState => ({
        ...prevState,
        descErr: 'Please enter description*',
      }));
      console.log('else if');
    } else {
      reportJob(reportParams);
    }
  };

  const handleClosePopup = () => {
    dispatch(setIsReportJobOpen(false));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.pop_bg}>
        <View style={styles.pop_box}>
          <Text
            style={[
              GLOBALSTYLE.authTitle_medium_2,
              GLOBALSTYLE.text_center,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            Report
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClosePopup}
            style={styles.close_img_con}>
            <Image source={closePopup} style={styles.close_img} />
          </TouchableOpacity>
          <Input
            _WIDTH={'100%'}
            _ONCHANGE={onChangeTitle}
            _PLACEHOLDER="Enter Title"
            _VALUE={titleInput}
            _LABEL={
              <>
                Title <Text style={GLOBALSTYLE.required}>*</Text>
              </>
            }
          />
          {err.titleErr && (
            <Text style={GLOBALSTYLE.error_text}>{err.titleErr}</Text>
          )}

          <View style={GLOBALSTYLE.mg_top_xs}>
            <Text style={GLOBALSTYLE.input_label_small}>
              Description <Text style={GLOBALSTYLE.required}>*</Text>
            </Text>
            <TextInput
              value={descInput}
              onChangeText={onChangeDescInput}
              style={styles.text_area}
              multiline={true}
              placeholder="Tell us what's wrong"
              placeholderTextColor={Theme.COLORS.GREY}
            />
            {err.descErr && (
              <Text style={GLOBALSTYLE.error_text}>{err.descErr}</Text>
            )}
          </View>

          <View style={GLOBALSTYLE.mg_top_xs}>
            <Button
              _TEXT={
                isSpinner ? (
                  <ActivityIndicator
                    color={Theme.COLORS.DARK_BLUE}
                    size={'small'}
                  />
                ) : (
                  'Submit'
                )
              }
              _ONPRESS={handleReport}
              _BTNSTYLE={styles.btn_container}
              _TEXT_STYLE={styles.button}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReportPopup;
