import { NextResponse } from "next/server"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function GET(request, { params }) {
  try {
    const { id } = params

    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, price, category, description, imageUrl } = await request.json()

    const docRef = doc(db, "products", id)

    await updateDoc(docRef, {
      name,
      price: Number.parseFloat(price),
      category,
      description,
      imageUrl,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Product updated successfully" })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const docRef = doc(db, "products", id)
    await deleteDoc(docRef)

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
