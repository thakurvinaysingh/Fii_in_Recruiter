import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {EmployementTypeIF} from '../../../types/DataTypes';
import {LinearGradient} from '../../../components/store/ExternalLibrary';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import styles from './StyleCreateJob';
interface empIF {
  key: string;
  value: number;
}
interface Props {
  item: EmployementTypeIF;
  selectedSoftware: number[];
  onSelect: (key: string) => void;
}

const RenderSoftware: React.FC<Props> = ({
  item,
  selectedSoftware,
  onSelect,
}) => {
  const isSelected = selectedSoftware.some(value => value === item.value);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item.key)}
      style={styles.gradient_con}>
      {isSelected ? (
        <LinearGradient
          colors={['#0052DB', '#81efe3']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <View style={styles.btn_container}>
            <Text style={GLOBALSTYLE.subTitle_white}>{item.key}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.non_gradient}>
          <View style={styles.btn_container}>
            <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
              {item.key}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderSoftware;
