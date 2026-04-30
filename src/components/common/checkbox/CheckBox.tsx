import {FlatList, Text} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import RenderCheckbox from './RenderCheckBox';
import {RH} from '../../store/ExternalLibrary';
import {CheckBox} from '../../../types/DropdownTypes';

const Checkbox = ({
  _TITLE,
  _DATA,
  _HANDLE_SELECTION,
  _SELECTED_ITEM,
  _TWO_COLUMNS,
}: CheckBox) => {
  return (
    <>
      <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
        {_TITLE}
      </Text>
      <FlatList
        data={_DATA}
        removeClippedSubviews={true}
        numColumns={_TWO_COLUMNS ? 2 : 1}
        columnWrapperStyle={_TWO_COLUMNS ? {marginBottom: RH(1.3)} : undefined}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => (
          <RenderCheckbox
            item={item}
            _HANDLE_SOFTWARE_SELECTION={() => _HANDLE_SELECTION(item.value)}
            isSelected={_SELECTED_ITEM?.includes(item.value)}
            _TWO_COLUMNS={_TWO_COLUMNS}
          />
        )}
      />
    </>
  );
};

export default Checkbox;
