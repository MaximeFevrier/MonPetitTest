import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {PickerItems} from '../components/Picker';
import {Player} from '../types';

export default function usePositionFilter(
  data: Player[] = [],
): [
  Player[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  PickerItems | undefined,
  (newPosition: PickerItems) => void,
  PickerItems[],
] {
  const pickerItems: PickerItems[] = useMemo(() => {
    return [
      {label: 'Veuillez sélectionner un poste', value: 0},
      {label: 'Gardien', value: 10},
      {label: 'Defenseur', value: 20},
      {label: 'Lateral', value: 21},
      {label: 'Milieu défensif', value: 31},
      {label: 'Milieu offensif', value: 32},
      {label: 'Attaquant', value: 40},
    ];
  }, []);

  const [currentPosition, setCurrentPosition] = useState<PickerItems>(
    pickerItems[0],
  );
  const [pickerIsVisible, setPickerIsVisible] = useState<boolean>(false);
  const [positionData, setPositionData] = useState<Player[]>([]);

  useEffect(() => {
    if (currentPosition && data?.length) {
      if (currentPosition?.value === pickerItems[0].value) {
        setPositionData(data);
      } else {
        const filteredData = data?.filter(
          d => d.ultraPosition === currentPosition?.value ?? data,
        );
        setPositionData(filteredData);
      }
    }
  }, [currentPosition, data, pickerItems]);

  let onPositionChange = useCallback((newPosition: PickerItems) => {
    setCurrentPosition(newPosition);
    setPickerIsVisible(false);
  }, []);

  return [
    positionData,
    pickerIsVisible,
    setPickerIsVisible,
    currentPosition,
    onPositionChange,
    pickerItems,
  ];
}
