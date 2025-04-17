export type Course = {
    id: string;
    created_at: string;
    title: string;
    instructor: string;
    duration: string;
    lessons: string;
    students: string;
    description?: string;
    image_url?: string;
    curriculum: {
        title: string;
        duration: string;
        type: string;
        completed: boolean;
    }[];
}

export type CourseEnrollment = {
    id: string;
    created_at: string;
    user_id: string;
    course_id: string;
    progress: number;
    completed_lessons: number[];
    last_accessed: string;
}

export type Lecture = {
    id: string;
    created_at: string;
    course_id: string;
    title: string;
    description?: string;
    video_url: string;
    duration: string;
    order: number;
    thumbnail_url?: string;
}

export type Database = {
    public: {
        Tables: {
            courses: {
                Row: Course;
                Insert: Omit<Course, 'id' | 'created_at'>;
                Update: Partial<Omit<Course, 'id' | 'created_at'>>;
            };
            course_enrollments: {
                Row: CourseEnrollment;
                Insert: Omit<CourseEnrollment, 'id' | 'created_at'>;
                Update: Partial<Omit<CourseEnrollment, 'id' | 'created_at'>>;
            };
            lectures: {
                Row: Lecture;
                Insert: Omit<Lecture, 'id' | 'created_at'>;
                Update: Partial<Omit<Lecture, 'id' | 'created_at'>>;
            };
        };
    };
}; 