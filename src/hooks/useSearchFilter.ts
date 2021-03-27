import {useCallback, useEffect, useState} from 'react';
import {Player} from '../types';
import _ from 'lodash';

export default function useSearchFilter(
  data: Player[] | undefined = [],
): [string, (text: string) => void, Player[] | undefined] {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Player[]>();

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setFilteredData(data);
    }
  }, [data]);

  let onChangeText = useCallback(
    (text: string) => {
      setSearchValue(text);
      if (text === '') {
        setFilteredData(data);
      } else {
        const filterData =
          data?.filter(player =>
            player.lastname.toLowerCase().includes(text.toLowerCase()),
          ) ?? [];
        setFilteredData(filterData);
      }
    },
    [data],
  );

  return [searchValue, onChangeText, filteredData];
}
