import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import type { TextInputInstance } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 30;

const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

function OTPScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [digits, setDigits] = useState<string[]>(
        Array.from({ length: OTP_LENGTH }, () => ''),
    );
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [activeOtp, setActiveOtp] = useState(generateOtp);
    const [expiresAt, setExpiresAt] = useState(
        () => Date.now() + OTP_EXPIRY_SECONDS * 1000,
    );
    const [secondsRemaining, setSecondsRemaining] = useState(
        OTP_EXPIRY_SECONDS,
    );
    const inputRefs = useRef<Array<TextInputInstance | null>>([]);
    const otpToastProgress = useRef(new Animated.Value(0)).current;
    const toastProgress = useRef(new Animated.Value(0)).current;
    const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (navigationTimer.current) {
                clearTimeout(navigationTimer.current);
            }
        },
        [],
    );

    useEffect(() => {
        const updateCountdown = () => {
            setSecondsRemaining(
                Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)),
            );
        };

        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 250);

        return () => clearInterval(countdownTimer);
    }, [expiresAt]);

    useEffect(() => {
        otpToastProgress.stopAnimation();
        otpToastProgress.setValue(0);
        setDigits(activeOtp.split(''));
        setError('');

        const toastAnimation = Animated.sequence([
            Animated.spring(otpToastProgress, {
                toValue: 1,
                damping: 16,
                stiffness: 180,
                mass: 0.8,
                useNativeDriver: true,
            }),
            Animated.delay(3500),
            Animated.timing(otpToastProgress, {
                toValue: 0,
                duration: 220,
                useNativeDriver: true,
            }),
        ]);

        toastAnimation.start();
        return () => toastAnimation.stop();
    }, [activeOtp, otpToastProgress]);

    const compact = height < 760;
    const headerHeight = compact ? 305 : 285;
    const fieldSize = Math.min(44, Math.max(38, (width - 72) / OTP_LENGTH));

    const updateDigits = (startIndex: number, value: string) => {
        const incomingDigits = value.replace(/\D/g, '').slice(0, OTP_LENGTH);
        const nextDigits = [...digits];

        if (!incomingDigits) {
            nextDigits[startIndex] = '';
            setDigits(nextDigits);
            setError('');
            return;
        }

        incomingDigits.split('').forEach((digit, offset) => {
            const targetIndex = startIndex + offset;
            if (targetIndex < OTP_LENGTH) {
                nextDigits[targetIndex] = digit;
            }
        });

        setDigits(nextDigits);
        setError('');
        const nextIndex = Math.min(
            startIndex + incomingDigits.length,
            OTP_LENGTH - 1,
        );
        inputRefs.current[nextIndex]?.focus();
    };

    const handleConfirm = () => {
        if (isVerified) {
            return;
        }

        if (Date.now() >= expiresAt) {
            setSecondsRemaining(0);
            setError('OTP has expired. Please resend the code.');
            return;
        }

        if (digits.some(digit => digit === '')) {
            setError('Please enter the complete 6-digit OTP code.');
            const emptyIndex = digits.findIndex(digit => digit === '');
            inputRefs.current[emptyIndex]?.focus();
            return;
        }

        if (digits.join('') !== activeOtp) {
            setError('Invalid OTP. Enter the code shown in the toast.');
            return;
        }

        Keyboard.dismiss();
        setError('');
        setIsVerified(true);
        otpToastProgress.setValue(0);
        Animated.spring(toastProgress, {
            toValue: 1,
            damping: 16,
            stiffness: 180,
            mass: 0.8,
            useNativeDriver: true,
        }).start();

        navigationTimer.current = setTimeout(() => {
            navigation.replace('Favourites', { email: route.params.email });
        }, 1500);
    };

    const handleResend = () => {
        setDigits(Array.from({ length: OTP_LENGTH }, () => ''));
        setError('');
        setActiveOtp(generateOtp());
        setExpiresAt(Date.now() + OTP_EXPIRY_SECONDS * 1000);
        setSecondsRemaining(OTP_EXPIRY_SECONDS);
        inputRefs.current[0]?.focus();
    };

    const isExpired = secondsRemaining === 0;

    const toastTranslateY = toastProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 0],
    });
    const otpToastTranslateY = otpToastProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 0],
    });

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        {
                            paddingTop: headerHeight + 0,
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <LinearGradient
                        colors={['#075D82', '#079C9E', '#62D6B2']}
                        locations={[0, 0.55, 1]}
                        start={{ x: 0.15, y: 0 }}
                        end={{ x: 0.85, y: 1 }}
                        style={[styles.headerGradient, { height: headerHeight }]}
                    />


                    {!isVerified ? (
                        <Animated.View
                            accessibilityLiveRegion="assertive"
                            accessibilityRole="alert"
                            pointerEvents="none"
                            style={[
                                styles.otpToast,
                                {
                                    top: insets.top + 10,
                                    opacity: otpToastProgress,
                                    transform: [{ translateY: otpToastTranslateY }],
                                },
                            ]}
                        >
                            <Text style={styles.otpToastTitle}>Your OTP code</Text>
                            <Text style={styles.otpToastCode}>{activeOtp}</Text>
                            <Text style={styles.otpToastMessage}>
                                Valid for 30 seconds
                            </Text>
                        </Animated.View>
                    ) : null}

                    {isVerified ? (
                        <Animated.View
                            accessibilityLiveRegion="polite"
                            accessibilityRole="alert"
                            style={[
                                styles.successToast,
                                {
                                    top: insets.top + 10,
                                    opacity: toastProgress,
                                    transform: [{ translateY: toastTranslateY }],
                                },
                            ]}
                        >
                            <View style={styles.successIcon}>
                                <Text style={styles.successCheck}>✓</Text>
                            </View>
                            <View style={styles.successCopy}>
                                <Text style={styles.successTitle}>OTP verified</Text>
                                <Text style={styles.successMessage}>
                                    Your code was confirmed successfully.
                                </Text>
                            </View>
                        </Animated.View>
                    ) : null}

                    <Svg
                        pointerEvents="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 42"
                        style={[styles.headerWave, { top: headerHeight - 116 }]}
                    >
                        <Path
                            d="M0 31 C13 22 20 26 28 25 C37 24 35 10 48 8 C61 6 69 12 76 5 C84 -3 93 3 100 7 L100 42 L0 42 Z"
                            fill="#FFFFFF"
                        />
                    </Svg>

                    <Text style={styles.title}>OTP</Text>
                    <Text style={styles.instructions}>
                        We Send You Email Please Check Your Mail{`\n`}
                        And Complete OTP Code
                    </Text>
                    <Text numberOfLines={1} style={styles.email}>
                        {route.params.email}
                    </Text>

                    <View style={styles.codeRow}>
                        {digits.map((digit, index) => (
                            <TextInput
                                accessibilityLabel={`OTP digit ${index + 1}`}
                                autoFocus={index === 0}
                                key={index}
                                keyboardType="number-pad"
                                maxLength={index === 0 ? OTP_LENGTH : 1}
                                onChangeText={value => updateDigits(index, value)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (
                                        nativeEvent.key === 'Backspace' &&
                                        !digits[index] &&
                                        index > 0
                                    ) {
                                        inputRefs.current[index - 1]?.focus();
                                    }
                                }}
                                ref={input => {
                                    inputRefs.current[index] = input;
                                }}
                                selectTextOnFocus
                                style={[
                                    styles.codeInput,
                                    { width: fieldSize, height: fieldSize + 4 },
                                    error ? styles.codeInputError : null,
                                ]}
                                textContentType="oneTimeCode"
                                value={digit}
                            />
                        ))}
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.resendRow}>
                        <Text
                            accessibilityLiveRegion="polite"
                            style={[
                                styles.timerText,
                                isExpired && styles.expiredText,
                            ]}
                        >
                            {isExpired
                                ? 'OTP expired.'
                                : `Resend OTP in 00:${String(
                                    secondsRemaining,
                                ).padStart(2, '0')}`}
                        </Text>
                        {isExpired ? (
                            <Pressable
                                accessibilityLabel="Resend OTP"
                                accessibilityRole="button"
                                onPress={handleResend}
                            >
                                <Text style={styles.resendLink}>Resend OTP</Text>
                            </Pressable>
                        ) : null}
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        disabled={isVerified || isExpired}
                        onPress={handleConfirm}
                        style={({ pressed }) => [
                            styles.confirmButton,
                            pressed && styles.buttonPressed,
                            (isVerified || isExpired) && styles.buttonDisabled,
                        ]}
                    >
                        <LinearGradient
                            colors={['#10A1A5', '#087F9D', '#096B91']}
                            locations={[0, 0.55, 1]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.buttonGradient}
                        />
                        <Text style={styles.confirmText}>Confirm</Text>
                    </Pressable>

                    <View style={styles.loginRow}>
                        <Text style={styles.loginPrompt}>Already have an account? </Text>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => navigation.replace('Login')}
                        >
                            <Text style={styles.loginLink}>Login</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    headerWave: {
        position: 'absolute',
        right: 0,
        left: 0,
        height: 150,
    },
    otpToast: {
        position: 'absolute',
        right: 18,
        left: 18,
        zIndex: 10,
        minHeight: 64,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#B9E4E1',
        borderRadius: 10,
        backgroundColor: '#F0FCFB',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#074E48',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    otpToastTitle: {
        color: '#52706F',
        fontSize: 11,
    },
    otpToastCode: {
        marginTop: 1,
        color: '#087F91',
        fontFamily: 'sans-serif-medium',
        fontSize: 20,
        letterSpacing: 4,
    },
    otpToastMessage: {
        marginTop: 1,
        color: '#6E8281',
        fontSize: 10,
    },
    successToast: {
        position: 'absolute',
        right: 18,
        left: 18,
        zIndex: 10,
        minHeight: 64,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: '#BFE7D9',
        borderRadius: 10,
        backgroundColor: '#F2FCF8',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#074E48',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    successIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#139B77',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successCheck: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 20,
        lineHeight: 23,
    },
    successCopy: {
        flex: 1,
        marginLeft: 11,
    },
    successTitle: {
        color: '#155C4B',
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
    },
    successMessage: {
        marginTop: 2,
        color: '#5D756F',
        fontSize: 11,
        lineHeight: 15,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    title: {
        color: '#151C1E',
        fontFamily: 'sans-serif-medium',
        fontSize: 28,
        lineHeight: 34,
    },
    instructions: {
        marginTop: 18,
        color: '#798589',
        fontFamily: 'sans-serif',
        fontSize: 13,
        lineHeight: 17,
        textAlign: 'center',
    },
    email: {
        maxWidth: '92%',
        marginTop: 5,
        color: '#087F91',
        fontFamily: 'sans-serif-medium',
        fontSize: 11,
        textAlign: 'center',
    },
    codeRow: {
        width: '100%',
        maxWidth: 390,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    codeInput: {
        borderWidth: 1,
        borderColor: '#DDE2E3',
        borderRadius: 13,
        backgroundColor: '#F6F7F7',
        color: '#34484D',
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
        padding: 0,
        textAlign: 'center',
    },
    codeInputError: {
        borderColor: '#C35A5A',
    },
    errorText: {
        marginTop: 8,
        color: '#B64949',
        fontSize: 11,
        textAlign: 'center',
    },
    resendRow: {
        minHeight: 22,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        color: '#7B898C',
        fontSize: 12,
    },
    expiredText: {
        color: '#B64949',
    },
    resendLink: {
        marginLeft: 6,
        color: '#078C96',
        fontFamily: 'sans-serif-medium',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    confirmButton: {
        width: '100%',
        maxWidth: 390,
        height: 48,
        marginTop: 14,
        borderRadius: 24,
        backgroundColor: '#087F9D',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#006B86',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 7,
    },
    buttonGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    buttonPressed: {
        opacity: 0.86,
    },
    buttonDisabled: {
        opacity: 0.72,
    },
    confirmText: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
    },
    loginRow: {
        marginTop: 'auto',
        paddingTop: 48,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginPrompt: {
        color: '#7B898C',
        fontSize: 12,
    },
    loginLink: {
        color: '#078C96',
        fontFamily: 'sans-serif-medium',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});

export default OTPScreen;