"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

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

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("wardrobe");

  return (
    <ToggleGroup
      type="single"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as Tab["id"])}
      className="flex flex-row gap-2"
    >
      {tabs.map((tab) => (
        <ToggleGroupItem
          key={tab.id}
          value={tab.id}
          asChild
          className="rounded-md border-none"
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
