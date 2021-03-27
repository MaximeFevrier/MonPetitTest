import React from 'react';
import {useQuery} from 'react-query';
import {Player} from '../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

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

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type Params = {
  playerId: string;
};

type Route = {
  params: Params;
};

type DetailsProps = {
  route: Route;
  navigation: DetailsScreenNavigationProp;
};

export default function Details({
  route,
  navigation,
}: DetailsProps): JSX.Element {
  const {playerId} = route.params;
  const {status, error, data} = useQuery<Player, Error>(
    ['player', {playerId: playerId, season: 2018}],
    getPlayer,
  );

  console.log(')-)-)))-', data);

  return <></>;
}
