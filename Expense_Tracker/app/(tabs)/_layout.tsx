import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#007AFF" }, headerTintColor: "#fff" }}>
      <Stack.Screen name="index" options={{ title: "EXPENSE TRACKER", headerShown: false }} />
      <Stack.Screen name="add" options={{ title: "Thêm thu chi" }} />
      <Stack.Screen name="edit" options={{ title: "Sửa thu chi" }} />
      <Stack.Screen name="explore" options={{ title: "Thùng rác" }} />
      <Stack.Screen name="statistics" options={{ title: "Thống kê" }} />
    </Stack>
  );
}
