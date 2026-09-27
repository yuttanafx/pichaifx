import type { Metadata } from "next";
import RiskWarningContent from "@/components/legal/RiskWarningContent";

export const metadata: Metadata = {
  title: "คำเตือนความเสี่ยง — PichaiFX Autotrad",
  description: "คำเตือนความเสี่ยงเกี่ยวกับการเทรดผลิตภัณฑ์ทางการเงินและระบบเทรดอัตโนมัติ",
};

export default function RiskWarningPage() {
  return <RiskWarningContent />;
}
