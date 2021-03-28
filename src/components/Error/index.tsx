import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {Text, TextStyle} from 'react-native';

type ErrorProps = {
  message?: string;
};

export default function Error({message}: ErrorProps): JSX.Element {
  const textStyle: TextStyle = useMemo(() => {
    return {color: 'red', fontSize: 24, fontWeight: '500', textAlign: 'center'};
  }, []);

  return (
    <ErrorContainer>
      <Text style={textStyle}>
        {message ??
          'Une erreur est survenue. \n Merci de bien vouloir réessayer ultérieurement'}
      </Text>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
