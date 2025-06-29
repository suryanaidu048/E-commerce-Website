"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { ShoppingCart, Menu, X, LogOut, Package } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { userData, isAuthenticated, logout } = useAuth()
  const { getCartCount } = useCart()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  return (
    <nav className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold">EcoBazar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="hover:text-green-200 transition-colors">
              Shop
            </Link>
            {isAuthenticated && (
              <Link href="/orders" className="hover:text-green-200 transition-colors flex items-center space-x-1">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </Link>
            )}
            {isAuthenticated && userData?.role === "admin" && (
              <Link href="/admin" className="hover:text-green-200 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-green-200 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Hi, {userData?.email?.split("@")[0]}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-green-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="hover:text-green-200 transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-green-200">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
              <Link href="/" className="block px-3 py-2 hover:bg-green-600 rounded-md" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link
                href="/shop"
                className="block px-3 py-2 hover:bg-green-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              {isAuthenticated && (
                <Link
                  href="/orders"
                  className="block px-3 py-2 hover:bg-green-600 rounded-md flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              )}
              {isAuthenticated && userData?.role === "admin" && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 hover:bg-green-600 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <Link
                href="/cart"
                className="block px-3 py-2 hover:bg-green-600 rounded-md flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-green-600 rounded-md flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 hover:bg-green-600 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 hover:bg-green-600 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
