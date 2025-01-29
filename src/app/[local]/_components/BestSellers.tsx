import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSellers, getProductsByCategory } from "@/server/db/products";

const BestSellers = async () => {
  const bestSellers = await getBestSellers();
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            title={bestSeller.OurBestSellers}
            subTitle={bestSeller.checkOut}
          />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
