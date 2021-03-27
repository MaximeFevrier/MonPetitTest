import {useCallback, useState} from 'react';
import {Player} from '../types';

export default function useSearchData(
  data: Player[] = [],
  filteredData: Player[] = [],
  onDataChange: (newData: Player[]) => void,
): [string, (text: string) => void] {
  const [searchValue, setSearchValue] = useState<string>('');
  // const [filteredData, setFilteredData] = useState<Player[]>();

  // useEffect(() => {
  //   if (!_.isEmpty(data)) {
  //     setFilteredData(data);
  //   }
  // }, [data]);

  // const position = filteredData?.filter(i =>
  //   currentPosition?.value
  //     ? i.ultraPosition === currentPosition.value
  //     : filteredData,
  // );

  let onChangeText = useCallback(
    (text: string) => {
      setSearchValue(text);

      if (text === '') {
        onDataChange(filteredData);
      } else {
        const searchData =
          filteredData?.filter(player =>
            player.lastname.toLowerCase().includes(text.toLowerCase()),
          ) ?? [];
        onDataChange(searchData);
      }
    },
    [filteredData, onDataChange],
  );

  return [searchValue, onChangeText];
}
