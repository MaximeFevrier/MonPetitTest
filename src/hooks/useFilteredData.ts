import {useEffect, useState} from 'react';
import {Player} from '../types';
import _ from 'lodash';

export default function useFilteredData(
  searchData: Player[] = [],
  positionData: Player[] = [],
): Player[] {
  const [filteredData, setFilteredData] = useState<Player[]>([]);

  useEffect(() => {
    if (searchData && positionData) {
      const intersection: Player[] = _.intersection(searchData, positionData);
      setFilteredData(intersection);
    }
  }, [positionData, searchData]);

  return filteredData;
}
