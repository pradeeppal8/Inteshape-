import React, { useState } from 'react';
import {
    Image,
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
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';
import { clearAuthEmail } from '../../utils/authSession';

const PROFILE_AVATAR = require('../../assets/profile-avatar.jpg');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type IconName =
    | 'bell'
    | 'profile'
    | 'mail'
    | 'calendar'
    | 'settings'
    | 'support'
    | 'logout'
    | 'home'
    | 'members';

type AppIconProps = {
    color?: string;
    name: IconName;
    size?: number;
};

const actions: Array<{ icon: IconName; label: string }> = [
    { icon: 'profile', label: 'My Profile' },
    { icon: 'mail', label: 'Inbox' },
    { icon: 'calendar', label: 'Bookings' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'support', label: 'Support' },
    { icon: 'logout', label: 'Logout' },
];

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
            {name === 'bell' ? (
                <>
                    <Path {...common} d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <Path {...common} d="M10 21h4" />
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
            {name === 'calendar' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18M7 14h2m3 0h2m3 0h1M7 17h2m3 0h2" />
                </>
            ) : null}
            {name === 'settings' ? (
                <>
                    <Circle {...common} cx="12" cy="12" r="3" />
                    <Path {...common} d="M19 13.5v-3l-2-.7-.6-1.4.9-1.9-2.1-2.1-1.9.9-1.4-.6-.7-2H8.3l-.7 2-1.4.6-1.9-.9-2.1 2.1.9 1.9-.6 1.4-2 .7v3l2 .7.6 1.4-.9 1.9 2.1 2.1 1.9-.9 1.4.6.7 2h2.9l.7-2 1.4-.6 1.9.9 2.1-2.1-.9-1.9.6-1.4 2-.7Z" />
                </>
            ) : null}
            {name === 'support' ? (
                <>
                    <Path {...common} d="M4 13v-2a8 8 0 0 1 16 0v2" />
                    <Rect {...common} x="3" y="12" width="4" height="7" rx="2" />
                    <Rect {...common} x="17" y="12" width="4" height="7" rx="2" />
                    <Path {...common} d="M17 19c0 1.1-1.3 2-3 2h-2" />
                </>
            ) : null}
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

function HomeScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState('Home');
    const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
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
    const horizontalPadding = width < 360 ? 14 : 18;
    const tabBarHeight = 62 + insets.bottom;

    const handleAction = async (label: string) => {
        if (label === 'My Profile') {
            navigation.navigate('Profile', { email });
            return;
        }

        if (label === 'Logout') {
            await clearAuthEmail();
            navigation.replace('Login');
        }
    };

    return (
        <View style={styles.screen}>
            <LinearGradient
                colors={['#075D82', '#079C9E', '#62D6B2']}
                locations={[0, 0.56, 1]}
                start={{ x: 0.05, y: 0 }}
                end={{ x: 0.95, y: 1 }}
                style={[styles.header, compact && styles.headerCompact]}
            >
                <View
                    style={[
                        styles.headerContent,
                        {
                            paddingTop: insets.top + 17,
                            paddingHorizontal: horizontalPadding,
                        },
                    ]}
                >
                    <View>
                        <Text style={styles.hello}>Hello,</Text>
                        <View style={styles.nameRow}>
                            <Text numberOfLines={1} style={styles.name}>
                                {displayName}
                            </Text>
                        </View>
                        <Text style={styles.welcome}>Good to see you again!</Text>
                    </View>
                    <Pressable
                        accessibilityLabel="Notifications"
                        accessibilityRole="button"
                        hitSlop={10}
                        style={({ pressed }) => [
                            styles.bellButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <AppIcon color="#FFFFFF" name="bell" size={23} />
                        <View style={styles.notificationDot} />
                    </Pressable>
                </View>
            </LinearGradient>

            <Svg
                pointerEvents="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 36"
                style={[
                    styles.waveShape,
                    { top: (compact ? 178 : 205) - 58 },
                ]}
            >
                <Path
                    d="M0 24 C18 8 31 18 45 14 C60 10 62 2 75 5 C87 8 91 18 100 17 L100 36 L0 36 Z"
                    fill="#F8FBFB"
                />
            </Svg>

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingHorizontal: horizontalPadding,
                        paddingBottom: tabBarHeight + 20,
                    },
                    compact && styles.contentCompact,
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    accessibilityLabel="Open profile"
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('Profile', { email })}
                    style={({ pressed }) => [
                        styles.profileCard,
                        pressed && styles.pressed,
                    ]}
                >
                    <Image
                        accessibilityLabel={`${displayName} profile picture`}
                        onError={() => setAvatarLoadFailed(true)}
                        source={
                            avatarLoadFailed
                                ? PROFILE_AVATAR
                                : { uri: avatarUrl }
                        }
                        style={styles.avatar}
                    />
                    <View style={styles.profileCopy}>
                        <Text numberOfLines={1} style={styles.profileName}>
                            {displayName}
                        </Text>
                        <Text numberOfLines={1} style={styles.profileEmail}>
                            {email}
                        </Text>
                    </View>
                    <Text style={styles.profileChevron}>›</Text>
                </Pressable>

                <View style={styles.actionGrid}>
                    {actions.map(action => (
                        <Pressable
                            accessibilityLabel={action.label}
                            accessibilityRole="button"
                            key={action.label}
                            onPress={() => handleAction(action.label)}
                            style={({ pressed }) => [
                                styles.actionCard,
                                { width: (width - horizontalPadding * 2 - 10) / 2 },
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.actionIcon}>
                                <AppIcon name={action.icon} size={20} />
                            </View>
                            <Text numberOfLines={1} style={styles.actionLabel}>
                                {action.label}
                            </Text>
                            <Text style={styles.chevron}>›</Text>
                        </Pressable>
                    ))}
                </View>

                <LinearGradient
                    colors={['#12B8A4', '#078AA1']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.helpBanner}
                >
                    <View style={styles.helpCopy}>
                        <Text style={styles.helpTitle}>Need Help?</Text>
                        <Text style={styles.helpText}>
                            Our support team is here{`\n`}for you 24/7.
                        </Text>
                        <Pressable
                            accessibilityLabel="Contact support"
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                styles.contactButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.contactText}>Contact Support</Text>
                            <Text style={styles.contactArrow}>→</Text>
                        </Pressable>
                    </View>
                    <View style={styles.chatHalo}>
                        <View style={styles.chatBubble}>
                            <View style={styles.chatDots}>
                                <View style={styles.chatDot} />
                                <View style={styles.chatDot} />
                                <View style={styles.chatDot} />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>

            <View
                style={[
                    styles.tabBar,
                    { height: tabBarHeight, paddingBottom: insets.bottom },
                ]}
            >
                {tabs.map(tab => {
                    const selected = activeTab === tab.label;
                    const color = selected ? '#139FA3' : '#93A0A5';
                    return (
                        <Pressable
                            accessibilityLabel={`${tab.label} tab`}
                            accessibilityRole="tab"
                            accessibilityState={{ selected }}
                            key={tab.label}
                            onPress={() => {
                                if (tab.label === 'Members') {
                                    navigation.navigate('Members', { email });
                                    return;
                                }

                                if (tab.label === 'Schedule') {
                                    navigation.navigate('Schedule', { email });
                                    return;
                                }

                                if (tab.label === 'Profile') {
                                    navigation.navigate('Profile', { email });
                                    return;
                                }

                                setActiveTab(tab.label);
                            }}
                            style={({ pressed }) => [
                                styles.tab,
                                pressed && styles.pressed,
                            ]}
                        >
                            <AppIcon color={color} name={tab.icon} size={25} />
                            <Text style={[styles.tabLabel, { color }]}>
                                {tab.label}
                            </Text>
                            {/* {selected ? <View style={styles.activeLine} /> : null} */}
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
        backgroundColor: '#F8FBFB',
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 205,
    },
    headerCompact: {
        height: 178,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    hello: { color: '#D8F6F0', fontSize: 13 },
    nameRow: { marginTop: 3, flexDirection: 'row', alignItems: 'center' },
    name: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 22,
        lineHeight: 27,
    },
    wave: { marginLeft: 7, fontSize: 17 },
    welcome: { marginTop: 2, color: '#D7F3EF', fontSize: 10 },
    bellButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationDot: {
        position: 'absolute',
        top: 6,
        right: 7,
        width: 7,
        height: 7,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        backgroundColor: '#FF6F70',
    },
    waveShape: {
        position: 'absolute',
        right: 0,
        left: 0,
        height: 92,
    },
    content: { minHeight: '100%', paddingTop: 154 },
    contentCompact: { paddingTop: 132 },
    profileCard: {
        height: 66,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#EDF1F1',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderWidth: 3,
        borderColor: '#D8F2EC',
        borderRadius: 22,
    },
    profileCopy: { flex: 1, marginLeft: 11 },
    profileName: {
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    profileEmail: { marginTop: 2, color: '#91A0A3', fontSize: 9 },
    profileChevron: { color: '#A2AFB1', fontSize: 21 },
    actionGrid: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
    },
    actionCard: {
        height: 91,
        paddingHorizontal: 11,
        borderWidth: 1,
        borderColor: '#EDF1F1',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    actionIcon: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: '#DDF7F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLabel: {
        marginTop: 8,
        paddingRight: 18,
        color: '#52686D',
        fontFamily: 'sans-serif-medium',
        fontSize: 11,
    },
    chevron: {
        position: 'absolute',
        right: 12,
        bottom: 11,
        color: '#A2AFB1',
        fontSize: 18,
        lineHeight: 18,
    },
    helpBanner: {
        height: 112,
        marginTop: 12,
        paddingHorizontal: 18,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    helpCopy: { zIndex: 2 },
    helpTitle: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 16,
    },
    helpText: {
        marginTop: 2,
        color: '#E1F8F5',
        fontSize: 9,
        lineHeight: 12,
    },
    contactButton: {
        width: 112,
        height: 25,
        marginTop: 8,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactText: {
        color: '#129BA0',
        fontFamily: 'sans-serif-medium',
        fontSize: 8,
    },
    contactArrow: { marginLeft: 5, color: '#129BA0', fontSize: 11 },
    chatHalo: {
        position: 'absolute',
        right: 16,
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: 'rgba(255,255,255,0.11)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBubble: {
        width: 48,
        height: 39,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-3deg' }],
    },
    chatDots: { flexDirection: 'row', gap: 4 },
    chatDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#159EA5',
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
    tab: { flex: 1, paddingTop: 9, alignItems: 'center' },
    tabLabel: {
        marginTop: 3,
        fontFamily: 'sans-serif-medium',
        fontSize: 11,
    },
    activeLine: {
        width: 28,
        height: 2,
        marginTop: 5,
        borderRadius: 1,
        backgroundColor: '#139FA3',
    },
    pressed: { opacity: 0.72 },
});

export default HomeScreen;