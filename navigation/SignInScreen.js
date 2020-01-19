import * as React from 'react';
import { useState } from 'react';
import
{
    Button,
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';
import
{
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default function SignInScreen ( props )
{
    const [ userInfo, setUserInfo ] = useState( null );
    const [ isSigninInProgress, setIsSigninInProgress ] = useState( false );

    GoogleSignin.configure();
    props.navigationOptions = {
        title: 'Bienvenido a Control de Granja',
    };
    const GoogleSignIn = async () =>
    {
        setIsSigninInProgress( true );
        try
        {
            await GoogleSignin.hasPlayServices();
            setUserInfo( await GoogleSignin.signIn() );
            _signInAsync( userInfo );
        } catch ( error )
        {
            if ( error.code === statusCodes.SIGN_IN_CANCELLED )
            {
                // user cancelled the login flow
            } else if ( error.code === statusCodes.IN_PROGRESS )
            {
                // operation (e.g. sign in) is in progress already
            } else if ( error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE )
            {
                // play services not available or outdated
            } else
            {
                // some other error happened
            }
        }
    };
    _signInAsync = async ( scope ) =>
    {
        setIsSigninInProgress( true );
        await AsyncStorage.setItem( 'userToken', scope );
        props.navigation.navigate( 'App' );
    };

    return (
        <View style={styles.container}>
            <Button title="Registrate con Google" />
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={GoogleSignIn}
                disabled={isSigninInProgress} />
        </View>
    );




}