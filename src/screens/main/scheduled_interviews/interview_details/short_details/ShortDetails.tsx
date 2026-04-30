import {Image, Text, View} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../../../theme/GlobalStyle';
import styles from '../StyleInterviewDetails';
import {ImageProps} from 'react-native';
const ShortDetails = ({
  _LABEL,
  _VALUE,
  _ICON,
  _STATUS,
}: {
  _LABEL: string;
  _VALUE: string;
  _ICON: ImageProps;
  _STATUS?: string;
}) => {
  return (
    <View style={GLOBALSTYLE.flex}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        <View style={styles.img_bg}>
          <Image source={_ICON} style={styles.icon_style} />
        </View>
        <View>
          <Text style={GLOBALSTYLE.small_text}>{_LABEL}</Text>
          <Text
            //  style={
            //     _STATUS === 'Completed'
            //       ? styles.small_text_green
            //       : _STATUS === 'Upcoming'
            //       ? styles.small_text_blue
            //       : _STATUS === 'Today'
            //       ? styles.small_text_yellow
            //       : _STATUS === 'Expired'
            //       ? styles.small_text_red
            //       : styles.small_text_black
            //   }
            style={styles.small_text_black}>
            {_VALUE}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShortDetails;
