import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../StyleMessages';
import {ChatsIF} from '../../../../types/DataTypes';
import {profile} from '../../../../components/store/ImageStore';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../../types/MainStackTypes';
type navigationType = NativeStackNavigationProp<MainStackIF>;
const RenderChats = ({item}: {item: ChatsIF}) => {
  const navigation = useNavigation<navigationType>();
  const truncateText = (string: string, maxLength: number) => {
    return string.length <= maxLength
      ? string
      : string.slice(0, maxLength) + '...';
  };

  // NAVIGATING TO CHAT HISTORY
  const handleChatHistory = () => {
    navigation.navigate('SINGLE_MESSAGE', {
      candidateId: item.candidate_id,
      candidateName: item.candidate,
      candidateProfile: item.profile,
    });
  };

  return (
    <TouchableOpacity
      style={styles.single_chat_container}
      activeOpacity={0.7}
      onPress={handleChatHistory}>
      <View style={[GLOBALSTYLE.only_row, GLOBALSTYLE.gap_s]}>
        <Image
          source={item.profile ? {uri: item.profile} : profile}
          style={styles.chat_img}
        />
        <View>
          <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.gap_s, {width: '100%'}]}>
            <Text style={[GLOBALSTYLE.input_label, {width: '58%'}]}>
              {truncateText(item.candidate, 22)}
            </Text>
            <View style={{width: '42%'}}>
              <Text
                style={[
                  item.unseen_count >= 1
                    ? GLOBALSTYLE.small_text_small_active
                    : GLOBALSTYLE.small_text_small,
                ]}>
                {item.time}
              </Text>
              {item.unseen_count >= 1 && (
                <View style={styles.unread_count_box}>
                  <Text style={styles.count_text}>{item.unseen_count}</Text>
                </View>
              )}
            </View>
          </View>
          <Text
            style={[
              item.msgStatus === 'recieve' && item.status == 'unseen'
                ? GLOBALSTYLE.subTitle_bold
                : GLOBALSTYLE.small_text,
            ]}>
            {truncateText(item.message, 40)}
          </Text>
        </View>
      </View>
      <View
        style={[
          GLOBALSTYLE.hr_line,
          GLOBALSTYLE.mg_top_xxs,
          GLOBALSTYLE.mg_bottom_xxs,
        ]}></View>
    </TouchableOpacity>
  );
};

export default RenderChats;
