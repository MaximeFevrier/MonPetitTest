import {useQuery} from 'react-query';
import {Player} from '../types';

type GetPlayerProps = {
  queryKey: [string, {playerId: number; season: number}];
};

async function getPlayer(params: GetPlayerProps) {
  const [, {playerId, season}] = params.queryKey;
  const response = await fetch(
    `https://api.monpetitgazon.com/stats/player/${playerId}?season=${season}`,
  );
  if (!response.ok) {
    throw new Error('Problem fetching data');
  }
  return await response.json();
}

export default function usePlayerQuery(playerId: number, season: number) {
  return useQuery<Player, Error>(
    ['player', {playerId: playerId, season: season}],
    getPlayer,
  );
}
