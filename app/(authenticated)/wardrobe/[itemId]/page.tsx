import dynamic from "next/dynamic";

const WardrobeItemDetail = dynamic(
  () => import("@/components/wardrobe/wardrobe-item-detail"),
  {},
);

export default async function WardrobeItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const resolvedParams = await params;
  const { itemId } = resolvedParams;

  return <WardrobeItemDetail itemId={itemId} />;
}
