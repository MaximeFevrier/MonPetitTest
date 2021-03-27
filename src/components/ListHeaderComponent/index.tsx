import React from 'react';
import styled from 'styled-components/native';

export default function ListHeaderComponent(): JSX.Element {
  return (
    <Container>
      <CustomText>{'Joueur'}</CustomText>
      <CustomText>{'Poste'}</CustomText>
    </Container>
  );
}

const Container = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CustomText = styled.Text`
  font-size: 14px;
  color: grey;
  font-weight: 500;
`;
