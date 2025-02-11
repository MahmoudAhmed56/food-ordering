import Menu from "@/components/menu";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getProductsByCategory } from "@/server/db/products";

const MenuPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const categories = await getProductsByCategory();
  const { locale } = await params;
  const translations = await getTrans(locale);
  return (
    <main>
    {categories.length > 0 ? (
      categories.map((category) => (
        <section key={category.id} className="section-gap">
          <div className="container text-center">
            <h1 className="text-primary font-bold text-4xl italic mb-6">
              {category.name}
            </h1>
            <Menu items={category.products} />
          </div>
        </section>
      ))
    ) : (
      <p className="text-accent text-center py-20">
        {translations.noProductsFound}
      </p>
    )}
  </main>
  );
};

export default MenuPage;
