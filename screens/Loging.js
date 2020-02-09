import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  View,
  ActivityIndicator
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme, backend } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default function Register(props) {
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setisLoading] = React.useState(false);

  _meAsync = async () => {
    fetch(backend.url + '/api/me', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => {
        return response.json();
      })
      .then(async responseJson => {
        await AsyncStorage.setItem('userData', JSON.stringify(responseJson));
        setisLoading(false);
        props.navigation.navigate('ControlGanaderoStack');
      })
      .catch(error => {
        console.error(error);
      });
  };
  _logInAsync = async () => {
    setisLoading(true);
    fetch(backend.url + '/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: '2',
        client_secret: backend.token,
        username: state.email,
        password: state.password,
        scope: ''
      })
    })
      .then(response => {
        return response.json();
      })
      .then(async responseJson => {
        await AsyncStorage.setItem('userToken', JSON.stringify(responseJson));
        _meAsync();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              {isLoading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block center>
                          <Button
                            color="primary"
                            round
                            style={styles.createButton}
                            onPress={() => {
                              props.navigation.navigate('RegisterStack');
                            }}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              O Registrate
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                      Inicia Session
                    </Text>
                  </Block>

                  {/* <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
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

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={ theme.COLORS.WHITE }
                        iconSize={ theme.SIZES.BASE * 1.625 }
                        color={ nowTheme.COLORS.FACEBOOK }
                        style={ [ styles.social, styles.shadow ] }
                      />
                    </Block> */}
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            value={state.email}
                            onChangeText={text => setState({ ...state, email: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.inputs}
                            value={state.password}
                            onChangeText={text => setState({ ...state, password: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="caps-small2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={() => {
                            this._logInAsync();
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Inicia Session
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

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backgroundColor: '#00000059'
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
});
