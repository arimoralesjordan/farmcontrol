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
  Image,
  ScrollView
} from 'react-native';
import moment from 'moment';
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
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const initAnimal = {
  name: '',
  father_id: '',
  mother_id: '',
  birthdate: moment().format('YYYY-MM-DD'),
  other_attribute: { image: null }
};
export default function AnimalForm(props) {
  //console.log('AnimalForm.props.state.params', props.navigation.state.params);
  const [state, setState] = React.useState(initAnimal);
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
    if (!result.cancelled) {
      setState({ ...state, other_attribute: { ...state.other_attribute, image: result.uri } });
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
        setisInit(true);
      });
  };
  React.useEffect(() => {
    if (isInit) {
      setisInit(false);
      searchAnimal();
      getPermissionAsync();
    }
    if (typeof props.navigation.state.params != 'undefined') {
      props.navigation.state.params.animal.birthdate = new Date(); // moment(initAnimal.birthdate).toDate();
      if (state.id != props.navigation.state.params.animal.id) {
        setState(props.navigation.state.params.animal);
      }
    } else {
      setState(initAnimal);
    }
  });

  SaveAnimal = async () => {
    setisLoading(true);
    Animal._createOrUpdate(state)
      .then(animal => {
        props.navigation.pop();
        props.navigation.navigate('ControlGanadero', { reRender: true });
        setisLoading(false);
        setState(initAnimal);
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
  };
  console.log('AnimalFormProps', typeof state.other_attribute.image);
  console.log("moment().format('YYYY-MM-DD')", moment().format('YYYY-MM-DD'));
  var image = { uri: state.other_attribute.image };
  if (typeof state.other_attribute.image == 'number') {
    image = state.other_attribute.image;
  }
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
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.articles}
                    >
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Nombre"
                              style={styles.inputs}
                              value={state.name}
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
                            <RNPickerSelect
                              placeholder={{
                                label: 'Padre...',
                                value: null,
                                color: '#9EA0A4'
                              }}
                              items={animals.map((animal, index) => {
                                return { label: animal.name, value: animal.id };
                              })}
                              onValueChange={value => setState({ ...state, father_id: value })}
                              style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                  top: 10,
                                  right: 12
                                }
                              }}
                              value={state.father_id}
                              useNativeAndroidPickerStyle={false}
                              textInputProps={{ underlineColor: 'yellow' }}
                              Icon={() => {
                                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                              }}
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Madre...',
                                value: null,
                                color: '#9EA0A4'
                              }}
                              items={animals.map((animal, index) => {
                                return { label: animal.name, value: animal.id };
                              })}
                              onValueChange={value => setState({ ...state, mother_id: value })}
                              style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                  top: 10,
                                  right: 12
                                }
                              }}
                              value={state.mother_id}
                              useNativeAndroidPickerStyle={false}
                              textInputProps={{ underlineColor: 'yellow' }}
                              Icon={() => {
                                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                              }}
                            />
                          </Block>
                          <Block center width={width * 0.8}>
                            <DatePicker
                              style={{ width: 200 }}
                              date={moment().format('YYYY-MM-DD')}
                              mode="date"
                              placeholder="Fecha de Nacimiento"
                              format="YYYY-MM-DD"
                              minDate="2016-05-01"
                              maxDate={moment().format('YYYY-MM-DD')}
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              customStyles={{
                                dateIcon: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 4,
                                  marginLeft: 0
                                },
                                dateInput: { marginLeft: 36 }
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
                          {state.other_attribute.image != null && (
                            <Image source={image} style={{ width: 200, height: 200 }} />
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
                    </ScrollView>
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

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
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  picker: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    height: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 25
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});
