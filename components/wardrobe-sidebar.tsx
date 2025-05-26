"use client";

import type React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type WardrobeSidebarProps = React.ComponentProps<typeof Sidebar> & {
  className?: string;
};

type Category = {
  id: string;
  label: string;
};

const categories: Category[] = [
  { id: "all", label: "All Items" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "outerwear", label: "Outerwear" },
  { id: "dresses", label: "Dresses" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
  { id: "activewear", label: "Activewear" },
];

export function WardrobeSidebar({ className, ...props }: WardrobeSidebarProps) {
  return (
    <Sidebar
      variant="floating"
      collapsible="none"
      className={className}
      {...props}
    >
      <SidebarContent className="py-2">
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className="px-3 py-2 text-xs font-medium text-sidebar-foreground/70">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    size="sm"
                    className="px-3 py-1.5 text-sm font-normal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    isActive={category.id === "all"}
                  >
                    {category.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
