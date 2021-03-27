import {Dispatch, SetStateAction, useCallback, useMemo, useState} from 'react';
import {PickerItems} from '../components/Picker';
import {Player} from '../types';

export default function usePositionPicker(
  data: Player[] = [],
  onDataChange: (newData: Player[]) => void,
): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  PickerItems | undefined,
  (newPosition: PickerItems) => void,
  PickerItems[],
] {
  const [currentPosition, setCurrentPosition] = useState<PickerItems>();
  const [pickerIsVisible, setPickerIsVisible] = useState<boolean>(false);

  const position = useMemo(
    () =>
      data?.filter(i =>
        currentPosition?.value
          ? i.ultraPosition === currentPosition?.value
          : data,
      ),
    [currentPosition, data],
  );

  let onPositionChange = useCallback(
    (newPosition: PickerItems) => {
      setCurrentPosition(newPosition);
      setPickerIsVisible(false);
      onDataChange(position);
    },
    [onDataChange, position],
  );

  const pickerItems: PickerItems[] = useMemo(() => {
    return [
      {label: 'Gardien', value: 10},
      {label: 'Defenseur', value: 20},
      {label: 'Lateral', value: 21},
      {label: 'Milieu défensif', value: 31},
      {label: 'Milieu offensif', value: 32},
      {label: 'Attaquant', value: 40},
    ];
  }, []);

  return [
    pickerIsVisible,
    setPickerIsVisible,
    currentPosition,
    onPositionChange,
    pickerItems,
  ];
}
