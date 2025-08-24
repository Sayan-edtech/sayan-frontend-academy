/**
 * Payment API Service
 * Handles all payment-related API calls
 */

import { API_BASE_URL } from "@/lib/api-config";

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  icon?: string;
  enabled: boolean;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  student_id: number;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  course_id: number;
  course_title: string;
  course_price: number;
}

export interface Payment {
  id: number;
  payment_id: string;
  invoice_id: number;
  amount: number;
  currency: string;
  payment_status: string;
  payment_gateway: string;
  created_at: string;
  processed_at?: string;
}

export interface CheckoutRequest {
  coupon_code?: string;
  billing_info?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    [key: string]: unknown;
  };
  success_url?: string;
  back_url?: string;
}

export interface CheckoutResponse {
  redirect_url: string;
  transaction_id: string;
  invoice_id?: string;
  total_price: number;
  items_count: number;
  message: string;
}

export interface PurchaseHistory {
  purchases: Purchase[];
  total: number;
  page: number;
  per_page: number;
}

export interface Purchase {
  id: number;
  invoice_id: number;
  course_id: number;
  course_title: string;
  course_image?: string;
  academy_name: string;
  academy_logo?: string;
  purchase_date: string;
  price: number;
  currency: string;
  status: string;
  type: string;
}

export interface ApiResponse<T> {
  status: string;
  status_code: number;
  message: string;
  data: T;
  path: string;
  timestamp: string;
}

// Helper function to get headers (بدون Authorization عند الاعتماد على الكوكيز)
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // أضف معرف السلة من الكوكي إذا كان متوفر
  const cartCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('TheCookie='))
    ?.split('=')[1];
  if (cartCookie) headers['TheCookie'] = cartCookie;

  // إضافة Authorization من كوكي access_token لأن الباك يستخدم HTTPBearer
  const accessToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='))
    ?.split('=')[1];
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  return headers;
};

// Helper function to make authenticated API calls
const makeApiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    mode: 'cors',
    credentials: 'include', // مهم لإرسال كوكيز المصادقة مع الطلبات
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { 
        message: 'حدث خطأ في الاتصال بالخادم',
        status: response.status,
        statusText: response.statusText
      };
    }
    
    const errorMessage = errorData?.detail?.message || errorData?.message || `خطأ في الطلب: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

export class PaymentAPI {
  /**
   * Get available payment methods
   */
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await makeApiCall<ApiResponse<PaymentMethod[]>>('/payment/methods');
    return response.data;
  }

  /**
   * Process checkout
   */
  static async processCheckout(checkoutData: CheckoutRequest): Promise<CheckoutResponse> {
    const response = await makeApiCall<ApiResponse<CheckoutResponse>>('/checkout/process', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    });
    return response.data;
  }

  /**
   * Verify payment status
   */
  static async verifyPayment(transactionId: number): Promise<{
    success: boolean;
    status: string;
    transaction_id: number;
    enrollment_result?: unknown;
    verified_at?: string;
    error?: string;
  }> {
    const response = await makeApiCall<ApiResponse<{
      success: boolean;
      status: string;
      transaction_id: number;
      enrollment_result?: unknown;
      verified_at?: string;
      error?: string;
    }>>(`/transaction/verify/${transactionId}`);
    return response.data;
  }

  /**
   * Get student invoices
   */
  static async getInvoices(
    skip: number = 0,
    limit: number = 10,
    statusFilter?: string
  ): Promise<Invoice[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    
    if (statusFilter) {
      params.append('status_filter', statusFilter);
    }
    
    const response = await makeApiCall<ApiResponse<Invoice[]>>(`/payment/invoices?${params}`);
    return response.data;
  }

  /**
   * Get invoice details
   */
  static async getInvoiceDetails(invoiceId: number): Promise<Invoice> {
    const response = await makeApiCall<ApiResponse<Invoice>>(`/payment/invoices/${invoiceId}`);
    return response.data;
  }

  /**
   * Get student enrollment history (purchased courses)
   */
  static async getEnrollmentHistory(
    skip: number = 0,
    limit: number = 10
  ): Promise<PurchaseHistory> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    
    const response = await makeApiCall<ApiResponse<PurchaseHistory>>(`/payment/student/enrollment-history?${params}`);
    return response.data;
  }

  /**
   * Get student payment history
   */
  static async getPaymentHistory(
    skip: number = 0,
    limit: number = 10
  ): Promise<Payment[]> {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    
    const response = await makeApiCall<ApiResponse<Payment[]>>(`/payment/student/payment-history?${params}`);
    return response.data;
  }
}

