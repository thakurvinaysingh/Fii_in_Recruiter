import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {ellipsEmpty, ellipsFilled} from '../../../store/ImageStore';
import styles from './StyleRadio';
import {RadioIF} from '../../../../types/DropdownTypes';

const Radio = ({_DATA, _TITLE, _HANDLE_SELECTION, _SELECTED_ITEM}: RadioIF) => {
  return (
    <>
      <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
        {_TITLE}
      </Text>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s, {flexWrap: 'wrap'}]}>
        {_DATA.map(item => (
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.8}
            onPress={() => _HANDLE_SELECTION(item.key)}
            style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
            <Image
              source={item.key === _SELECTED_ITEM ? ellipsFilled : ellipsEmpty}
              style={styles.selection_img}
            />
            <Text style={GLOBALSTYLE.small_title}>{item.key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Radio;
