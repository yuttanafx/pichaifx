import PageFrame from "@/components/PageFrame";
import AdminPanel from "@/components/AdminPanel";

export const metadata = { title: "จัดการระบบ — PichaiFX Autotrad", robots: { index: false } };

export default function Page() {
  return (
    <PageFrame>
      <AdminPanel />
    </PageFrame>
  );
}
