import { makeApiCall } from '@/lib/api-utils';

export interface EnrolledCourse {
  enrollment_id: number;
  course_id: string;
  course_title: string;
  course_description: string;
  course_thumbnail: string;
  course_slug: string;
  academy_name: string;
  academy_id: number;
  enrolled_at: string;
  expires_at: string | null;
  price_paid: number;
  status: 'active' | 'inactive';
  progress: number;
  lessons_count: number;
  duration: string;
}

export interface CourseProgress {
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
  last_accessed: string | null;
  time_spent: number; // in minutes
  certificates_earned: number;
}

export interface EducationalMaterialsResponse {
  courses: EnrolledCourse[];
  statistics: {
    total_enrolled: number;
    active_courses: number;
    total_spent: number;
    certificates_earned: number;
  };
}

export interface CourseProgressResponse {
  progress: CourseProgress;
}

export class EducationalMaterialsAPI {
  static async getEnrolledCourses(): Promise<EducationalMaterialsResponse> {
    const response = await makeApiCall<{ data: EducationalMaterialsResponse }>('/students/educational-materials/enrolled-courses');
    return response.data;
  }

  static async getCourseProgress(courseId: string): Promise<CourseProgressResponse> {
    const response = await makeApiCall<{ data: CourseProgressResponse }>(`/students/educational-materials/course/${courseId}/progress`);
    return response.data;
  }

  static async getStudentCertificates(): Promise<{ certificates: any[] }> {
    const response = await makeApiCall<{ data: { certificates: any[] } }>('/students/educational-materials/certificates');
    return response.data;
  }
}
