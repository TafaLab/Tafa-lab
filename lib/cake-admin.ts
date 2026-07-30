import { supabase } from "./supabase";

export type CakeVariant = {
  id?: string;
  cake_id?: string;
  weight_kg: number;
  price: number;
  old_price: number | null;
  is_default: boolean;
  sort_order: number;
};

export type AdminCake = {
  id: string;
  created_at: string;
  updated_at: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  categories: string[];
  is_popular: boolean;
  is_new: boolean;
  is_published: boolean;
  sort_order: number;
  cake_variants: CakeVariant[];
};

export type CakeFormValues = {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  categories: string[];
  is_popular: boolean;
  is_new: boolean;
  is_published: boolean;
  sort_order: number;
  variants: CakeVariant[];
};

type CakeRow = Omit<AdminCake, "cake_variants"> & {
  cake_variants: CakeVariant[] | null;
};

function normalizeCake(row: CakeRow): AdminCake {
  return {
    ...row,
    categories: Array.isArray(row.categories) ? row.categories : [],
    cake_variants: Array.isArray(row.cake_variants)
      ? [...row.cake_variants].sort(
          (first, second) => first.sort_order - second.sort_order,
        )
      : [],
  };
}

export async function getAdminCakes(): Promise<AdminCake[]> {
  const { data, error } = await supabase
    .from("cakes")
    .select(
      `
        id,
        created_at,
        updated_at,
        name,
        slug,
        description,
        image_url,
        categories,
        is_popular,
        is_new,
        is_published,
        sort_order,
        cake_variants (
          id,
          cake_id,
          weight_kg,
          price,
          old_price,
          is_default,
          sort_order
        )
      `,
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as CakeRow[]).map(normalizeCake);
}

export async function getAdminCake(id: string): Promise<AdminCake> {
  const { data, error } = await supabase
    .from("cakes")
    .select(
      `
        id,
        created_at,
        updated_at,
        name,
        slug,
        description,
        image_url,
        categories,
        is_popular,
        is_new,
        is_published,
        sort_order,
        cake_variants (
          id,
          cake_id,
          weight_kg,
          price,
          old_price,
          is_default,
          sort_order
        )
      `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeCake(data as CakeRow);
}

function prepareVariants(variants: CakeVariant[]): CakeVariant[] {
  const cleanedVariants = variants
    .filter(
      (variant) =>
        Number.isFinite(variant.weight_kg) &&
        variant.weight_kg > 0 &&
        Number.isFinite(variant.price) &&
        variant.price >= 0,
    )
    .map((variant, index) => ({
      weight_kg: Number(variant.weight_kg),
      price: Math.round(Number(variant.price)),
      old_price:
        variant.old_price === null ||
        variant.old_price === undefined ||
        Number(variant.old_price) <= 0
          ? null
          : Math.round(Number(variant.old_price)),
      is_default: variant.is_default,
      sort_order: index,
    }));

  if (cleanedVariants.length === 0) {
    throw new Error("Добавьте хотя бы один вес и цену.");
  }

  const defaultIndex = cleanedVariants.findIndex(
    (variant) => variant.is_default,
  );

  return cleanedVariants.map((variant, index) => ({
    ...variant,
    is_default: defaultIndex === -1 ? index === 0 : index === defaultIndex,
  }));
}

export async function createAdminCake(
  values: CakeFormValues,
): Promise<string> {
  const preparedVariants = prepareVariants(values.variants);

  const { data: createdCake, error: cakeError } = await supabase
    .from("cakes")
    .insert({
      name: values.name.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || null,
      image_url: values.image_url.trim() || null,
      categories: values.categories,
      is_popular: values.is_popular,
      is_new: values.is_new,
      is_published: values.is_published,
      sort_order: Number(values.sort_order) || 0,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (cakeError) {
    throw new Error(cakeError.message);
  }

  const variantsPayload = preparedVariants.map((variant) => ({
    cake_id: createdCake.id,
    weight_kg: variant.weight_kg,
    price: variant.price,
    old_price: variant.old_price,
    is_default: variant.is_default,
    sort_order: variant.sort_order,
  }));

  const { error: variantsError } = await supabase
    .from("cake_variants")
    .insert(variantsPayload);

  if (variantsError) {
    await supabase.from("cakes").delete().eq("id", createdCake.id);
    throw new Error(variantsError.message);
  }

  return createdCake.id;
}

export async function updateAdminCake(
  id: string,
  values: CakeFormValues,
): Promise<void> {
  const preparedVariants = prepareVariants(values.variants);

  const { error: cakeError } = await supabase
    .from("cakes")
    .update({
      name: values.name.trim(),
      slug: values.slug.trim(),
      description: values.description.trim() || null,
      image_url: values.image_url.trim() || null,
      categories: values.categories,
      is_popular: values.is_popular,
      is_new: values.is_new,
      is_published: values.is_published,
      sort_order: Number(values.sort_order) || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (cakeError) {
    throw new Error(cakeError.message);
  }

  const { error: deleteVariantsError } = await supabase
    .from("cake_variants")
    .delete()
    .eq("cake_id", id);

  if (deleteVariantsError) {
    throw new Error(deleteVariantsError.message);
  }

  const variantsPayload = preparedVariants.map((variant) => ({
    cake_id: id,
    weight_kg: variant.weight_kg,
    price: variant.price,
    old_price: variant.old_price,
    is_default: variant.is_default,
    sort_order: variant.sort_order,
  }));

  const { error: variantsError } = await supabase
    .from("cake_variants")
    .insert(variantsPayload);

  if (variantsError) {
    throw new Error(variantsError.message);
  }
}

export async function updateCakePublished(
  id: string,
  isPublished: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("cakes")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteAdminCake(id: string): Promise<void> {
  const { error: variantsError } = await supabase
    .from("cake_variants")
    .delete()
    .eq("cake_id", id);

  if (variantsError) {
    throw new Error(variantsError.message);
  }

  const { error: cakeError } = await supabase
    .from("cakes")
    .delete()
    .eq("id", id);

  if (cakeError) {
    throw new Error(cakeError.message);
  }
}

export async function uploadCakeImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";
  const fileName = `${crypto.randomUUID()}.${safeExtension}`;
  const filePath = `cakes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("cake-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from("cake-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
