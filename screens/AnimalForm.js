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
  ActivityIndicator,
  Picker,
  Platform,
  Image
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input, Select } from '../components';
import { Images, nowTheme, backend } from '../constants';
import ControlGanaderoController from '../controllers/ControlGanaderoController';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Animal, Form, AnimalHasForm } from '../models';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default function Register(props) {
  const [state, setState] = React.useState({
    name: '',
    father: null,
    mother: null,
    birthdate: new Date(),
    image: false
  });
  console.log('backend.url', backend.url);
  const [isLoading, setisLoading] = React.useState(false);
  const [isInit, setisInit] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    if (!result.cancelled) {
      setState({ ...state, image: result.uri });
    }
  };

  searchAnimal = async text => {
    setisLoading(true);
    ControlGanaderoController.searchAnimal(text)
      .then(animallin => {
        setAnimals(animallin);
        setisLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setisLoading(false);
      });
  };
  React.useEffect(() => {
    if (isInit) {
      setisInit(false);
      searchAnimal();
    }
  });

  SaveAnimal = async () => {
    setisLoading(true);
    var animal = state;
    await Animal.create({
      name: animal.name,
      other_attribute: {
        image: animal.image
      },
      father_id: animal.father.id,
      mother_id: animal.mother.id,
      uid: Date.now(),
      birthdate: animal.birthdate,
      timestamp: Date.now()
    })
      .then(animal => {
        console.log('New animal', animal);
        props.navigation.navigate('ControlGanadero');
        setisLoading(false);
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
    // ControlGanaderoController._createAnimal(state)
    //   .then(animal => {
    //     console.log('New animal', animal);
    //     props.navigation.navigate('ControlGanadero');
    //     setisLoading(false);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     setisLoading(false);
    //   });
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
              <Block flex space="evenly">
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Nombre"
                            style={styles.inputs}
                            value={state.firstName}
                            onChangeText={text => setState({ ...state, name: text })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="profile-circle"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Picker
                            style={styles.inputs}
                            selectedValue={state.father}
                            onValueChange={(itemValue, itemIndex) =>
                              setState({ ...state, father: itemValue })
                            }
                          >
                            <Picker.Item label="Padre" value="null" />
                            {animals.map((animal, index) => {
                              return <Picker.Item key={index} label={animal.name} value={animal} />;
                            })}
                          </Picker>
                        </Block>
                        <Block width={width * 0.8}>
                          <Picker
                            style={styles.inputs}
                            selectedValue={state.mother}
                            onValueChange={(itemValue, itemIndex) =>
                              setState({ ...state, mother: itemValue })
                            }
                          >
                            <Picker.Item label="Madre" value="null" />
                            {animals.map((animal, index) => {
                              return <Picker.Item key={index} label={animal.name} value={animal} />;
                            })}
                          </Picker>
                        </Block>
                        <Block center width={width * 0.8}>
                          <DatePicker
                            style={{ width: 200 }}
                            date={state.birthdate}
                            mode="date"
                            placeholder="Fecha de Nacimiento"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36
                              }
                              // ... You can check the source to find the other keys.
                            }}
                            onDateChange={date => {
                              setState({ ...state, birthdate: date });
                            }}
                          />
                        </Block>
                        <Block center>
                          <Button
                            color="primary"
                            round
                            style={styles.createButton}
                            onPress={_pickImage}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Foto
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                      <Block center>
                        {state.image && (
                          <Image
                            source={{ uri: state.image }}
                            style={{ width: 200, height: 200 }}
                          />
                        )}
                      </Block>
                      <Block center>
                        <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={() => {
                            SaveAnimal();
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Guardar
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
              {isLoading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" />
                </View>
              )}
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
