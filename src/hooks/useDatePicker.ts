import {Dispatch, SetStateAction, useCallback, useMemo, useState} from 'react';
import {PickerItems} from '../components/Picker';

export default function useDatePicker(): [
  PickerItems[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (newPosition: PickerItems) => void,
  PickerItems,
] {
  const pickerItems: PickerItems[] = useMemo(() => {
    return [
      {label: '2017/2018', value: 2017},
      {label: '2018/2019', value: 2018},
      {label: '2019/2020', value: 2019},
      {label: '2020/2021', value: 2020},
    ];
  }, []);

  const [currentPosition, setCurrentPosition] = useState<PickerItems>(
    pickerItems[0],
  );
  const [pickerIsVisible, setPickerIsVisible] = useState<boolean>(false);

  let onPositionChange = useCallback((newPosition: PickerItems) => {
    setCurrentPosition(newPosition);
    setPickerIsVisible(false);
  }, []);

  return [
    pickerItems,
    pickerIsVisible,
    setPickerIsVisible,
    onPositionChange,
    currentPosition,
  ];
}
