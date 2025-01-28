import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { Languages } from "@/constants/enums";


export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <Header />
      {children}
      <Footer />
    </ReduxProvider>
  );
}
