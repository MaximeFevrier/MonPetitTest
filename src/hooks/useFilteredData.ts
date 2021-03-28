import {useEffect, useState} from 'react';
import {Player} from '../types';
import _ from 'lodash';

export default function useFilteredData(
  data: Player[] = [],
  searchData: Player[] = [],
  positionData: Player[] = [],
): Player[] {
  const [filteredData, setFilteredData] = useState<Player[]>([]);

  useEffect(() => {
    if (!filteredData?.length && data?.length) {
      setFilteredData(data);
    }
  }, [data, filteredData]);

  useEffect(() => {
    if (searchData?.length && positionData?.length) {
      const intersection: Player[] = _.intersection(searchData, positionData);
      setFilteredData(intersection);
    }
  }, [positionData, searchData]);

  return filteredData;
}
