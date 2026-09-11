import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { RootStackParamList } from './src/constants/navigation';
import FavouritesScreen from './src/screens/FavouritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import {
    BookingDetailsScreen,
    BookingConfirmedScreen,
    HotelCheckoutScreen,
    HotelDetailsScreen,
    HotelListScreen,
    HotelSearchScreen,
} from './src/screens/HotelFlow';
import LoginScreen from './src/screens/LoginScreen';
import MembersScreen from './src/screens/MembersScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import SignUpScreen from './src/screens/SignUpScreen/index';
import SplashScreen from './src/screens/SplashScreen';
import { getAuthEmail } from './src/utils/authSession';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const [sessionEmail, setSessionEmail] = useState<string | null>();

    useEffect(() => {
        getAuthEmail()
            .then(setSessionEmail)
            .catch(() => setSessionEmail(null));
    }, []);

    if (sessionEmail === undefined) {
        return (
            <SafeAreaProvider>
                <StatusBar barStyle="light-content" />
                <View style={styles.loadingScreen}>
                    <ActivityIndicator color="#079C9E" size="large" />
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={sessionEmail ? 'Home' : 'Splash'}
                    screenOptions={{
                        animation: 'fade',
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="OTP" component={OTPScreen} />
                    <Stack.Screen
                        name="Favourites"
                        component={FavouritesScreen}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        initialParams={
                            sessionEmail ? { email: sessionEmail } : undefined
                        }
                    />
                    <Stack.Screen name="Members" component={MembersScreen} />
                    <Stack.Screen name="Schedule" component={ScheduleScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="HotelSearch" component={HotelSearchScreen} />
                    <Stack.Screen name="HotelList" component={HotelListScreen} />
                    <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
                    <Stack.Screen name="HotelCheckout" component={HotelCheckoutScreen} />
                    <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} />
                    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
