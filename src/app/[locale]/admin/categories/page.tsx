import { getCategories } from '@/server/db/categories'
import React from 'react'

const CategoriesPage = async () => {
  const categories = await getCategories()
  return (
    <main>
      <section className="section-gap">
        <div className="container">

        </div>
      </section>
    </main>
  )
}

export default CategoriesPage