export interface Opinion {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  image?: string;
  is_featured?: boolean;
  is_approved?: boolean;
  student_id?: number | null;
  course_id?: number | null;
  product_id?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface OpinionsListResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    opinions: Opinion[];
    total: number;
  };
  path: string | null;
  timestamp: string;
}

export interface OpinionResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Opinion;
  path: string | null;
  timestamp: string;
}

export interface OpinionPayload {
  name: string;
  content: string;
  rating: number;
  image?: File | string;
  is_featured?: boolean;
  is_approved?: boolean;
}
