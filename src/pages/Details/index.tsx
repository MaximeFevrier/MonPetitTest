import React from 'react';
import usePlayerQuery from '../../hooks/usePlayerQuery';
import styled from 'styled-components/native';
import CenteredLoading from '../../components/CenteredLoading';
import PickerItem from '../../components/Picker';
import useDatePicker from '../../hooks/useDatePicker';
import {Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import Error from '../../components/Error';

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
  navigation?: DetailsScreenNavigationProp;
};

export default function Details({route}: DetailsProps): JSX.Element {
  const {playerId} = route.params;

  const [
    pickerItems,
    pickerIsVisible,
    setPickerIsVisible,
    onPositionChange,
    currentPosition,
  ] = useDatePicker();

  const {data: player, error, isLoading} = usePlayerQuery(
    playerId,
    currentPosition?.value,
  );

  if (error) {
    return <Error message={error?.message} />;
  }

  return isLoading ? (
    <CenteredLoading />
  ) : (
    <MainContainer>
      <Container>
        <SelectPosition onPress={() => setPickerIsVisible(old => !old)}>
          <Text>
            {'Veuillez sélectionner une saison : ' + currentPosition?.label}
          </Text>
        </SelectPosition>
        <CustomText>{player?.firstname}</CustomText>
        <CustomText>{player?.lastname}</CustomText>
        <CustomText>{player?.club}</CustomText>
        <StatsContainer>
          <CustomText>{'Stats : '}</CustomText>
          <CustomText>
            {'Percentage starter : ' + player?.stats?.percentageStarter + '%'}
          </CustomText>
          <CustomText>{'Sum goals : ' + player?.stats?.sumGoals}</CustomText>
          <CustomText>{'Avg rate : ' + player?.stats?.avgRate}</CustomText>
          <CustomText>
            {'Current championship : ' + player?.stats?.currentChampionship}
          </CustomText>
        </StatsContainer>
      </Container>
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

const MainContainer = styled.View`
  flex: 1;
  padding: 12px 16px;
`;

const Container = styled.View`
  padding: 12px 16px;
  flex: 1;
`;

const StatsContainer = styled.View`
  padding: 24px 0;
`;

const SelectPosition = styled.TouchableOpacity`
  padding: 12px 0;
`;

const CustomText = styled.Text`
  padding: 6px 0;
`;
