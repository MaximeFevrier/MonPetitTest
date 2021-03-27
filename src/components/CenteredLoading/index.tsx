import styled from 'styled-components/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function CenteredLoading() {
  return (
    <LoadingContainer
      style={{transform: [{translateX: -25}, {translateY: -25}]}}>
      <ActivityIndicator size={'large'} color={'#999999'} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
`;
