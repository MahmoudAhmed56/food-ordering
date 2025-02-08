import Menu from "@/components/menu"
import { getProductsByCategory } from "@/server/db/products"

const MenuPage = async () => {
  const categories = await getProductsByCategory()
  return (
    <main>{categories.map((category)=>{
      return(
        <section key={category.id} className="section-gap">
          <div className="container text-center">
            <h1 className="text-primary font-bold text-4xl italic mb-6">{category.name}</h1>
            <Menu items={category.products}/>
          </div>
        </section>
      )
    })}</main>
  )
}

export default MenuPage