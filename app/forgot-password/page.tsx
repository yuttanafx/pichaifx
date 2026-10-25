import PageFrame from "@/components/PageFrame";
import ResetForm from "@/components/ResetForm";

export const metadata = { title: "ลืมรหัสผ่าน — PichaiFX Autotrad" };

export default function Page() {
  return (
    <PageFrame>
      <ResetForm mode="forgot" />
    </PageFrame>
  );
}
