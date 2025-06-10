import dynamic from "next/dynamic";

const WardrobeItemDetail = dynamic(
  () => import("@/components/wardrobe/wardrobe-item-detail"),
  {},
);

export default async function WardrobeItemPage({
  params,
}: {
  params: { itemId: string };
}) {
  const { itemId } = params;

  return <WardrobeItemDetail itemId={itemId} />;
}
