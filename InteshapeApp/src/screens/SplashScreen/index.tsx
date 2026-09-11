import React, { useEffect, useMemo, useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

const BANNER_IMAGE = require('../../assets/main-banner1.png');
const PROFILE_AVATAR = require('../../assets/logo_mos.png');


type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

function SplashScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const reveal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(reveal, {
            toValue: 1,
            duration: 850,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [reveal]);

    const layout = useMemo(() => {
        const logoTop = clamp(height * 0.13, insets.top + 42, insets.top + 88);
        const headlineTop = clamp(height * 0.29, logoTop + 120, logoTop + 170);
        const bodyTop = headlineTop + clamp(height * 0.10, 90, 140);
        const imageTop = clamp(height * 0.47, bodyTop + 4, height * 0.45);
        const imageHeight = clamp(height * 0.44, 300, 460);
        const loadingTop = Math.min(
            height * 0.86,
            height - insets.bottom - 94,
        );

        return {
            logoTop,
            headlineTop,
            bodyTop,
            imageTop,
            imageHeight,
            loadingTop,
        };
    }, [height, insets.bottom, insets.top]);

    const logoTranslateY = reveal.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
    });
    const titleTranslateY = reveal.interpolate({
        inputRange: [0, 1],
        outputRange: [24, 0],
    });
    const bodyTranslateY = reveal.interpolate({
        inputRange: [0, 1],
        outputRange: [28, 0],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#075D82', '#067F94', '#079C9E', '#62D6B2']}
                locations={[0, 0.3, 0.64, 1]}
                start={{ x: 0.18, y: 0 }}
                end={{ x: 0.82, y: 1 }}
                style={styles.tealField}
            />

            <Svg
                pointerEvents="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                style={[
                    styles.gradientBottomWave,
                    {
                        top: layout.imageTop - height * 0.0,
                        height: layout.imageHeight * 1.6,
                    },
                ]}
            >
                <Path
                    d="M 0 28 C 18 48, 25 18, 45 11 C 65 4, 76 34, 100 18 L 100 100 L 0 100 Z"
                    fill="#FFFFFF"
                />
            </Svg>

            <Animated.View
                style={[
                    styles.logoGroup,
                    {
                        top: layout.logoTop,
                        opacity: reveal,
                        transform: [{ translateY: logoTranslateY }],
                    },
                ]}
            >
                <View style={styles.logoIcon} accessibilityElementsHidden>
                    <View style={[styles.tower, styles.towerA]}>
                        <View style={styles.towerRoof} />
                    </View>

                    <View style={[styles.tower, styles.towerB]}>
                        <View style={styles.towerRoof} />
                    </View>
                    <View style={[styles.tower, styles.towerC]}>
                        <View style={styles.towerRoof} />
                    </View>
                    <View style={[styles.tower, styles.towerD]}>
                        <View style={styles.towerRoof} />
                    </View>
                </View>
                <Text style={styles.brandText}>INTESHAPE</Text>
            </Animated.View>

            <Animated.View
                style={[
                    styles.headlineGroup,
                    {
                        top: layout.headlineTop,
                        opacity: reveal,
                        transform: [{ translateY: titleTranslateY }],
                    },
                ]}
            >
                <Text style={styles.headline}>
                    Architecture for{`\n`}how people truly live.
                </Text>
            </Animated.View>

            <Animated.View
                style={[
                    styles.supportGroup,
                    {
                        top: layout.bodyTop,
                        opacity: reveal,
                        transform: [{ translateY: bodyTranslateY }],
                    },
                ]}
            >
                {/* <Image source={PROFILE_AVATAR} style={styles.avatar} /> */}
                <Text style={styles.supportText}>
                    Planning, interiors, renovation, and{`\n`}
                    visualization in one deliberate{`\n`}
                    editorial workflow.
                </Text>
            </Animated.View>

            <View
                style={[
                    styles.photoContainer,
                    { top: layout.imageTop, height: layout.imageHeight },
                ]}
            >
                <Image source={BANNER_IMAGE} style={styles.photo} resizeMode="contain" />
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue to Inteshape"
                onPress={() => navigation.replace('Login')}
                style={({ pressed }) => [
                    styles.continueButton,
                    {
                        bottom: Math.max(insets.bottom + 6, 12),
                        opacity: pressed ? 0.88 : 1,
                    },
                ]}
            >
                <LinearGradient
                    colors={['#10A1A5', '#087F9D', '#096B91']}
                    locations={[0, 0.55, 1]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.buttonGradient}
                />
                <Text style={styles.continueText}>Continue</Text>
                {/* <Text style={styles.continueArrow}>→</Text> */}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    tealField: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: '39%',
        left: 0,
    },
    logoGroup: {
        position: 'absolute',
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 49,
        tintColor: '#FFFFFF',
    },
    logoIcon: {
        position: 'relative',
        width: 62,
        height: 72,
        marginBottom: 10,
    },
    tower: {
        position: 'absolute',
        bottom: 0,
        width: 11,
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        overflow: 'hidden',
    },
    towerRoof: {
        position: 'absolute',
        top: -6,
        left: 0,
        width: 11,
        height: 11,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        transform: [{ rotate: '45deg' }],
    },
    towerA: {
        left: 1,
        height: 34,
    },
    towerB: {
        left: 18,
        height: 52,
    },
    towerC: {
        left: 35,
        height: 68,
    },
    towerD: {
        left: 52,
        height: 44,
    },
    brandText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'sans-serif-medium',
        letterSpacing: 2.5,
        textAlign: 'center',
    },
    headlineGroup: {
        position: 'absolute',
        right: 22,
        left: 22,
        alignItems: 'center',
    },
    headline: {
        color: '#FFFFFF',
        fontFamily: 'Fontspring-DEMO-quincycf-medium',
        fontSize: 26,
        lineHeight: 37,
        textAlign: 'center',
    },
    supportGroup: {
        position: 'absolute',
        right: 28,
        left: 28,
        alignItems: 'center',
    },
    supportText: {
        color: 'rgba(255, 255, 255, 0.78)',
        fontFamily: 'sans-serif',
        fontSize: 13,
        lineHeight: 18,
        textAlign: 'center',
    },
    photoContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        // overflow: 'hidden',
        // backgroundColor: '#0C5573',
    },
    photo: {
        position: 'absolute',
        top: 0,
        left: '-10%',
        width: '124%',
        height: '100%',
    },
    gradientBottomWave: {
        position: 'absolute',
        right: 0,
        left: 0,
    },
    waveBottomMain: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: '#FFFFFF',
    },
    waveBottomSecondary: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: '#FFFFFF',
    },
    loadingArea: {
        position: 'absolute',
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        color: '#676978',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    continueButton: {
        position: 'absolute',
        right: 20,
        left: 20,
        height: 44,
        borderRadius: 30,
        backgroundColor: '#087F9D',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#006B86',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
    },
    buttonGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    continueText: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 17,
    },
    continueArrow: {
        position: 'absolute',
        right: 18,
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
        fontSize: 28,
        lineHeight: 28,
        top: 3,
        bottom: 6,
    },
});

export default SplashScreen;
