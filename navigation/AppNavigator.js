import * as React from 'react';
import
{
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from './SignInScreen';

class HomeScreen extends React.Component
{
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render ()
  {
    return (
      <View style={styles.container}>

        <Button title="Show me the App" onPress={this._showMeApp} />
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () =>
  {
    this.props.navigation.navigate( 'Other' );
  };

  _showMeApp = () =>
  {
    this.props.navigation.navigate( 'App' );
  };

  _signOutAsync = async () =>
  {
    await AsyncStorage.clear();
    this.props.navigation.navigate( 'Auth' );
  };
}

class OtherScreen extends React.Component
{
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render ()
  {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () =>
  {
    await AsyncStorage.clear();
    this.props.navigation.navigate( 'Auth' );
  };
}

class AuthLoadingScreen extends React.Component
{
  constructor ()
  {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () =>
  {
    const userToken = await AsyncStorage.getItem( 'userToken' );

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate( userToken ? 'App' : 'Auth' );
  };

  // Render any loading content that you like here
  render ()
  {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
} );

const AppStack = createStackNavigator( { Home: HomeScreen, Other: OtherScreen, App: MainTabNavigator } );
const AuthStack = createStackNavigator( { SignIn: SignInScreen } );

export default createAppContainer( createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
) );
