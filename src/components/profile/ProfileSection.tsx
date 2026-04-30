import {View, Text, Image, ImageProps} from 'react-native';
import React from 'react';
import styles from './StyleProfileSection';
import GLOBALSTYLE from '../../theme/GlobalStyle';
import {rightArrow} from '../store/ImageStore';

const ProfileSection = ({
  _TITLE,
  _IMAGE,
}: {
  _TITLE: string;
  _IMAGE: ImageProps;
}) => {
  return (
    <View style={[GLOBALSTYLE.flex, styles.box]}>
      <View style={GLOBALSTYLE.row}>
        <View style={styles.icon_container}>
          <Image source={_IMAGE} style={styles.icon} />
        </View>
        <Text style={GLOBALSTYLE.subTitle}>{_TITLE}</Text>
      </View>
      <Image source={rightArrow} style={styles.right_arrow} />
    </View>
  );
};

export default ProfileSection;
