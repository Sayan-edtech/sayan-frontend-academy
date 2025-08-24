import React, { useState, useEffect } from 'react';

// Apple Pay type definitions
declare global {
  interface Window {
    ApplePaySession?: typeof ApplePaySession;
  }
}

declare class ApplePaySession {
  static readonly STATUS_SUCCESS: number;
  static readonly STATUS_FAILURE: number;
  static canMakePayments(): boolean;
  
  constructor(version: number, paymentRequest: ApplePayPaymentRequest);
  
  onvalidatemerchant: (event: ApplePayValidateMerchantEvent) => void;
  onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void;
  oncancel: (event: Event) => void;
  
  begin(): void;
  abort(): void;
  completeMerchantValidation(merchantSession: any): void;
  completePayment(result: number): void;
}

interface ApplePayPaymentRequest {
  countryCode: string;
  currencyCode: string;
  supportedNetworks: string[];
  merchantCapabilities: string[];
  total: ApplePayLineItem;
}

interface ApplePayLineItem {
  label: string;
  amount: string;
}

interface ApplePayValidateMerchantEvent extends Event {
  validationURL: string;
}

interface ApplePayPaymentAuthorizedEvent extends Event {
  payment: ApplePayPayment;
}

interface ApplePayPayment {
  token: ApplePayPaymentToken;
}

interface ApplePayPaymentToken {
  paymentData: any;
  paymentMethod: ApplePayPaymentMethod;
  transactionIdentifier: string;
}

interface ApplePayPaymentMethod {
  displayName: string;
  network: string;
  type: string;
}

interface PaymentProcessorProps {
  method: string;
  amount: number;
  currency: string;
  orderId?: string;
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

interface MoyasarPaymentData {
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  back_url: string;
  source: {
    type: string;
    [key: string]: any;
  };
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  method,
  amount,
  currency,
  orderId,
  onSuccess,
  onError,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  // Moyasar configuration
  const MOYASAR_PUBLIC_KEY = process.env.REACT_APP_MOYASAR_PUBLIC_KEY || 'pk_test_vcFZZiinQhLgdvZLlsx8O14XFTy2IVn6sGzFKgcH';
  const MOYASAR_BASE_URL = 'https://api.moyasar.com/v1';

  useEffect(() => {
    if (method && amount > 0) {
      initializePayment();
    }
  }, [method, amount]);

  const initializePayment = async () => {
    setIsLoading(true);
    
    try {
      let sourceType = 'creditcard';
      let sourceData: any = {};

      // Configure payment source based on method
      switch (method) {
        case 'applepay':
          sourceType = 'applepay';
          sourceData = {
            type: 'applepay',
            // Apple Pay specific configuration
            merchant_identifier: process.env.REACT_APP_APPLE_PAY_MERCHANT_ID,
            display_name: 'SAYAN Platform',
            validation_url: `${process.env.REACT_APP_API_URL}/api/v1/payment/apple-pay/validate`
          };
          break;

        case 'mada':
          sourceType = 'creditcard';
          sourceData = {
            type: 'creditcard',
            // Mada specific configuration
            network: 'mada',
            // Enable Mada-specific features
            mada_support: true
          };
          break;

        case 'creditcard':
        default:
          sourceType = 'creditcard';
          sourceData = {
            type: 'creditcard',
            // International cards support
            international: true
          };
          break;
      }

      const paymentData: MoyasarPaymentData = {
        amount: amount * 100, // Convert to halalah (smallest currency unit)
        currency: currency,
        description: `دفع لطلب ${orderId || 'غير محدد'} - SAYAN Platform`,
        callback_url: `${window.location.origin}/payment/success`,
        back_url: `${window.location.origin}/payment/cancel`,
        source: {
          type: sourceType,
          ...sourceData
        }
      };

      // Create payment session with Moyasar
      const response = await fetch(`${MOYASAR_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(MOYASAR_PUBLIC_KEY + ':')}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`فشل في إنشاء جلسة الدفع: ${response.statusText}`);
      }

      const paymentSession = await response.json();
      
      if (paymentSession.status === 'initiated') {
        // Redirect to Moyasar payment page
        // setPaymentUrl(paymentSession.url);
        window.location.href = paymentSession.url;
      } else {
        throw new Error('فشل في تهيئة الدفع');
      }

    } catch (error) {
      console.error('Payment initialization error:', error);
      onError(error instanceof Error ? error.message : 'خطأ غير متوقع في الدفع');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplePay = async () => {
    if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
      onError('Apple Pay غير متاح على هذا الجهاز');
      return;
    }

    try {
      setIsLoading(true);

      // Create Apple Pay session
      const paymentRequest = {
        countryCode: 'SA',
        currencyCode: currency,
        supportedNetworks: ['visa', 'masterCard', 'mada'],
        merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
        total: {
          label: 'SAYAN Platform',
          amount: amount.toString()
        }
      };

      const session = new ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event: ApplePayValidateMerchantEvent) => {
        try {
          // Validate merchant with your backend
          const validationResponse = await fetch('/api/v1/payment/apple-pay/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              validationURL: event.validationURL,
              merchantIdentifier: process.env.REACT_APP_APPLE_PAY_MERCHANT_ID
            })
          });

          if (validationResponse.ok) {
            const merchantSession = await validationResponse.json();
            session.completeMerchantValidation(merchantSession);
          } else {
            session.abort();
            onError('فشل في التحقق من التاجر');
          }
        } catch (error) {
          session.abort();
          onError('خطأ في التحقق من التاجر');
        }
      };

      session.onpaymentauthorized = async (event: ApplePayPaymentAuthorizedEvent) => {
        try {
          // Process payment with your backend
          const paymentResponse = await fetch('/api/v1/payment/apple-pay/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: event.payment.token,
              amount,
              currency,
              orderId
            })
          });

          if (paymentResponse.ok) {
            const result = await paymentResponse.json();
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
            onSuccess(result);
          } else {
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            onError('فشل في معالجة الدفع');
          }
        } catch (error) {
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          onError('خطأ في معالجة الدفع');
        }
      };

      session.oncancel = () => {
        onCancel();
      };

      session.begin();

    } catch (error) {
      console.error('Apple Pay error:', error);
      onError('خطأ في Apple Pay');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentMethod = () => {
    switch (method) {
      case 'applepay':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-black rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Apple Pay
              </h3>
              <p className="text-gray-600 mb-4">
                استخدم Apple Pay لإتمام عملية الدفع بسرعة وأمان
              </p>
            </div>
            <button
              onClick={handleApplePay}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'جاري التهيئة...' : 'متابعة مع Apple Pay'}
            </button>
          </div>
        );

      case 'mada':
      case 'creditcard':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {method === 'mada' ? 'بطاقة مدى' : 'بطاقة ائتمان/خصم'}
              </h3>
              <p className="text-gray-600 mb-4">
                سيتم توجيهك إلى صفحة الدفع الآمنة لإدخال بيانات البطاقة
              </p>
            </div>
            <button
              onClick={initializePayment}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'جاري التهيئة...' : 'متابعة الدفع'}
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center text-red-600">
            وسيلة دفع غير معروفة
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {renderPaymentMethod()}
        
        <div className="mt-6 text-center">
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            إلغاء العملية
          </button>
        </div>
      </div>
    </div>
  );
};

