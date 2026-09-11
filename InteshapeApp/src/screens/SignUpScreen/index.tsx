import React, { useState } from 'react';
import {
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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

type FormErrors = {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
};

type EyeIconProps = {
    visible: boolean;
};

function EyeIcon({ visible }: EyeIconProps) {
    return (
        <Svg
            accessibilityElementsHidden
            width={20}
            height={20}
            viewBox="0 0 24 24"
        >
            {visible ? (
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
    );
}

function SignUpScreen({ navigation }: Props) {
    const { height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const compact = height < 760;
    const headerHeight = compact ? 205 : 235;

    const clearError = (field: keyof FormErrors) => {
        if (errors[field]) {
            setErrors(current => ({ ...current, [field]: undefined }));
        }
    };

    const handleNext = () => {
        const nextErrors: FormErrors = {};
        const trimmedEmail = email.trim();

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            nextErrors.email = 'Enter a valid email address.';
        }
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
            nextErrors.phone = 'Enter a valid phone number.';
        }
        if (!firstName.trim()) {
            nextErrors.firstName = 'First name is required.';
        }
        if (!lastName.trim()) {
            nextErrors.lastName = 'Last name is required.';
        }
        if (password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters.';
        }
        if (!confirmPassword || confirmPassword !== password) {
            nextErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            navigation.navigate('OTP', { email: trimmedEmail });
        }
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


                    <Text style={styles.title}>Sign Up</Text>

                    <View style={styles.form}>
                        <TextInput
                            accessibilityLabel="Email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            onChangeText={value => {
                                setEmail(value);
                                clearError('email');
                            }}
                            placeholder="Email"
                            placeholderTextColor="#919DA0"
                            returnKeyType="next"
                            style={[styles.input, errors.email && styles.inputError]}
                            value={email}
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                        <TextInput
                            accessibilityLabel="Phone Number"
                            autoComplete="tel"
                            keyboardType="phone-pad"
                            maxLength={18}
                            onChangeText={value => {
                                setPhone(value);
                                clearError('phone');
                            }}
                            placeholder="Phone Number"
                            placeholderTextColor="#919DA0"
                            returnKeyType="next"
                            style={[
                                styles.input,
                                styles.phoneInput,
                                errors.phone && styles.inputError,
                            ]}
                            value={phone}
                        />
                        {errors.phone ? (
                            <Text style={styles.errorText}>{errors.phone}</Text>
                        ) : null}

                        <View style={styles.nameRow}>
                            <View style={styles.nameField}>
                                <TextInput
                                    accessibilityLabel="First Name"
                                    autoCapitalize="words"
                                    autoComplete="given-name"
                                    onChangeText={value => {
                                        setFirstName(value);
                                        clearError('firstName');
                                    }}
                                    placeholder="First Name"
                                    placeholderTextColor="#919DA0"
                                    returnKeyType="next"
                                    style={[styles.input, errors.firstName && styles.inputError]}
                                    value={firstName}
                                />
                                {errors.firstName ? (
                                    <Text style={styles.errorText}>{errors.firstName}</Text>
                                ) : null}
                            </View>
                            <View style={styles.nameField}>
                                <TextInput
                                    accessibilityLabel="Last Name"
                                    autoCapitalize="words"
                                    autoComplete="family-name"
                                    onChangeText={value => {
                                        setLastName(value);
                                        clearError('lastName');
                                    }}
                                    placeholder="Last Name"
                                    placeholderTextColor="#919DA0"
                                    returnKeyType="next"
                                    style={[styles.input, errors.lastName && styles.inputError]}
                                    value={lastName}
                                />
                                {errors.lastName ? (
                                    <Text style={styles.errorText}>{errors.lastName}</Text>
                                ) : null}
                            </View>
                        </View>

                        <View style={[styles.passwordField, errors.password && styles.inputError]}>
                            <TextInput
                                accessibilityLabel="Password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                onChangeText={value => {
                                    setPassword(value);
                                    clearError('password');
                                }}
                                placeholder="Password"
                                placeholderTextColor="#919DA0"
                                returnKeyType="next"
                                secureTextEntry={!passwordVisible}
                                style={styles.passwordInput}
                                value={password}
                            />
                            <Pressable
                                accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                                accessibilityRole="button"
                                hitSlop={10}
                                onPress={() => setPasswordVisible(value => !value)}
                                style={styles.visibilityButton}
                            >
                                <EyeIcon visible={passwordVisible} />
                            </Pressable>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                        <View
                            style={[
                                styles.passwordField,
                                errors.confirmPassword && styles.inputError,
                            ]}
                        >
                            <TextInput
                                accessibilityLabel="Confirm Password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                onChangeText={value => {
                                    setConfirmPassword(value);
                                    clearError('confirmPassword');
                                }}
                                onSubmitEditing={handleNext}
                                placeholder="Confirm Password"
                                placeholderTextColor="#919DA0"
                                returnKeyType="done"
                                secureTextEntry={!confirmPasswordVisible}
                                style={styles.passwordInput}
                                value={confirmPassword}
                            />
                            <Pressable
                                accessibilityLabel={
                                    confirmPasswordVisible
                                        ? 'Hide confirm password'
                                        : 'Show confirm password'
                                }
                                accessibilityRole="button"
                                hitSlop={10}
                                onPress={() =>
                                    setConfirmPasswordVisible(value => !value)
                                }
                                style={styles.visibilityButton}
                            >
                                <EyeIcon visible={confirmPasswordVisible} />
                            </Pressable>
                        </View>
                        {errors.confirmPassword ? (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        ) : null}

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleNext}
                            style={({ pressed }) => [
                                styles.nextButton,
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
                            <Text style={styles.nextText}>Next</Text>
                        </Pressable>
                    </View>

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
    form: {
        width: '100%',
        maxWidth: 420,
        marginTop: 24,
    },
    input: {
        height: 48,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E1E5E6',
        borderRadius: 9,
        backgroundColor: '#F6F7F7',
        color: '#20353A',
        fontSize: 14,
    },
    phoneInput: {
        marginTop: 12,
    },
    nameRow: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 12,
    },
    nameField: {
        flex: 1,
    },
    passwordField: {
        height: 48,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#E1E5E6',
        borderRadius: 9,
        backgroundColor: '#F6F7F7',
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 15,
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
    nextButton: {
        height: 48,
        marginTop: 20,
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
    nextText: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
    },
    loginRow: {
        marginTop: 'auto',
        paddingTop: 46,
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

export default SignUpScreen;
