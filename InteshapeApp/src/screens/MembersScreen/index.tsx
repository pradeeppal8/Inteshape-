import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Linking,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

const PROFILE_AVATAR = require('../../assets/profile-avatar.jpg');

type Props = NativeStackScreenProps<RootStackParamList, 'Members'>;
type MemberStatus = 'Active' | 'Inactive';
type StatusFilter = 'All' | MemberStatus;

export type Member = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: MemberStatus;
    joinedAt: string;
    avatarUrl: string;
};

type IconName =
    | 'add'
    | 'back'
    | 'calendar'
    | 'chevron'
    | 'close'
    | 'filter'
    | 'home'
    | 'mail'
    | 'members'
    | 'message'
    | 'more'
    | 'phone'
    | 'profile'
    | 'search';

type AppIconProps = {
    color?: string;
    name: IconName;
    size?: number;
};

const roles = [
    'Project Manager',
    'Lead Architect',
    'Interior Designer',
    'Site Engineer',
    '3D Visualizer',
];

const roleColors: Record<string, { background: string; text: string }> = {
    'Project Manager': { background: '#E3F2FF', text: '#2671A6' },
    'Lead Architect': { background: '#E4F7F0', text: '#14816D' },
    'Interior Designer': { background: '#FFF0E5', text: '#B4642F' },
    'Site Engineer': { background: '#F0ECFF', text: '#7054AE' },
    '3D Visualizer': { background: '#FFF0F3', text: '#B65069' },
};

const tabs: Array<{ icon: IconName; label: string }> = [
    { icon: 'home', label: 'Home' },
    { icon: 'members', label: 'Members' },
    { icon: 'calendar', label: 'Schedule' },
    { icon: 'profile', label: 'Profile' },
];

const getMonthDate = (day: number, monthOffset = 0) => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + monthOffset, day).toISOString();
};

