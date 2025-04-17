import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Lecture } from '@/types/database.types';

const { width: screenWidth } = Dimensions.get('window');

interface VideoPlayerProps {
    lecture: Lecture;
    onProgress?: (progress: number) => void;
}

export const VideoPlayer = ({ lecture, onProgress }: VideoPlayerProps) => {
    const [status, setStatus] = useState<any>({});
    const video = useRef<Video>(null);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        return () => {
            if (video.current) {
                video.current.unloadAsync();
            }
        };
    }, []);

    const handlePlaybackStatusUpdate = (status: any) => {
        setStatus(status);
        if (onProgress && status.isLoaded) {
            const progress = status.positionMillis / status.durationMillis;
            onProgress(progress);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: lecture.video_url,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping={false}
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
            {!status.isLoaded && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    video: {
        width: screenWidth,
        height: screenWidth * (9 / 16), // 16:9 aspect ratio
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
}); 