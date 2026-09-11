import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MembersScreen from '../src/screens/MembersScreen';

const navigation = {
    navigate: jest.fn(),
};

const route = {
    key: 'members-test',
    name: 'Members',
    params: { email: 'signed.in@inteshape.com' },
};

const metrics = {
    frame: { x: 0, y: 0, width: 390, height: 844 },
    insets: { top: 24, right: 0, bottom: 20, left: 0 },
};

const renderScreen = () =>
    ReactTestRenderer.create(
        <SafeAreaProvider initialMetrics={metrics}>
            <MembersScreen
                navigation={navigation as never}
                route={route as never}
            />
        </SafeAreaProvider>,
    );

test('search and status filters work together', async () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
        renderer = renderScreen();
    });

    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Search members' }).props.onChangeText('Maya');
    });

    expect(renderer.root.findAllByProps({ children: 'Maya Fernandez' }).length).toBeGreaterThan(0);

    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Filter members, All selected' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Filter by Active' }).props.onPress();
    });

    expect(renderer.root.findAllByProps({ children: 'No members found' }).length).toBeGreaterThan(0);
});

test('adding a member updates the directory and summary', async () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
        renderer = renderScreen();
    });

    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Add new member' }).props.onPress();
    });
    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Full name' }).props.onChangeText('Priya Sharma');
    });
    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Email address' }).props.onChangeText('priya@inteshape.com');
    });
    await ReactTestRenderer.act(() => {
        renderer.root.findByProps({ accessibilityLabel: 'Submit new member' }).props.onPress();
    });

    expect(
        renderer.root.findAllByProps({ accessibilityLabel: 'Priya Sharma avatar' }).length,
    ).toBeGreaterThan(0);
    expect(renderer.root.findAllByProps({ children: 6 }).length).toBeGreaterThan(0);
});