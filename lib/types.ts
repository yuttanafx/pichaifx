export type ActivationStatus = "pending" | "approved" | "rejected";
export type CommissionStatus = "pending" | "paid";

export type BankAccount = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

/** ตั้งค่าการชำระเงินโดยแอดมิน: ยอดรายเดือน + บัญชีกลางให้สมาชิกโอนเงิน */
export type PaymentSettings = {
  /** ค่าสมาชิกครั้งแรก (จ่ายตอนสมัครใช้งานครั้งแรก — ค่าแนะนำคิดจากยอดนี้) */
  firstPriceSatang: number;
  /** ค่าสมาชิกรายเดือน (ต่ออายุ) */
  priceSatang: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  note: string;
};

export type PublicUser = {
  bank?: BankAccount;
  id: string;
  email: string;
  name: string;
  refCode: string;
  referrerId: string | null;
  createdAt: string;
};

export type Activation = {
  id: string;
  userId: string;
  name: string;
  contact: string;
  broker: string;
  accountNumber: string;
  server: string;
  note: string;
  status: ActivationStatus;
  createdAt: string;
  reviewedAt?: string;
  /** วันหมดอายุรายเดือน (ตั้งตอนอนุมัติ +30 วัน, ต่ออายุได้) */
  expiresAt?: string;
  /** วันหมดอายุที่ส่งแจ้งเตือนไปแล้ว (กันส่งซ้ำ) */
  reminderSentFor?: string;
};

export type Commission = {
  id: string;
  activationId: string;
  beneficiaryId: string;
  sourceUserId: string;
  level: 1 | 2 | 3;
  percent: number;
  amountSatang: number;
  status: CommissionStatus;
  createdAt: string;
  paidAt?: string;
};

export type DashboardData = {
  user: { name: string; email: string; refCode: string; isAdmin: boolean };
  payment: PaymentSettings;
  bank: BankAccount | null;
  rules: {
    priceSatang: number; // ฐานคิดค่าแนะนำ = ค่าสมาชิกครั้งแรก
    poolPercent: number;
    levels: { level: number; percent: number; amountSatang: number }[];
  };
  downline: { level: number; count: number }[];
  totals: {
    earnedSatang: number;
    pendingSatang: number;
    paidSatang: number;
    byLevel: { level: number; amountSatang: number }[];
  };
  commissions: {
    id: string;
    level: number;
    percent: number;
    amountSatang: number;
    status: CommissionStatus;
    sourceMasked: string;
    createdAt: string;
    paidAt?: string;
  }[];
  activations: Pick<
    Activation,
    "id" | "broker" | "accountNumber" | "status" | "createdAt" | "expiresAt"
  >[];
};

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  refCode: string;
  referrerName: string;
  createdAt: string;
  isAdmin: boolean;
  bank: BankAccount | null;
  /** สายล่างแต่ละชั้น (ชั้น 1-3) */
  downline: { level: number; members: { id: string; name: string; email: string }[] }[];
  commission: {
    earnedSatang: number;
    pendingSatang: number;
    paidSatang: number;
    byLevel: { level: number; amountSatang: number }[];
  };
  accounts: {
    activationId: string;
    broker: string;
    accountNumber: string;
    status: ActivationStatus;
    expiresAt?: string;
  }[];
};

export type AdminOverview = {
  settings: PaymentSettings;
  members: AdminMember[];
  activations: (Activation & {
    userEmail: string;
    upline: { level: number; name: string; email: string; amountSatang: number }[];
  })[];
  commissions: (Commission & {
    beneficiaryName: string;
    beneficiaryEmail: string;
    sourceName: string;
    beneficiaryBank: BankAccount | null;
  })[];
};
