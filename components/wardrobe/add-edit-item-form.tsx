"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ImageIcon, Share2 } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { toast } from "sonner";

const categories = [
  "tops",
  "bottoms",
  "outerwear",
  "shoes",
  "accessories",
  "dresses",
  "activewear",
] as const;

type Category = (typeof categories)[number];

const conditions = ["new", "like-new", "good", "fair"] as const;
type Condition = (typeof conditions)[number];

type AddOrEditItemFormProps = {
  onSuccess: () => void;
  itemId?: Id<"clothingItems">;
};

export function AddOrEditItemForm({
  onSuccess,
  itemId,
}: AddOrEditItemFormProps) {
  const createItem = useMutation(api.wardrobe.createItem);
  const updateItem = useMutation(api.wardrobe.updateItem);
  const generateUploadUrl = useMutation(api.wardrobe.generateUploadUrl);

  const item = useQuery(api.wardrobe.getItemById, itemId ? { itemId } : "skip");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<{
    name: string;
    category: Category;
    color: string;
    size: string;
    brand: string;
    condition: Condition;
    notes: string;
    forTrade: boolean;
    imageUrl: string | null;
  }>({
    name: "",
    category: categories[0],
    color: "",
    size: "",
    brand: "",
    condition: conditions[0],
    notes: "",
    forTrade: false,
    imageUrl: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item && itemId) {
      setForm({
        name: item.name || "",
        category: categories.includes(item.category)
          ? item.category
          : categories[0],
        color: item.color || "",
        size: item.size || "",
        brand: item.brand || "",
        condition: conditions.includes(item.condition)
          ? item.condition
          : conditions[0],
        notes: item.notes || "",
        forTrade: item.forTrade || false,
        imageUrl: item.imageStorageId || null,
      });
      setImagePreview(item.imageUrl || null);
    }
  }, [item, itemId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let storageId: Id<"_storage"> | null = null;

    if (imageFile) {
      try {
        const uploadUrl = await generateUploadUrl();
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const { storageId: responseId } = await response.json();
        storageId = responseId;
        toast.success("Image uploaded successfully");
      } catch {
        toast.error("Image upload failed");
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }

    if (!itemId && !storageId) {
      toast.error("Image is required");
      setError("Image is required");
      setLoading(false);
      return;
    }

    if (!itemId && storageId) {
      try {
        await createItem({
          ...form,
          imageUrl: storageId,
        });
        setLoading(false);
        toast.success("Item added successfully");
        onSuccess();
      } catch {
        toast.error("Failed to add item");
        setError("Failed to add item");
        setLoading(false);
      }
      return;
    }

    try {
      await updateItem({
        itemId: itemId as Id<"clothingItems">,
        ...form,
        imageUrl: storageId ? storageId : (form.imageUrl as Id<"_storage">),
      });
      setLoading(false);
      toast.success("Item updated successfully");
      onSuccess();
    } catch {
      toast.error("Failed to update item");
      setError("Failed to update item");
      setLoading(false);
    }
  }

  const handleShare = async () => {
    if (loading) return; // Prevent double share
    setLoading(true);
    if (navigator.share) {
      try {
        await navigator.share({
          title: item?.name || "",
          text: `Check out this ${item?.category} from my wardrobe!`,
          url: window.location.href,
        });
        toast.success("Link shared successfully.");
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            toast.error("Share canceled");
          } else if (error.name === "InvalidStateError") {
            toast.error("Share in progress");
          }
        } else {
          toast.error("Error sharing");
        }
        console.error("Error sharing:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      } catch {
        toast.error("Error copying link");
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-2 sm:px-4 max-w-2xl w-full mx-auto overflow-y-auto max-h-[70vh]"
    >
      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image" className="text-sm font-medium">
          Item Photo *
        </Label>
        <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-purple-400 transition-colors">
          <CardContent className="p-2 md:p-6">
            {imagePreview ? (
              <div className="relative">
                <Image
                  width={400}
                  height={400}
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-40 md:h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="cursor-pointer inline-flex items-center gap-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Photo
                  </Label>
                  <p className="text-sm text-slate-500">
                    Upload a clear photo of your clothing item
                  </p>
                </div>
              </div>
            )}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </CardContent>
        </Card>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="name">Item Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Blue Denim Jacket"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={form.category}
            onValueChange={(value: string) =>
              setForm((f) => ({ ...f, category: value as Category }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="color">Color *</Label>
          <Input
            id="color"
            placeholder="e.g., Navy Blue"
            value={form.color}
            onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Size *</Label>
          <Input
            id="size"
            placeholder="e.g., M, 32, 8.5"
            value={form.size}
            onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Condition *</Label>
          <Select
            value={form.condition}
            onValueChange={(value: string) =>
              setForm((f) => ({ ...f, condition: value as Condition }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond}>
                  {cond.charAt(0).toUpperCase() + cond.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand (Optional)</Label>
          <Input
            id="brand"
            placeholder="e.g., Nike, Zara, H&M"
            value={form.brand}
            onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any additional details about this item..."
            value={form.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm((f) => ({ ...f, notes: e.target.value }))
            }
            rows={3}
          />
        </div>
      </div>

      {/* Trade Option */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="forTrade"
          checked={form.forTrade}
          onCheckedChange={(
            checked: React.ComponentProps<typeof Checkbox>["checked"],
          ) => setForm((f) => ({ ...f, forTrade: checked as boolean }))}
        />
        <Label htmlFor="forTrade" className="text-sm font-medium">
          Available for trade
        </Label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={loading} variant="gradient" size="lg">
        {loading
          ? itemId
            ? "Updating Item..."
            : "Adding Item..."
          : itemId
            ? "Update Item"
            : "Add to Wardrobe"}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="hover:bg-blue-50 hover:text-blue-500"
        disabled={loading}
      >
        <Share2 className="w-5 h-5" />
      </Button>
    </form>
  );
}
