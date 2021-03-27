import React, {useCallback, useState} from 'react';
import {Button, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {Player} from '../../types';
import PlayerListItem from '../../components/PlayerListItem';
import CenteredLoading from '../../components/CenteredLoading';
import styled from 'styled-components/native';
import SearchBar from '../../components/SearchBar';
import _ from 'lodash';
import { isArray } from "util";
import useSearchFilter from "../../hooks/useSearchFilter";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({navigation}: HomeProps): JSX.Element {
  const {isLoading, error, data, isFetching} = useQuery<Player[], Error>(
    'repoData',
    () =>
      fetch(
        'https://api.monpetitgazon.com/stats/championship/1/2018',
      ).then(res => res.json()),
  );

  const [searchValue, onChangeText, filteredData] = useSearchFilter(data);

  return isLoading ? (
    <CenteredLoading />
  ) : (
    <MainContainer>
      <SearchBar
        defaultValue={searchValue}
        onChangeText={onChangeText}
        label={'Nom du joueur'}
      />
      <FlatList<Player>
        data={filteredData ?? []}
        renderItem={({item, index}) => (
          <PlayerListItem key={index} player={item} navigation={navigation} />
        )}
      />
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
`;
