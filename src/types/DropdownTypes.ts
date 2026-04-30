import React from 'react';
export interface dropdownDataIF {
  key: string;
  value: number;
}

export interface DropdownIF {
  _LABLE: React.ReactNode | string;
  _SHOW_HIDE_DROPDOWN: () => void;
  _SELECTED_ITEM: number | string;
  _IS_DROPDOWN_OPEN: boolean;
  _HANDLE_ITEM_SELECTION: (value: number, key: string) => void;
  _DATA: dropdownDataIF[];
  _ITEM_PLACEHOLDER: string;
  _ISBORDER?: boolean;
}

export interface DynamicDataIF {
  profession: dropdownDataIF[];
  employment_types: dropdownDataIF[];
  require_document: dropdownDataIF[];
  qualification: dropdownDataIF[];
  language: dropdownDataIF[];
  software: dropdownDataIF[];
  vaccination: dropdownDataIF[];
  locationRange: dropdownDataIF[];
  environment: dropdownDataIF[];
  practiceRole: dropdownDataIF[];
}

export interface CheckBox {
  _TITLE: string | React.ReactNode;
  _DATA: dropdownDataIF[];
  _HANDLE_SELECTION: (value: number) => void;
  _SELECTED_ITEM: number[];
  _TWO_COLUMNS: boolean;
}

export interface RadioIF {
  _DATA: dropdownDataIF[];
  _TITLE: React.ReactNode;
  _HANDLE_SELECTION: (key: string) => void;
  _SELECTED_ITEM: string;
}
