import PageFrame from "@/components/PageFrame";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "เข้าสู่ระบบ — PichaiFX Autotrad" };

export default function Page() {
  return (
    <PageFrame>
      <AuthForm mode="login" />
    </PageFrame>
  );
}
