import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
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
import { saveAuthEmail } from '../../utils/authSession';

type Props = NativeStackScreenProps<RootStackParamList, 'Favourites'>;

const FAVOURITES = [
    'Sports',
    'Games',
    'photography',
    'Stories',
    'Books',
    'Cartoons',
    'Videos',
    'Photos',
    'Stars',
    'Design',
    'Travel',
    'Questions',
    'Organization',
    'Events',
    'Live',
    'Hotels',
];

function FavouritesScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const [selectedFavourites, setSelectedFavourites] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const headerHeight = Math.min(190, Math.max(150, height * 0.23));

    const toggleFavourite = (favourite: string) => {
        if (favourite === 'Hotels') {
            navigation.navigate('HotelSearch', { email: route.params.email });
            return;
        }

        setSelectedFavourites(current =>
            current.includes(favourite)
                ? current.filter(item => item !== favourite)
                : [...current, favourite],
        );
        setError('');
    };

    const handleConfirm = async () => {
        if (isSubmitting) {
            return;
        }

        if (selectedFavourites.length === 0) {
            setError('Please select at least one favourite.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await saveAuthEmail(route.params.email);
            navigation.replace('Home', { email: route.params.email });
        } catch {
            setError('Unable to save your preferences. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.screen}>
            <LinearGradient
                colors={['#075D82', '#079C9E', '#62D6B2']}
                locations={[0, 0.55, 1]}
                start={{ x: 0.12, y: 0 }}
                end={{ x: 0.88, y: 1 }}
                style={[styles.headerGradient, { height: headerHeight }]}
            />

            <Svg
                pointerEvents="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 42"
                style={[styles.headerWave, { top: headerHeight - 90 }]}
            >
                <Path
                    d="M0 31 C13 22 20 26 28 25 C37 24 35 10 48 8 C61 6 69 12 76 5 C84 -3 93 3 100 7 L100 42 L0 42 Z"
                    fill="#FFFFFF"
                />
            </Svg>

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        minHeight: height,
                        paddingTop: headerHeight - 16,
                        paddingBottom: Math.max(insets.bottom + 24, 36),
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Select Your Favourites</Text>

                <View style={styles.chipList}>
                    {FAVOURITES.map(favourite => {
                        const isSelected = selectedFavourites.includes(favourite);

                        return (
                            <Pressable
                                accessibilityRole="checkbox"
                                accessibilityState={{ checked: isSelected }}
                                key={favourite}
                                onPress={() => toggleFavourite(favourite)}
                                style={({ pressed }) => [
                                    styles.chip,
                                    isSelected && styles.selectedChip,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        isSelected && styles.selectedChipText,
                                    ]}
                                >
                                    {favourite}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Pressable
                    accessibilityRole="button"
                    disabled={isSubmitting}
                    onPress={handleConfirm}
                    style={({ pressed }) => [
                        styles.confirmButton,
                        (pressed || isSubmitting) && styles.pressed,
                    ]}
                >
                    <LinearGradient
                        colors={['#10A1A5', '#087F9D', '#096B91']}
                        locations={[0, 0.55, 1]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.buttonGradient}
                    />
                    {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.confirmText}>Confirm</Text>
                    )}
                </Pressable>

                <View
                    style={[
                        styles.flexibleSpace,
                        { minHeight: Math.max(90, height * 0.16) },
                    ]}
                />

                <View style={styles.loginPrompt}>
                    <Text style={styles.loginPromptText}>
                        Already Have an account{' '}
                    </Text>
                    <Pressable
                        accessibilityRole="link"
                        hitSlop={8}
                        onPress={() => navigation.replace('Login')}
                    >
                        <Text style={styles.loginLink}>Login</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    buttonGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 35,
    },
    headerGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    headerWave: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 120,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    title: {
        color: '#111D23',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 18,
    },
    chipList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    chip: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#D7DEE0',
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        minHeight: 32,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    selectedChip: {
        backgroundColor: '#079C9E',
        borderColor: '#079C9E',
    },
    chipText: {
        color: '#738084',
        fontSize: 12,
        fontWeight: '500',
    },
    selectedChipText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    errorText: {
        color: '#B42318',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center',
    },
    confirmButton: {
        alignItems: 'center',
        backgroundColor: '#075D82',
        borderRadius: 35,
        height: 44,
        justifyContent: 'center',
        width: '100%',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    pressed: {
        opacity: 0.78,
    },
    flexibleSpace: {
        flex: 1,
    },
    loginPrompt: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginPromptText: {
        color: '#899599',
        fontSize: 11,
    },
    loginLink: {
        color: '#075D82',
        fontSize: 11,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default FavouritesScreen;