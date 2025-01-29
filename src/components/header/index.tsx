import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = async () => {
  const locale = await getCurrentLocale();
  const { logo,navbar  } = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link
          className="text-primary font-semibold text-2xl"
          href={`/${locale}`}
        >
          🍕 {logo}
        </Link>
        <Navbar translations={navbar} />
        <LanguageSwitcher />
        <CartButton />
      </div>
    </header>
  );
};

export default Header;
