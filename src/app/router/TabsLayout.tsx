import { Tabs } from 'expo-router';

export function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
        }}
      />
    </Tabs>
  );
}
