import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function Courses() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Courses</Text>
            </View>
            
            <ScrollView style={styles.content}>
                <TouchableOpacity style={styles.courseCard}>
                    <View style={styles.courseImageContainer}>
                        <Image 
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.courseImage}
                        />
                    </View>
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseTitle}>Introduction to Programming</Text>
                        <Text style={styles.courseDescription}>
                            Learn the basics of programming with this comprehensive course.
                        </Text>
                        <View style={styles.courseFooter}>
                            <Text style={styles.courseDuration}>12 weeks</Text>
                            <Text style={styles.courseLevel}>Beginner</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.courseCard}>
                    <View style={styles.courseImageContainer}>
                        <Image 
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.courseImage}
                        />
                    </View>
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseTitle}>Advanced Mathematics</Text>
                        <Text style={styles.courseDescription}>
                            Deep dive into advanced mathematical concepts and applications.
                        </Text>
                        <View style={styles.courseFooter}>
                            <Text style={styles.courseDuration}>16 weeks</Text>
                            <Text style={styles.courseLevel}>Advanced</Text>
                        </View>
                    </View>
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
    courseCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
    },
    courseImageContainer: {
        height: 150,
        backgroundColor: '#EEEEEE',
    },
    courseImage: {
        width: '100%',
        height: '100%',
    },
    courseInfo: {
        padding: 16,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    courseDescription: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 12,
    },
    courseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseDuration: {
        fontSize: 14,
        color: '#999999',
    },
    courseLevel: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
}); 