import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function Doubts() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Doubts</Text>
            </View>
            
            <ScrollView style={styles.content}>
                <View style={styles.doubtCard}>
                    <Text style={styles.doubtTitle}>Sample Doubt</Text>
                    <Text style={styles.doubtDescription}>
                        This is a sample doubt description. You can add your doubts here.
                    </Text>
                    <View style={styles.doubtFooter}>
                        <Text style={styles.doubtDate}>Posted 2 days ago</Text>
                        <Text style={styles.doubtStatus}>Pending</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add New Doubt</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    doubtCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    doubtTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    doubtDescription: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 12,
    },
    doubtFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    doubtDate: {
        fontSize: 14,
        color: '#999999',
    },
    doubtStatus: {
        fontSize: 14,
        color: '#FFA000',
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
}); 