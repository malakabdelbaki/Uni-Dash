"use client"

import { useContext } from "react"
import { OrdersContext } from "../context/OrdersContext"

export function useOrders() {
  const context = useContext(OrdersContext)

  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }

  return context
}
