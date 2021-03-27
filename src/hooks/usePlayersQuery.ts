import {useQuery, UseQueryResult} from 'react-query';
import {Player} from '../types';

export default function usePlayersQuery(): UseQueryResult<Player[], Error> {
  return useQuery<Player[], Error>('repoData', () =>
    fetch('https://api.monpetitgazon.com/stats/championship/1/2018').then(res =>
      res.json(),
    ),
  );
}
