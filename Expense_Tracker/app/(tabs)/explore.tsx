import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
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
import { getDeletedExpenses, initDB, permanentlyDeleteExpense, restoreExpense } from "../../database/expense";

export default function Explore() {
  const [deletedExpenses, setDeletedExpenses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const loadDeletedExpenses = async () => {
    try {
      await initDB();
      const data = await getDeletedExpenses();
      setDeletedExpenses(data);
    } catch (error) {
      console.error("Error loading deleted expenses:", error);
    }
  };

  useEffect(() => {
    loadDeletedExpenses();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadDeletedExpenses();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeletedExpenses();
    setRefreshing(false);
  };

  const handleLongPress = (id: number) => {
    setSelectedItemId(id);
    setMenuVisible(true);
  };

  const handleRestore = async (id: number) => {
    setMenuVisible(false);
    Alert.alert("Xác nhận", "Khôi phục khoản thu chi này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Khôi phục",
        onPress: async () => {
          await restoreExpense(id);
          loadDeletedExpenses();
          setSelectedItemId(null);
          Alert.alert("Thành công", "Đã khôi phục khoản thu chi");
        },
      },
    ]);
  };

  const handlePermanentlyDelete = async (id: number) => {
    setMenuVisible(false);
    Alert.alert("Xác nhận", "Xoá vĩnh viễn khoản thu chi này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await permanentlyDeleteExpense(id);
          loadDeletedExpenses();
          setSelectedItemId(null);
        },
      },
    ]);
  };

  const filteredDeletedExpenses = deletedExpenses.filter(
    (e: any) =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.amount?.toString().includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thùng rác</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Tìm kiếm trong thùng rác..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredDeletedExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item.id)}
            style={styles.item}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title || "Không có tên"}</Text>
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

            <Text style={[styles.amount, item.type === "Thu" ? styles.amountIncome : styles.amountExpense]}>
              {item.type === "Thu" ? "+" : "-"} {Number(item.amount || 0).toLocaleString("vi-VN")} đ
            </Text>

            <View style={styles.typeContainer}>
              <View style={[styles.typeBadge, item.type === "Thu" ? styles.typeIncome : styles.typeExpense]}>
                <Text style={styles.typeText}>{item.type || "Chi"}</Text>
              </View>
              <Text style={styles.createdAt}>{item.createdAt || ""}</Text>
            </View>
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
        contentContainerStyle={deletedExpenses.length === 0 ? styles.emptyList : styles.list}
      />

      {/* Restore Menu Modal */}
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
                  handleRestore(selectedItemId);
                }
              }}
            >
              <Ionicons name="refresh" size={20} color="#007AFF" />
              <Text style={styles.menuItemTextRestore}>Khôi phục</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (selectedItemId !== null) {
                  handlePermanentlyDelete(selectedItemId);
                }
              }}
            >
              <Ionicons name="trash" size={20} color="#ff3b30" />
              <Text style={styles.menuItemTextDelete}>Xóa vĩnh viễn</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
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
    opacity: 0.7,
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
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  amountIncome: {
    color: "#28a745",
  },
  amountExpense: {
    color: "#dc3545",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  menuItemTextRestore: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  menuItemTextDelete: {
    fontSize: 16,
    color: "#ff3b30",
    fontWeight: "600",
  },
});
