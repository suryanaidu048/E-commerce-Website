import { NextResponse } from "next/server"
import { collection, getDocs, addDoc, query, where, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const limitParam = Number.parseInt(searchParams.get("limit")) || 0
    const featured = searchParams.get("featured")

    let q = collection(db, "products")
    const constraints = []

    if (category) {
      constraints.push(where("category", "==", category))
    }

    if (featured === "true") {
      constraints.push(where("featured", "==", true))
    }

    if (constraints.length > 0) {
      q = query(q, ...constraints)
    }

    if (limitParam > 0) {
      q = query(q, limit(limitParam))
    }

    const querySnapshot = await getDocs(q)
    let products = []

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })

    // Client-side filtering for search and price range
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
      )
    }

    if (minPrice || maxPrice) {
      products = products.filter((product) => {
        const price = product.price
        if (minPrice && price < Number.parseFloat(minPrice)) return false
        if (maxPrice && price > Number.parseFloat(maxPrice)) return false
        return true
      })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, price, category, description, imageUrl } = await request.json()

    if (!name || !price || !category || !description || !imageUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const docRef = await addDoc(collection(db, "products"), {
      name,
      price: Number.parseFloat(price),
      category,
      description,
      imageUrl,
      featured: false,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      message: "Product created successfully",
      productId: docRef.id,
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
