import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NotificationItem} from '../../../types/DataTypes';
import styles from './StyleRenderNotification';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {profilePlaceholder} from '../../store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {BottomTabParamList} from '../../../types/BottomTabParamList';
import {markingAsReadNotification} from '../../../api/ApiServices';
type typeNavigation = NativeStackNavigationProp<MainStackIF>;
type typeNavigationTab = NativeStackNavigationProp<BottomTabParamList>;
const RenderNotification = ({item}: {item: NotificationItem}) => {
  const [opened, setOpened] = useState(item.read_at);
  const navigation = useNavigation<typeNavigation>();
  const tabNavigation = useNavigation<typeNavigationTab>();
  const fomattedTime = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // TRUNCATING THE STRING WITH "..."
  const truncateString = (char: string, maxLength: number) => {
    return char.length < 0 ? char : char.slice(0, maxLength) + '...';
  };

  const markAsReadNotification = async (id: string) => {
    setOpened('sdf');
    try {
      const res = await markingAsReadNotification(id);
      if (res.success) {
        console.log('Res of mark as read api:', res.data.data);
      } else {
        console.error('Error in mark as read api:', res.err);
      }
    } catch (err: any) {
      console.error('Error in mark as read api:', err);
    }
  };

  // HANDELING THE NAVIGATION OF NOTIFICAITON
  const handleNotificationNavigation = () => {
    markAsReadNotification(item.id);
    if (item.type == 'Rating') {
      navigation.navigate('MY_RATING_REVIEWS');
    } else if (item.type == 'New Profile Match') {
      navigation.navigate('CANDIDATE_PROFILE', {candidateId: item.uniqe_id});
    } else if (item.type == 'apply jobs') {
      navigation.navigate('JOB_DETAILS', {jobId: item.uniqe_id});
    }
  };

  return (
    <>
      <TouchableOpacity
        key={item.id}
        style={[
          !opened ? styles.notification_box : styles.notification_box_white,
          GLOBALSTYLE.gap_s,
        ]}
        activeOpacity={0.7}
        onPress={handleNotificationNavigation}>
        <Image
          source={item.icone ? {uri: item.icone} : profilePlaceholder}
          style={styles.noti_img}
        />
        <View style={{flex: 1}}>
          <View style={GLOBALSTYLE.flex}>
            <Text style={[GLOBALSTYLE.input_label]}>
              {truncateString(item.title, 20)}
            </Text>
            <Text style={[GLOBALSTYLE.small_text_small]}>
              {fomattedTime(item.created_at)}
            </Text>
          </View>
          <Text
            style={[
              GLOBALSTYLE.subTitle_with_no_linehieght,
              styles.text_width,
            ]}>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default RenderNotification;
