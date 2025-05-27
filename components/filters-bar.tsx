'use client'

import { Button } from '@/components/ui/button'

const categories = {
  all: 'All',
  tops: 'Tops',
  bottoms: 'Bottoms',
  outerwear: 'Outerwear',
  dresses: 'Dresses',
  shoes: 'Shoes',
  accessories: 'Accessories',
}

export function FiltersBar() {
  return (
    <div className="fixed left-1/2 top-24 z-20 -translate-x-1/2 bg-white/90 dark:bg-neutral-900 shadow-lg rounded-xl px-6 py-3 flex gap-4 items-center backdrop-blur-md">
      {Object.entries(categories).map(([key, value]) => (
        <Button key={key} variant="outline">
          {value}
        </Button>
      ))}
    </div>
  );
}
