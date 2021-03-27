import React, { useCallback, useEffect, useState } from "react";
import {Picker} from '@react-native-community/picker';
import {ItemValue} from '@react-native-community/picker/typings/Picker';

export type PickerItems = {
  label: string;
  value: number;
};

type PickerItemProps = {
  onValueChange: (value: PickerItems) => void;
  pickerItems: PickerItems[];
  defaultValue?: PickerItems;
};

export default function PickerItem({
  onValueChange,
  pickerItems = [],
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
  );
}
