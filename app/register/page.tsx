import PageFrame from "@/components/PageFrame";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "สมัครสมาชิก — PichaiFX Autotrad" };

export default function Page() {
  return (
    <PageFrame>
      <AuthForm mode="register" />
    </PageFrame>
  );
}
