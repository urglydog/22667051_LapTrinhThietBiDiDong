import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { initDB, getDeletedNotes, restoreNote, permanentlyDeleteNote } from "../../database/note";
import { Ionicons } from "@expo/vector-icons";

export default function Explore() {
  const [deletedNotes, setDeletedNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadDeletedNotes = async () => {
    try {
      await initDB();
      const data = await getDeletedNotes();
      setDeletedNotes(data);
    } catch (error) {
      console.error("Error loading deleted notes:", error);
    }
  };

  useEffect(() => {
    loadDeletedNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadDeletedNotes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeletedNotes();
    setRefreshing(false);
  };

  const handleRestore = async (id: number) => {
    Alert.alert("Xác nhận", "Khôi phục ghi chú này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Khôi phục",
        onPress: async () => {
          await restoreNote(id);
          loadDeletedNotes();
          Alert.alert("Thành công", "Đã khôi phục ghi chú");
        },
      },
    ]);
  };

  const handlePermanentlyDelete = async (id: number) => {
    Alert.alert("Xác nhận", "Xoá vĩnh viễn ghi chú này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await permanentlyDeleteNote(id);
          loadDeletedNotes();
        },
      },
    ]);
  };

  const filteredNotes = deletedNotes.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.note?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Tìm kiếm trong thùng rác..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleRestore(item.id)}
            style={styles.item}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.title}>{item.title || "Không có tiêu đề"}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleRestore(item.id)}
                  style={styles.actionButton}
                >
                  <Ionicons name="refresh" size={20} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePermanentlyDelete(item.id)}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash" size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.note} numberOfLines={2}>
              {item.note || "Không có ghi chú"}
            </Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="trash-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Thùng rác trống</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    opacity: 0.7,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  note: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
});