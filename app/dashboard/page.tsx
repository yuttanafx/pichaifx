import PageFrame from "@/components/PageFrame";
import Dashboard from "@/components/Dashboard";

export const metadata = { title: "แดชบอร์ดของฉัน — PichaiFX Autotrad" };

export default function Page() {
  return (
    <PageFrame>
      <Dashboard />
    </PageFrame>
  );
}
