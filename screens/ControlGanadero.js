import React from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import ControlGanaderoController from '../controllers/ControlGanaderoController';
// header for screens
import Header from '../components/Header';

export default function ControlGanadero(props) {
  const [isLoading, setisLoading] = React.useState(false);
  const [isInit, setisInit] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  searchAnimal = async text => {
    setisLoading(true);
    ControlGanaderoController.searchAnimal(text)
      .then(animallin => {
        console.log('animallin', animallin);
        var anl = animallin.map(animal => {
          return {
            title: animal.name,
            image: animal.other_attribute.image,
            cta: 'Ver Historial'
          };
        });
        setAnimals(anl);
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
  return (
    <>
      <Header
        search
        searchAction={searchAnimal}
        searchPlaceholder={'Buscar Animal'}
        title="Control Ganadero"
        navigation={props.navigation}
      />
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex>
            {animals.map((animal, index) => {
              return <Card key={index} item={animal} horizontal />;
            })}
          </Block>
        </ScrollView>
      </Block>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width
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
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  }
});
