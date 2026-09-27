import type { Metadata } from "next";
import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "ข้อตกลงการใช้งาน — PichaiFX Autotrad",
  description: "ข้อตกลงและเงื่อนไขการใช้งานเว็บไซต์และบริการของ PichaiFX Autotrad",
};

export default function TermsPage() {
  return <TermsContent />;
}
