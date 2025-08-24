// Wallet Types
export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  typeColor: TransactionColor;
  product: string;
  student: string;
  change: string;
  after: string;
  status: TransactionStatus;
  amount?: number;
}

export type TransactionType =
  | "بيع دورة"
  | "عمولة شراكة"
  | "سحب أرباح"
  | "رسوم إدارية"
  | "إضافة رصيد";

export type TransactionColor = "blue" | "purple" | "red" | "orange" | "green";

export type TransactionStatus =
  | "completed"
  | "pending"
  | "cancelled"
  | "rejected";

export type TransactionFilter =
  | "all"
  | "income"
  | "expense"
  | "course"
  | "partnership";

export type DateRange = "today" | "this-week" | "this-month" | "this-year";

export type ChartPeriod = "weekly" | "monthly" | "yearly";

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface WalletStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  monthlyGrowth: number;
  totalStudents: number;
  activeCourses: number;
}

export interface WithdrawalRequest {
  id: string;
  status: "pending" | "completed" | "rejected";
  amount: number;
  date: string;
  requestDate: string;
  processedDate?: string;
  reason?: string;
}

export interface WalletBalance {
  total: number;
  monthlyRevenue: number;
  withdrawals: number;
  partnershipCommissions: number;
  availableForWithdrawal: number;
}

// Chart.js related types
export interface ChartTooltipItem {
  dataset: {
    label: string;
  };
  parsed: {
    y: number;
  };
}

export interface ChartCallbackContext {
  dataset: {
    label: string;
  };
  parsed: {
    y: number;
  };
}
