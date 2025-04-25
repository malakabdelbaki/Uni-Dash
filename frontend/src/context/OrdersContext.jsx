"use client"
import { createContext, useState, useEffect } from "react"
import { fetchOrders } from "../api/orderApi" 

export const OrdersContext = createContext()

export function OrdersProvider({ children, restaurantId }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadOrders = async () => {
      try {
        const data = await fetchOrders(restaurantId)
        if (isMounted) setOrders(data)
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to fetch orders")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadOrders()

    const interval = setInterval(loadOrders, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [restaurantId])

  return (
    <OrdersContext.Provider value={{ orders, loading, error }}>
      {children}
    </OrdersContext.Provider>
  )
}
