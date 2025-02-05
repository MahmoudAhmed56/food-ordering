"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Languages } from "@/constants/enums";
const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { local } = useParams();
  
  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${local}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };
  return (
    <div className="flex">
      {local === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};
export default LanguageSwitcher;
