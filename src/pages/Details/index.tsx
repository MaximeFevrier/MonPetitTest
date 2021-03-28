import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import usePlayerQuery from '../../hooks/usePlayerQuery';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type Params = {
  playerId: number;
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

  const {data, error, isLoading} = usePlayerQuery(playerId, 2018);

  console.log(')-)-)))-', data);

  return <></>;
}
