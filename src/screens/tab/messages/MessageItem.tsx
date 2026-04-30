import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './StyleMessages';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {benifitsChecked, profile} from '../../../components/store/ImageStore';
import {ChatMessage} from '../../../types/DataTypes';

interface MessageItemProps {
  message: ChatMessage;
  isMe: boolean;
  recipient: {
    name: string;
    avatar: any;
    isVerified: boolean;
  };
}

const MessageItem = ({message, isMe, recipient}: MessageItemProps) => {
  return (
    <View
      style={[
        GLOBALSTYLE.mg_top_xs,
        isMe ? styles.myMessageContainer : styles.otherMessageContainer,
      ]}>
      <View style={[GLOBALSTYLE.row, isMe && styles.myMessage]}>
        {!isMe && (
          <Image source={recipient.avatar} style={styles.chat_profile} />
        )}
        <View style={[styles.text_container, isMe && styles.myMessageContent]}>
          <View style={[GLOBALSTYLE.row]}>
            <Text style={GLOBALSTYLE.small_title_bigger}>
              {isMe ? 'You' : recipient.name}
            </Text>
            {!isMe && recipient.isVerified && (
              <Image source={benifitsChecked} style={styles.benifits_img} />
            )}
            <Text style={[GLOBALSTYLE.subTitle_grey, styles.time_text]}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
          <Text
            style={[
              GLOBALSTYLE.subTitle_with_no_linehieght,
              styles.message_desc,
            ]}>
            {message.content}
          </Text>
        </View>
        {isMe && <Image source={profile} style={styles.chat_profile} />}
      </View>
      <View style={[GLOBALSTYLE.hr_line, GLOBALSTYLE.mg_top_xs]} />
    </View>
  );
};

const formatTime = (timestamp: string) => {
  // Implement your time formatting logic
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default MessageItem;
