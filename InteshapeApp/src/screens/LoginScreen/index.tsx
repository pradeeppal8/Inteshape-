import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

const PROFILE_AVATAR = require('../../assets/profile-avatar.jpg');

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormErrors = {
    email?: string;
    password?: string;
};

function LoginScreen({ navigation }: Props) {
    const { height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [forgotVisible, setForgotVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetSent, setResetSent] = useState(false);

    const compact = height < 760;
    const headerHeight = compact ? 205 : 245;

    const handleSignIn = () => {
        const nextErrors: FormErrors = {};

        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            nextErrors.email = 'Enter a valid email address.';
        }
        if (password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            navigation.replace('OTP', { email: email.trim() });
        }
    };

    const openForgotPassword = () => {
        setResetEmail(email.trim());
        setResetError('');
        setResetSent(false);
        setForgotVisible(true);
    };

    const closeForgotPassword = () => {
        setForgotVisible(false);
        setResetError('');
        setResetSent(false);
    };

    const handlePasswordReset = () => {
        const trimmedEmail = resetEmail.trim();

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            setResetError('Enter a valid email address.');
            return;
        }

        setResetEmail(trimmedEmail);
        setResetError('');
        setResetSent(true);
    };

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        {
                            paddingTop: headerHeight - 80,
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <LinearGradient
                        colors={['#075D82', '#079C9E', '#62D6B2']}
                        locations={[0, 0.55, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.85, y: 1 }}
                        style={[styles.headerGradient, { height: headerHeight }]}
                    />

                    <Svg
                        pointerEvents="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 34"
                        style={[styles.headerWave, { top: headerHeight - 76 }]}
                    >
                        <Path
                            d="M 0 22 C 13 15, 23 10, 36 18 C 52 28, 62 4, 78 10 C 89 14, 93 22, 100 18 L 100 34 L 0 34 Z"
                            fill="#FFFFFF"
                        />
                    </Svg>


                    <View style={styles.avatarFrame}>
                        <Image source={PROFILE_AVATAR} style={styles.avatar} />
                    </View>

                    <Text style={styles.title}>Sign In</Text>

                    <View style={styles.form}>
                        <TextInput
                            accessibilityLabel="Email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            onChangeText={value => {
                                setEmail(value);
                                if (errors.email) {
                                    setErrors(current => ({ ...current, email: undefined }));
                                }
                            }}
                            placeholder="Email"
                            placeholderTextColor="#9AA4A7"
                            returnKeyType="next"
                            style={[styles.input, errors.email && styles.inputError]}
                            value={email}
                        />
                        {errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}

                        <View
                            style={[
                                styles.passwordField,
                                errors.password && styles.inputError,
                            ]}
                        >
                            <TextInput
                                accessibilityLabel="Password"
                                autoCapitalize="none"
                                autoComplete="password"
                                onChangeText={value => {
                                    setPassword(value);
                                    if (errors.password) {
                                        setErrors(current => ({
                                            ...current,
                                            password: undefined,
                                        }));
                                    }
                                }}
                                onSubmitEditing={handleSignIn}
                                placeholder="Password"
                                placeholderTextColor="#9AA4A7"
                                returnKeyType="done"
                                secureTextEntry={!passwordVisible}
                                style={styles.passwordInput}
                                value={password}
                            />
                            <Pressable
                                accessibilityLabel={
                                    passwordVisible ? 'Hide password' : 'Show password'
                                }
                                accessibilityRole="button"
                                hitSlop={10}
                                onPress={() => setPasswordVisible(value => !value)}
                                style={styles.visibilityButton}
                            >
                                <Svg
                                    accessibilityElementsHidden
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                >
                                    {passwordVisible ? (
                                        <>
                                            <Path
                                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                                fill="none"
                                                stroke="#71858A"
                                                strokeWidth={1.8}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <Path
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                fill="none"
                                                stroke="#71858A"
                                                strokeWidth={1.8}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Path
                                                d="M3 3l18 18"
                                                fill="none"
                                                stroke="#71858A"
                                                strokeWidth={1.8}
                                                strokeLinecap="round"
                                            />
                                            <Path
                                                d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-2.1 3.1M6.6 6.6C3.6 8.4 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.1-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"
                                                fill="none"
                                                stroke="#71858A"
                                                strokeWidth={1.8}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </>
                                    )}
                                </Svg>
                            </Pressable>
                        </View>
                        {errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : null}

                        <Pressable
                            accessibilityLabel="Forgot password"
                            accessibilityRole="button"
                            onPress={openForgotPassword}
                            style={styles.forgotButton}
                        >
                            <Text style={styles.forgotText}>Forgot Your Password?</Text>
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleSignIn}
                            style={({ pressed }) => [
                                styles.signInButton,
                                pressed && styles.buttonPressed,
                            ]}
                        >
                            <LinearGradient
                                colors={['#10A1A5', '#087F9D', '#096B91']}
                                locations={[0, 0.55, 1]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.buttonGradient}
                            />
                            <Text style={styles.signInText}>Sign In</Text>
                        </Pressable>

                        <View style={styles.signupRow}>
                            <Text style={styles.signupPrompt}>Don't have an account? </Text>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.signupLink}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                animationType="fade"
                onRequestClose={closeForgotPassword}
                transparent
                visible={forgotVisible}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalKeyboardView}
                >
                    <Pressable
                        accessibilityLabel="Close forgot password modal"
                        onPress={closeForgotPassword}
                        style={styles.modalBackdrop}
                    >
                        <Pressable
                            accessibilityRole="none"
                            onPress={event => event.stopPropagation()}
                            style={styles.modalCard}
                        >
                            <View style={styles.modalIcon}>
                                <Text style={styles.modalIconText}>?</Text>
                            </View>
                            <Text style={styles.modalTitle}>Forgot Password?</Text>
                            <Text style={styles.modalDescription}>
                                {resetSent
                                    ? `Password reset instructions were sent to ${resetEmail}.`
                                    : 'Enter your registered email and we will send you password reset instructions.'}
                            </Text>

                            {!resetSent ? (
                                <>
                                    <TextInput
                                        accessibilityLabel="Reset Email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        onChangeText={value => {
                                            setResetEmail(value);
                                            if (resetError) {
                                                setResetError('');
                                            }
                                        }}
                                        onSubmitEditing={handlePasswordReset}
                                        placeholder="Email Address"
                                        placeholderTextColor="#9AA4A7"
                                        returnKeyType="send"
                                        style={[
                                            styles.modalInput,
                                            resetError ? styles.inputError : null,
                                        ]}
                                        value={resetEmail}
                                    />
                                    {resetError ? (
                                        <Text style={styles.modalErrorText}>{resetError}</Text>
                                    ) : null}
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={handlePasswordReset}
                                        style={({ pressed }) => [
                                            styles.resetButton,
                                            pressed && styles.buttonPressed,
                                        ]}
                                    >
                                        <LinearGradient
                                            colors={['#10A1A5', '#087F9D', '#096B91']}
                                            locations={[0, 0.55, 1]}
                                            start={{ x: 0, y: 0.5 }}
                                            end={{ x: 1, y: 0.5 }}
                                            style={styles.buttonGradient}
                                        />
                                        <Text style={styles.resetButtonText}>Send Reset Link</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={closeForgotPassword}
                                    style={({ pressed }) => [
                                        styles.resetButton,
                                        pressed && styles.buttonPressed,
                                    ]}
                                >
                                    <LinearGradient
                                        colors={['#10A1A5', '#087F9D', '#096B91']}
                                        locations={[0, 0.55, 1]}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        style={styles.buttonGradient}
                                    />
                                    <Text style={styles.resetButtonText}>Back to Login</Text>
                                </Pressable>
                            )}

                            {!resetSent ? (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={closeForgotPassword}
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </Pressable>
                            ) : null}
                        </Pressable>
                    </Pressable>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    buttonGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    headerWave: {
        position: 'absolute',
        right: 0,
        left: 0,
        height: 92,
    },
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    avatarFrame: {
        width: 108,
        height: 108,
        padding: 5,
        borderRadius: 54,
        backgroundColor: '#DCEFF0',
        elevation: 7,
        shadowColor: '#075D82',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 49,
    },
    title: {
        marginTop: 12,
        color: '#172B31',
        fontFamily: 'sans-serif-medium',
        fontSize: 25,
    },
    form: {
        width: '100%',
        maxWidth: 420,
        marginTop: 20,
    },
    input: {
        height: 48,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 8,
        backgroundColor: '#dfdfdf',
        color: '#20353A',
        fontSize: 14,
    },
    passwordField: {
        height: 48,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 8,
        backgroundColor: '#dfdfdf',
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 16,
        color: '#20353A',
        fontSize: 14,
    },
    visibilityButton: {
        width: 46,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputError: {
        borderColor: '#C35A5A',
    },
    errorText: {
        marginTop: 4,
        marginLeft: 4,
        color: '#B64949',
        fontSize: 11,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
    },
    forgotText: {
        color: '#078C96',
        fontSize: 11,
        fontFamily: 'sans-serif-medium',
        paddingVertical: 10,
    },
    modalKeyboardView: {
        flex: 1,
    },
    modalBackdrop: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(10, 35, 43, 0.58)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '100%',
        maxWidth: 420,
        paddingHorizontal: 24,
        paddingTop: 26,
        paddingBottom: 20,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        elevation: 12,
        shadowColor: '#042E3C',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.24,
        shadowRadius: 16,
    },
    modalIcon: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#DDF6F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalIconText: {
        color: '#078C96',
        fontFamily: 'sans-serif-medium',
        fontSize: 28,
    },
    modalTitle: {
        marginTop: 14,
        color: '#172B31',
        fontFamily: 'sans-serif-medium',
        fontSize: 22,
    },
    modalDescription: {
        marginTop: 8,
        color: '#71858A',
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
    },
    modalInput: {
        width: '100%',
        height: 48,
        marginTop: 20,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#DFE6E7',
        borderRadius: 8,
        backgroundColor: '#F3F6F6',
        color: '#20353A',
        fontSize: 14,
    },
    modalErrorText: {
        width: '100%',
        marginTop: 4,
        marginLeft: 8,
        color: '#B64949',
        fontSize: 11,
    },
    resetButton: {
        width: '100%',
        height: 46,
        marginTop: 18,
        borderRadius: 23,
        backgroundColor: '#087F9D',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
    },
    cancelButton: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    cancelButtonText: {
        color: '#62777C',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    signInButton: {
        // position: 'absolute',
        // right: 20,
        // left: 20,
        height: 46,
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
    buttonPressed: {
        opacity: 0.86,
    },
    signInText: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
    },
    dividerRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#BCC7C9',
    },
    orText: {
        marginHorizontal: 14,
        color: '#7A898C',
        fontSize: 12,
    },
    socialRow: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
    },
    socialButton: {
        width: 42,
        height: 38,
        borderWidth: 1,
        borderColor: '#E1E6E7',
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    socialMark: {
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
    },
    googleMark: {
        color: '#DB4437',
    },
    facebookMark: {
        color: '#1877F2',
        fontSize: 22,
    },
    linkedinMark: {
        color: '#0A66C2',
        fontSize: 15,
    },
    signupRow: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupPrompt: {
        color: '#7B898C',
        fontSize: 12,
    },
    signupLink: {
        color: '#078C96',
        fontFamily: 'sans-serif-medium',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
