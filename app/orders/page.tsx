"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  Mail,
  Calendar,
  ArrowLeft
} from "lucide-react"

// Mock order data - in a real app, this would come from your database
const mockOrders = [
  {
    id: "ECO1703123456789",
    date: "2024-12-20",
    status: "delivered",
    total: 1299.00,
    items: [
      {
        id: "1",
        name: "Bamboo Toothbrush Set",
        price: 299,
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1607869081394-90000c2f4a0b?w=400&h=300&fit=crop"
      },
      {
        id: "2", 
        name: "Stainless Steel Water Bottle",
        price: 899,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop"
      }
    ],
    shippingAddress: {
      name: "name",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      phone: "+91 98765 43210"
    },
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-12-25"
  },
  {
    id: "ECO1703123456790",
    date: "2024-12-18",
    status: "shipped",
    total: 799.00,
    items: [
      {
        id: "3",
        name: "Organic Herb Garden Kit",
        price: 799,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
      }
    ],
    shippingAddress: {
      name: "name",
      address: "123 Main Street", 
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      phone: "+91 98765 43210"
    },
    trackingNumber: "TRK123456790",
    estimatedDelivery: "2024-12-23"
  }
]

const statusConfig = {
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: Clock
  },
  processing: {
    label: "Processing",
    color: "text-blue-600", 
    bgColor: "bg-blue-100",
    icon: Package
  },
  shipped: {
    label: "Shipped",
    color: "text-purple-600",
    bgColor: "bg-purple-100", 
    icon: Truck
  },
  delivered: {
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: CheckCircle
  }
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please log in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your orders</p>
          <Link
            href="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link
            href="/shop"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Order History</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {orders.map((order) => {
                  const status = statusConfig[order.status]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={order.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.color}`}>
                            <div className="flex items-center space-x-1">
                              <StatusIcon className="w-4 h-4" />
                              <span>{status.label}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">₹{order.total.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <h3 className="font-medium mb-2">Order Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-mono">{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold">₹{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                          <p className="text-gray-600">{selectedOrder.shippingAddress.address}</p>
                          <p className="text-gray-600">
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                          </p>
                          <div className="flex items-center space-x-1 mt-1 text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span className="text-xs">{selectedOrder.shippingAddress.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  {selectedOrder.trackingNumber && (
                    <div>
                      <h3 className="font-medium mb-2">Tracking Information</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tracking Number:</span>
                            <span className="font-mono">{selectedOrder.trackingNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Estimated Delivery:</span>
                            <span>{new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button className="w-full mt-3 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                          Track Package
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Order Status Timeline */}
                  <div>
                    <h3 className="font-medium mb-2">Order Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order Placed</p>
                          <p className="text-xs text-gray-600">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${selectedOrder.status === 'processing' || selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Processing</p>
                          <p className="text-xs text-gray-600">Order confirmed and being prepared</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Shipped</p>
                          <p className="text-xs text-gray-600">Package is on its way</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${selectedOrder.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Delivered</p>
                          <p className="text-xs text-gray-600">Package has been delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <p className="text-gray-600 text-sm">
                  Select an order from the list to view its details, tracking information, and status updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 