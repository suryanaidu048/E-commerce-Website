"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { ShoppingCart, Heart } from "lucide-react"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{product.category}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
