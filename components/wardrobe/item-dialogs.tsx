"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {AddOrEditItemForm} from "@/components/wardrobe/add-edit-item-form";
import { Pencil, Plus, Sparkles } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export function AddItemDialog({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="gradient">
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Add New Item
        </DialogTitle>
        <AddOrEditItemForm
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditItemDialog({ onSuccess, itemId }: { onSuccess?: () => void, itemId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button size="lg" variant="gradient">
          <Pencil className="w-5 h-5 mr-2" />
          Edit Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Edit Item
        </DialogTitle>
        <AddOrEditItemForm
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
          itemId={itemId as Id<"clothingItems">}
        />
      </DialogContent>
    </Dialog>
  );
}

