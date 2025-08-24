/**
 * Cart API Service
 * Handles all cart-related API calls
 */

import { API_BASE_URL } from "@/lib/api-config";

export interface CartItem {
  cart_id: string;
  item_type: string;
  item_id: string;
  item_details: {
    id: string;
    title: string;
    description?: string;
    price: number;
    original_price?: number;
    currency: string;
    image_url?: string;
    type: string;
    academy_name?: string;
    instructor_name?: string;
    duration?: string;
    students_count?: number;
    rating?: number;
  };
}

export interface CartSummary {
  items: CartItem[];
  total: number;
  count: number;
  currency: string;
  subtotal?: number;
  discount?: number;
  savings?: number;
}

export interface ApiResponse<T> {
  status: string;
  status_code: number;
  message: string;
  data: T;
  path: string;
  timestamp: string;
}

// Helper function to get headers with cookie
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Get authorization header if available
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Get or create cart ID from localStorage and send as TheCookie header
  const cartId = getCartId();
      if (cartId) {
      headers['TheCookie'] = cartId;
    }
  
  return headers;
};

// LocalStorage helper functions for cart persistence
function getCartId(): string {
  // Try to get existing cart ID from localStorage
  let cartId = localStorage.getItem('sayan_cart_id');
  
      if (!cartId) {
      // Generate new cart ID if none exists
      const timestamp = Date.now();
      const randomPart = Math.random().toString(36).substring(2, 15);
      cartId = `cart-${randomPart}-${timestamp}`;
      localStorage.setItem('sayan_cart_id', cartId);
    }
  
  return cartId;
}

function clearCartId(): void {
  localStorage.removeItem('sayan_cart_id');
}

// Helper function to make API calls with proper error handling
const makeApiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    mode: 'cors', // Explicitly set CORS mode
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
    credentials: 'include', // Re-enabled after fixing backend CORS
      });
    
    if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'حدث خطأ في الاتصال بالخادم' };
    }
    
    console.error('API Error:', errorData);
    throw new Error(errorData.message || `خطأ في الطلب: ${response.status}`);
  }

  return response.json();
};

export class CartAPI {
  /**
   * Get cart contents
   */
  static async getCart(): Promise<CartSummary> {
    const response = await makeApiCall<ApiResponse<CartSummary>>('/cart/');
    
    return {
      items: response.data?.items || [],
      total: response.data?.total || 0,
      count: response.data?.count || 0,
      currency: response.data?.currency || 'SAR',
      subtotal: response.data?.subtotal,
      discount: response.data?.discount,
      savings: response.data?.savings,
    };
  }

  /**
   * Add item to cart
   */
  static async addToCart(itemType: string, itemId: string): Promise<CartSummary> {
    // Validate inputs
    if (!itemType || !itemId) {
      throw new Error('نوع المنتج ومعرف المنتج مطلوبان');
    }

    const response = await makeApiCall<ApiResponse<CartSummary>>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        item_type: itemType,
        item_id: itemId,
      }),
    });
    
    // Validate response data
    if (!response.data) {
      throw new Error('استجابة غير صحيحة من الخادم');
    }
    
    return {
      items: response.data.items || [],
      total: response.data.total || 0,
      count: response.data.count || 0,
      currency: response.data.currency || 'SAR',
      subtotal: response.data.subtotal,
      discount: response.data.discount,
      savings: response.data.savings,
    };
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(cartId: string): Promise<CartSummary> {
    if (!cartId) {
      throw new Error('معرف عنصر السلة مطلوب');
    }

    const response = await makeApiCall<ApiResponse<CartSummary>>(`/cart/delete/${cartId}`, {
      method: 'DELETE',
    });
    
    return {
      items: response.data?.items || [],
      total: response.data?.total || 0,
      count: response.data?.count || 0,
      currency: response.data?.currency || 'SAR',
      subtotal: response.data?.subtotal,
      discount: response.data?.discount,
      savings: response.data?.savings,
    };
  }

  /**
   * Clear entire cart
   */
  static async clearCart(): Promise<CartSummary> {
    const response = await makeApiCall<ApiResponse<CartSummary>>('/cart/clear', {
      method: 'DELETE',
    });
    
    // Clear cart ID from localStorage when cart is cleared
    clearCartId();
    
    return {
      items: response.data?.items || [],
      total: response.data?.total || 0,
      count: response.data?.count || 0,
      currency: response.data?.currency || 'SAR',
      subtotal: response.data?.subtotal,
      discount: response.data?.discount,
      savings: response.data?.savings,
    };
  }
}
