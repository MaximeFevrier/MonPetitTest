import React, { useMemo } from "react";
import {Player} from '../../types';
import styled from 'styled-components/native';

type PlayerListItemProps = {
  player: Player;
  navigation: any;
};

export default function PlayerListItem({
  player,
  navigation,
}: PlayerListItemProps): JSX.Element {
  const playerId: number = useMemo(() => {
    const id: string = player?.id.replace(/\D/g, '');
    return +id;
  }, [player]);

  return (
    <ListItemContainer
      onPress={() => navigation.navigate('Details', {playerId: playerId})}>
      <CustomText>{player.lastname}</CustomText>
      <CustomText>{player.firstname}</CustomText>
      <CustomText>{player.firstname}</CustomText>
    </ListItemContainer>
  );
}

const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
`;

const CustomText = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;
