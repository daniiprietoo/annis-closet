"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ShoppingBag } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import WardrobeItemDetailSkeleton from "./wardrobe-item-detail-skeleton";
import {
  Heart,
  Share2,
  Trash2,
  Palette,
  Ruler,
  Tag,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Repeat, Star, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { EditItemDialog } from "./item-dialogs";
import { toast } from "sonner";

export default function WardrobeItemDetail({ itemId }: { itemId: string }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const item = useQuery(api.wardrobe.getItemById, {
    itemId: itemId as Id<"clothingItems">,
  });

  const deleteItem = useMutation(api.wardrobe.deleteItem);

  const relatedItems = useQuery(
    api.wardrobe.getRelatedItems,
    item
      ? {
          category: item.category,
          excludeId: itemId as Id<"clothingItems">,
          limit: 4,
        }
      : "skip",
  );

  const router = useRouter();

  if (item === undefined) {
    return <WardrobeItemDetailSkeleton />;
  }

  if (item === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-accent dark:via-accent dark:to-accent flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Item not found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The item you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button
            onClick={() => router.push("/wardrobe")}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wardrobe
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItem({ itemId: itemId as Id<"clothingItems"> });
      router.push("/wardrobe");
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out this ${item.category} from my wardrobe!`,
          url: window.location.href,
        });
      } catch (error) {
        toast.error("Error sharing");
        console.log("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      } catch (error) {
        toast.error("Error copying link");
        console.log("Error copying link:", error);
      }
    }
  };

  const handleTrade = () => {
    toast.success("Feature coming soon!");
  };

  const conditionColors = {
    new: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    "like-new":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    good: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    fair: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  };

  const conditionStars = {
    new: 5,
    "like-new": 4,
    good: 3,
    fair: 2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10">
      {/* Header */}
      <div className="top-0 z-10 bg-white/80 dark:bg-primary/5 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wardrobe
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`hover:text-red-500 ${isFavorited ? "text-red-500" : ""}`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="hover:bg-blue-50 hover:text-blue-500"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <EditItemDialog
                itemId={itemId as Id<"clothingItems">}
                onSuccess={() => {
                  router.refresh();
                }}
              />
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="hover:bg-red-50 hover:text-red-500"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <svg
                        className="animate-spin h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Confirm Deletion
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Are you sure you want to delete this item? This action
                      cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsDeleteDialogOpen(false)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          await handleDelete();
                          setIsDeleteDialogOpen(false);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-2xl bg-transparent">
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <Dialog open={isImageZoomed} onOpenChange={setIsImageZoomed}>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full h-[80vh]">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                {item.forTrade && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
                      <Repeat className="w-3 h-3 mr-1" />
                      Available for Trade
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {item.name}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 capitalize font-medium">
                {item.category}
              </p>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${conditionColors[item.condition]}`}
              >
                {item.condition.charAt(0).toUpperCase() +
                  item.condition.slice(1)}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < conditionStars[item.condition]
                        ? "text-yellow-400 fill-current"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Color
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.color}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Ruler className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Size
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.size}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {item.brand && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Brand
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.brand}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Category
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                      {item.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            {item.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.notes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {item.forTrade && (
              <Button
                onClick={handleTrade}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Repeat className="w-4 h-4 mr-2" />
                Trade This Item
              </Button>
            )}

            {/* Activity History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      Added to wardrobe
                    </span>
                    <span className="text-slate-500 dark:text-slate-500 ml-auto">
                      {new Date(item._creationTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">
                      Last updated
                    </span>
                    <span className="text-slate-500 dark:text-slate-500 ml-auto">
                      {new Date(item._creationTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems && relatedItems.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Similar Items
              </h2>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <div
                  key={relatedItem._id}
                  onClick={() => router.push(`/wardrobe/${relatedItem._id}`)}
                  className="cursor-pointer"
                >
                  <div className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                      <Image
                        src={relatedItem.imageUrl || "/placeholder.svg"}
                        alt={relatedItem.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
                        {relatedItem.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                        {relatedItem.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
