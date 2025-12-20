import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useT } from '@/utils/i18n';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const t = useT();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: '#226487',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('bottomNavBarLabels.home'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} weight={focused ? 'bold' : 'light'} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: t('bottomNavBarLabels.schedule'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} weight={focused ? 'bold' : 'light'} name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t('bottomNavBarLabels.calendar'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} weight={focused ? 'bold' : 'light'} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          href: null, // Hide from tab bar but keep navigable
        }}
      />
    </Tabs>
  );
}
