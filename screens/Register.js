import React from 'react';
import
{
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard, AsyncStorage
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme, backend } from '../constants';
import Pro from './Pro';

const { width, height } = Dimensions.get( 'screen' );

const DismissKeyboard = ( { children } ) => (
  <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>{ children }</TouchableWithoutFeedback>
);

class Register extends React.Component
{
  fullname;
  email;
  pass;
  _signInAsync = async () =>
  {
    fetch( backend.api + 'register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        name: this.fullname,
        email: this.email,
        passord: this.pass
      }),
    }).then((response) => {
      // response json devuelve una promesa
      return response.json().then( data => ({
        data: data,
        status: response.status,
        ok: response.ok
      }));
    })
      .then( async ( responseJson) => {
        console.log(responseJson);
        // await AsyncStorage.setItem( 'userToken', 'scope' );
        // this.props.navigation.navigate( 'Home' );
      })
      .catch((error) => {
        console.log(error);
      });

  };
  render ()
  {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={ Images.RegisterBackground }
            style={ styles.imageBackgroundContainer }
            imageStyle={ styles.imageBackground }
          >
            <Block flex middle>
              <Block style={ styles.registerContainer }>
                <Block flex space="evenly">
                  <Block flex={ 0.4 } middle style={ styles.socialConnect }>
                    <Block flex={ 0.5 } middle>
                      <Text
                        style={ {
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        } }
                        color="#333"
                        size={ 24 }
                      >
                        Registrate
                      </Text>
                    </Block>

                    <Block flex={ 0.5 } row middle space="between" style={ { marginBottom: 18 } }>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="google"
                        iconFamily="Font-Awesome"
                        iconColor={ theme.COLORS.WHITE }
                        iconSize={ theme.SIZES.BASE * 1.625 }
                        color={ nowTheme.COLORS.TWITTER }
                        style={ [ styles.social, styles.shadow ] }
                      />

                      {/* <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={ theme.COLORS.WHITE }
                        iconSize={ theme.SIZES.BASE * 1.625 }
                        color={ nowTheme.COLORS.FACEBOOK }
                        style={ [ styles.social, styles.shadow ] }
                      /> */}
                    </Block>
                  </Block>
                  <Block flex={ 0.1 } middle>
                    <Text
                      style={ {
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      } }
                      muted
                      size={ 16 }
                    >
                      o se Clasico
                    </Text>
                  </Block>
                  <Block flex={ 1 } middle space="between">
                    <Block center flex={ 0.9 }>
                      <Block flex space="between">
                        <Block>
                          <Block width={ width * 0.8 } style={ { marginBottom: 5 } }>
                            <Input
                              placeholder="Nombre y Apellido"
                              onChangeText={(val) => this.fullname = val}
                              style={ styles.inputs }
                              iconContent={
                                <Icon
                                  size={ 16 }
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={ styles.inputIcons }
                                />
                              }
                            />
                          </Block>
                          <Block width={ width * 0.8 }>
                            <Input
                              placeholder="Email"
                              onChangeText={(val) => this.email = val}
                              style={ styles.inputs }
                              iconContent={
                                <Icon
                                  size={ 16 }
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={ styles.inputIcons }
                                />
                              }
                            />
                          </Block>
                          <Block width={ width * 0.8 }>
                            <Input
                              placeholder="Password"
                              onChangeText={(val) => this.pass = val}
                              secureTextEntry={ true }
                              style={ styles.inputs }
                              iconContent={
                                <Icon
                                  size={ 16 }
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={ styles.inputIcons }
                                />
                              }
                            />
                          </Block>
                          <Block
                            style={ { marginVertical: theme.SIZES.BASE, marginLeft: 15 } }
                            row
                            width={ width * 0.75 }
                          >
                            <Checkbox
                              checkboxStyle={ {
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              } }
                              color={ nowTheme.COLORS.PRIMARY }
                              labelStyle={ {
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'montserrat-regular'
                              } }
                              label="Yo acepto los terminos y condiciones."
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={ styles.createButton }
                            onPress={ () => { this._signInAsync() } }
                          >
                            <Text
                              style={ { fontFamily: 'montserrat-bold' } }
                              size={ 14 }
                              color={ nowTheme.COLORS.WHITE }
                            >
                              A comenzar
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create( {
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
} );

export default Register;
