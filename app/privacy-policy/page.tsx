import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว (PDPA) — PichaiFX Autotrad",
  description:
    "นโยบายความเป็นส่วนตัวของ PichaiFX Autotrad ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
