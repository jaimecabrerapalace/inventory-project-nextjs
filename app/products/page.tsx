"use client"

import ProductTable from "@/components/ProductTable"

const ProductPage =  () => {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Inventario Productos</h1>
      <ProductTable />
    </div>
  )
}

export default ProductPage