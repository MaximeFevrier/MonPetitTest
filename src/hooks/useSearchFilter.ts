import {useCallback, useEffect, useState} from 'react';
import {Player} from '../types';

export default function useSearchFilter(
  data: Player[] = [],
): [Player[], string, (text: string) => void] {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState<Player[]>([]);

  let onSearchDataChange = useCallback((newSearchData: Player[]) => {
    setSearchData(newSearchData);
  }, []);

  useEffect(() => {
    if (!searchData?.length && data?.length) {
      onSearchDataChange(data);
    }
  }, [data, onSearchDataChange, searchData]);

  let onChangeText = useCallback(
    (text: string) => {
      setSearchValue(text);
      if (text === '') {
        onSearchDataChange(data);
      } else {
        const filteredData =
          data?.filter(player =>
            player.lastname.toLowerCase().includes(text.toLowerCase()),
          ) ?? data;
        onSearchDataChange(filteredData);
      }
    },
    [data, onSearchDataChange],
  );

  return [searchData, searchValue, onChangeText];
}
