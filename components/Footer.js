export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EcoBazar</span>
            </div>
            <p className="text-green-200 mb-4 max-w-md">
              Your one-stop shop for eco-friendly products. We're committed to providing sustainable alternatives that
              help protect our planet for future generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-green-200 hover:text-white transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop?category=Personal Care" className="text-green-200 hover:text-white transition-colors">
                  Personal Care
                </a>
              </li>
              <li>
                <a
                  href="/shop?category=Household Essentials"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Household
                </a>
              </li>
              <li>
                <a
                  href="/shop?category=Reusable Alternatives"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Reusable Items
                </a>
              </li>
              <li>
                <a
                  href="/shop?category=Gardening & Green Living"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Gardening
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">© 2024 EcoBazar. All rights reserved. Made with 💚 for the planet.</p>
        </div>
      </div>
    </footer>
  )
}
