import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/constants/enums";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import { Locale } from "@/i18n.config";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ local: Locale }>;
}>) {
  const locale = (await params).local;
  
  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body className={
        locale === Languages.ARABIC? cairo.className : roboto.className
      }>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          <Toaster/>
        </ReduxProvider>
      </body>
    </html>
  );
}
