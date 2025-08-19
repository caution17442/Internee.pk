import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#222" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dashboard Home" }} />
      <Stack.Screen name="Instagram" options={{ title: "Instagram Analytics" }} />
      <Stack.Screen name="Twitter" options={{ title: "Twitter Analytics" }} />
    </Stack>
  );
}
