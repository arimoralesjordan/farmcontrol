import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get( 'screen' );
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

export default class Onboarding extends React.Component
{
  constructor ()
  {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () =>
  {
    const userToken = await AsyncStorage.getItem( 'userToken' );
    if ( userToken )
    {
      this.props.navigation.navigate( 'Home' );
    }
  };
  render ()
  {
    const { navigation } = this.props;

    return (
      <Block flex style={ styles.container }>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={ Images.Onboarding }
            style={ { flex: 1, height: height, width, zIndex: 1 } }
          />
          <Block space="between" style={ styles.padded }>
            <Block>
              <Block middle>
                <Image source={ Images.NowLogo } style={ { width: 115, height: 124, bottom: 200, position: 'absolute' } } />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={ {
                      fontFamily: 'montserrat-regular', bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                    } }
                    color="white"
                    size={ 44 }
                  >
                    Control Granja
                  </Text>
                </Block>
              </Block>
              <Block middle row style={ { marginTop: 15, marginBottom: 30 } }>
                <Text
                  color="white"
                  size={ 16 }
                  style={ { fontFamily: 'montserrat-regular' } }
                >
                  Programado por Nerds
                </Text>
              </Block>

              <Block
                row
                style={ {
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                } }
              >
                <Button
                  shadowless
                  style={ styles.button }
                  color={ nowTheme.COLORS.PRIMARY }
                  onPress={ () => navigation.navigate( 'RegisterStack' ) }
                >
                  <Text
                    style={ { fontFamily: 'montserrat-bold', fontSize: 14 } }
                    color={ theme.COLORS.WHITE }
                  >
                    Comencemos
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
} );
