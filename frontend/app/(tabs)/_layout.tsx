import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';

export default function TabLayout() {
  const router = useRouter();
  const { userProfile, setIsOnboarded } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as 'en-US' | 'en-IN' | 'te-IN';

  const handleHomePress = () => {
    // Reset to language selection - this is intentional
    setIsOnboarded(false);
    router.replace('/onboarding');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#1e293b',
          borderTopColor: '#334155',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home', locale),
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={28} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleHomePress();
          },
        }}
      />
      <Tabs.Screen
        name="weekly-streak"
        options={{
          title: t('tabs.weeklyStreak', locale),
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings', locale),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
