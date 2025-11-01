import React, { useState, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { addExpense } from "../../database/expense";
import { Ionicons } from "@expo/vector-icons";

export default function AddExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"Thu" | "Chi">("Chi");
    const router = useRouter();
    const titleInputRef = useRef<TextInput>(null);
    const amountInputRef = useRef<TextInput>(null);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên khoản thu chi");
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            Alert.alert("Lỗi", "Vui lòng nhập số tiền hợp lệ");
            return;
        }

        try {
            await addExpense(title.trim(), amountNum, type);

            // Clear inputs using refs
            setTitle("");
            setAmount("");
            setType("Chi");
            if (titleInputRef.current) {
                titleInputRef.current.clear();
            }
            if (amountInputRef.current) {
                amountInputRef.current.clear();
            }

            router.back();
        } catch (error) {
            Alert.alert("Lỗi", "Không thể lưu khoản thu chi");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Tên khoản thu chi</Text>
                            <TextInput
                                ref={titleInputRef}
                                placeholder="Nhập tên khoản thu chi..."
                                value={title}
                                onChangeText={setTitle}
                                style={styles.input}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Số tiền</Text>
                            <TextInput
                                ref={amountInputRef}
                                placeholder="Nhập số tiền..."
                                value={amount}
                                onChangeText={setAmount}
                                style={styles.input}
                                keyboardType="numeric"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Loại</Text>
                            <View style={styles.typeContainer}>
                                <TouchableOpacity
                                    style={[styles.typeButton, type === "Thu" && styles.typeButtonActive]}
                                    onPress={() => setType("Thu")}
                                >
                                    <Text style={[styles.typeButtonText, type === "Thu" && styles.typeButtonTextActive]}>
                                        Thu
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.typeButton, type === "Chi" && styles.typeButtonActive]}
                                    onPress={() => setType("Chi")}
                                >
                                    <Text style={[styles.typeButtonText, type === "Chi" && styles.typeButtonTextActive]}>
                                        Chi
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.addButton} onPress={handleSave}>
                        <Ionicons name="add" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
        color: "#333",
    },
    typeContainer: {
        flexDirection: "row",
        gap: 12,
    },
    typeButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ccc",
        alignItems: "center",
    },
    typeButtonActive: {
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
    },
    typeButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#666",
    },
    typeButtonTextActive: {
        color: "#fff",
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    addButton: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

