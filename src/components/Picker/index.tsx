import React, {useCallback, useEffect, useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {ItemValue} from '@react-native-community/picker/typings/Picker';
import styled from 'styled-components/native';

export type PickerItems = {
  label: string;
  value: number;
};

type PickerItemProps = {
  onValueChange: (value: PickerItems) => void;
  pickerItems: PickerItems[];
  closePicker: () => void;
  defaultValue?: PickerItems;
};

export default function PickerItem({
  onValueChange,
  pickerItems = [],
  closePicker,
  defaultValue,
}: PickerItemProps): JSX.Element {
  const [currentValue, setCurrentValue] = useState<ItemValue>(
    pickerItems[0].value,
  );

  useEffect(() => {
    if (defaultValue) {
      setCurrentValue(defaultValue.value);
    }
  }, [defaultValue]);

  let onDataChange = useCallback(
    (value: ItemValue) => {
      setCurrentValue(value);
      const find = pickerItems.find(i => i.value === value);
      find && onValueChange(find);
    },
    [onValueChange, pickerItems],
  );

  return (
    <React.Fragment>
      <CloseContainer onPress={closePicker}>
        <CustomText>{'Fermer'}</CustomText>
      </CloseContainer>
      <Picker
        mode={'dialog'}
        selectedValue={currentValue}
        enabled={true}
        onValueChange={onDataChange}>
        {pickerItems.map((item, index) => {
          return (
            <Picker.Item key={index} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    </React.Fragment>
  );
}

const CloseContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
  border-top-width: 1px;
  border-top-color: lightgrey;
  border-style: solid;
`;

const CustomText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #0e7afe;
`;
