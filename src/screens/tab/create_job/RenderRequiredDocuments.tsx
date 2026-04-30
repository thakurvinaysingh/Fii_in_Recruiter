import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {checked, unchecked, work} from '../../../components/store/ImageStore';
import styles from './StyleCreateJob';

interface selectedDocIF {
  key: string;
  value: string;
}
// DOCUMENTS UI
const RenderRequiredDocs = ({
  item,
  selectedDocs,
  onSelect,
}: {
  item: selectedDocIF;
  selectedDocs: selectedDocIF[];
  onSelect: (key: string, value: string) => void;
}) => {
  const isSelected = selectedDocs.some(doc => doc.key === item.key);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xs]}
      onPress={() => onSelect(item.key, item.value)}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        <View style={styles.image_container}>
          <Image source={work} style={styles.doc_icon} />
        </View>
        <Text style={GLOBALSTYLE.subTitle}>{item.key}</Text>
      </View>
      <Image
        source={isSelected ? checked : unchecked}
        style={styles.check_box_img}
      />
    </TouchableOpacity>
  );
};

export default RenderRequiredDocs;
