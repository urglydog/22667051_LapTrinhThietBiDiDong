import React, { useEffect, useState, useRef } from "react";
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
  Modal,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { initDB, getAllNotes, deleteNote } from "../../database/note";
import { syncNotes, setApiUrl, getApiUrl } from "../../utils/api";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [notes, setNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [syncModalVisible, setSyncModalVisible] = useState(false);
  const [apiUrl, setApiUrlState] = useState(getApiUrl());
  const [syncing, setSyncing] = useState(false);
  const router = useRouter();

  const loadNotes = async () => {
    try {
      await initDB();
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Xác nhận", "Xoá ghi chú này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await deleteNote(id);
          loadNotes();
        },
      },
    ]);
  };

  const handleSync = async () => {
    setSyncModalVisible(true);
  };

  const performSync = async () => {
    if (apiUrl.trim()) {
      setApiUrl(apiUrl.trim());
    }
    try {
      setSyncing(true);
      await syncNotes(notes);
      setSyncModalVisible(false);
      Alert.alert("Thành công", "Đã đồng bộ ghi chú lên server");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể đồng bộ");
    } finally {
      setSyncing(false);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.note?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Tìm kiếm ghi chú..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSync} style={styles.syncButton}>
          <Ionicons name="sync" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/explore")}
          style={styles.trashButton}
        >
          <Ionicons name="trash-outline" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/(tabs)/edit" as any, params: { id: item.id.toString() } })}
            onLongPress={() => handleDelete(item.id)}
            style={styles.item}
          >
            <Text style={styles.title}>{item.title || "Không có tiêu đề"}</Text>
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
            <Text style={styles.emptyText}>Chưa có ghi chú nào</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={syncModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSyncModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đồng bộ ghi chú</Text>
            <Text style={styles.modalSubtitle}>
              Nhập link API (ví dụ: https://mockapi.io/api/v1/notes)
            </Text>
            <TextInput
              placeholder="https://mockapi.io/api/v1/notes"
              value={apiUrl}
              onChangeText={setApiUrlState}
              style={styles.modalInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setSyncModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSync]}
                onPress={performSync}
                disabled={syncing}
              >
                <Text style={styles.modalButtonText}>
                  {syncing ? "Đang đồng bộ..." : "Đồng bộ"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    gap: 10,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  syncButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  trashButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
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
  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#f0f0f0",
  },
  modalButtonSync: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalButtonTextCancel: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});