import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Image,
    NativeModules,
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

const { AlertSound } = NativeModules as {
    AlertSound?: { playSuccess: () => void };
};

const HOTEL_IMAGE = require('../../assets/main-banner1.jpg');
const TEAL = '#079C9E';
const INK = '#172022';

const HOTELS = [
    {
        id: 'panshi',
        name: 'Panshi Hotel in Sylhet',
        place: 'Sylhet, Bangladesh',
        price: 200,
        rating: '4.8',
    },
    {
        id: 'presaton',
        name: 'Presaton Hotel',
        place: 'Dhaka, Bangladesh',
        price: 180,
        rating: '4.6',
    },
    {
        id: 'grand',
        name: 'Grand Palace Hotel',
        place: 'Chattogram, Bangladesh',
        price: 165,
        rating: '4.7',
    },
    {
        id: 'garden',
        name: 'Garden View Resort',
        place: 'Sreemangal, Bangladesh',
        price: 145,
        rating: '4.5',
    },
    {
        id: 'marina',
        name: 'Marina Bay Hotel',
        place: "Cox's Bazar, Bangladesh",
        price: 220,
        rating: '4.9',
    },
    {
        id: 'heritage',
        name: 'Heritage Grand Hotel',
        place: 'Rajshahi, Bangladesh',
        price: 155,
        rating: '4.6',
    },
];

