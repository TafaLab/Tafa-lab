import { supabase } from "@/lib/supabase";
import type {
  Cake,
  CakeVariant,
} from "@/lib/cake-types";

type CakeVariantRow = {
  id: string;
  cake_id: string;
  weight_kg: number | string;
  price: number | string;
  old_price: number | string | null;
  is_default: boolean;
  sort_order: number | null;
  created_at: string;
};

type CakeRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  categories: string[] | null;
  is_popular: boolean | null;
  is_new: boolean | null;
  is_published: boolean | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
  cake_variants: CakeVariantRow[] | null;
};

function normalizeVariant(
  row: CakeVariantRow
): CakeVariant {
  return {
    id: row.id,
    cakeId: row.cake_id,
    weightKg: Number(row.weight_kg),
    price: Number(row.price),
    oldPrice:
      row.old_price === null
        ? null
        : Number(row.old_price),
    isDefault: Boolean(row.is_default),
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
  };
}

function normalizeCake(row: CakeRow): Cake {
  const variants = (row.cake_variants ?? [])
    .map(normalizeVariant)
    .sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }

      return a.weightKg - b.weightKg;
    });

  const defaultVariant =
    variants.find((variant) => variant.isDefault) ??
    variants[0] ??
    null;

  const minimumPrice =
    variants.length > 0
      ? Math.min(
          ...variants.map((variant) => variant.price)
        )
      : 0;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    imageUrl: row.image_url ?? "",
    categories: row.categories ?? [],
    isPopular: Boolean(row.is_popular),
    isNew: Boolean(row.is_new),
    isPublished: Boolean(row.is_published),
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    variants,
    defaultVariant,
    minimumPrice,
  };
}

export async function getPublishedCakes(): Promise<
  Cake[]
> {
  const { data, error } = await supabase
    .from("cakes")
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      categories,
      is_popular,
      is_new,
      is_published,
      sort_order,
      created_at,
      updated_at,
      cake_variants (
        id,
        cake_id,
        weight_kg,
        price,
        old_price,
        is_default,
        sort_order,
        created_at
      )
    `)
    .eq("is_published", true)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Не удалось загрузить торты: ${error.message}`
    );
  }

  return ((data ?? []) as CakeRow[]).map(
    normalizeCake
  );
}

export async function getAllCakes(): Promise<Cake[]> {
  const { data, error } = await supabase
    .from("cakes")
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      categories,
      is_popular,
      is_new,
      is_published,
      sort_order,
      created_at,
      updated_at,
      cake_variants (
        id,
        cake_id,
        weight_kg,
        price,
        old_price,
        is_default,
        sort_order,
        created_at
      )
    `)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Не удалось загрузить торты: ${error.message}`
    );
  }

  return ((data ?? []) as CakeRow[]).map(
    normalizeCake
  );
}

export async function getCakeBySlug(
  slug: string
): Promise<Cake | null> {
  const { data, error } = await supabase
    .from("cakes")
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      categories,
      is_popular,
      is_new,
      is_published,
      sort_order,
      created_at,
      updated_at,
      cake_variants (
        id,
        cake_id,
        weight_kg,
        price,
        old_price,
        is_default,
        sort_order,
        created_at
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Не удалось загрузить торт: ${error.message}`
    );
  }

  if (!data) {
    return null;
  }

  return normalizeCake(data as CakeRow);
}