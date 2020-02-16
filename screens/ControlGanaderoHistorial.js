import React from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Icon from '../components/Icon';
import { AnimalCard, Button } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import ControlGanaderoController from '../controllers/ControlGanaderoController';
// header for screens
import Header from '../components/Header';
import nowTheme from '../constants/Theme';

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
          var image = { uri: animal.other_attribute.image };
          if (typeof animal.other_attribute.image == 'number') {
            image = animal.other_attribute.image;
          }
          return {
            title: animal.name,
            image: image,
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
        rightOnPress={() => {
          props.navigation.navigate('AnimalForm');
        }}
      />
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex>
            {animals.map((animal, index) => {
              return <AnimalCard key={index} item={animal} horizontal />;
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
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const styles = StyleSheet.create({
  home: {
    width: width
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular'
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
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