const formatStayDate = (value: string) => {
    const [day, month] = value.split('/');
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${Number(day)} ${monthNames[Number(month) - 1] ?? ''}`.trim();
};

const getNightCount = (checkIn: string, checkOut: string) => {
    const toTime = (value: string) => {
        const [day, month, year] = value.split('/').map(Number);
        return Date.UTC(year, month - 1, day);
    };
    return Math.max(
        1,
        Math.round((toTime(checkOut) - toTime(checkIn)) / 86400000),
    );
};

type IconName =
    | 'back'
    | 'bell'
    | 'calendar'
    | 'card'
    | 'check'
    | 'clock'
    | 'download'
    | 'heart'
    | 'home'
    | 'info'
    | 'list'
    | 'pin'
    | 'search'
    | 'ticket'
    | 'user';

function Icon({
    name,
    color = '#687476',
    size = 18,
}: {
    name: IconName;
    color?: string;
    size?: number;
}) {
    const common = {
        fill: 'none' as const,
        stroke: color,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.8,
    };

    return (
        <Svg
            accessibilityElementsHidden
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            {name === 'back' ? <Path {...common} d="m15 18-6-6 6-6" /> : null}
            {name === 'search' ? (
                <>
                    <Circle {...common} cx="10.5" cy="10.5" r="6.5" />
                    <Path {...common} d="m16 16 4 4" />
                </>
            ) : null}
            {name === 'bell' ? (
                <>
                    <Path
                        {...common}
                        d="M18 9a6 6 0 0 0-12 0c0 6-3 6-3 8h18c0-2-3-2-3-8"
                    />
                    <Path {...common} d="M10 21h4" />
                </>
            ) : null}
            {name === 'pin' ? (
                <>
                    <Path
                        {...common}
                        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                    />
                    <Circle {...common} cx="12" cy="10" r="2.4" />
                </>
            ) : null}
            {name === 'calendar' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18" />
                </>
            ) : null}
            {name === 'card' ? (
                <>
                    <Rect {...common} x="3" y="6" width="18" height="13" rx="2" />
                    <Path {...common} d="M3 10h18M7 15h4" />
                </>
            ) : null}
            {name === 'clock' ? (
                <>
                    <Circle {...common} cx="12" cy="12" r="8" />
                    <Path {...common} d="M12 7v5l3 2" />
                </>
            ) : null}
            {name === 'ticket' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="14" rx="2" />
                    <Path {...common} d="M8 9h8m-8 3h5m-5 3h7" />
                </>
            ) : null}
            {name === 'user' ? (
                <>
                    <Circle {...common} cx="12" cy="8" r="3" />
                    <Path {...common} d="M5 20c.5-4 2.8-6 7-6s6.5 2 7 6" />
                </>
            ) : null}
            {name === 'heart' ? (
                <Path
                    {...common}
                    d="M20.8 5.7a5.4 5.4 0 0 0-7.7 0L12 6.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 22l8.8-8.6a5.4 5.4 0 0 0 0-7.7Z"
                />
            ) : null}
            {name === 'check' ? <Path {...common} d="m5 12 4 4L19 6" /> : null}
            {name === 'download' ? (
                <>
                    <Path {...common} d="M12 3v12m-4-4 4 4 4-4" />
                    <Path {...common} d="M5 20h14" />
                </>
            ) : null}
            {name === 'home' ? (
                <>
                    <Path {...common} d="m3 11 9-8 9 8" />
                    <Path {...common} d="M5 10v10h14V10M9 20v-6h6v6" />
                </>
            ) : null}
            {name === 'info' ? (
                <>
                    <Circle {...common} cx="12" cy="12" r="9" />
                    <Path {...common} d="M12 11v5M12 8h.01" />
                </>
            ) : null}
            {name === 'list' ? (
                <>
                    <Path {...common} d="M9 6h11M9 12h11M9 18h11" />
                    <Circle {...common} cx="4.5" cy="6" r=".8" />
                    <Circle {...common} cx="4.5" cy="12" r=".8" />
                    <Circle {...common} cx="4.5" cy="18" r=".8" />
                </>
            ) : null}
        </Svg>
    );
}

function ScreenHeader({
    title,
    onBack,
    right,
}: {
    title: string;
    onBack: () => void;
    right?: React.ReactNode;
}) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <Pressable
                accessibilityLabel="Go back"
                accessibilityRole="button"
                hitSlop={10}
                onPress={onBack}
                style={styles.headerAction}
            >
                <Icon name="back" color={INK} />
            </Pressable>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerAction}>{right}</View>
        </View>
    );
}

function PrimaryButton({
    label,
    onPress,
    prominent = false,
}: {
    label: string;
    onPress: () => void;
    prominent?: boolean;
}) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.primaryButton,
                prominent && styles.searchPrimaryButton,
                pressed && styles.pressed,
            ]}
        >
            <Text
                style={[
                    styles.primaryButtonText,
                    prominent && styles.searchPrimaryButtonText,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

type SearchProps = NativeStackScreenProps<RootStackParamList, 'HotelSearch'>;

export function HotelSearchScreen({ navigation, route }: SearchProps) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('09/08/2026');
    const [checkOut, setCheckOut] = useState('15/08/2026');
    const [guests, setGuests] = useState(1);
    const compact = height < 760;
    const horizontalPadding = width < 360 ? 16 : 20;
    const tabBarHeight = 68 + insets.bottom;

    const search = () =>
        navigation.navigate('HotelList', {
            email: route.params.email,
            location: location.trim() || 'Dhaka',
            checkIn,
            checkOut,
            guests,
        });

    return (
        <LinearGradient
            colors={['#075D82', '#0B98A1', '#51C9B0']}
            locations={[0, 0.5, 1]}
            start={{ x: 0.08, y: 0 }}
            end={{ x: 0.92, y: 1 }}
            style={styles.hotelSearchScreen}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.searchContent,
                    {
                        paddingHorizontal: horizontalPadding,
                        paddingTop: insets.top + (compact ? 22 : 42),
                        paddingBottom: tabBarHeight + 24,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.searchTopRow}>
                    <Text style={styles.exploreTitle}>Let Explore the{`\n`}world!</Text>
                    <View style={styles.searchTopIcons}>
                        <Pressable accessibilityLabel="Search" hitSlop={10}>
                            <Icon name="search" color="#FFFFFF" size={28} />
                        </Pressable>
                        <Pressable accessibilityLabel="Notifications" hitSlop={10}>
                            <Icon name="bell" color="#FFFFFF" size={27} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.bookingTabs}>
                    <Pressable style={[styles.bookingTab, styles.bookingTabActive]}>
                        <Text style={styles.bookingTabActiveText}>Flight booking</Text>
                    </Pressable>
                    <Pressable
                        accessibilityLabel="Hotel booking"
                        accessibilityRole="button"
                        onPress={search}
                        style={styles.bookingTab}
                    >
                        <Text style={styles.bookingTabText}>Hotel booking</Text>
                    </Pressable>
                </View>

                <View style={styles.searchPanel}>
                    <View style={styles.inputShell}>
                        <Icon name="pin" color="#FFFFFF" size={22} />
                        <TextInput
                            accessibilityLabel="Hotel location"
                            onChangeText={setLocation}
                            placeholder="From"
                            placeholderTextColor="rgba(3,71,94,0.72)"
                            style={styles.textInput}
                            value={location}
                        />
                    </View>
                    <View style={styles.dateRow}>
                        <Pressable
                            onPress={() =>
                                setCheckIn(value =>
                                    value === '09/08/2026' ? '10/08/2026' : '09/08/2026',
                                )
                            }
                            style={[styles.inputShell, styles.halfInput]}
                        >
                            <Icon name="calendar" color="#FFFFFF" size={22} />
                            <Text style={styles.searchInputValue}>From</Text>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                setCheckOut(value =>
                                    value === '15/08/2026' ? '16/08/2026' : '15/08/2026',
                                )
                            }
                            style={[styles.inputShell, styles.halfInput]}
                        >
                            <Icon name="calendar" color="#FFFFFF" size={22} />
                            <Text style={styles.searchInputValue}>To</Text>
                        </Pressable>
                    </View>
                    <Pressable
                        accessibilityLabel="Change guests"
                        onPress={() => setGuests(value => (value === 4 ? 1 : value + 1))}
                        style={styles.inputShell}
                    >
                        <Icon name="user" color="#FFFFFF" size={22} />
                        <Text style={styles.searchInputValue}>{guests === 1 ? 'Person' : `${guests} Persons`}</Text>
                        <Text style={styles.searchTrailing}>⌄</Text>
                    </Pressable>
                    <PrimaryButton label="Search Hotels" onPress={search} prominent />
                </View>

                <View style={styles.sectionHeading}>
                    <Text style={styles.sectionTitle}>Spacial offer</Text>
                    <Pressable accessibilityLabel="View all offers" style={styles.viewAllButton}>
                        <Text style={styles.viewAll}>View all</Text>
                        <Text style={styles.viewAllArrow}>›</Text>
                    </Pressable>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.offerRow}
                >
                    {HOTELS.slice(0, 2).map((hotel, index) => (
                        <Pressable
                            key={hotel.id}
                            onPress={search}
                            style={({ pressed }) => [
                                styles.offerCard,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Image
                                source={HOTEL_IMAGE}
                                style={[
                                    styles.offerImage,
                                    { transform: [{ scale: 1 + index * 0.12 }] },
                                ]}
                            />
                            <View style={styles.offerBadge}>
                                <Text style={styles.offerBadgeText}>{20 - index * 5}% OFF</Text>
                            </View>
                            <View style={styles.offerHeart}>
                                <Icon name="heart" color="#FFFFFF" size={22} />
                            </View>
                            <Text numberOfLines={1} style={styles.offerTitle}>
                                Preston Hotel
                            </Text>
                            <View style={styles.offerLocationRow}>
                                <Icon name="pin" color="rgba(255,255,255,0.78)" size={14} />
                                <Text numberOfLines={1} style={styles.offerPlace}>
                                    {index === 0 ? 'Phu Quoc, Vietnam' : 'Bali, Indonesia'}
                                </Text>
                            </View>
                            <Text style={styles.offerPrice}>
                                ${index === 0 ? '200.00' : '250.00'}
                                <Text style={styles.offerNight}> / Night</Text>
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </ScrollView>
            <View
                style={[
                    styles.hotelSearchTabBar,
                    { height: tabBarHeight, paddingBottom: insets.bottom },
                ]}
            >
                {[
                    { icon: 'home' as IconName, label: 'Home' },
                    { icon: 'calendar' as IconName, label: 'Bookings' },
                    { icon: 'ticket' as IconName, label: 'Offers' },
                    { icon: 'user' as IconName, label: 'Profile' },
                ].map(tab => {
                    const selected = tab.label === 'Home';
                    const handlePress = () => {
                        if (tab.label === 'Home') {
                            navigation.navigate('Home', { email: route.params.email });
                        } else if (tab.label === 'Bookings') {
                            navigation.navigate('Schedule', { email: route.params.email });
                        } else if (tab.label === 'Profile') {
                            navigation.navigate('Profile', { email: route.params.email });
                        }
                    };

                    return (
                        <Pressable
                            accessibilityLabel={tab.label}
                            accessibilityRole="button"
                            key={tab.label}
                            onPress={handlePress}
                            style={styles.hotelSearchTab}
                        >
                            <Icon
                                name={tab.icon}
                                color={selected ? '#FFFFFF' : 'rgba(255,255,255,0.62)'}
                                size={24}
                            />
                            <Text
                                style={[
                                    styles.hotelSearchTabText,
                                    selected && styles.hotelSearchTabTextActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                            {selected ? <View style={styles.hotelSearchTabIndicator} /> : null}
                        </Pressable>
                    );
                })}
            </View>
        </LinearGradient>
    );
}

type ListProps = NativeStackScreenProps<RootStackParamList, 'HotelList'>;

export function HotelListScreen({ navigation, route }: ListProps) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const horizontalPadding = width < 360 ? 14 : 18;
    const tabBarHeight = 68 + insets.bottom;
    const cardWidth = (width - horizontalPadding * 2 - 12) / 2;

    return (
        <LinearGradient
            colors={['#075D82', '#0B98A1', '#51C9B0']}
            locations={[0, 0.48, 1]}
            start={{ x: 0.08, y: 0 }}
            end={{ x: 0.92, y: 1 }}
            style={styles.hotelListScreen}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.listContent,
                    {
                        paddingBottom: tabBarHeight + 20,
                        paddingHorizontal: horizontalPadding,
                        paddingTop: insets.top + 14,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.hotelListHeader}>
                    <Pressable
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                        hitSlop={10}
                        onPress={() => navigation.goBack()}
                        style={styles.hotelListBack}
                    >
                        <Icon name="back" color="#FFFFFF" size={30} />
                    </Pressable>
                    <Text style={styles.hotelListTitle}>Hotels</Text>
                </View>
                <View style={styles.hotelGrid}>
                    {HOTELS.map((hotel, index) => (
                        <Pressable
                            accessibilityLabel={`Open ${hotel.name}`}
                            key={hotel.id}
                            onPress={() =>
                                navigation.navigate('HotelDetails', {
                                    email: route.params.email,
                                    hotelId: hotel.id,
                                    checkIn: route.params.checkIn,
                                    checkOut: route.params.checkOut,
                                    guests: route.params.guests,
                                })
                            }
                            style={({ pressed }) => [
                                styles.hotelCard,
                                { width: cardWidth },
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.hotelImageWrap}>
                                <Image
                                    source={HOTEL_IMAGE}
                                    style={[
                                        styles.hotelImage,
                                        {
                                            transform: [
                                                { scale: 1.05 + (index % 3) * 0.12 },
                                                { translateX: index % 2 === 0 ? -5 : 6 },
                                            ],
                                        },
                                    ]}
                                />
                                <View style={styles.heartButton}>
                                    <Icon name="heart" color="#FFFFFF" size={24} />
                                </View>
                            </View>
                            <View style={styles.hotelCardBody}>
                                <Text numberOfLines={1} style={styles.hotelName}>
                                    {hotel.name}
                                </Text>
                                <View style={styles.hotelCardLocation}>
                                    <Icon name="pin" color="rgba(255,255,255,0.78)" size={14} />
                                    <Text numberOfLines={1} style={styles.hotelPlace}>
                                        {hotel.place}
                                    </Text>
                                </View>
                                <Text style={styles.hotelListPrice}>
                                    ${hotel.price}.00
                                    <Text style={styles.hotelListNight}> / Night</Text>
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <View
                style={[
                    styles.hotelSearchTabBar,
                    { height: tabBarHeight, paddingBottom: insets.bottom },
                ]}
            >
                {[
                    { icon: 'home' as IconName, label: 'Home' },
                    { icon: 'calendar' as IconName, label: 'Bookings' },
                    { icon: 'ticket' as IconName, label: 'Offers' },
                    { icon: 'user' as IconName, label: 'Profile' },
                ].map(tab => {
                    const selected = tab.label === 'Home';
                    const handlePress = () => {
                        if (tab.label === 'Home') {
                            navigation.navigate('Home', { email: route.params.email });
                        } else if (tab.label === 'Bookings') {
                            navigation.navigate('Schedule', { email: route.params.email });
                        } else if (tab.label === 'Profile') {
                            navigation.navigate('Profile', { email: route.params.email });
                        }
                    };

                    return (
                        <Pressable
                            accessibilityLabel={tab.label}
                            accessibilityRole="button"
                            key={tab.label}
                            onPress={handlePress}
                            style={styles.hotelSearchTab}
                        >
                            <Icon
                                name={tab.icon}
                                color={selected ? '#FFFFFF' : 'rgba(255,255,255,0.62)'}
                                size={24}
                            />
                            <Text
                                style={[
                                    styles.hotelSearchTabText,
                                    selected && styles.hotelSearchTabTextActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                            {selected ? <View style={styles.hotelSearchTabIndicator} /> : null}
                        </Pressable>
                    );
                })}
            </View>
        </LinearGradient>
    );
}

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'HotelDetails'>;

export function HotelDetailsScreen({ navigation, route }: DetailsProps) {
    const [activeTab, setActiveTab] = useState('Details');
    const hotel =
        HOTELS.find(item => item.id === route.params.hotelId) ?? HOTELS[0];

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.detailsContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroWrap}>
                    <Image source={HOTEL_IMAGE} style={styles.heroImage} />
                    <Pressable
                        accessibilityLabel="Go back"
                        onPress={() => navigation.goBack()}
                        style={styles.floatingBack}
                    >
                        <Icon name="back" color="#FFFFFF" />
                    </Pressable>
                </View>
                <View style={styles.detailsBody}>
                    <View style={styles.hotelTitleRow}>
                        <View style={styles.titleCopy}>
                            <Text style={styles.detailTitle}>{hotel.name}</Text>
                            <Text style={styles.hotelPlace}>◎ {hotel.place}</Text>
                        </View>
                        <Text style={styles.rating}>★ {hotel.rating}</Text>
                    </View>

                    <View style={styles.mapPanel}>
                        <View style={[styles.mapRoad, styles.roadOne]} />
                        <View style={[styles.mapRoad, styles.roadTwo]} />
                        <View style={[styles.mapRoad, styles.roadThree]} />
                        <View style={styles.mapMarker}>
                            <Icon name="pin" color="#FFFFFF" size={15} />
                        </View>
                        <Text style={styles.mapText}>Show on map</Text>
                    </View>

                    <View style={styles.tabs}>
                        {['Details', 'Trip plan', 'Review'].map(tab => (
                            <Pressable
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab && styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={styles.description}>
                        {activeTab === 'Details'
                            ? 'It is a long established fact that a reader will be distracted by the readable content of a page. The hotel offers beautiful rooms, calm spaces and thoughtful service for a comfortable stay.'
                            : activeTab === 'Trip plan'
                                ? 'Check in, settle into your room, explore local landmarks and enjoy a relaxed dinner before a restful evening.'
                                : 'Guests love the clean rooms, responsive service and convenient location. Rated highly for comfort and value.'}
                    </Text>
                    <View style={styles.bookingBar}>
                        <Text style={styles.bookingPrice}>${hotel.price}.00</Text>
                        <PrimaryButton
                            label="Book Now"
                            onPress={() =>
                                navigation.navigate('HotelCheckout', {
                                    email: route.params.email,
                                    hotelId: hotel.id,
                                    nightlyPrice: hotel.price,
                                    checkIn: route.params.checkIn,
                                    checkOut: route.params.checkOut,
                                    guests: route.params.guests,
                                })
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

type CheckoutProps = NativeStackScreenProps<
    RootStackParamList,
    'HotelCheckout'
>;

export function HotelCheckoutScreen({ navigation, route }: CheckoutProps) {
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const nights = getNightCount(route.params.checkIn, route.params.checkOut);
    const subtotal = route.params.nightlyPrice * nights;
    const tax = 25;
    const total = subtotal + tax - discount;

    return (
        <View style={styles.screen}>
            <ScreenHeader title="Check out" onBack={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={styles.checkoutContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.staySummary}>
                    <View>
                        <Text style={styles.stayNights}>
                            {formatStayDate(route.params.checkIn)} →{' '}
                            {formatStayDate(route.params.checkOut)}
                        </Text>
                        <Text style={styles.hotelPlace}>
                            {nights} {nights === 1 ? 'night' : 'nights'} stay
                        </Text>
                    </View>
                    <Text style={styles.stayBadge}>
                        {nights} {nights === 1 ? 'NIGHT' : 'NIGHTS'}
                    </Text>
                </View>

                <Text style={styles.formLabel}>Payment Method</Text>
                <Pressable style={styles.paymentRow}>
                    <View style={styles.payLogo}>
                        <Text style={styles.payLogoText}>G</Text>
                    </View>
                    <Text style={styles.paymentText}>Google Pay</Text>
                    <Text style={styles.trailing}>›</Text>
                </Pressable>

                <Text style={styles.formLabel}>Guests & Rooms</Text>
                <View style={styles.readonlyRow}>
                    <Icon name="user" size={15} />
                    <Text style={styles.inputValue}>
                        1 room, {route.params.guests}{' '}
                        {route.params.guests === 1 ? 'person' : 'people'}
                    </Text>
                </View>

                <Text style={styles.formLabel}>Coupon code</Text>
                <View style={styles.couponRow}>
                    <TextInput
                        autoCapitalize="characters"
                        onChangeText={setCoupon}
                        placeholder="Enter Your Coupon Code"
                        placeholderTextColor="#A1A9AA"
                        style={styles.couponInput}
                        value={coupon}
                    />
                    <Pressable
                        onPress={() => setDiscount(coupon.trim() ? 15 : 0)}
                        style={({ pressed }) => [
                            styles.applyButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text style={styles.applyText}>Apply</Text>
                    </Pressable>
                </View>
                {discount ? (
                    <Text style={styles.appliedText}>Coupon applied successfully</Text>
                ) : null}

                <Text style={styles.formLabel}>
                    1 room X {nights} {nights === 1 ? 'night' : 'nights'}
                </Text>
                <View style={styles.priceBox}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.priceValue}>${subtotal}.00</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>After Discount</Text>
                        <Text style={styles.priceValue}>-${discount}.00</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Tax</Text>
                        <Text style={styles.priceValue}>${tax}.00</Text>
                    </View>
                    <View style={[styles.priceRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Price</Text>
                        <Text style={styles.totalValue}>${total}.00</Text>
                    </View>
                </View>

                <PrimaryButton
                    label="Confirm"
                    onPress={() =>
                        navigation.replace('BookingConfirmed', {
                            email: route.params.email,
                            hotelId: route.params.hotelId,
                            checkIn: route.params.checkIn,
                            checkOut: route.params.checkOut,
                            guests: route.params.guests,
                        })
                    }
                />
            </ScrollView>
        </View>
    );
}

type ConfirmedProps = NativeStackScreenProps<
    RootStackParamList,
    'BookingConfirmed'
>;

export function BookingConfirmedScreen({ navigation, route }: ConfirmedProps) {
    const insets = useSafeAreaInsets();
    const checkReveal = useRef(new Animated.Value(0)).current;
    const sparkleReveal = useRef(new Animated.Value(0)).current;
    const hotel =
        HOTELS.find(item => item.id === route.params.hotelId) ?? HOTELS[0];
    const [day, month, year] = route.params.checkIn.split('/');
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const bookingDate = `${Number(day)} ${monthNames[Number(month) - 1]} ${year}, 04:30 PM`;
    const bookingId = `#BK${route.params.hotelId.toUpperCase().slice(0, 3)}${day}${month}`;

    const returnToFavourites = () =>
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Favourites', params: { email: route.params.email } },
            ],
        });

    useEffect(() => {
        if (Platform.OS === 'android') {
            AlertSound?.playSuccess();
        }

        Animated.sequence([
            Animated.spring(checkReveal, {
                toValue: 1,
                damping: 9,
                stiffness: 170,
                mass: 0.7,
                useNativeDriver: true,
            }),
            Animated.timing(sparkleReveal, {
                toValue: 1,
                duration: 260,
                useNativeDriver: true,
            }),
        ]).start();

        const autoHideTimer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [
                    { name: 'Favourites', params: { email: route.params.email } },
                ],
            });
        }, 15000);

        return () => clearTimeout(autoHideTimer);
    }, [checkReveal, navigation, route.params.email, sparkleReveal]);

    const details: Array<{ icon: IconName; label: string; value: string }> = [
        { icon: 'ticket', label: 'Booking ID', value: bookingId },
        { icon: 'clock', label: 'Date & Time', value: bookingDate },
        { icon: 'pin', label: 'Location', value: hotel.place },
        {
            icon: 'user',
            label: 'Guests',
            value: `${route.params.guests} ${route.params.guests === 1 ? 'Adult' : 'Adults'}`,
        },
    ];

    return (
        <LinearGradient
            colors={['#087F9D', '#10A7A5', '#3BC2AE']}
            locations={[0, 0.48, 1]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.confirmedScreen}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.confirmedContent,
                    {
                        paddingTop: insets.top + 48,
                        paddingBottom: insets.bottom + 24,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.successVisual}>
                    <Animated.View
                        style={[
                            styles.sparkleLayer,
                            {
                                opacity: sparkleReveal,
                                transform: [{ scale: sparkleReveal }],
                            },
                        ]}
                    >
                        <View style={[styles.sparkle, styles.sparkleOne]} />
                        <View style={[styles.sparkle, styles.sparkleTwo]} />
                        <View style={[styles.sparkle, styles.sparkleThree]} />
                        <View style={[styles.sparkle, styles.sparkleFour]} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.confirmBadge,
                            {
                                opacity: checkReveal,
                                transform: [{ scale: checkReveal }],
                            },
                        ]}
                    >
                        <Icon name="check" color="#FFFFFF" size={50} />
                    </Animated.View>
                </View>
                <Text style={styles.confirmedTitle}>Booking Confirmed!</Text>
                <Text style={styles.confirmedText}>
                    Your booking has been confirmed{`\n`}successfully.
                </Text>

                <View style={styles.bookingDetailsCard}>
                    {details.map((detail, index) => (
                        <View
                            key={detail.label}
                            style={[
                                styles.bookingDetailRow,
                                index < details.length - 1 && styles.bookingDetailDivider,
                            ]}
                        >
                            <View style={styles.bookingDetailIcon}>
                                <Icon name={detail.icon} color="#FFFFFF" size={15} />
                            </View>
                            <Text style={styles.bookingDetailLabel}>{detail.label}</Text>
                            <Text style={styles.bookingDetailColon}>:</Text>
                            <Text numberOfLines={2} style={styles.bookingDetailValue}>
                                {detail.value}
                            </Text>
                        </View>
                    ))}
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="View booking details"
                    onPress={() =>
                        navigation.replace('BookingDetails', {
                            email: route.params.email,
                            hotelId: route.params.hotelId,
                            checkIn: route.params.checkIn,
                            checkOut: route.params.checkOut,
                            guests: route.params.guests,
                        })
                    }
                    style={({ pressed }) => [
                        styles.viewBookingButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Text style={styles.viewBookingText}>View Booking Details</Text>
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    onPress={returnToFavourites}
                    style={({ pressed }) => [
                        styles.backToFavouritesButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Text style={styles.backToFavouritesText}>Back to Favourites</Text>
                </Pressable>
            </ScrollView>
        </LinearGradient>
    );
}

type BookingDetailsProps = NativeStackScreenProps<
    RootStackParamList,
    'BookingDetails'
>;

export function BookingDetailsScreen({ navigation, route }: BookingDetailsProps) {
    const insets = useSafeAreaInsets();
    const hotel =
        HOTELS.find(item => item.id === route.params.hotelId) ?? HOTELS[0];
    const [day, month, year] = route.params.checkIn.split('/');
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const bookingDate = `${Number(day)} ${monthNames[Number(month) - 1]} ${year}, 04:30 PM`;
    const bookingId = `#BK${route.params.hotelId.toUpperCase().slice(0, 3)}${day}${month}`;
    const nights = getNightCount(route.params.checkIn, route.params.checkOut);
    const total = hotel.price * nights + 25;
    const details: Array<{ icon: IconName; label: string; value: string }> = [
        { icon: 'clock', label: 'Date & Time', value: bookingDate },
        { icon: 'pin', label: 'Location', value: hotel.place },
        {
            icon: 'user',
            label: 'Guests',
            value: `${route.params.guests} ${route.params.guests === 1 ? 'Adult' : 'Adults'}`,
        },
        {
            icon: 'list',
            label: 'Services',
            value: `${nights}-night Hotel Stay`,
        },
        { icon: 'card', label: 'Payment Method', value: 'Google Pay' },
        { icon: 'info', label: 'Total Amount', value: `$${total}.00` },
    ];

    const backToHome = () =>
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { email: route.params.email } }],
        });

    return (
        <LinearGradient
            colors={['#087F9D', '#13A7A4', '#42C2B1']}
            locations={[0, 0.45, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bookingDetailsScreen}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.bookingDetailsContent,
                    {
                        paddingTop: insets.top + 10,
                        paddingBottom: insets.bottom + 18,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.bookingDetailsHeader}>
                    <Pressable
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                        hitSlop={10}
                        onPress={() => navigation.goBack()}
                        style={styles.bookingDetailsHeaderAction}
                    >
                        <Icon name="back" color="#FFFFFF" size={22} />
                    </Pressable>
                    <Text style={styles.bookingDetailsTitle}>Booking Details</Text>
                    <View style={styles.bookingDetailsHeaderAction} />
                </View>

                <View style={styles.bookingIdentity}>
                    <View style={styles.bookingCalendarBadge}>
                        <Icon name="calendar" color="#FFFFFF" size={27} />
                    </View>
                    <Text style={styles.bookingIdLabel}>Booking ID</Text>
                    <Text style={styles.bookingIdValue}>{bookingId}</Text>
                </View>

                <View style={styles.bookingSummaryCard}>
                    {details.map((detail, index) => (
                        <View
                            key={detail.label}
                            style={[
                                styles.bookingSummaryRow,
                                index < details.length - 1 && styles.bookingSummaryDivider,
                            ]}
                        >
                            <View style={styles.bookingSummaryIcon}>
                                <Icon name={detail.icon} color="#FFFFFF" size={14} />
                            </View>
                            <Text style={styles.bookingSummaryLabel}>{detail.label}</Text>
                            <Text style={styles.bookingSummaryColon}>:</Text>
                            <Text numberOfLines={2} style={styles.bookingSummaryValue}>
                                {detail.value}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.bookingStatusCard}>
                    <Text style={styles.bookingStatusHeading}>Booking Status</Text>
                    <View style={styles.bookingStatusRow}>
                        <View style={styles.bookingStatusIcon}>
                            <Icon name="check" color="#FFFFFF" size={20} />
                        </View>
                        <View>
                            <Text style={styles.bookingStatusTitle}>Confirmed</Text>
                            <Text style={styles.bookingStatusText}>Your booking is confirmed.</Text>
                        </View>
                    </View>
                </View>

                <Pressable
                    accessibilityLabel="Download invoice"
                    accessibilityRole="button"
                    onPress={() =>
                        Alert.alert('Invoice ready', `Invoice ${bookingId} is ready to download.`)
                    }
                    style={({ pressed }) => [
                        styles.invoiceButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Icon name="download" color="#FFFFFF" size={15} />
                    <Text style={styles.invoiceButtonText}>Download Invoice</Text>
                </Pressable>
                <Pressable
                    accessibilityLabel="Back to home"
                    accessibilityRole="button"
                    onPress={backToHome}
                    style={({ pressed }) => [
                        styles.bookingHomeButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Icon name="home" color="#FFFFFF" size={15} />
                    <Text style={styles.bookingHomeButtonText}>Back to Home</Text>
                </Pressable>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#FFFFFF' },
    pressed: { opacity: 0.75 },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 62,
        paddingBottom: 10,
        paddingHorizontal: 12,
    },
    headerAction: {
        alignItems: 'center',
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    headerTitle: { color: INK, flex: 1, fontSize: 18, fontWeight: '700' },
    hotelSearchScreen: { flex: 1 },
    searchContent: { flexGrow: 1 },
    searchTopRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exploreTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 33,
    },
    searchTopIcons: { flexDirection: 'row', gap: 20 },
    bookingTabs: {
        flexDirection: 'row',
        marginBottom: 22,
        marginTop: 20,
        width: '70%',
    },
    bookingTab: {
        alignItems: 'center',
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
        flex: 1,
        paddingBottom: 9,
    },
    bookingTabActive: { borderBottomColor: '#FFFFFF', borderBottomWidth: 2 },
    bookingTabActiveText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
    bookingTabText: { color: 'rgba(255,255,255,0.52)', fontSize: 14 },
    searchPanel: {
        backgroundColor: 'rgba(255,255,255,0.13)',
        borderColor: 'rgba(255,255,255,0.24)',
        borderRadius: 18,
        borderWidth: 1,
        gap: 11,
        padding: 10,
    },
    inputShell: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 15,
        borderWidth: 1,
        flexDirection: 'row',
        height: 58,
        paddingHorizontal: 14,
    },
    textInput: {
        color: '#064B64',
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 12,
        paddingVertical: 0,
    },
    searchInputValue: {
        color: 'rgba(3,71,94,0.72)',
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
    },
    inputValue: { color: '#566264', flex: 1, fontSize: 11, marginLeft: 8 },
    searchTrailing: { color: '#FFFFFF', fontSize: 24, marginBottom: 7 },
    trailing: { color: '#8E989A', fontSize: 17 },
    dateRow: { flexDirection: 'row', gap: 10 },
    halfInput: { flex: 1 },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: TEAL,
        borderRadius: 7,
        height: 43,
        justifyContent: 'center',
        minWidth: 112,
        overflow: 'hidden',
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
    searchPrimaryButton: {
        backgroundColor: '#075D82',
        borderRadius: 16,
        height: 56,
    },
    searchPrimaryButtonText: { fontSize: 16 },
    sectionHeading: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        marginTop: 24,
    },
    sectionTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800' },
    viewAllButton: { alignItems: 'center', flexDirection: 'row', gap: 6 },
    viewAll: { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
    viewAllArrow: {
        borderColor: 'rgba(255,255,255,0.65)',
        borderRadius: 12,
        borderWidth: 1,
        color: '#FFFFFF',
        fontSize: 20,
        height: 24,
        lineHeight: 20,
        textAlign: 'center',
        width: 24,
    },
    offerRow: { gap: 10, paddingBottom: 8 },
    offerCard: {
        backgroundColor: 'rgba(1,116,137,0.3)',
        borderRadius: 17,
        overflow: 'hidden',
        paddingBottom: 13,
        width: 174,
    },
    offerImage: { height: 136, width: '100%' },
    offerBadge: {
        backgroundColor: 'rgba(3,87,109,0.72)',
        borderRadius: 12,
        left: 9,
        paddingHorizontal: 8,
        paddingVertical: 5,
        position: 'absolute',
        top: 9,
    },
    offerBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
    offerHeart: { position: 'absolute', right: 10, top: 10 },
    offerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 11,
        marginTop: 10,
    },
    offerLocationRow: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 7,
    },
    offerPlace: {
        color: 'rgba(255,255,255,0.75)',
        flex: 1,
        fontSize: 11,
        marginLeft: 4,
    },
    offerPrice: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
        marginHorizontal: 11,
        marginTop: 8,
    },
    offerNight: { color: 'rgba(255,255,255,0.78)', fontWeight: '400' },
    hotelSearchTabBar: {
        alignItems: 'flex-start',
        backgroundColor: 'rgba(5,118,139,0.24)',
        borderColor: 'rgba(255,255,255,0.26)',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderWidth: 1,
        bottom: 0,
        flexDirection: 'row',
        left: 0,
        paddingTop: 10,
        position: 'absolute',
        right: 0,
    },
    hotelSearchTab: { alignItems: 'center', flex: 1, height: 58 },
    hotelSearchTabText: {
        color: 'rgba(255,255,255,0.62)',
        fontSize: 10,
        marginTop: 3,
    },
    hotelSearchTabTextActive: { color: '#FFFFFF', fontWeight: '700' },
    hotelSearchTabIndicator: {
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        bottom: 0,
        height: 2,
        position: 'absolute',
        width: 28,
    },
    priceText: {
        color: INK,
        fontSize: 10,
        fontWeight: '700',
        marginHorizontal: 9,
        marginTop: 5,
    },
    hotelListScreen: { flex: 1 },
    listContent: { flexGrow: 1 },
    hotelListHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 66,
        marginBottom: 16,
    },
    hotelListBack: {
        alignItems: 'flex-start',
        height: 44,
        justifyContent: 'center',
        width: 42,
    },
    hotelListTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '800',
        marginLeft: 4,
    },
    hotelGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    hotelCard: {
        backgroundColor: 'rgba(1,116,137,0.3)',
        borderRadius: 18,
        elevation: 4,
        overflow: 'hidden',
        shadowColor: '#034D61',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 7,
    },
    hotelImageWrap: { height: 138, overflow: 'hidden' },
    hotelImage: { height: '100%', width: '100%' },
    heartButton: {
        alignItems: 'center',
        height: 38,
        justifyContent: 'center',
        position: 'absolute',
        right: 6,
        top: 7,
        width: 38,
    },
    hotelCardBody: { paddingBottom: 14, paddingHorizontal: 11, paddingTop: 10 },
    hotelName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    hotelCardLocation: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 7,
    },
    hotelPlace: {
        color: 'rgba(255,255,255,0.78)',
        flex: 1,
        fontSize: 11,
        marginLeft: 4,
    },
    hotelListPrice: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
        marginTop: 8,
    },
    hotelListNight: { color: 'rgba(255,255,255,0.78)', fontWeight: '400' },
    detailsContent: { paddingBottom: 20 },
    heroWrap: { height: 265 },
    heroImage: { height: '100%', width: '100%' },
    floatingBack: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 18,
        height: 36,
        justifyContent: 'center',
        left: 14,
        position: 'absolute',
        top: 42,
        width: 36,
    },
    detailsBody: { paddingHorizontal: 16, paddingTop: 16 },
    hotelTitleRow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleCopy: { flex: 1 },
    detailTitle: { color: INK, fontSize: 20, fontWeight: '800' },
    rating: { color: '#D5A31C', fontSize: 12, fontWeight: '700', marginLeft: 10 },
    mapPanel: {
        backgroundColor: '#F4F6F6',
        borderRadius: 7,
        height: 112,
        marginTop: 16,
        overflow: 'hidden',
    },
    mapRoad: {
        backgroundColor: '#FFFFFF',
        height: 7,
        opacity: 0.8,
        position: 'absolute',
        width: '120%',
    },
    roadOne: { left: -30, top: 45, transform: [{ rotate: '-12deg' }] },
    roadTwo: { left: 20, top: 62, transform: [{ rotate: '22deg' }] },
    roadThree: { left: -90, top: 20, transform: [{ rotate: '55deg' }] },
    mapMarker: {
        alignItems: 'center',
        backgroundColor: TEAL,
        borderRadius: 18,
        height: 34,
        justifyContent: 'center',
        left: '47%',
        position: 'absolute',
        top: 30,
        width: 34,
    },
    mapText: {
        alignSelf: 'center',
        backgroundColor: 'rgba(25,39,38,0.72)',
        borderRadius: 4,
        color: '#FFFFFF',
        fontSize: 9,
        marginTop: 75,
        paddingHorizontal: 9,
        paddingVertical: 4,
    },
    tabs: {
        borderBottomColor: '#E3E7E7',
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginTop: 14,
    },
    tab: { alignItems: 'center', flex: 1, paddingVertical: 11 },
    activeTab: { borderBottomColor: TEAL, borderBottomWidth: 2 },
    tabText: { color: '#9AA2A3', fontSize: 11 },
    activeTabText: { color: TEAL, fontWeight: '700' },
    description: {
        color: '#5E686A',
        fontSize: 11,
        lineHeight: 18,
        marginTop: 14,
    },
    bookingBar: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
    },
    bookingPrice: { color: INK, fontSize: 17, fontWeight: '800' },
    checkoutContent: { gap: 9, paddingBottom: 28, paddingHorizontal: 16 },
    staySummary: {
        alignItems: 'center',
        borderBottomColor: '#EDF0F0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    stayNights: { color: INK, fontSize: 15, fontWeight: '800' },
    stayBadge: { color: TEAL, fontSize: 9, fontWeight: '800' },
    formLabel: { color: INK, fontSize: 12, fontWeight: '700', marginTop: 10 },
    paymentRow: {
        alignItems: 'center',
        backgroundColor: '#F4F6F6',
        borderRadius: 7,
        flexDirection: 'row',
        height: 45,
        paddingHorizontal: 11,
    },
    payLogo: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        width: 20,
    },
    payLogoText: { color: '#4285F4', fontSize: 11, fontWeight: '800' },
    paymentText: { color: '#5C6769', flex: 1, fontSize: 11, marginLeft: 9 },
    readonlyRow: {
        alignItems: 'center',
        backgroundColor: '#F4F6F6',
        borderRadius: 7,
        flexDirection: 'row',
        height: 45,
        paddingHorizontal: 11,
    },
    couponRow: {
        backgroundColor: '#F4F6F6',
        borderRadius: 7,
        flexDirection: 'row',
        height: 45,
        overflow: 'hidden',
        paddingLeft: 11,
    },
    couponInput: { color: INK, flex: 1, fontSize: 11, paddingVertical: 0 },
    applyButton: {
        alignItems: 'center',
        backgroundColor: TEAL,
        justifyContent: 'center',
        width: 76,
    },
    applyText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
    appliedText: { color: TEAL, fontSize: 10 },
    priceBox: {
        borderColor: '#E3E7E7',
        borderRadius: 7,
        borderWidth: 1,
        padding: 13,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    priceLabel: { color: '#657072', fontSize: 10 },
    priceValue: { color: '#657072', fontSize: 10 },
    totalRow: {
        borderTopColor: '#E2E6E6',
        borderTopWidth: 1,
        marginTop: 4,
        paddingTop: 10,
    },
    totalLabel: { color: INK, fontSize: 11, fontWeight: '800' },
    totalValue: { color: INK, fontSize: 11, fontWeight: '800' },
    confirmedScreen: { flex: 1 },
    confirmedContent: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    successVisual: {
        alignItems: 'center',
        height: 116,
        justifyContent: 'center',
        width: 150,
    },
    sparkleLayer: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    confirmBadge: {
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderRadius: 43,
        borderWidth: 3,
        height: 86,
        justifyContent: 'center',
        width: 86,
    },
    sparkle: {
        backgroundColor: 'rgba(255,255,255,0.88)',
        borderRadius: 3,
        height: 5,
        position: 'absolute',
        width: 5,
    },
    sparkleOne: { left: 8, top: 55 },
    sparkleTwo: { right: 12, top: 24 },
    sparkleThree: { bottom: 14, right: 22 },
    sparkleFour: { left: 24, top: 10 },
    confirmedTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '800',
        marginTop: 14,
    },
    confirmedText: {
        color: 'rgba(255,255,255,0.88)',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 7,
        textAlign: 'center',
    },
    bookingDetailsCard: {
        backgroundColor: 'rgba(255,255,255,0.13)',
        borderColor: 'rgba(255,255,255,0.18)',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 26,
        paddingHorizontal: 14,
        width: '100%',
    },
    bookingDetailRow: {
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 52,
    },
    bookingDetailDivider: {
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: 1,
    },
    bookingDetailIcon: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,93,113,0.28)',
        borderRadius: 15,
        height: 30,
        justifyContent: 'center',
        marginRight: 10,
        width: 30,
    },
    bookingDetailLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        width: 68,
    },
    bookingDetailColon: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 11,
        marginRight: 10,
    },
    bookingDetailValue: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 10,
        fontWeight: '700',
    },
    viewBookingButton: {
        alignItems: 'center',
        backgroundColor: '#075D82',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    viewBookingText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
    backToFavouritesButton: {
        alignItems: 'center',
        borderColor: 'rgba(255,255,255,0.72)',
        borderRadius: 8,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        marginTop: 12,
        width: '100%',
    },
    backToFavouritesText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    bookingDetailsScreen: { flex: 1 },
    bookingDetailsContent: {
        flexGrow: 1,
        paddingHorizontal: 18,
    },
    bookingDetailsHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 52,
    },
    bookingDetailsHeaderAction: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    bookingDetailsTitle: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    bookingIdentity: { alignItems: 'center', marginBottom: 14, marginTop: 4 },
    bookingCalendarBadge: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.22)',
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        marginBottom: 10,
        width: 56,
    },
    bookingIdLabel: { color: 'rgba(255,255,255,0.82)', fontSize: 11 },
    bookingIdValue: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
        marginTop: 2,
    },
    bookingSummaryCard: {
        backgroundColor: 'rgba(255,255,255,0.13)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 13,
    },
    bookingSummaryRow: {
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 48,
    },
    bookingSummaryDivider: {
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: 1,
    },
    bookingSummaryIcon: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,105,119,0.3)',
        borderRadius: 14,
        height: 28,
        justifyContent: 'center',
        marginRight: 9,
        width: 28,
    },
    bookingSummaryLabel: {
        color: 'rgba(255,255,255,0.78)',
        fontSize: 10,
        width: 84,
    },
    bookingSummaryColon: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 10,
        marginRight: 10,
    },
    bookingSummaryValue: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 10,
        fontWeight: '700',
    },
    bookingStatusCard: {
        backgroundColor: 'rgba(255,255,255,0.13)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 12,
        padding: 13,
    },
    bookingStatusHeading: {
        color: 'rgba(255,255,255,0.84)',
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 9,
    },
    bookingStatusRow: { alignItems: 'center', flexDirection: 'row' },
    bookingStatusIcon: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,120,123,0.45)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        marginRight: 11,
        width: 40,
    },
    bookingStatusTitle: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
    bookingStatusText: {
        color: 'rgba(255,255,255,0.72)',
        fontSize: 9,
        marginTop: 3,
    },
    invoiceButton: {
        alignItems: 'center',
        backgroundColor: '#075D82',
        borderRadius: 12,
        flexDirection: 'row',
        gap: 8,
        height: 46,
        justifyContent: 'center',
        marginTop: 12,
    },
    invoiceButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
    bookingHomeButton: {
        alignItems: 'center',
        borderColor: 'rgba(255,255,255,0.72)',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        height: 44,
        justifyContent: 'center',
        marginTop: 9,
    },
    bookingHomeButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
});
