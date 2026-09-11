import React, { useCallback, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { RootStackParamList } from '../../constants/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Schedule'>;
type IconName =
    | 'arrowRight'
    | 'back'
    | 'calendar'
    | 'calendarPlus'
    | 'chevronLeft'
    | 'chevronRight'
    | 'document'
    | 'edit'
    | 'home'
    | 'members'
    | 'person'
    | 'profile'
    | 'video';

type AppIconProps = {
    color?: string;
    name: IconName;
    size?: number;
};

type Appointment = {
    icon: IconName;
    location: string;
    status: 'Upcoming' | 'Pending';
    time: string;
    title: string;
};

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
});
const selectedDateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const isSameDate = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const getCalendarDates = (displayedMonth: Date) => {
    const year = displayedMonth.getFullYear();
    const month = displayedMonth.getMonth();
    const firstGridDate = new Date(year, month, 1 - new Date(year, month, 1).getDay());

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(
            firstGridDate.getFullYear(),
            firstGridDate.getMonth(),
            firstGridDate.getDate() + index,
        );

        return {
            date,
            muted: date.getMonth() !== month,
        };
    });
};

const appointments: Appointment[] = [
    {
        icon: 'video',
        location: 'Zoom Meeting',
        status: 'Upcoming',
        time: '09:00 AM - 10:00 AM',
        title: 'Team Standup Meeting',
    },
    {
        icon: 'edit',
        location: 'Office / Meeting Room',
        status: 'Upcoming',
        time: '11:00 AM - 12:00 PM',
        title: 'Project Discussion',
    },
    {
        icon: 'person',
        location: 'Google Meet',
        status: 'Upcoming',
        time: '02:00 PM - 03:00 PM',
        title: 'Client Call',
    },
    {
        icon: 'document',
        location: 'Conference Room',
        status: 'Pending',
        time: '04:00 PM - 05:00 PM',
        title: 'Design Review',
    },
    {
        icon: 'calendar',
        location: 'Online',
        status: 'Pending',
        time: '06:00 PM - 07:00 PM',
        title: 'Daily Report',
    },
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
            {name === 'back' ? <Path {...common} d="m15 18-6-6 6-6" /> : null}
            {name === 'chevronLeft' ? <Path {...common} d="m14 17-5-5 5-5" /> : null}
            {name === 'chevronRight' ? <Path {...common} d="m10 17 5-5-5-5" /> : null}
            {name === 'arrowRight' ? (
                <Path {...common} d="M5 12h14m-5-5 5 5-5 5" />
            ) : null}
            {name === 'calendar' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18M8 14h3m2 0h3m-8 3h3m2 0h3" />
                </>
            ) : null}
            {name === 'calendarPlus' ? (
                <>
                    <Rect {...common} x="3" y="5" width="18" height="16" rx="2" />
                    <Path {...common} d="M7 3v4m10-4v4M3 10h18M12 13v5m-2.5-2.5h5" />
                </>
            ) : null}
            {name === 'video' ? (
                <>
                    <Rect {...common} x="3" y="6" width="13" height="12" rx="2" />
                    <Path {...common} d="m16 10 5-3v10l-5-3" />
                </>
            ) : null}
            {name === 'edit' ? (
                <>
                    <Path {...common} d="M4 20h4l11-11a2.1 2.1 0 0 0-4-4L4 16v4Z" />
                    <Path {...common} d="m13.5 6.5 4 4" />
                </>
            ) : null}
            {name === 'person' ? (
                <>
                    <Circle {...common} cx="12" cy="8" r="3.2" />
                    <Path {...common} d="M5.5 20c.6-4 2.7-6 6.5-6s5.9 2 6.5 6" />
                </>
            ) : null}
            {name === 'document' ? (
                <>
                    <Path {...common} d="M6 3h8l4 4v14H6Z" />
                    <Path {...common} d="M14 3v5h4M9 12h6m-6 4h6" />
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

function ScheduleScreen({ navigation, route }: Props) {
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();
    const [displayedMonth, setDisplayedMonth] = useState(
        () => {
            const today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), 1);
        },
    );
    const [selectedDate, setSelectedDate] = useState(
        () => {
            const today = new Date();
            return new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
            );
        },
    );
    const [calendarVisible, setCalendarVisible] = useState(true);
    const email = route.params.email;
    const compact = height < 760;
    const narrow = width < 360;
    const horizontalPadding = narrow ? 12 : 18;
    const headerHeight = compact ? 188 : 205;
    const tabBarHeight = 62 + insets.bottom;
    const calendarDates = getCalendarDates(displayedMonth);
    const goHome = () => navigation.navigate('Home', { email });

    const goToToday = useCallback(() => {
        const today = new Date();
        const localToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
        );

        setSelectedDate(localToday);
        setDisplayedMonth(
            new Date(localToday.getFullYear(), localToday.getMonth(), 1),
        );
    }, []);

    useFocusEffect(
        useCallback(() => {
            goToToday();
        }, [goToToday]),
    );

    const toggleCalendar = () => {
        if (!calendarVisible) {
            goToToday();
        }
        setCalendarVisible(current => !current);
    };

    const changeMonth = (offset: number) => {
        setDisplayedMonth(
            current => new Date(current.getFullYear(), current.getMonth() + offset, 1),
        );
    };

    const handleDatePress = (date: Date) => {
        setSelectedDate(date);
        setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    };

    const handleTabPress = (label: string) => {
        if (label === 'Home') {
            goHome();
        } else if (label === 'Members') {
            navigation.navigate('Members', { email });
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
                    <View
                        style={[
                            styles.headerContent,
                            {
                                paddingTop: insets.top + 6,
                                paddingHorizontal: horizontalPadding - 4,
                            },
                        ]}
                    >
                        <View style={styles.headerActionsSpacer} />
                        <View style={styles.heading}>
                            <Text style={styles.title}>Schedule</Text>
                            <Text style={styles.subtitle}>Plan your day, stay on track</Text>
                        </View>
                    </View>
                </LinearGradient>

                <Svg
                    pointerEvents="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 40"
                    style={[styles.wave, { top: headerHeight - 76 }]}
                >
                    <Path
                        d="M0 27 C16 20 29 26 43 22 C60 17 68 14 77 9 C87 3 94 5 100 2 L100 40 L0 40 Z"
                        fill="#F7FAFA"
                    />
                </Svg>
                {calendarVisible ? (
                    <View style={[styles.calendarPanel, compact && styles.calendarPanelCompact]}>
                        <View style={styles.monthRow}>
                            <Pressable
                                accessibilityLabel="Previous month"
                                accessibilityRole="button"
                                hitSlop={8}
                                onPress={() => changeMonth(-1)}
                                style={({ pressed }) => [
                                    styles.monthButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppIcon color="#6B7F83" name="chevronLeft" size={18} />
                            </Pressable>
                            <Text accessibilityLiveRegion="polite" style={styles.monthTitle}>
                                {monthFormatter.format(displayedMonth)}
                            </Text>
                            <Pressable
                                accessibilityLabel="Next month"
                                accessibilityRole="button"
                                hitSlop={8}
                                onPress={() => changeMonth(1)}
                                style={({ pressed }) => [
                                    styles.monthButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <AppIcon color="#6B7F83" name="chevronRight" size={18} />
                            </Pressable>
                        </View>
                        <View style={styles.weekRow}>
                            {weekdays.map(day => (
                                <Text key={day} style={styles.weekday}>
                                    {day}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.dateGrid}>
                            {calendarDates.map(({ date, muted }) => {
                                const selected = isSameDate(date, selectedDate);

                                return (
                                    <Pressable
                                        accessibilityLabel={selectedDateFormatter.format(date)}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected }}
                                        key={date.toISOString()}
                                        onPress={() => handleDatePress(date)}
                                        style={({ pressed }) => [
                                            styles.dateCell,
                                            pressed && styles.pressed,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.dateCircle,
                                                selected && styles.selectedDate,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateText,
                                                    muted && styles.mutedDate,
                                                    selected && styles.selectedDateText,
                                                ]}
                                            >
                                                {date.getDate()}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                ) : null}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Schedule</Text>
                    <Text accessibilityLiveRegion="polite" style={styles.sectionDate}>
                        {selectedDateFormatter.format(selectedDate)}
                    </Text>
                </View>

                <View style={styles.appointmentList}>
                    {appointments.map(appointment => (
                        <Pressable
                            accessibilityLabel={`${appointment.title}, ${appointment.time}, ${appointment.status}`}
                            accessibilityRole="button"
                            key={appointment.time}
                            style={({ pressed }) => [
                                styles.appointment,
                                compact && styles.appointmentCompact,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.appointmentIcon}>
                                <AppIcon name={appointment.icon} size={19} />
                            </View>
                            <View style={styles.appointmentCopy}>
                                <Text numberOfLines={1} style={styles.appointmentTime}>
                                    {appointment.time}
                                </Text>
                                <Text numberOfLines={1} style={styles.appointmentTitle}>
                                    {appointment.title}
                                </Text>
                                <Text numberOfLines={1} style={styles.appointmentLocation}>
                                    {appointment.location}
                                </Text>
                            </View>
                            <View style={styles.appointmentAside}>
                                <View
                                    style={[
                                        styles.statusPill,
                                        appointment.status === 'Pending' && styles.pendingPill,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            appointment.status === 'Pending' && styles.pendingText,
                                        ]}
                                    >
                                        {appointment.status}
                                    </Text>
                                </View>
                                <AppIcon color="#A2AFB1" name="chevronRight" size={16} />
                            </View>
                        </Pressable>
                    ))}
                </View>

                <Pressable
                    accessibilityLabel="Add new schedule"
                    accessibilityRole="button"
                    style={({ pressed }) => [
                        styles.addButtonPressable,
                        pressed && styles.pressed,
                    ]}
                >
                    <LinearGradient
                        colors={['#12B8A4', '#078AA1']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.addButton}
                    >
                        <View style={styles.addButtonLabel}>
                            <AppIcon color="#FFFFFF" name="calendarPlus" size={20} />
                            <Text style={styles.addButtonText}>Add New Schedule</Text>
                        </View>
                        <AppIcon color="#FFFFFF" name="arrowRight" size={19} />
                    </LinearGradient>
                </Pressable>
            </ScrollView>

            <View
                pointerEvents="box-none"
                style={[
                    styles.headerActions,
                    {
                        top: insets.top + 6,
                        right: horizontalPadding - 4,
                        left: horizontalPadding - 4,
                    },
                ]}
            >
                <Pressable
                    accessibilityLabel="Back to Home"
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={goHome}
                    style={({ pressed }) => [
                        styles.headerButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <AppIcon color="#FFFFFF" name="back" size={25} />
                </Pressable>
                <Pressable
                    accessibilityLabel={
                        calendarVisible ? 'Hide calendar' : 'Show calendar'
                    }
                    accessibilityRole="button"
                    accessibilityState={{ expanded: calendarVisible }}
                    hitSlop={10}
                    onPress={toggleCalendar}
                    style={({ pressed }) => [
                        styles.headerButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <AppIcon color="#FFFFFF" name="calendar" size={21} />
                </Pressable>
            </View>

            <View
                style={[
                    styles.tabBar,
                    { height: tabBarHeight, paddingBottom: insets.bottom },
                ]}
            >
                {tabs.map(tab => {
                    const selected = tab.label === 'Schedule';
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
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    headerContent: {
        flex: 1,
    },
    headerActions: {
        position: 'absolute',
        zIndex: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerActionsSpacer: {
        height: 42,
    },
    headerButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginTop: 7,
        paddingHorizontal: 4,
    },
    title: {
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 27,
        lineHeight: 33,
    },
    subtitle: {
        marginTop: 2,
        color: '#D8F6F0',
        fontSize: 10,
        lineHeight: 14,
    },
    wave: {
        position: 'absolute',
        right: 0,
        left: 0,
        height: 92,
    },
    content: {
        flexGrow: 1,
    },
    calendarPanel: {
        minHeight: 181,
        paddingHorizontal: 13,
        paddingTop: 11,
        paddingBottom: 9,
        borderWidth: 1,
        borderColor: '#E8EEEE',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        shadowColor: '#16434A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 8,
    },
    calendarPanelCompact: {
        minHeight: 169,
        paddingTop: 8,
        paddingBottom: 6,
    },
    monthRow: {
        height: 31,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    monthButton: {
        width: 32,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthTitle: {
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 13,
    },
    weekRow: {
        marginTop: 4,
        flexDirection: 'row',
    },
    weekday: {
        flex: 1,
        color: '#91A0A3',
        fontFamily: 'sans-serif-medium',
        fontSize: 9,
        lineHeight: 18,
        textAlign: 'center',
    },
    dateGrid: {
        marginTop: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateCell: {
        width: '14.2857%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDate: {
        backgroundColor: '#139FA3',
    },
    dateText: {
        color: '#405B60',
        fontFamily: 'sans-serif-medium',
        fontSize: 10,
    },
    mutedDate: {
        color: '#C1CBCC',
    },
    selectedDateText: {
        color: '#FFFFFF',
    },
    sectionHeader: {
        marginTop: 15,
        marginBottom: 9,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    sectionTitle: {
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
    },
    sectionDate: {
        color: '#139FA3',
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
    },
    appointmentList: {
        gap: 8,
    },
    appointment: {
        minHeight: 67,
        paddingHorizontal: 10,
        paddingVertical: 8,
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
        width: '100%',
    },
    appointmentCompact: {
        minHeight: 62,
        paddingVertical: 6,
    },
    appointmentIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#DDF7F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appointmentCopy: {
        flex: 1,
        minWidth: 0,
        marginLeft: 10,
    },
    appointmentTime: {
        color: '#139FA3',
        fontFamily: 'sans-serif-medium',
        fontSize: 8,
        lineHeight: 11,
    },
    appointmentTitle: {
        marginTop: 1,
        color: '#25464C',
        fontFamily: 'sans-serif-medium',
        fontSize: 11,
        lineHeight: 15,
    },
    appointmentLocation: {
        marginTop: 1,
        color: '#91A0A3',
        fontSize: 8,
        lineHeight: 11,
    },
    appointmentAside: {
        width: 73,
        marginLeft: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    statusPill: {
        minWidth: 49,
        height: 20,
        paddingHorizontal: 7,
        borderRadius: 8,
        backgroundColor: '#E3F7F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pendingPill: {
        backgroundColor: '#FFF4DE',
    },
    statusText: {
        color: '#188E87',
        fontFamily: 'sans-serif-medium',
        fontSize: 7,
    },
    pendingText: {
        color: '#B67A20',
    },
    addButtonPressable: {
        marginTop: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    addButton: {
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButtonLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        marginLeft: 10,
        color: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        fontSize: 12,
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

export default ScheduleScreen;