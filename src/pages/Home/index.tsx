import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {Player} from '../../types';
import PlayerListItem from '../../components/PlayerListItem';
import CenteredLoading from '../../components/CenteredLoading';
import styled from 'styled-components/native';
import SearchBar from '../../components/SearchBar';
import useFilteredData from '../../hooks/useFilteredData';
import ListHeaderComponent from '../../components/ListHeaderComponent';
import PickerItem from '../../components/Picker';
import usePositionPicker from '../../hooks/usePositionPicker';
import usePlayersQuery from '../../hooks/usePlayersQuery';
import useSearchData from '../../hooks/useSearchData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({navigation}: HomeProps): JSX.Element {
  const {isLoading, error, data} = usePlayersQuery();
  const [filteredData, setFilteredData] = useState<Player[]>();

  let onDataChange = useCallback((newData: Player[]) => {
    setFilteredData(newData);
  }, []);

  useEffect(() => {
    if (data?.length) {
      setFilteredData(data);
    }
  }, [data]);

  const [
    pickerIsVisible,
    setPickerIsVisible,
    currentPosition,
    onPositionChange,
    pickerItems,
  ] = usePositionPicker(data, onDataChange);

  const [searchValue, onChangeText] = useSearchData(data, filteredData, onDataChange);

  return isLoading ? (
    <CenteredLoading />
  ) : (
    <MainContainer>
      <SearchBar
        defaultValue={searchValue}
        onChangeText={onChangeText}
        label={'Nom du joueur'}
      />
      <SelectPosition onPress={() => setPickerIsVisible(old => !old)}>
        <Text>
          {'Postes : ' +
            (currentPosition?.label ?? 'Veuillez sélectionner un poste')}
        </Text>
      </SelectPosition>
      <FlatList<Player>
        data={filteredData ?? []}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item, index}) => (
          <PlayerListItem key={index} player={item} navigation={navigation} />
        )}
      />
      {pickerIsVisible ? (
        <PickerItem
          defaultValue={currentPosition}
          onValueChange={onPositionChange}
          pickerItems={pickerItems}
        />
      ) : null}
    </MainContainer>
  );
}

const SelectPosition = styled.TouchableOpacity`
  padding: 12px 16px;
`;

const MainContainer = styled.View`
  flex: 1;
`;
