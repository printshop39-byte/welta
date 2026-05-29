import type { Collection } from "@/types/collection";
import { USE_MOCK, apexGet } from "@/lib/apex";
import { mockCollections } from "@/lib/mock/collections";

const REVALIDATE = 600;

export async function getCollections(): Promise<Collection[]> {
  if (USE_MOCK) return mockCollections;
  const data = await apexGet<{ items: Collection[] }>("/collections", {
    revalidate: REVALIDATE,
    tags: ["collections"],
  });
  return data.items;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  if (USE_MOCK) {
    return mockCollections.find((c) => c.slug === slug) ?? null;
  }
  try {
    const data = await apexGet<Collection>(
      `/collections/${encodeURIComponent(slug)}`,
      { revalidate: REVALIDATE, tags: ["collections", `collection:${slug}`] },
    );
    return data;
  } catch {
    return null;
  }
}
