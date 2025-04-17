import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { VideoPlayer } from '@/components/VideoPlayer';
import { lectureService } from '@/utils/services/lectures';
import type { Lecture } from '@/types/database.types';
import { supabase } from '@/utils/supabase';

export default function LectureDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        loadLecture();
        checkUser();
    }, [id]);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setUser(session.user);
        }
    };

    const loadLecture = async () => {
        try {
            const lectureData = await lectureService.getLectureById(id);
            setLecture(lectureData);
        } catch (error) {
            console.error('Error loading lecture:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProgress = async (progress: number) => {
        if (user) {
            try {
                await lectureService.updateLectureProgress(user.id, id, progress);
            } catch (error) {
                console.error('Error updating progress:', error);
            }
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!lecture) {
        return (
            <View style={styles.container}>
                <Text>Lecture not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <VideoPlayer lecture={lecture} onProgress={handleProgress} />
            <View style={styles.content}>
                <Text style={styles.title}>{lecture.title}</Text>
                {lecture.description && (
                    <Text style={styles.description}>{lecture.description}</Text>
                )}
            </View>
        </ScrollView>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1A1A1A',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666666',
    },
}); 