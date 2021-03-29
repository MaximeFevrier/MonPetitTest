import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

export default function ListEmptyComponent(): JSX.Element {
  return (
    <Container>
      <Text>{'Aucun élément trouvé'}</Text>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  padding: 12px;
`;
