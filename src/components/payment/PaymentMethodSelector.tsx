import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface PaymentMethod {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  enabled: boolean;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  features: string[];
}

interface PaymentMethodSelectorProps {
  selectedMethod: string | null;
  onMethodSelect: (methodId: string) => void;
  amount: number;
  currency?: string;
  className?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'applepay',
    name: 'Apple Pay',
    nameAr: 'Apple Pay',
    icon: '/static/uploads/8666205_apple_pay_icon.svg',
    description: 'Apple Digital Wallet - Fast & Secure',
    descriptionAr: 'المحفظة الرقمية من آبل - سريعة وآمنة',
    enabled: true,
    minAmount: 1,
    maxAmount: 50000,
    processingTime: 'instant',
    features: ['Touch ID', 'Face ID', 'Device Verification', 'No Card Details']
  },
  {
    id: 'mada',
    name: 'Mada Cards',
    nameAr: 'بطاقات مدى',
    icon: '/static/uploads/شعار مدى – SVG.svg',
    description: 'Saudi Payment Network - No Foreign Fees',
    descriptionAr: 'شبكة مدى السعودية - بدون رسوم أجنبية',
    enabled: true,
    minAmount: 1,
    maxAmount: 50000,
    processingTime: 'instant',
    features: ['Saudi National', 'No Foreign Fees', 'Instant Processing', 'Widely Accepted']
  },
  {
    id: 'creditcard',
    name: 'Credit/Debit Cards',
    nameAr: 'بطاقات الائتمان/الخصم',
    icon: '/static/uploads/8666255_cc_visa_icon.svg',
    description: 'Visa, Mastercard, American Express',
    descriptionAr: 'فيزا، ماستركارد، أمريكان إكسبريس',
    enabled: true,
    minAmount: 1,
    maxAmount: 50000,
    processingTime: 'instant',
    features: ['International', 'Widely Accepted', 'Secure Processing', 'Multiple Currencies']
  }
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
  amount,
  currency = 'SAR',
  className = ''
}) => {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const getMethodStatus = (method: PaymentMethod) => {
    if (!method.enabled) return 'disabled';
    if (amount < method.minAmount) return 'below_min';
    if (amount > method.maxAmount) return 'above_max';
    return 'available';
  };

  const getStatusMessage = (method: PaymentMethod) => {
    const status = getMethodStatus(method);
    switch (status) {
      case 'disabled':
        return 'غير متاح حالياً';
      case 'below_min':
        return `الحد الأدنى: ${method.minAmount} ${currency}`;
      case 'above_max':
        return `الحد الأقصى: ${method.maxAmount} ${currency}`;
      default:
        return 'متاح';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          اختر وسيلة الدفع
        </h3>
        <p className="text-gray-600">
          اختر الطريقة المناسبة لك لإتمام عملية الدفع
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {paymentMethods.map((method) => {
          const status = getMethodStatus(method);
          const isAvailable = status === 'available';
          const isSelected = selectedMethod === method.id;

          return (
            <motion.div
              key={method.id}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${!isAvailable ? 'opacity-60 cursor-not-allowed' : ''}
                ${hoveredMethod === method.id ? 'transform scale-105' : ''}
              `}
              onClick={() => isAvailable && onMethodSelect(method.id)}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
              whileHover={isAvailable ? { scale: 1.02 } : {}}
              whileTap={isAvailable ? { scale: 0.98 } : {}}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Method Icon */}
              <div className="flex justify-center mb-4">
                <img 
                  src={method.icon} 
                  alt={method.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Method Name */}
              <div className="text-center mb-3">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {method.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {method.nameAr}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-4">
                {method.descriptionAr}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {method.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className={`
                text-center text-xs font-medium px-3 py-1 rounded-full
                ${isAvailable 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {getStatusMessage(method)}
              </div>

              {/* Processing Time */}
              <div className="text-center mt-3">
                <span className="text-xs text-gray-500">
                  معالجة: {method.processingTime === 'instant' ? 'فورية' : method.processingTime}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Amount Display */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">المبلغ المطلوب:</p>
        <p className="text-2xl font-bold text-gray-900">
          {amount.toLocaleString()} {currency}
        </p>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        <p>جميع المدفوعات محمية ومشفرة</p>
        <p>يمكنك إلغاء العملية في أي وقت قبل التأكيد النهائي</p>
      </div>
    </div>
  );
};
