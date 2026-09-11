import React, { useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';
import { clearAuthEmail } from '../../utils/authSession';

const PROFILE_AVATAR = require('../../assets/profile-avatar.jpg');

const memberSinceFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type IconName =
    | 'back'
    | 'edit'
    | 'camera'
    | 'profile'
    | 'mail'
    | 'phone'
    | 'calendar'
    | 'chevron'
    | 'logout'
    | 'home'
    | 'members';

type AppIconProps = {
    color?: string;
    name: IconName;
    size?: number;
};

const tabs: Array<{ icon: IconName; label: string }> = [
    { icon: 'home', label: 'Home' },
    { icon: 'members', label: 'Members' },
    { icon: 'calendar', label: 'Schedule' },
    { icon: 'profile', label: 'Profile' },
];

function AppIcon({ color = '#169D9A', name, size = 20 }: AppIconProps) {
    const common = {
        fill: 'none' as const,
        stroke: color,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.8,
    };

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            {name === 'back' ? <Path {...common} d="m15 18-6-6 6-6" /> : null}
            {name === 'edit' ? (
                <>
                    <Path {...common} d="M13.5 6.5 17.5 10.5M4 20l3.8-.8L19.2 7.8a2.1 2.1 0 0 0-3-3L4.8 16.2 4 20Z" />
                    <Path {...common} d="M13 5.8 18.2 11" />
                </>
            ) : null}
            {name === 'camera' ? (
                <>
                    <Path {...common} d="M4 8h3l1.4-2h7.2L17 8h3v10H4Z" />
                    <Circle {...common} cx="12" cy="13" r="3" />
                </>
            ) : null}
            {name === 'profile' ? (
                <>
                    <Circle {...common} cx="12" cy="8" r="3.2" />
                    <Path {...common} d="M5.5 20c.6-4 2.7-6 6.5-6s5.9 2 6.5 6" />
                </>
            ) : null}
            {name === 'mail' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="14" rx="2" />
                    <Path {...common} d="m4 7 8 6 8-6" />
                </>
            ) : null}
            {name === 'phone' ? (
                <Path {...common} d="M7 3 4.5 4.5c-1.2.7-.4 5 3.4 9s8 5.2 8.8 4l1.5-2.4-4-2.4-1.5 1.8c-1.4-.6-3.6-2.8-4.2-4.2l1.8-1.5L7 3Z" />
            ) : null}
            {name === 'calendar' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18M8 14h3m2 0h3m-8 3h3m2 0h3" />
                </>
            ) : null}
            {name === 'chevron' ? <Path {...common} d="m9 18 6-6-6-6" /> : null}
            {name === 'logout' ? (
                <>
                    <Path {...common} d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" />
                </>
            ) : null}
            {name === 'home' ? (
                <Path {...common} d="m3 11 9-7 9 7v9h-6v-6H9v6H3Z" />
            ) : null}
            {name === 'members' ? (
                <>
                    <Circle {...common} cx="9" cy="8" r="3" />
                    <Circle {...common} cx="17" cy="9" r="2.3" />
                    <Path {...common} d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6m0-5c3.5 0 5.4 1.7 5.8 5" />
                </>
            ) : null}
        </Svg>
    );
}

function ProfileScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
    const [selectedAvatarUri, setSelectedAvatarUri] = useState<string | null>(
        null,
    );
    const email = route.params.email;
    const displayName =
        email
            .split('@')[0]
            .split(/[._-]+/)
            .filter(Boolean)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ') || 'User';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName,
    )}&background=D8F2EC&color=087F91&bold=true&size=128`;
    const compact = height < 760;
    const narrow = width < 360;
    const horizontalPadding = narrow ? 10 : 18;
    const tabBarHeight = 62 + insets.bottom;
    const headerHeight = compact ? 210 : 238;
    const avatarSize = compact ? 94 : 108;
    const details: Array<{ icon: IconName; label: string; value: string }> = [
        { icon: 'profile', label: 'Full Name', value: displayName },
        { icon: 'mail', label: 'Email Address', value: email },
        { icon: 'phone', label: 'Phone Number', value: '09522900862' },
        {
            icon: 'calendar',
            label: 'Member Since',
            value: memberSinceFormatter.format(new Date()),
        },
    ];

    const goHome = () => navigation.navigate('Home', { email });
    const handleDetailPress = async (detail: (typeof details)[number]) => {
        if (detail.icon === 'calendar') {
            navigation.navigate('Schedule', { email });
        } else if (detail.icon === 'phone') {
            const phoneUrl = `tel:${detail.value.replace(/[^\d+]/g, '')}`;

            try {
                await Linking.openURL(phoneUrl);
            } catch {
                Alert.alert(
                    'Unable to make call',
                    'Phone calling is not available on this device.',
                );
            }
        } else if (detail.icon === 'mail') {
            const emailUrl = `mailto:${encodeURIComponent(detail.value)}`;

            try {
                await Linking.openURL(emailUrl);
            } catch {
                Alert.alert(
                    'Unable to open email',
                    'No email app is available on this device.',
                );
            }
        }
    };

    const handleChangeProfilePicture = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1,
            });

            if (result.didCancel) {
                return;
            }

            if (result.errorCode) {
                Alert.alert(
                    'Unable to select photo',
                    result.errorMessage || 'Please try again.',
                );
                return;
            }

            const selectedUri = result.assets?.[0]?.uri;
            if (selectedUri) {
                setSelectedAvatarUri(selectedUri);
                setAvatarLoadFailed(false);
            }
        } catch {
            Alert.alert(
                'Unable to select photo',
                'Image picker is unavailable. Please restart the app and try again.',
            );
        }
    };

    const handleTabPress = (label: string) => {
        if (label === 'Home') {
            goHome();
        } else if (label === 'Members') {
            navigation.navigate('Members', { email });
        } else if (label === 'Schedule') {
            navigation.navigate('Schedule', { email });
        }
    };

    const handleSignOut = async () => {
        await clearAuthEmail();
        navigation.replace('Login');
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={[
                        styles.hero,
                        compact && styles.heroCompact,
                    ]}
                >
                    <LinearGradient
                        colors={['#075D82', '#079C9E', '#62D6B2']}
                        locations={[0, 0.55, 1]}
                        start={{ x: 0.15, y: 0 }}
                        end={{ x: 0.85, y: 1 }}
                        style={[styles.gradientHeader, { height: headerHeight }]}
                    >
                        <View
                            style={[
                                styles.topBar,
                                {
                                    paddingTop: insets.top + 8,
                                    // paddingHorizontal: horizontalPadding,
                                },
                            ]}
                        >
                            <Pressable
                                accessibilityLabel="Back to Home"
                                accessibilityRole="button"
                                hitSlop={40}
                                onPress={goHome}
                                style={({ pressed }) => [
                                    styles.headerButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppIcon color="#FFFFFF" name="back" size={25} />
                            </Pressable>
                            <Text style={styles.headerTitle}>Profile</Text>
                            <Pressable
                                accessibilityLabel="Edit profile"
                                accessibilityRole="button"
                                hitSlop={10}
                                style={({ pressed }) => [
                                    styles.headerButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppIcon color="#FFFFFF" name="edit" size={22} />
                            </Pressable>
                        </View>
                    </LinearGradient>
                    <Svg
                        pointerEvents="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 42"
                        style={[styles.wave, { top: headerHeight - 110 }]}
                    >
                        <Path
                            d="M0 31 C13 22 20 26 28 25 C37 24 35 10 48 8 C61 6 69 12 76 5 C84 -3 93 3 100 7 L100 42 L0 42 Z"
                            fill="#FFFFFF"
                        />
                    </Svg>

                    <View
                        style={[
                            styles.avatarWrap,
                            {
                                top: headerHeight - (compact ? 68 : 76),
                                width: avatarSize + 8,
                                height: avatarSize + 8,
                                borderRadius: (avatarSize + 8) / 2,
                                marginLeft: -(avatarSize + 8) / 2,
                            },
                        ]}
                    >
                        <Image
                            accessibilityLabel={`${displayName} profile picture`}
                            onError={() => setAvatarLoadFailed(true)}
                            source={
                                selectedAvatarUri
                                    ? { uri: selectedAvatarUri }
                                    : avatarLoadFailed
                                        ? PROFILE_AVATAR
                                        : { uri: avatarUrl }
                            }
                            style={[
                                styles.avatar,
                                {
                                    width: avatarSize,
                                    height: avatarSize,
                                    borderRadius: avatarSize / 2,
                                },
                            ]}
                        />
                        <Pressable
                            accessibilityLabel="Change profile picture"
                            accessibilityRole="button"
                            hitSlop={10}
                            onPress={handleChangeProfilePicture}
                            style={({ pressed }) => [
                                styles.cameraButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <AppIcon color="#FFFFFF" name="camera" size={16} />
                        </Pressable>
                    </View>

                    <View style={[styles.identity, compact && styles.identityCompact]}>
                        <Text numberOfLines={1} style={styles.displayName}>
                            {displayName}
                        </Text>
                        <Text numberOfLines={1} style={styles.email}>
                            {email}
                        </Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: horizontalPadding }}>
                    <View style={styles.detailsList}>
                        {details.map(detail => (
                            <Pressable
                                accessibilityLabel={`${detail.label}: ${detail.value}`}
                                accessibilityRole="button"
                                key={detail.label}
                                onPress={() => handleDetailPress(detail)}
                                style={({ pressed }) => [
                                    styles.detailRow,
                                    compact && styles.detailRowCompact,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <View style={styles.detailIcon}>
                                    <AppIcon name={detail.icon} size={19} />
                                </View>
                                <View style={styles.detailCopy}>
                                    <Text style={styles.detailLabel}>{detail.label}</Text>
                                    <Text numberOfLines={1} style={styles.detailValue}>
                                        {detail.value}
                                    </Text>
                                </View>
                                <AppIcon color="#A2AFB1" name="chevron" size={17} />
                            </Pressable>
                        ))}
                    </View>

                    <Pressable
                        accessibilityLabel="Sign out"
                        accessibilityRole="button"
                        onPress={handleSignOut}
                        style={({ pressed }) => [
                            styles.signOutPressable,
                            pressed && styles.pressed,
                        ]}
                    >
                        <LinearGradient
                            colors={['#12B8A4', '#078AA1']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.signOutButton}
                        >
                            <Text style={styles.signOutText}>Sign Out</Text>
                            <AppIcon color="#FFFFFF" name="logout" size={20} />
                        </LinearGradient>
                    </Pressable>

                    <View style={styles.dividerRow}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.divider} />
                    </View>
                </View>
            </ScrollView>

            <View
                style={[
                    styles.tabBar,
                    { height: tabBarHeight, paddingBottom: insets.bottom },
                ]}
            >
                {tabs.map(tab => {
                    const selected = tab.label === 'Profile';
                    const color = selected ? '#139FA3' : '#93A0A5';
                    return (
                        <Pressable
                            accessibilityLabel={`${tab.label} tab`}
                            accessibilityRole="tab"
                            accessibilityState={{ selected }}
                            key={tab.label}
                            onPress={() => handleTabPress(tab.label)}
                            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
                        >
                            <AppIcon color={color} name={tab.icon} size={25} />
                            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F7FAFA',
    },
    hero: {
        position: 'relative',
        height: 343,
    },
    heroCompact: {
        height: 309,
    },
    gradientHeader: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
    },
    wave: {
        position: 'absolute',
        right: 0,
        left: 0,
        height: 150,
    },
    avatarWrap: {
        position: 'absolute',
        left: '50%',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 7,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 9,
    },
    avatar: {
        backgroundColor: '#D8F2EC',
    },
    cameraButton: {
        position: 'absolute',
        right: -2,
        bottom: 3,
        width: 31,
        height: 31,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 16,
        backgroundColor: '#119DA0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    identity: {
        position: 'absolute',
        top: 286,
        right: 24,
        left: 24,
        alignItems: 'center',
    },
    identityCompact: {
        top: 258,
    },
    displayName: {
        maxWidth: '100%',
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        lineHeight: 23,
    },
    email: {
        maxWidth: '100%',
        marginTop: 3,
        color: '#91A0A3',
        fontSize: 11,
        lineHeight: 15,
    },
    detailsList: {
        gap: 9,
    },
    detailRow: {
        minHeight: 63,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#E8EEEE',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    detailRowCompact: {
        minHeight: 57,
    },
    detailIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#DDF7F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailCopy: {
        flex: 1,
        minWidth: 0,
        marginHorizontal: 12,
    },
    detailLabel: {
        color: '#91A0A3',
        fontSize: 9,
        lineHeight: 12,
    },
    detailValue: {
        marginTop: 2,
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 12,
        lineHeight: 16,
    },
    signOutPressable: {
        marginTop: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    signOutButton: {
        height: 48,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutText: {
        marginRight: 8,
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    dividerRow: {
        marginTop: 17,
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#DCE5E6',
    },
    dividerText: {
        marginHorizontal: 11,
        color: '#91A0A3',
        fontSize: 10,
    },
    socialRow: {
        marginTop: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    socialButton: {
        width: 42,
        height: 42,
        borderWidth: 1,
        borderColor: '#DFE8E9',
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    googleText: {
        color: '#4285F4',
        fontFamily: 'sans-serif-medium',
        fontSize: 17,
    },
    facebookText: {
        color: '#1877F2',
        fontFamily: 'sans-serif-medium',
        fontSize: 20,
    },
    linkedinText: {
        color: '#0A66C2',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    tabBar: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E1E8E9',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        elevation: 12,
        shadowColor: '#183E45',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    tab: {
        flex: 1,
        paddingTop: 9,
        alignItems: 'center',
    },
    tabLabel: {
        marginTop: 3,
        fontFamily: 'sans-serif-medium',
        fontSize: 11,
    },
    pressed: {
        opacity: 0.72,
    },
});

export default ProfileScreen;