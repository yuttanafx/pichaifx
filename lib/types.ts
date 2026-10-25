export type ActivationStatus = "pending" | "approved" | "rejected";
export type CommissionStatus = "pending" | "paid";

export type PublicUser = {
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
  rules: {
    priceSatang: number;
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
    "id" | "broker" | "accountNumber" | "status" | "createdAt"
  >[];
};

export type AdminOverview = {
  activations: (Activation & {
    userEmail: string;
    upline: { level: number; name: string; email: string; amountSatang: number }[];
  })[];
  commissions: (Commission & {
    beneficiaryName: string;
    beneficiaryEmail: string;
    sourceName: string;
  })[];
};
