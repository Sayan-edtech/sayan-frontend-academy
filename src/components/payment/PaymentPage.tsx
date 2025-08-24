import React, { useState } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';

interface PaymentPageProps {
  amount: number;
  currency?: string;
  onSuccess?: (paymentData: any) => void;
  onCancel?: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  amount,
  currency = 'SAR',
  onSuccess,
  onCancel
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const processPayment = async () => {
    if (!selectedMethod) {
      alert('يرجى اختيار وسيلة دفع');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentResult = {
        success: true,
        method: selectedMethod,
        amount,
        currency,
        timestamp: new Date().toISOString()
      };

      onSuccess?.(paymentResult);
    } catch (error) {
      alert('فشل في معالجة الدفع');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onMethodSelect={handleMethodSelect}
          amount={amount}
          currency={currency}
        />

        {selectedMethod && (
          <div className="mt-8 text-center">
            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'جاري المعالجة...' : 'إتمام الدفع'}
            </button>
            
            {onCancel && (
              <button
                onClick={onCancel}
                className="ml-4 px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                إلغاء
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
