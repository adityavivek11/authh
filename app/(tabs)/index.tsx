import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

const { width: screenWidth } = Dimensions.get('window');

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

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

    const renderVideo = (title: string, index: number) => (
        <TouchableOpacity key={index} style={styles.videoCard}>
            <View style={styles.videoThumbnail}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/150x100' }}
                    style={styles.videoImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.videoTitle}>{title}</Text>
        </TouchableOpacity>
    );

    const renderCourse = (title: string, index: number) => (
        <TouchableOpacity key={index} style={styles.courseCard}>
            <View style={styles.courseThumbnail}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/200x150' }}
                    style={styles.courseImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.courseTitle}>{title}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Carousel Section */}
                <View style={styles.carouselContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const slideSize = event.nativeEvent.layoutMeasurement.width;
                            const index = event.nativeEvent.contentOffset.x / slideSize;
                            setActiveSlide(Math.round(index));
                        }}
                    >
                        {[1, 2, 3].map((_, index) => (
                            <View key={index} style={styles.carouselItem}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/350x200' }}
                                    style={styles.carouselImage}
                                    resizeMode="cover"
                                />
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.paginationContainer}>
                        {[1, 2, 3].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === activeSlide ? styles.paginationDotActive : null
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Get To Know Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Get To Know Ayurveda ??</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        style={styles.videosContainer}
                        contentContainerStyle={styles.videosContentContainer}
                    >
                        {['Video 1', 'Video 2', 'Video 3'].map((title, index) => 
                            renderVideo(title, index)
                        )}
                    </ScrollView>
                </View>

                {/* Courses Section */}
                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Courses We Offer</Text>
                    <View style={styles.coursesGrid}>
                        {['Course 1', 'Course 2'].map((title, index) => 
                            renderCourse(title, index)
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    scrollView: {
        flex: 1,
    },
    carouselContainer: {
        height: 200,
        marginVertical: 20,
    },
    carouselItem: {
        width: screenWidth,
        height: 200,
        backgroundColor: '#F8F8F8',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#4CAF50',
    },
    section: {
        padding: 20,
    },
    lastSection: {
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1A1A1A',
    },
    videosContainer: {
        flexDirection: 'row',
    },
    videosContentContainer: {
        paddingRight: 20,
    },
    videoCard: {
        width: 150,
        marginRight: 15,
    },
    videoThumbnail: {
        width: 150,
        height: 100,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        overflow: 'hidden',
    },
    videoImage: {
        width: '100%',
        height: '100%',
    },
    videoTitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#1A1A1A',
    },
    coursesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    courseCard: {
        width: '48%',
        marginBottom: 15,
    },
    courseThumbnail: {
        width: '100%',
        height: 150,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: '100%',
    },
    courseTitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#1A1A1A',
    },
});

export default Index;