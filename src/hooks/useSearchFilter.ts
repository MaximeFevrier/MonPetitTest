import {useCallback, useEffect, useState} from 'react';
import {Player} from '../types';

export default function useSearchFilter(
  data: Player[] = [],
): [Player[], string, (text: string) => void] {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState<Player[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  let onSearchDataChange = useCallback((newSearchData: Player[]) => {
    setSearchData(newSearchData);
  }, []);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!searchData?.length && data?.length && !isSearched) {
      onSearchDataChange(data);
    }
  }, [data, isSearched, onSearchDataChange, searchData]);

  let onChangeText = useCallback(
    (text: string) => {
      setSearchValue(text);
      if (text?.length <= 0) {
        onSearchDataChange(data);
      } else {
        const filteredData =
          data?.filter(player =>
            player.lastname.toLowerCase().includes(text.toLowerCase()),
          ) ?? [];
        onSearchDataChange(filteredData);
      }
    },
    [data, onSearchDataChange],
  );

  return [searchData, searchValue, onChangeText];
}
