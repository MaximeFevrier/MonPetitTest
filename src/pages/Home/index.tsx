import React from 'react';
import {Button} from 'react-native';
import {screens} from '../../routes';

export default function Home({navigation}): JSX.Element {
  return (
    <Button
      title={'Details'}
      onPress={() => navigation.navigate(screens.details.route)}
    />
  );
}
