import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";
import { initDB, getStatistics } from "../../database/expense";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Statistics() {
    const [stats, setStats] = useState<any>({
        totalIncome: 0,
        totalExpense: 0,
        incomeByMonth: [],
        expenseByMonth: [],
    });

    const loadStatistics = async () => {
        try {
            await initDB();
            const data = await getStatistics();
            setStats(data);
        } catch (error) {
            console.error("Error loading statistics:", error);
        }
    };

    useEffect(() => {
        loadStatistics();
    }, []);

    const maxAmount = Math.max(
        ...stats.incomeByMonth.map((m: any) => Number(m.total || 0)),
        ...stats.expenseByMonth.map((m: any) => Number(m.total || 0)),
        100000
    );

    const renderBar = (amount: number, color: string, label: string) => {
        const height = maxAmount > 0 ? (amount / maxAmount) * 150 : 0;
        return (
            <View style={styles.barContainer} key={label}>
                <View style={styles.barWrapper}>
                    <View style={[styles.bar, { height: Math.max(height, 5), backgroundColor: color }]} />
                </View>
                <Text style={styles.barLabel}>{label}</Text>
                <Text style={styles.barAmount}>{Number(amount).toLocaleString("vi-VN")} đ</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Thống kê thu chi</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <View style={[styles.summaryCard, styles.incomeCard]}>
                        <Ionicons name="arrow-down-circle" size={32} color="#28a745" />
                        <Text style={styles.summaryLabel}>Tổng Thu</Text>
                        <Text style={[styles.summaryAmount, styles.incomeAmount]}>
                            {Number(stats.totalIncome || 0).toLocaleString("vi-VN")} đ
                        </Text>
                    </View>

                    <View style={[styles.summaryCard, styles.expenseCard]}>
                        <Ionicons name="arrow-up-circle" size={32} color="#dc3545" />
                        <Text style={styles.summaryLabel}>Tổng Chi</Text>
                        <Text style={[styles.summaryAmount, styles.expenseAmount]}>
                            {Number(stats.totalExpense || 0).toLocaleString("vi-VN")} đ
                        </Text>
                    </View>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Số dư</Text>
                    <Text style={[styles.balanceAmount, (stats.totalIncome - stats.totalExpense) >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
                        {Number(stats.totalIncome - stats.totalExpense).toLocaleString("vi-VN")} đ
                    </Text>
                </View>

                {/* Income Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Thu nhập theo tháng</Text>
                    <View style={styles.chart}>
                        {stats.incomeByMonth.length > 0 ? (
                            stats.incomeByMonth.map((month: any) =>
                                renderBar(Number(month.total || 0), "#28a745", month.month || "")
                            )
                        ) : (
                            <Text style={styles.noData}>Chưa có dữ liệu</Text>
                        )}
                    </View>
                </View>

                {/* Expense Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Chi tiêu theo tháng</Text>
                    <View style={styles.chart}>
                        {stats.expenseByMonth.length > 0 ? (
                            stats.expenseByMonth.map((month: any) =>
                                renderBar(Number(month.total || 0), "#dc3545", month.month || "")
                            )
                        ) : (
                            <Text style={styles.noData}>Chưa có dữ liệu</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    summaryContainer: {
        flexDirection: "row",
        padding: 16,
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    incomeCard: {
        backgroundColor: "#d4edda",
    },
    expenseCard: {
        backgroundColor: "#f8d7da",
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
    },
    summaryAmount: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 4,
    },
    incomeAmount: {
        color: "#28a745",
    },
    expenseAmount: {
        color: "#dc3545",
    },
    balanceCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceLabel: {
        fontSize: 16,
        color: "#666",
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 28,
        fontWeight: "bold",
    },
    positiveBalance: {
        color: "#28a745",
    },
    negativeBalance: {
        color: "#dc3545",
    },
    chartContainer: {
        marginHorizontal: 16,
        marginBottom: 24,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
    },
    chart: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        height: 200,
        paddingBottom: 20,
    },
    barContainer: {
        alignItems: "center",
        flex: 1,
    },
    barWrapper: {
        height: 150,
        justifyContent: "flex-end",
        width: "80%",
    },
    bar: {
        width: "100%",
        borderRadius: 4,
        minHeight: 5,
    },
    barLabel: {
        fontSize: 10,
        color: "#666",
        marginTop: 4,
        textAlign: "center",
    },
    barAmount: {
        fontSize: 10,
        color: "#333",
        marginTop: 2,
        fontWeight: "600",
        textAlign: "center",
    },
    noData: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        padding: 20,
    },
});

