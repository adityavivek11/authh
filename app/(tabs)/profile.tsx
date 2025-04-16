import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            
            if (session?.user) {
                setUser(session.user);
            }
        } catch (error) {
            console.error('Error checking user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.replace('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Profile Information</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{user?.user_metadata?.full_name || 'Not set'}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{user?.email}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Account Created:</Text>
                        <Text style={styles.value}>
                            {new Date(user?.created_at).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    disabled={loading}
                >
                    <Text style={styles.logoutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    profileSection: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    label: {
        fontSize: 16,
        color: '#666666',
    },
    value: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});