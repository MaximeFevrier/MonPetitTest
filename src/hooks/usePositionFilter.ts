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

  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentPosition?.value === pickerItems[0].value &&
      data?.length &&
      !isFiltered
    ) {
      setPositionData(data);
    }
  }, [currentPosition, data, isFiltered, pickerItems]);

  useEffect(() => {
    if (currentPosition && data?.length) {
      const filteredData = data?.filter(
        d => d.ultraPosition === currentPosition?.value ?? [],
      );
      if (filteredData?.length) {
        setIsFiltered(true);
        setPositionData(filteredData);
      } else {
        setIsFiltered(false);
      }
    }
  }, [currentPosition, data]);

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
