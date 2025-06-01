"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

// Add direction prop for layout: 'row' (default) or 'column'
type TabNavigationProps = {
  direction?: "row" | "column";
};

type Tab = {
  id: "wardrobe" | "trading" | "requests" | "profile";
  label: string;
  icon: string;
};

const tabs: Tab[] = [
  { id: "wardrobe" as const, label: "My Wardrobe", icon: "👕" },
  { id: "trading" as const, label: "Trading Hub", icon: "🔄" },
  { id: "requests" as const, label: "Trade Requests", icon: "📬" },
  { id: "profile" as const, label: "Profile", icon: "👤" },
];

export function TabNavigation({ direction = "row" }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("wardrobe");

  return (
    <ToggleGroup
      type="single"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as Tab["id"])}
      className={
        direction === "column"
          ? "flex flex-col gap-2 w-full"
          : "flex flex-row gap-2"
      }
    >
      {tabs.map((tab) => (
        <ToggleGroupItem
          key={tab.id}
          value={tab.id}
          asChild
          className={
            direction === "column"
              ? "rounded-md border-none w-full justify-start text-lg px-4 py-3"
              : "rounded-md border-none"
          }
          size="lg"
        >
          <Link href={`/${tab.id}`}>
            {tab.icon} {tab.label}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
