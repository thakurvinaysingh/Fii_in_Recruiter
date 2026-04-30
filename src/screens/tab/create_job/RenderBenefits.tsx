import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  benifitsChecked,
  close_benefits,
} from '../../../components/store/ImageStore';
import styles from './StyleCreateJob';
// BENEFITS UI
const RenderBenefits = ({
  item,
  // filteredBenifits,
  setFilteredBenifits,
}: {
  item: string;
  // filteredBenifits: ;
  setFilteredBenifits: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  // DELETE BENEFITS
  const handleDeleteBenifits = (id: string) => {
    setFilteredBenifits(prevItem => prevItem.filter(item => item !== id));
  };

  return (
    <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xxs]}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        <Image source={benifitsChecked} style={styles.checked_img} />
        <Text style={[GLOBALSTYLE.subTitle, styles.benefit_text_width]}>
          {item}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteBenifits(item)} hitSlop={10}>
        <Image source={close_benefits} style={styles.small_close} />
      </TouchableOpacity>
    </View>
  );
};
export default RenderBenefits;
