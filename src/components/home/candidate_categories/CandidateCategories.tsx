import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {CategoryIF} from '../../../types/DataTypes';
import styles from './StyleCandidateCategories';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../store/ExternalLibrary';
import {SharedStackIF} from '../../../SharedStackTypes';
type navigationType = NativeStackNavigationProp<SharedStackIF>;
const CandidateCategories = ({item}: {item: CategoryIF}) => {
  const navigation = useNavigation<navigationType>();
  const handleCandidateCategories = () => {
    navigation.navigate('CANDIDATE_BY_CATEGORIES', {categoryId: [item.id]});
  };

  return (
    <Pressable style={[styles.box]} onPress={handleCandidateCategories}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        <Image source={{uri: item.icon}} style={styles.img} />
        <View style={styles.text_container}>
          <Text style={GLOBALSTYLE.small_title}>{item.name}</Text>
          <Text style={[GLOBALSTYLE.subTitleActive_small]}>
            {item.candidate_count}{' '}
            {item.candidate_count <= 1 ? 'Profile' : 'Profiles'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CandidateCategories;
