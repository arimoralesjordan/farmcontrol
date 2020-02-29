import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  componentDidMount() {
    console.log('LoadingFont');
    Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    }).then(() => {
      console.log('LoadingFontFinish1');
      this.setState({ ...this.state, fontLoaded: true });
    });
    console.log('LoadingFontFinish2');
    //this.setState({ ...this.state, fontLoaded: true });
  }

  _cacheResourcesAsync = () => {
    return Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    }).then(() => {
      console.log('LoadingFontFinish3');
      this.setState({ ...this.state, fontLoaded: true });
    });
  };

  render() {
    console.log('InitialRender', new Date());
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens
              appIsLoadgin={(Complete = false) => {
                this.setState({ ...this.state, isLoadingComplete: Complete });
              }}
            />
          </Block>
        </GalioProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([this._cacheResourcesAsync(), cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn('Warn', error);
  };

  _handleFinishLoading = () => {
    console.log('_handleFinishLoading1', this.state);
    if (this.state.fontLoaded) {
      console.log('_handleFinishLoading2');
      this.setState({ ...this.state, isLoadingComplete: true });
    }
  };
}
