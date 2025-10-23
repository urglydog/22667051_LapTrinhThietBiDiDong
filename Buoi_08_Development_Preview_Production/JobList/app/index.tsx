import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7A42F4" }}>
        MANAGE YOUR TASK
      </Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 10,
          width: "80%",
          marginVertical: 20,
        }}
      />

      <TouchableOpacity
        onPress={() => router.push({ pathname: "/home", params: { name } })}
        style={{
          backgroundColor: "#00CFFF",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}
