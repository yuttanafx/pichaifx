import PageFrame from "@/components/PageFrame";
import ResetForm from "@/components/ResetForm";

export const metadata = { title: "ตั้งรหัสผ่านใหม่ — PichaiFX Autotrad" };

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  return (
    <PageFrame>
      <ResetForm mode="reset" token={searchParams.token ?? ""} />
    </PageFrame>
  );
}
