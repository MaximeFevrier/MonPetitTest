import React from 'react';
import styled from 'styled-components/native';

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
      <InputText
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
`;

const InputText = styled.TextInput`
  padding: 0 16px;
`;
