import * as React from 'react';

import
{
  Button,
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
} );

export default function SettingsScreen ( props )
{
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const _signOutAsync = async () =>
  {
    await AsyncStorage.clear();
    props.navigation.navigate( 'Auth' );
  };
  return ( <View style={styles.container}>
    <ExpoConfigView />
    <Button title="Actually, sign me out :)" onPress={_signOutAsync} />
  </View> );
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
