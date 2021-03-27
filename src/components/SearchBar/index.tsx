import React from 'react';
import styled from 'styled-components/native';
import {TextInput} from 'react-native';

export interface SearchBarProps {
  defaultValue: string;
  onChangeText: (searchValue: string) => void;
  label: string;
}

export default function SearchBar({
  defaultValue,
  onChangeText,
  label,
}: SearchBarProps): JSX.Element {
  return (
    <Container>
      <TextInput
        placeholder={label}
        placeholderTextColor={'rgba(0, 0, 0, 0.3)'}
        autoCorrect={false}
        onChangeText={onChangeText}
        value={defaultValue}
        returnKeyType={'default'}
      />
    </Container>
  );
}

const Container = styled.View`
  height: 50px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
