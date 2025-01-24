import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { formatCurrency } from "@/lib/forrmaters";
import { db } from "@/lib/prisma";
import { getBestSellers } from "@/server/db/products";
import Image from "next/image";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(3)
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading title={"CheckOut"} subTitle={"Our Best Sellers"} />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
