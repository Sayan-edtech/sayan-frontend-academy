import React from 'react';
import { PaymentPage } from '@/components/payment/PaymentPage';

const PaymentTestPage: React.FC = () => {
  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    alert(`تم الدفع بنجاح! الطريقة: ${paymentData.method}`);
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
    alert('تم إلغاء عملية الدفع');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            صفحة اختبار الدفع
          </h1>
          <p className="text-gray-600">
            اختر وسيلة الدفع المناسبة لك لإتمام عملية الدفع
          </p>
        </div>

        <PaymentPage
          amount={299}
          currency="SAR"
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    </div>
  );
};

export default PaymentTestPage;

