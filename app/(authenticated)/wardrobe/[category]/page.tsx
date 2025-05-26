'use client'

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"

export default function ItemsPage({ params }: { params: { category: string } }) {
  const { category }: { category: string } = useParams()

  const items = useQuery(api.clothingItems.itemsByCategory, {
    category: category,
  })

  if (!items) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {items?.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  )
}
