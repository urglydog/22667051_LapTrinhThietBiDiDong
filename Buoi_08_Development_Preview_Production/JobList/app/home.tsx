import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../context/TaskContext";

export default function HomeScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask, removeTask } = useTasks();

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Hi {name}</Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>
        Have a great day ahead
      </Text>

      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 8,
          marginBottom: 20,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f8f8f8",
              padding: 10,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            {editingId === item.id ? (
              <TextInput
                value={newTitle}
                onChangeText={setNewTitle}
                onBlur={() => {
                  updateTask(item.id, newTitle);
                  setEditingId(null);
                }}
                autoFocus
                style={{ flex: 1 }}
              />
            ) : (
              <Text>{item.title}</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setEditingId(item.id);
                setNewTitle(item.title);
              }}
            >
              <Ionicons name="pencil-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/add")}
        style={{
          backgroundColor: "#00CFFF",
          padding: 20,
          borderRadius: 50,
          position: "absolute",
          bottom: 40,
          right: 40,
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
