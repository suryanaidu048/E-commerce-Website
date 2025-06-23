import Link from "next/link"
import Image from "next/image"

export default function CategoryCard({ category, imageUrl, productCount }) {
  return (
    <Link href={`/shop?category=${encodeURIComponent(category)}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={category}
            width={300}
            height={200}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
        </div>

        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{category}</h3>
          <p className="text-gray-600 text-sm">{productCount} products</p>
        </div>
      </div>
    </Link>
  )
}