const avatarFor = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name,
    )}&background=D8F2EC&color=087F91&bold=true&size=160`;

const displayNameFromEmail = (email: string) =>
    email
        .split('@')[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ') || 'Team Member';

const buildSeedMembers = (signedInEmail: string): Member[] => {
    const signedInName = displayNameFromEmail(signedInEmail);

    return [
        {
            id: 'signed-in-member',
            name: signedInName,
            email: signedInEmail,
            phone: '+1 415 555 0132',
            role: 'Project Manager',
            status: 'Active',
            joinedAt: getMonthDate(2),
            avatarUrl: avatarFor(signedInName),
        },
        {
            id: 'member-ananya',
            name: 'Ananya Mehta',
            email: 'ananya.mehta@inteshape.com',
            phone: '+1 415 555 0168',
            role: 'Lead Architect',
            status: 'Active',
            joinedAt: getMonthDate(18, -5),
            avatarUrl: avatarFor('Ananya Mehta'),
        },
        {
            id: 'member-ethan',
            name: 'Ethan Cole',
            email: 'ethan.cole@inteshape.com',
            phone: '+1 415 555 0174',
            role: 'Interior Designer',
            status: 'Active',
            joinedAt: getMonthDate(11, -2),
            avatarUrl: avatarFor('Ethan Cole'),
        },
        {
            id: 'member-maya',
            name: 'Maya Fernandez',
            email: 'maya.fernandez@inteshape.com',
            phone: '+1 415 555 0191',
            role: 'Site Engineer',
            status: 'Inactive',
            joinedAt: getMonthDate(7, -8),
            avatarUrl: avatarFor('Maya Fernandez'),
        },
        {
            id: 'member-noah',
            name: 'Noah Williams',
            email: 'noah.williams@inteshape.com',
            phone: '+1 415 555 0127',
            role: '3D Visualizer',
            status: 'Active',
            joinedAt: getMonthDate(5),
            avatarUrl: avatarFor('Noah Williams'),
        },
    ];
};

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
            {name === 'search' ? (
                <>
                    <Circle {...common} cx="10.5" cy="10.5" r="6.5" />
                    <Path {...common} d="m15.5 15.5 4.5 4.5" />
                </>
            ) : null}
            {name === 'filter' ? (
                <Path {...common} d="M4 6h16M7 12h10m-7 6h4" />
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
            {name === 'message' ? (
                <Path {...common} d="M4 5h16v12H9l-5 4V5Z" />
            ) : null}
            {name === 'more' ? (
                <>
                    <Circle cx="12" cy="5" r="1.3" fill={color} />
                    <Circle cx="12" cy="12" r="1.3" fill={color} />
                    <Circle cx="12" cy="19" r="1.3" fill={color} />
                </>
            ) : null}
            {name === 'chevron' ? <Path {...common} d="m9 18 6-6-6-6" /> : null}
            {name === 'add' ? <Path {...common} d="M12 5v14M5 12h14" /> : null}
            {name === 'close' ? <Path {...common} d="m6 6 12 12M18 6 6 18" /> : null}
            {name === 'calendar' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18M8 14h3m2 0h3m-8 3h3m2 0h3" />
                </>
            ) : null}
            {name === 'profile' ? (
                <>
                    <Circle {...common} cx="12" cy="8" r="3.2" />
                    <Path {...common} d="M5.5 20c.6-4 2.7-6 6.5-6s5.9 2 6.5 6" />
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

function TeamIllustration() {
    return (
        <Svg width={136} height={112} viewBox="0 0 136 112">
            <Circle cx="68" cy="55" r="49" fill="#FFFFFF" opacity={0.12} />
            <Path d="M24 99c3-23 14-34 34-34s31 11 34 34" fill="#E9FFFA" opacity={0.95} />
            <Circle cx="58" cy="45" r="18" fill="#B9EFE3" />
            <Path d="M41 44c2-16 29-24 36-2-9-1-18-5-24-11-2 7-6 11-12 13Z" fill="#075D82" />
            <Path d="M83 100c2-17 10-25 25-25 13 0 21 8 24 25" fill="#FFFFFF" opacity={0.86} />
            <Circle cx="107" cy="61" r="13" fill="#FFE0C2" />
            <Path d="M94 61c0-15 23-21 28-5-8 0-14-3-19-8-1 6-4 10-9 13Z" fill="#22536A" />
            <Circle cx="31" cy="73" r="10" fill="#FFD5B8" />
            <Path d="M17 101c1-13 7-19 16-19s15 6 17 19" fill="#B9EFE3" />
            <Path d="M21 70c1-10 17-14 20-3-6 0-10-2-13-5-1 4-3 7-7 8Z" fill="#234D5E" />
            <Path d="M18 101h113" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity={0.5} />
        </Svg>
    );
}

function MembersScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [members, setMembers] = useState<Member[]>(() => buildSeedMembers(route.params.email));
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
    const [filterOpen, setFilterOpen] = useState(false);
    const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newRole, setNewRole] = useState(roles[0]);
    const [newStatus, setNewStatus] = useState<MemberStatus>('Active');
    const [formError, setFormError] = useState('');

    const email = route.params.email;
    const compact = height < 760;
    const narrow = width < 360;
    const horizontalPadding = narrow ? 12 : 18;
    const headerHeight = compact ? 218 : 238;
    const tabBarHeight = 62 + insets.bottom;
    const now = new Date();
    const activeCount = members.filter(member => member.status === 'Active').length;
    const inactiveCount = members.length - activeCount;
    const newThisMonthCount = members.filter(member => {
        const joinedAt = new Date(member.joinedAt);
        return (
            joinedAt.getMonth() === now.getMonth() &&
            joinedAt.getFullYear() === now.getFullYear()
        );
    }).length;
    const normalizedSearch = search.trim().toLowerCase();
    const filteredMembers = members.filter(member => {
        const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
        const matchesSearch =
            !normalizedSearch ||
            member.name.toLowerCase().includes(normalizedSearch) ||
            member.email.toLowerCase().includes(normalizedSearch) ||
            member.role.toLowerCase().includes(normalizedSearch);
        return matchesStatus && matchesSearch;
    });
    const stats = [
        { label: 'Total Members', value: members.length, color: '#087F91' },
        { label: 'Active', value: activeCount, color: '#21A67A' },
        { label: 'Inactive', value: inactiveCount, color: '#E27070' },
        { label: 'New This Month', value: newThisMonthCount, color: '#5A76B9' },
    ];

    const resetForm = () => {
        setNewName('');
        setNewEmail('');
        setNewRole(roles[0]);
        setNewStatus('Active');
        setFormError('');
    };

    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    const addMember = () => {
        const name = newName.trim();
        const memberEmail = newEmail.trim().toLowerCase();

        if (!name || !memberEmail) {
            setFormError('Name and email are required.');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(memberEmail)) {
            setFormError('Enter a valid email address.');
            return;
        }

        if (members.some(member => member.email.toLowerCase() === memberEmail)) {
            setFormError('A member with this email already exists.');
            return;
        }

        const member: Member = {
            id: `member-${Date.now()}`,
            name,
            email: memberEmail,
            role: newRole,
            status: newStatus,
            joinedAt: new Date().toISOString(),
            avatarUrl: avatarFor(name),
        };

        setMembers(current => [member, ...current]);
        closeModal();
    };

    const openLink = async (url: string, unavailableMessage: string) => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Unable to open', unavailableMessage);
        }
    };

    const handleMore = (member: Member) => {
        const nextStatus: MemberStatus = member.status === 'Active' ? 'Inactive' : 'Active';
        Alert.alert(member.name, 'Manage this team member.', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: `Mark ${nextStatus}`,
                onPress: () =>
                    setMembers(current =>
                        current.map(item =>
                            item.id === member.id ? { ...item, status: nextStatus } : item,
                        ),
                    ),
            },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: () =>
                    setMembers(current => current.filter(item => item.id !== member.id)),
            },
        ]);
    };

    const handleTabPress = (label: string) => {
        if (label === 'Home') {
            navigation.navigate('Home', { email });
        } else if (label === 'Schedule') {
            navigation.navigate('Schedule', { email });
        } else if (label === 'Profile') {
            navigation.navigate('Profile', { email });
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    {
                        paddingTop: headerHeight - 24,
                        paddingHorizontal: horizontalPadding,
                        paddingBottom: tabBarHeight + 20,
                    },
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={['#075D82', '#079C9E', '#62D6B2']}
                    locations={[0, 0.56, 1]}
                    start={{ x: 0.05, y: 0 }}
                    end={{ x: 0.95, y: 1 }}
                    style={[styles.header, { height: headerHeight }]}
                >
                    <Pressable
                        accessibilityLabel="Back to Home"
                        accessibilityRole="button"
                        hitSlop={10}
                        onPress={() => navigation.navigate('Home', { email })}
                        style={({ pressed }) => [
                            styles.backButton,
                            { top: insets.top + 8, left: horizontalPadding - 8 },
                            pressed && styles.pressed,
                        ]}
                    >
                        <AppIcon color="#FFFFFF" name="back" size={25} />
                    </Pressable>
                    <View
                        style={[
                            styles.heroCopy,
                            {
                                top: insets.top + 58,
                                left: horizontalPadding,
                                maxWidth: width * 0.53,
                            },
                        ]}
                    >
                        <Text style={styles.eyebrow}>Our</Text>
                        <Text style={styles.heroTitle}>Members</Text>
                        <Text style={styles.heroSubtitle}>The people shaping every space, together.</Text>
                    </View>
                    <View
                        style={[
                            styles.illustration,
                            narrow && styles.illustrationNarrow,
                            { top: insets.top + 48 },
                        ]}
                    >
                        <TeamIllustration />
                    </View>
                </LinearGradient>

                <Svg
                    pointerEvents="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 38"
                    style={[styles.wave, { top: headerHeight - 70 }]}
                >
                    <Path
                        d="M0 25 C17 13 31 21 45 17 C61 12 67 3 79 7 C89 10 95 17 100 15 L100 38 L0 38 Z"
                        fill="#F4FAFA"
                    />
                </Svg>

                <View style={styles.summaryPanel}>
                    {stats.map((stat, index) => (
                        <View
                            key={stat.label}
                            style={[
                                styles.stat,
                                index < stats.length - 1 && styles.statDivider,
                            ]}
                        >
                            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                            <Text numberOfLines={2} style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.toolbar}>
                    <View style={styles.searchField}>
                        <AppIcon color="#8A9B9E" name="search" size={19} />
                        <TextInput
                            accessibilityLabel="Search members"
                            autoCapitalize="none"
                            onChangeText={setSearch}
                            placeholder="Search name, email or role"
                            placeholderTextColor="#94A3A6"
                            returnKeyType="search"
                            style={styles.searchInput}
                            value={search}
                        />
                        {search ? (
                            <Pressable
                                accessibilityLabel="Clear search"
                                hitSlop={8}
                                onPress={() => setSearch('')}
                            >
                                <AppIcon color="#8A9B9E" name="close" size={17} />
                            </Pressable>
                        ) : null}
                    </View>
                    <Pressable
                        accessibilityLabel={`Filter members, ${statusFilter} selected`}
                        accessibilityRole="button"
                        accessibilityState={{ expanded: filterOpen }}
                        onPress={() => setFilterOpen(current => !current)}
                        style={({ pressed }) => [
                            styles.filterButton,
                            statusFilter !== 'All' && styles.filterButtonActive,
                            pressed && styles.pressed,
                        ]}
                    >
                        <AppIcon
                            color={statusFilter === 'All' ? '#687D81' : '#FFFFFF'}
                            name="filter"
                            size={20}
                        />
                    </Pressable>
                </View>

                {filterOpen ? (
                    <View style={styles.filterOptions}>
                        {(['All', 'Active', 'Inactive'] as StatusFilter[]).map(option => {
                            const selected = statusFilter === option;
                            return (
                                <Pressable
                                    accessibilityLabel={`Filter by ${option}`}
                                    accessibilityRole="radio"
                                    accessibilityState={{ selected }}
                                    key={option}
                                    onPress={() => {
                                        setStatusFilter(option);
                                        setFilterOpen(false);
                                    }}
                                    style={[styles.filterOption, selected && styles.filterOptionSelected]}
                                >
                                    <Text style={[styles.filterOptionText, selected && styles.filterOptionTextSelected]}>
                                        {option}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                ) : null}

                <View style={styles.listHeading}>
                    <Text style={styles.listTitle}>Team Directory</Text>
                    <Text accessibilityLiveRegion="polite" style={styles.resultCount}>
                        {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                    </Text>
                </View>

                {filteredMembers.length ? (
                    <View style={styles.memberList}>
                        {filteredMembers.map(member => {
                            const roleColor = roleColors[member.role] || {
                                background: '#E7F3F3',
                                text: '#347478',
                            };
                            return (
                                <View key={member.id} style={styles.memberCard}>
                                    <View style={styles.memberHeader}>
                                        <View style={styles.avatarWrap}>
                                            <Image
                                                accessibilityLabel={`${member.name} avatar`}
                                                onError={() =>
                                                    setFailedAvatars(current => ({
                                                        ...current,
                                                        [member.id]: true,
                                                    }))
                                                }
                                                source={failedAvatars[member.id] ? PROFILE_AVATAR : { uri: member.avatarUrl }}
                                                style={styles.avatar}
                                            />
                                            <View
                                                style={[
                                                    styles.onlineDot,
                                                    member.status === 'Inactive' && styles.offlineDot,
                                                ]}
                                            />
                                        </View>
                                        <View style={styles.memberIdentity}>
                                            <Text numberOfLines={1} style={styles.memberName}>{member.name}</Text>
                                            <Text numberOfLines={1} style={styles.memberEmail}>{member.email}</Text>
                                        </View>
                                        <Pressable
                                            accessibilityLabel={`Manage ${member.name}`}
                                            accessibilityRole="button"
                                            hitSlop={8}
                                            onPress={() => handleMore(member)}
                                            style={({ pressed }) => [styles.moreButton, pressed && styles.pressed]}
                                        >
                                            <AppIcon color="#849598" name="more" size={20} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.metaRow}>
                                        <View style={[styles.roleChip, { backgroundColor: roleColor.background }]}>
                                            <Text numberOfLines={1} style={[styles.roleText, { color: roleColor.text }]}>
                                                {member.role}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.statusPill,
                                                member.status === 'Inactive' && styles.inactivePill,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.statusDot,
                                                    member.status === 'Inactive' && styles.inactiveStatusDot,
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    member.status === 'Inactive' && styles.inactiveStatusText,
                                                ]}
                                            >
                                                {member.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardActions}>
                                        <Pressable
                                            accessibilityLabel={`Message ${member.name}`}
                                            accessibilityRole="button"
                                            onPress={() => {
                                                if (member.phone) {
                                                    openLink(`sms:${member.phone}`, 'Messaging is unavailable on this device.');
                                                } else {
                                                    Alert.alert('No phone number', `${member.name} does not have a phone number yet.`);
                                                }
                                            }}
                                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                                        >
                                            <AppIcon name="message" size={17} />
                                        </Pressable>
                                        <Pressable
                                            accessibilityLabel={`Email ${member.name}`}
                                            accessibilityRole="button"
                                            onPress={() => openLink(`mailto:${member.email}`, 'Email is unavailable on this device.')}
                                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                                        >
                                            <AppIcon name="mail" size={17} />
                                        </Pressable>
                                        <Pressable
                                            accessibilityLabel={`Call ${member.name}`}
                                            accessibilityRole="button"
                                            onPress={() => {
                                                if (member.phone) {
                                                    openLink(`tel:${member.phone}`, 'Calling is unavailable on this device.');
                                                } else {
                                                    Alert.alert('No phone number', `${member.name} does not have a phone number yet.`);
                                                }
                                            }}
                                            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
                                        >
                                            <AppIcon name="phone" size={17} />
                                        </Pressable>
                                        <Pressable
                                            accessibilityLabel={`View ${member.name} details`}
                                            accessibilityRole="button"
                                            onPress={() =>
                                                Alert.alert(member.name, `${member.role}\n${member.email}\n${member.status}`)
                                            }
                                            style={({ pressed }) => [styles.detailButton, pressed && styles.pressed]}
                                        >
                                            <Text style={styles.detailText}>Details</Text>
                                            <AppIcon color="#829396" name="chevron" size={15} />
                                        </Pressable>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIcon}>
                            <AppIcon color="#159B9A" name="members" size={28} />
                        </View>
                        <Text style={styles.emptyTitle}>No members found</Text>
                        <Text style={styles.emptyText}>Try another search or choose a different status.</Text>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => {
                                setSearch('');
                                setStatusFilter('All');
                            }}
                            style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}
                        >
                            <Text style={styles.resetText}>Clear filters</Text>
                        </Pressable>
                    </View>
                )}

                <Pressable
                    accessibilityLabel="Add new member"
                    accessibilityRole="button"
                    onPress={() => setModalVisible(true)}
                    style={({ pressed }) => [styles.addBannerPressable, pressed && styles.pressed]}
                >
                    <LinearGradient
                        colors={['#12B8A4', '#078AA1']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.addBanner}
                    >
                        <View>
                            <Text style={styles.addTitle}>Grow your project team</Text>
                            <Text style={styles.addSubtitle}>Add a collaborator in a few taps.</Text>
                        </View>
                        <View style={styles.addIcon}>
                            <AppIcon color="#078C99" name="add" size={23} />
                        </View>
                    </LinearGradient>
                </Pressable>
            </ScrollView>

            <View style={[styles.tabBar, { height: tabBarHeight, paddingBottom: insets.bottom }]}>
                {tabs.map(tab => {
                    const selected = tab.label === 'Members';
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

            <Modal
                animationType="slide"
                onRequestClose={closeModal}
                transparent
                visible={modalVisible}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalOverlay}
                >
                    <Pressable accessibilityLabel="Close add member form" onPress={closeModal} style={styles.modalDismiss} />
                    <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom, 18) }]}>
                        <View style={styles.modalHandle} />
                        <View style={styles.modalHeader}>
                            <View>
                                <Text style={styles.modalTitle}>Add New Member</Text>
                                <Text style={styles.modalSubtitle}>Create a new team profile.</Text>
                            </View>
                            <Pressable
                                accessibilityLabel="Close"
                                accessibilityRole="button"
                                onPress={closeModal}
                                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
                            >
                                <AppIcon color="#657A7E" name="close" size={20} />
                            </Pressable>
                        </View>

                        <Text style={styles.inputLabel}>Full name</Text>
                        <TextInput
                            accessibilityLabel="Full name"
                            autoCapitalize="words"
                            onChangeText={value => {
                                setNewName(value);
                                setFormError('');
                            }}
                            placeholder="e.g. Priya Sharma"
                            placeholderTextColor="#9AA8AA"
                            style={styles.formInput}
                            value={newName}
                        />
                        <Text style={styles.inputLabel}>Email address</Text>
                        <TextInput
                            accessibilityLabel="Email address"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={value => {
                                setNewEmail(value);
                                setFormError('');
                            }}
                            placeholder="name@inteshape.com"
                            placeholderTextColor="#9AA8AA"
                            style={styles.formInput}
                            value={newEmail}
                        />

                        <Text style={styles.inputLabel}>Role</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rolePicker}>
                            {roles.map(role => {
                                const selected = role === newRole;
                                return (
                                    <Pressable
                                        accessibilityLabel={`Select ${role} role`}
                                        accessibilityRole="radio"
                                        accessibilityState={{ selected }}
                                        key={role}
                                        onPress={() => setNewRole(role)}
                                        style={[styles.roleOption, selected && styles.roleOptionSelected]}
                                    >
                                        <Text style={[styles.roleOptionText, selected && styles.roleOptionTextSelected]}>{role}</Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                        <Text style={styles.inputLabel}>Status</Text>
                        <View style={styles.statusPicker}>
                            {(['Active', 'Inactive'] as MemberStatus[]).map(status => {
                                const selected = status === newStatus;
                                return (
                                    <Pressable
                                        accessibilityLabel={`Set status ${status}`}
                                        accessibilityRole="radio"
                                        accessibilityState={{ selected }}
                                        key={status}
                                        onPress={() => setNewStatus(status)}
                                        style={[styles.statusOption, selected && styles.statusOptionSelected]}
                                    >
                                        <Text style={[styles.statusOptionText, selected && styles.statusOptionTextSelected]}>{status}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {formError ? <Text accessibilityLiveRegion="polite" style={styles.formError}>{formError}</Text> : null}

                        <View style={styles.modalActions}>
                            <Pressable
                                accessibilityLabel="Cancel adding member"
                                accessibilityRole="button"
                                onPress={closeModal}
                                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                accessibilityLabel="Submit new member"
                                accessibilityRole="button"
                                onPress={addMember}
                                style={({ pressed }) => [styles.submitPressable, pressed && styles.pressed]}
                            >
                                <LinearGradient
                                    colors={['#12B8A4', '#078AA1']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={styles.submitButton}
                                >
                                    <Text style={styles.submitText}>Add Member</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#F4FAFA' },
    header: { position: 'absolute', top: 0, right: 0, left: 0 },
    backButton: {
        position: 'absolute',
        zIndex: 3,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroCopy: { position: 'absolute', zIndex: 2 },
    eyebrow: { color: '#D8F6F0', fontSize: 13, fontFamily: 'sans-serif-medium' },
    heroTitle: { marginTop: -2, color: '#FFFFFF', fontSize: 31, lineHeight: 38, fontFamily: 'sans-serif-medium' },
    heroSubtitle: { marginTop: 5, color: '#DDF7F2', fontSize: 11, lineHeight: 16 },
    illustration: { position: 'absolute', right: 12, opacity: 0.98 },
    illustrationNarrow: { right: 2 },
    wave: { position: 'absolute', right: 0, left: 0, height: 92 },
    content: { minHeight: '100%' },
    summaryPanel: {
        minHeight: 76,
        borderWidth: 1,
        borderColor: '#E9F0F0',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'stretch',
        elevation: 4,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
    },
    stat: { flex: 1, paddingHorizontal: 4, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
    statDivider: { borderRightWidth: 1, borderRightColor: '#EDF2F2' },
    statValue: { fontSize: 20, lineHeight: 24, fontFamily: 'sans-serif-medium' },
    statLabel: { marginTop: 3, color: '#75878A', fontSize: 8, lineHeight: 11, textAlign: 'center' },
    toolbar: { marginTop: 14, flexDirection: 'row', columnGap: 9 },
    searchField: {
        flex: 1,
        height: 46,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#E2EAEA',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: { flex: 1, height: 46, paddingHorizontal: 9, paddingVertical: 0, color: '#294A50', fontSize: 11 },
    filterButton: {
        width: 46,
        height: 46,
        borderWidth: 1,
        borderColor: '#E2EAEA',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButtonActive: { borderColor: '#139FA3', backgroundColor: '#139FA3' },
    filterOptions: {
        marginTop: 8,
        padding: 4,
        borderWidth: 1,
        borderColor: '#E2EAEA',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
    },
    filterOption: { flex: 1, minHeight: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    filterOptionSelected: { backgroundColor: '#DFF5F1' },
    filterOptionText: { color: '#687D81', fontSize: 11, fontFamily: 'sans-serif-medium' },
    filterOptionTextSelected: { color: '#0A8E91' },
    listHeading: { marginTop: 17, marginBottom: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    listTitle: { color: '#244A51', fontSize: 15, fontFamily: 'sans-serif-medium' },
    resultCount: { color: '#86979A', fontSize: 10 },
    memberList: { rowGap: 10 },
    memberCard: {
        padding: 13,
        borderWidth: 1,
        borderColor: '#E7EEEE',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    memberHeader: { flexDirection: 'row', alignItems: 'center' },
    avatarWrap: { width: 48, height: 48 },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#D8F2EC' },
    onlineDot: {
        position: 'absolute',
        right: 0,
        bottom: 1,
        width: 12,
        height: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 6,
        backgroundColor: '#2AB07E',
    },
    offlineDot: { backgroundColor: '#A6B2B4' },
    memberIdentity: { flex: 1, minWidth: 0, marginLeft: 11 },
    memberName: { color: '#294B51', fontSize: 13, fontFamily: 'sans-serif-medium' },
    memberEmail: { marginTop: 3, color: '#869699', fontSize: 9 },
    moreButton: { width: 38, height: 42, alignItems: 'center', justifyContent: 'center' },
    metaRow: { marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    roleChip: { maxWidth: '68%', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 6 },
    roleText: { fontSize: 9, fontFamily: 'sans-serif-medium' },
    statusPill: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 12, backgroundColor: '#E6F7F0', flexDirection: 'row', alignItems: 'center' },
    inactivePill: { backgroundColor: '#F3F0F0' },
    statusDot: { width: 5, height: 5, marginRight: 5, borderRadius: 3, backgroundColor: '#24A276' },
    inactiveStatusDot: { backgroundColor: '#9AA6A8' },
    statusText: { color: '#258367', fontSize: 8, fontFamily: 'sans-serif-medium' },
    inactiveStatusText: { color: '#7D8B8E' },
    cardActions: { marginTop: 11, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#EDF2F2', flexDirection: 'row', alignItems: 'center' },
    actionButton: { width: 38, height: 34, marginRight: 6, borderRadius: 6, backgroundColor: '#E9F7F4', alignItems: 'center', justifyContent: 'center' },
    detailButton: { minWidth: 76, height: 34, marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
    detailText: { marginRight: 2, color: '#718589', fontSize: 9, fontFamily: 'sans-serif-medium' },
    emptyState: { paddingHorizontal: 30, paddingVertical: 30, borderWidth: 1, borderColor: '#E2EAEA', borderRadius: 8, backgroundColor: '#FFFFFF', alignItems: 'center' },
    emptyIcon: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#E2F6F2', alignItems: 'center', justifyContent: 'center' },
    emptyTitle: { marginTop: 12, color: '#294B51', fontSize: 14, fontFamily: 'sans-serif-medium' },
    emptyText: { marginTop: 5, color: '#7F9194', fontSize: 10, lineHeight: 15, textAlign: 'center' },
    resetButton: { minHeight: 40, marginTop: 10, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
    resetText: { color: '#0B9698', fontSize: 11, fontFamily: 'sans-serif-medium' },
    addBannerPressable: { marginTop: 13, borderRadius: 8 },
    addBanner: { minHeight: 82, paddingHorizontal: 17, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    addTitle: { color: '#FFFFFF', fontSize: 14, fontFamily: 'sans-serif-medium' },
    addSubtitle: { marginTop: 4, color: '#DDF7F2', fontSize: 9 },
    addIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
    tabBar: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: '#E7ECEC',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        elevation: 12,
        shadowColor: '#153C43',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    tab: { flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center' },
    tabLabel: { marginTop: 2, fontSize: 9, fontFamily: 'sans-serif-medium' },
    pressed: { opacity: 0.68 },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(10, 42, 48, 0.46)' },
    modalDismiss: { flex: 1 },
    modalSheet: { paddingHorizontal: 18, paddingTop: 8, borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: '#FFFFFF' },
    modalHandle: { width: 36, height: 4, marginBottom: 13, borderRadius: 2, backgroundColor: '#D5DEDF', alignSelf: 'center' },
    modalHeader: { marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    modalTitle: { color: '#274A50', fontSize: 19, fontFamily: 'sans-serif-medium' },
    modalSubtitle: { marginTop: 2, color: '#809194', fontSize: 10 },
    closeButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
    inputLabel: { marginBottom: 6, color: '#4F686C', fontSize: 10, fontFamily: 'sans-serif-medium' },
    formInput: { height: 44, marginBottom: 12, paddingHorizontal: 12, paddingVertical: 0, borderWidth: 1, borderColor: '#DDE7E7', borderRadius: 7, backgroundColor: '#FBFDFD', color: '#294A50', fontSize: 11 },
    rolePicker: { maxHeight: 37, marginBottom: 12 },
    roleOption: { height: 36, marginRight: 7, paddingHorizontal: 12, borderWidth: 1, borderColor: '#DDE7E7', borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
    roleOptionSelected: { borderColor: '#159D9E', backgroundColor: '#E1F6F2' },
    roleOptionText: { color: '#748689', fontSize: 9 },
    roleOptionTextSelected: { color: '#0A8F92', fontFamily: 'sans-serif-medium' },
    statusPicker: { height: 42, padding: 3, borderRadius: 7, backgroundColor: '#EFF4F4', flexDirection: 'row' },
    statusOption: { flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    statusOptionSelected: { backgroundColor: '#FFFFFF', elevation: 1 },
    statusOptionText: { color: '#7C8D90', fontSize: 10 },
    statusOptionTextSelected: { color: '#0A9295', fontFamily: 'sans-serif-medium' },
    formError: { marginTop: 8, color: '#C75757', fontSize: 10 },
    modalActions: { marginTop: 15, flexDirection: 'row', columnGap: 10 },
    cancelButton: { flex: 1, height: 46, borderWidth: 1, borderColor: '#D9E4E4', borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
    cancelText: { color: '#657A7E', fontSize: 11, fontFamily: 'sans-serif-medium' },
    submitPressable: { flex: 1, borderRadius: 7 },
    submitButton: { height: 46, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
    submitText: { color: '#FFFFFF', fontSize: 11, fontFamily: 'sans-serif-medium' },
});

export default MembersScreen;