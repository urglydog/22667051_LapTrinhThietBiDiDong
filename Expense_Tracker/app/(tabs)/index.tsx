import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteExpense, getExpensesByType, initDB } from "../../database/expense";
import { getApiUrl, setApiUrl, syncExpenses } from "../../utils/api";

export default function Index() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "Thu" | "Chi">("all");
  const [syncModalVisible, setSyncModalVisible] = useState(false);
  const [apiUrl, setApiUrlState] = useState(getApiUrl());
  const [syncing, setSyncing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const router = useRouter();

  const loadExpenses = async () => {
    try {
      await initDB();
      const data = await getExpensesByType(filter);
      setExpenses(data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [filter]);

  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
    }, [filter])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  const handleLongPress = (id: number) => {
    setSelectedItemId(id);
    setMenuVisible(true);
  };

  const handleDelete = async (id: number) => {
    setMenuVisible(false);
    Alert.alert("Xác nhận", "Xoá khoản thu chi này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await deleteExpense(id);
          loadExpenses();
          setSelectedItemId(null);
        },
      },
    ]);
  };

  const handleSync = () => {
    setSyncModalVisible(true);
  };

  const performSync = async () => {
    if (apiUrl.trim()) {
      setApiUrl(apiUrl.trim());
    }
    try {
      setSyncing(true);
      await syncExpenses(expenses);
      setSyncModalVisible(false);
      Alert.alert("Thành công", "Đã đồng bộ thu chi lên server");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể đồng bộ");
    } finally {
      setSyncing(false);
    }
  };

  const filteredExpenses = expenses.filter(
    (e) =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.amount?.toString().includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm thu chi..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSync} style={styles.syncButton}>
          <Ionicons name="sync" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Thu" && styles.filterButtonActive]}
          onPress={() => setFilter("Thu")}
        >
          <Text style={[styles.filterText, filter === "Thu" && styles.filterTextActive]}>
            Thu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Chi" && styles.filterButtonActive]}
          onPress={() => setFilter("Chi")}
        >
          <Text style={[styles.filterText, filter === "Chi" && styles.filterTextActive]}>
            Chi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statisticsButton}
          onPress={() => router.push("/(tabs)/statistics")}
        >
          <Ionicons name="bar-chart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/(tabs)/edit" as any, params: { id: item.id.toString() } })}
            onLongPress={() => handleLongPress(item.id)}
            style={styles.item}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title || "Không có tên"}</Text>
              <View style={[styles.typeBadge, item.type === "Thu" ? styles.typeIncome : styles.typeExpense]}>
                <Text style={styles.typeText}>{item.type || "Chi"}</Text>
              </View>
            </View>

            <Text style={[styles.amount, item.type === "Thu" ? styles.amountIncome : styles.amountExpense]}>
              {item.type === "Thu" ? "+" : "-"} {Number(item.amount || 0).toLocaleString("vi-VN")} đ
            </Text>

            <Text style={styles.createdAt}>{item.createdAt || ""}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có khoản thu chi nào</Text>
          </View>
        }
        contentContainerStyle={expenses.length === 0 ? styles.emptyList : styles.list}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/(tabs)/add")}
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
            <Text style={styles.modalTitle}>Đồng bộ thu chi</Text>
            <Text style={styles.modalSubtitle}>
              Nhập link API (ví dụ: https://mockapi.io/api/v1/expenses)
            </Text>
            <TextInput
              placeholder="https://mockapi.io/api/v1/expenses"
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

      {/* Delete Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setMenuVisible(false);
          setSelectedItemId(null);
        }}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => {
            setMenuVisible(false);
            setSelectedItemId(null);
          }}
        >
          <TouchableOpacity
            style={styles.menuContent}
            activeOpacity={1}
            onPress={() => { }}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (selectedItemId !== null) {
                  handleDelete(selectedItemId);
                }
              }}
            >
              <Ionicons name="trash" size={20} color="#ff3b30" />
              <Text style={styles.menuItemTextDelete}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setSelectedItemId(null);
              }}
            >
              <Ionicons name="close" size={20} color="#666" />
              <Text style={styles.menuItemText}>Hủy</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
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
    backgroundColor: "#007AFF",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
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
  filterContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    gap: 8,
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
  trashButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ff9500",
    justifyContent: "center",
    alignItems: "center",
  },
  statisticsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeIncome: {
    backgroundColor: "#d4edda",
  },
  typeExpense: {
    backgroundColor: "#f8d7da",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountIncome: {
    color: "#28a745",
  },
  amountExpense: {
    color: "#dc3545",
  },
  createdAt: {
    fontSize: 12,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
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
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#666",
  },
  menuItemTextDelete: {
    fontSize: 16,
    color: "#ff3b30",
    fontWeight: "600",
  },
});
