import React, { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateNote, getAllNotes } from "../../database/note";
import { Ionicons } from "@expo/vector-icons";

export default function EditNote() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const router = useRouter();

    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = async () => {
        try {
            const notes = await getAllNotes();
            const foundNote = notes.find((n: any) => n.id.toString() === id) as any;
            if (foundNote) {
                setTitle(foundNote.title || "");
                setNote(foundNote.note || "");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải ghi chú");
        }
    };

    const handleSave = async () => {
        if (!title.trim() && !note.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tiêu đề hoặc ghi chú");
            return;
        }

        try {
            await updateNote(parseInt(id || "0"), title.trim() || "Không có tiêu đề", note.trim() || "");
            router.back();
        } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật ghi chú");
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
                            <Text style={styles.label}>Tiêu đề công việc</Text>
                            <TextInput
                                placeholder="Nhập tiêu đề..."
                                value={title}
                                onChangeText={setTitle}
                                style={styles.input}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ghi chú</Text>
                            <TextInput
                                placeholder="Nhập ghi chú..."
                                value={note}
                                onChangeText={setNote}
                                style={[styles.input, styles.textArea]}
                                multiline
                                numberOfLines={8}
                                textAlignVertical="top"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Ionicons name="checkmark" size={20} color="#fff" />
                        <Text style={styles.saveButtonText}>Lưu</Text>
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
    textArea: {
        height: 150,
        paddingTop: 12,
    },
    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});