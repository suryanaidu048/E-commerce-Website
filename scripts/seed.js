import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../lib/firebase.js"

const seedData = async () => {
  try {
    console.log("Starting database seeding...")

    // Create admin user
    try {
      const adminCredential = await createUserWithEmailAndPassword(auth, "admin@ecobazar.com", "admin123")
      await setDoc(doc(db, "users", adminCredential.user.uid), {
        email: "admin@ecobazar.com",
        role: "admin",
        createdAt: new Date().toISOString(),
      })
      console.log("Created admin user")
    } catch (error) {
      console.log("Admin user might already exist:", error.message)
    }

    // Create regular user
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, "user@ecobazar.com", "user123")
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: "user@ecobazar.com",
        role: "user",
        createdAt: new Date().toISOString(),
      })
      console.log("Created regular user")
    } catch (error) {
      console.log("Regular user might already exist:", error.message)
    }

    // Seed products
    const products = [
      {
        name: "Bamboo Toothbrush Set",
        price: 299,
        category: "Personal Care",
        description: "Eco-friendly bamboo toothbrushes with soft bristles. Pack of 4 biodegradable toothbrushes.",
        imageUrl: "https://images.unsplash.com/photo-1607869081394-90000c2f4a0b?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Organic Cotton Tote Bag",
        price: 450,
        category: "Reusable Alternatives",
        description: "Durable organic cotton tote bag perfect for grocery shopping and daily use.",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Stainless Steel Water Bottle",
        price: 899,
        category: "Reusable Alternatives",
        description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours and hot for 12 hours.",
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Natural Soap Bar Set",
        price: 399,
        category: "Personal Care",
        description: "Handmade natural soap bars with essential oils. Set of 3 different fragrances.",
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Biodegradable Cleaning Spray",
        price: 249,
        category: "Household Essentials",
        description: "All-natural, biodegradable multi-surface cleaning spray safe for home and environment.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Reusable Food Wraps",
        price: 599,
        category: "Reusable Alternatives",
        description: "Beeswax food wraps set of 5 different sizes. Perfect alternative to plastic wrap.",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Organic Herb Garden Kit",
        price: 799,
        category: "Gardening & Green Living",
        description: "Complete herb garden kit with organic seeds, biodegradable pots, and natural fertilizer.",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Eco-Friendly Phone Case",
        price: 699,
        category: "Fashion & Accessories",
        description: "Biodegradable phone case made from plant-based materials. Available for all phone models.",
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Solar Power Bank",
        price: 1299,
        category: "Reusable Alternatives",
        description: "Portable solar power bank with 10000mAh capacity. Charge your devices with clean energy.",
        imageUrl: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Organic Cotton Bed Sheets",
        price: 1899,
        category: "Household Essentials",
        description: "Luxurious organic cotton bed sheet set. Soft, breathable, and sustainably made.",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Bamboo Cutlery Set",
        price: 349,
        category: "Reusable Alternatives",
        description: "Portable bamboo cutlery set with carrying case. Perfect for travel and office use.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        name: "Eco Gift Box",
        price: 1499,
        category: "Gift Items",
        description: "Curated eco-friendly gift box with assorted sustainable products. Perfect for any occasion.",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
        featured: true,
        createdAt: new Date().toISOString(),
      },
    ]

    for (const product of products) {
      await addDoc(collection(db, "products"), product)
    }

    console.log("Seeded products successfully")
    console.log("Database seeded successfully!")
    console.log("Admin login: admin@ecobazar.com / admin123")
    console.log("User login: user@ecobazar.com / user123")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Run the seed function
seedData()
