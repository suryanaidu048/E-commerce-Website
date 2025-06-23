import { NextResponse } from "next/server"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    const categoryCount = {}

    querySnapshot.forEach((doc) => {
      const product = doc.data()
      if (categoryCount[product.category]) {
        categoryCount[product.category]++
      } else {
        categoryCount[product.category] = 1
      }
    })

    const categories = Object.entries(categoryCount).map(([name, count]) => ({
      name,
      count,
    }))

    categories.sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
