import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {drownDown} from '../../store/ImageStore';
import {DropdownIF} from '../../../types/DropdownTypes';
import styles from './StyleDropdown';

const Dropdown = ({
  _LABLE,
  _SHOW_HIDE_DROPDOWN,
  _SELECTED_ITEM,
  _IS_DROPDOWN_OPEN,
  _HANDLE_ITEM_SELECTION,
  _DATA,
  _ITEM_PLACEHOLDER,
  _ISBORDER,
}: DropdownIF) => {
  const selectedItem =
    _DATA.find(item => item.value === _SELECTED_ITEM) ||
    _DATA.find(item => item.key === _SELECTED_ITEM);

  return (
    <View style={GLOBALSTYLE.mg_top_s}>
      <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
        {_LABLE}
      </Text>
      <TouchableOpacity
        onPress={_SHOW_HIDE_DROPDOWN}
        style={[
          !_ISBORDER
            ? GLOBALSTYLE.dropdown_container
            : GLOBALSTYLE.dropdown_container_border,
        ]}
        activeOpacity={0.7}>
        <View style={GLOBALSTYLE.flex}>
          {!selectedItem ? (
            <Text style={GLOBALSTYLE.input_title_grey}>
              {_ITEM_PLACEHOLDER}
            </Text>
          ) : (
            <Text style={[GLOBALSTYLE.input_title]}>{selectedItem.key}</Text>
          )}
          <Image
            source={drownDown}
            style={[
              _IS_DROPDOWN_OPEN ? styles.dropdown_img_180 : styles.dropdown_img,
            ]}
          />
        </View>
      </TouchableOpacity>

      {_IS_DROPDOWN_OPEN ? (
        <View
          style={[
            _ISBORDER ? styles.dropdown_box_border : styles.dropdown_box,
          ]}>
          <FlatList
            data={_DATA}
            keyExtractor={item => item.key.toString()}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.border_bottom}
                onPress={() => _HANDLE_ITEM_SELECTION(item.value, item.key)}>
                <Text
                  style={[
                    item.value === _SELECTED_ITEM
                      ? GLOBALSTYLE.subTitle_bold
                      : GLOBALSTYLE.subTitle,
                  ]}>
                  {item.key}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Dropdown;
