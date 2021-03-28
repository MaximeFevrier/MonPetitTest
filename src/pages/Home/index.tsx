import React from 'react';
import {FlatList, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {Player} from '../../types';
import PlayerListItem from '../../components/PlayerListItem';
import CenteredLoading from '../../components/CenteredLoading';
import styled from 'styled-components/native';
import SearchBar from '../../components/SearchBar';
import ListHeaderComponent from '../../components/ListHeaderComponent';
import PickerItem from '../../components/Picker';
import usePositionFilter from '../../hooks/usePositionFilter';
import usePlayersQuery from '../../hooks/usePlayersQuery';
import useSearchFilter from '../../hooks/useSearchFilter';
import useFilteredData from '../../hooks/useFilteredData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({navigation}: HomeProps): JSX.Element {
  const {isLoading, error, data} = usePlayersQuery();

  const [
    positionData,
    pickerIsVisible,
    setPickerIsVisible,
    currentPosition,
    onPositionChange,
    pickerItems,
  ] = usePositionFilter(data);

  const [searchData, searchValue, onChangeSearchText] = useSearchFilter(data);

  const filteredData = useFilteredData(data, searchData, positionData);

  return isLoading ? (
    <CenteredLoading />
  ) : (
    <MainContainer>
      <SearchBar
        defaultValue={searchValue}
        onChangeText={onChangeSearchText}
        label={'Nom du joueur'}
      />
      <SelectPosition onPress={() => setPickerIsVisible(old => !old)}>
        <Text>{'Postes : ' + currentPosition?.label}</Text>
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
          closePicker={() => setPickerIsVisible(false)}
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
