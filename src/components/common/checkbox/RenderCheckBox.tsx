import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {dropdownDataIF} from '../../../types/DropdownTypes';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {rectangleEmpty, rectangleFilled} from '../../store/ImageStore';
import styles from '../../profile/StyleProfileSection';
const RenderCheckbox = ({
  item,
  _HANDLE_SOFTWARE_SELECTION,
  isSelected,
  _TWO_COLUMNS,
}: {
  item: dropdownDataIF;
  _HANDLE_SOFTWARE_SELECTION: (value: number) => void;
  isSelected: boolean;
  _TWO_COLUMNS?: boolean;
}) => {
  // TRUNCATING STRING AND SHOWING ...
  const truncateStr = (str: string, maxLength: number) => {
    return str.length < maxLength ? str : str.slice(0, maxLength) + '...';
  };
  return (
    <View style={[_TWO_COLUMNS ? styles.half_area : styles.full_area]}>
      <TouchableOpacity
        hitSlop={10}
        activeOpacity={0.8}
        style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
        onPress={() => _HANDLE_SOFTWARE_SELECTION(item.value)}>
        <Image
          source={isSelected ? rectangleFilled : rectangleEmpty}
          style={styles.selection_img}
        />
        <Text style={GLOBALSTYLE.small_title}>{truncateStr(item.key, 17)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderCheckbox;
