import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function AddScreen() {
  const router = useRouter();
  const [job, setJob] = useState("");
  const { addTask } = useTasks();

  const handleAdd = () => {
    addTask(job);
    setJob("");
    router.back();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>ADD YOUR JOB</Text>

      <TextInput
        placeholder="input your job"
        value={job}
        onChangeText={setJob}
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
        onPress={handleAdd}
        style={{
          backgroundColor: "#00CFFF",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>FINISH →</Text>
      </TouchableOpacity>
    </View>
  );
}
