import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const {locale} = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return <main></main>;
};

export default ProfilePage;
