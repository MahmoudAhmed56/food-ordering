import { Locale } from '@/i18n.config';
import getTrans from '@/lib/translation';
import { getCategories } from '@/server/db/categories'
import React from 'react'
import Form from './_components/Form';

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const categories = await getCategories()
  const locale = (await params).locale;
  const translations = await getTrans(locale);
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div>
            <Form translations={translations} />
            {categories.length > 0 ? <ul></ul>:<p className="text-accent text-center py-10">
                {translations.noCategoriesFound}
              </p>}
          </div>

        </div>
      </section>
    </main>
  )
}

export default CategoriesPage