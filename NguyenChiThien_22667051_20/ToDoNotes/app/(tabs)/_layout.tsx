import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#007AFF" }, headerTintColor: "#fff" }}>
      <Stack.Screen name="index" options={{ title: "Note App" }} />
      <Stack.Screen name="add" options={{ title: "Thêm ghi chú" }} />
      <Stack.Screen name="edit" options={{ title: "Sửa ghi chú" }} />
      <Stack.Screen name="explore" options={{ title: "Thùng rác" }} />
    </Stack>
  );
}