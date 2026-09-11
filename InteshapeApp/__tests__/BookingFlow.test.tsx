import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
    BookingConfirmedScreen,
    HotelSearchScreen,
} from '../src/screens/HotelFlow';

const navigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
    reset: jest.fn(),
};

const bookingParams = {
    email: 'guest@inteshape.com',
    hotelId: 'panshi',
    checkIn: '09/08/2026',
    checkOut: '15/08/2026',
    guests: 2,
};

const route = {
    key: 'booking-confirmed-test',
    name: 'BookingConfirmed',
    params: bookingParams,
};

const metrics = {
    frame: { x: 0, y: 0, width: 390, height: 844 },
    insets: { top: 24, right: 0, bottom: 20, left: 0 },
};

test('hotel booking tab opens the hotel list', async () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    const hotelSearchRoute = {
        key: 'hotel-search-test',
        name: 'HotelSearch',
        params: { email: bookingParams.email },
    };

    await ReactTestRenderer.act(() => {
        renderer = ReactTestRenderer.create(
            <SafeAreaProvider initialMetrics={metrics}>
                <HotelSearchScreen
                    navigation={navigation as never}
                    route={hotelSearchRoute as never}
                />
            </SafeAreaProvider>,
        );
    });

    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Hotel booking' }).props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith('HotelList', {
        email: bookingParams.email,
        location: 'Dhaka',
        checkIn: '09/08/2026',
        checkOut: '15/08/2026',
        guests: 1,
    });

    await ReactTestRenderer.act(() => renderer.unmount());
});

test('view booking details opens the booking details screen', async () => {
    jest.useFakeTimers();
    let renderer!: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
        renderer = ReactTestRenderer.create(
            <SafeAreaProvider initialMetrics={metrics}>
                <BookingConfirmedScreen
                    navigation={navigation as never}
                    route={route as never}
                />
            </SafeAreaProvider>,
        );
    });

    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'View booking details' }).props.onPress();
    });

    expect(navigation.replace).toHaveBeenCalledWith('BookingDetails', bookingParams);

    await ReactTestRenderer.act(() => renderer.unmount());
    jest.useRealTimers();
});