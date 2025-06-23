"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import ProductCard from "@/components/ProductCard"
import CategoryCard from "@/components/CategoryCard"
import { Leaf, Recycle, Heart, ShoppingBag } from "lucide-react"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch featured products
      const productsRes = await fetch("/api/products?limit=8")
      const products = await productsRes.json()
      setFeaturedProducts(products)

      // Fetch categories
      const categoriesRes = await fetch("/api/categories")
      const categoriesData = await categoriesRes.json()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const categoryImages = {
    "Personal Care": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
    "Household Essentials": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    "Reusable Alternatives": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
    "Gardening & Green Living": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
    "Fashion & Accessories": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    "Gift Items": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Shop Eco-Friendly Products for a<span className="text-green-200"> Greener Tomorrow</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Discover sustainable alternatives that help protect our planet. From personal care to household
                essentials, we've got everything you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="#features"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
                alt="Eco-friendly products"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose EcoBazar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing high-quality, sustainable products that make a positive impact on the
              environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Eco-Friendly</h3>
              <p className="text-gray-600">All our products are sustainably sourced and environmentally friendly.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recyclable Packaging</h3>
              <p className="text-gray-600">We use minimal, recyclable packaging to reduce waste.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethically Made</h3>
              <p className="text-gray-600">Supporting fair trade and ethical manufacturing practices.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery with carbon-neutral shipping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">
              Find the perfect eco-friendly products for every aspect of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                imageUrl={
                  categoryImages[category.name] ||
                  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop"
                }
                productCount={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular eco-friendly products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with EcoBazar</h2>
          <p className="text-xl mb-8 text-green-100">
            Get the latest updates on new products, sustainability tips, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-800" />
            <button className="bg-green-500 hover:bg-green-400 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
