"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  useRouter,
} from "next/navigation";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";

import ImageUploader from "./ImageUploader";

import {
  type CakeFormValues,
  type CakeVariant,
  createAdminCake,
  updateAdminCake,
} from "@/lib/cake-admin";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

type CakeFormProps = {
  cakeId?: string;
  initialValues?: CakeFormValues;
};

const emptyVariant: CakeVariant = {
  weight_kg: 1,
  price: 0,
  old_price: null,
  is_default: true,
  sort_order: 0,
};

const defaultValues: CakeFormValues = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  categories: [],
  is_popular: false,
  is_new: false,
  is_published: true,
  sort_order: 0,
  variants: [
    {
      ...emptyVariant,
    },
  ],
};

function createSlug(
  value: string,
): string {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[а-яё]/g,
      (letter) => {
        const map: Record<
          string,
          string
        > = {
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "e",
          ж: "zh",
          з: "z",
          и: "i",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "h",
          ц: "c",
          ч: "ch",
          ш: "sh",
          щ: "sch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        };

        return (
          map[letter] ??
          letter
        );
      },
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function toNumber(
  value: string,
): number {
  const normalized =
    value.replace(",", ".");

  const result =
    Number(normalized);

  return Number.isFinite(
    result,
  )
    ? result
    : 0;
}

export default function CakeForm({
  cakeId,
  initialValues = defaultValues,
}: CakeFormProps) {
  const router = useRouter();

  const currentLocale =
    useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale]
      .cakeForm;

  const intlLocale =
    locale === "en"
      ? "en-US"
      : "ru-RU";

  const [values, setValues] =
    useState<CakeFormValues>({
      ...initialValues,

      categories: [
        ...initialValues.categories,
      ],

      variants:
        initialValues.variants.map(
          (variant) => ({
            ...variant,
          }),
        ),
    });

  const [
    categoriesText,
    setCategoriesText,
  ] = useState(
    initialValues.categories.join(
      ", ",
    ),
  );

  const [
    slugWasEdited,
    setSlugWasEdited,
  ] = useState(
    Boolean(cakeId),
  );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEditing =
    Boolean(cakeId);

  const lowestPrice =
    useMemo(() => {
      const prices =
        values.variants
          .map((variant) =>
            Number(
              variant.price,
            ),
          )
          .filter(
            (price) =>
              Number.isFinite(
                price,
              ) &&
              price > 0,
          );

      return prices.length > 0
        ? Math.min(...prices)
        : 0;
    }, [values.variants]);

  function handleNameChange(
    name: string,
  ) {
    setValues((current) => ({
      ...current,

      name,

      slug: slugWasEdited
        ? current.slug
        : createSlug(name),
    }));
  }

  function updateVariant(
    index: number,
    patch: Partial<CakeVariant>,
  ) {
    setValues((current) => ({
      ...current,

      variants:
        current.variants.map(
          (
            variant,
            variantIndex,
          ) =>
            variantIndex ===
            index
              ? {
                  ...variant,
                  ...patch,
                }
              : variant,
        ),
    }));
  }

  function setDefaultVariant(
    index: number,
  ) {
    setValues((current) => ({
      ...current,

      variants:
        current.variants.map(
          (
            variant,
            variantIndex,
          ) => ({
            ...variant,

            is_default:
              variantIndex ===
              index,
          }),
        ),
    }));
  }

  function addVariant() {
    setValues((current) => ({
      ...current,

      variants: [
        ...current.variants,

        {
          weight_kg: 1,
          price: 0,
          old_price: null,
          is_default: false,
          sort_order:
            current.variants
              .length,
        },
      ],
    }));
  }

  function removeVariant(
    index: number,
  ) {
    setValues((current) => {
      if (
        current.variants
          .length === 1
      ) {
        return current;
      }

      const remaining =
        current.variants.filter(
          (
            _variant,
            variantIndex,
          ) =>
            variantIndex !==
            index,
        );

      if (
        !remaining.some(
          (variant) =>
            variant.is_default,
        )
      ) {
        remaining[0] = {
          ...remaining[0],
          is_default: true,
        };
      }

      return {
        ...current,

        variants:
          remaining.map(
            (
              variant,
              variantIndex,
            ) => ({
              ...variant,

              sort_order:
                variantIndex,
            }),
          ),
      };
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanedCategories =
      categoriesText
        .split(",")
        .map((category) =>
          category.trim(),
        )
        .filter(Boolean)
        .filter(
          (
            category,
            index,
            categories,
          ) =>
            categories.indexOf(
              category,
            ) === index,
        );

    if (!values.name.trim()) {
      setError(
        text.validation
          .nameRequired,
      );

      return;
    }

    if (!values.slug.trim()) {
      setError(
        text.validation
          .slugRequired,
      );

      return;
    }

    if (
      values.variants.some(
        (variant) =>
          variant.weight_kg <= 0 ||
          variant.price < 0,
      )
    ) {
      setError(
        text.validation
          .variantsInvalid,
      );

      return;
    }

    setSaving(true);
    setError("");

    const payload: CakeFormValues =
      {
        ...values,

        name:
          values.name.trim(),

        slug:
          createSlug(
            values.slug,
          ),

        description:
          values.description.trim(),

        categories:
          cleanedCategories,

        variants:
          values.variants.map(
            (
              variant,
              index,
            ) => ({
              ...variant,

              sort_order:
                index,
            }),
          ),
      };

    try {
      if (cakeId) {
        await updateAdminCake(
          cakeId,
          payload,
        );
      } else {
        await createAdminCake(
          payload,
        );
      }

      router.push(
        `/${locale}/admin/cakes`,
      );

      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : text.validation
              .saveError,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="admin-cake-form"
      onSubmit={handleSubmit}
    >
      {error ? (
        <div className="admin-form-message admin-form-message-error">
          {error}
        </div>
      ) : null}

      <div className="admin-cake-form-grid">
        <div className="admin-cake-form-main">
          <section className="admin-form-card">
            <div className="admin-form-card-heading">
              <div>
                <span>01</span>

                <div>
                  <h2>
                    {
                      text.mainInfo
                        .title
                    }
                  </h2>

                  <p>
                    {
                      text.mainInfo
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-form-fields">
              <label className="admin-form-field">
                <span>
                  {
                    text.mainInfo
                      .name
                  }
                </span>

                <input
                  type="text"
                  value={
                    values.name
                  }
                  onChange={(
                    event,
                  ) =>
                    handleNameChange(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    text.mainInfo
                      .namePlaceholder
                  }
                  maxLength={120}
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>
                  {
                    text.mainInfo
                      .slug
                  }
                </span>

                <input
                  type="text"
                  value={
                    values.slug
                  }
                  onChange={(
                    event,
                  ) => {
                    setSlugWasEdited(
                      true,
                    );

                    setValues(
                      (current) => ({
                        ...current,

                        slug:
                          createSlug(
                            event.target
                              .value,
                          ),
                      }),
                    );
                  }}
                  placeholder={
                    text.mainInfo
                      .slugPlaceholder
                  }
                  maxLength={140}
                  required
                />

                <small>
                  {
                    text.mainInfo
                      .pageAddress
                  }
                  : /{locale}/cakes/
                  {values.slug ||
                    "cake-name"}
                </small>
              </label>

              <label className="admin-form-field">
                <span>
                  {
                    text.mainInfo
                      .descriptionLabel
                  }
                </span>

                <textarea
                  value={
                    values.description
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (current) => ({
                        ...current,

                        description:
                          event.target
                            .value,
                      }),
                    )
                  }
                  placeholder={
                    text.mainInfo
                      .descriptionPlaceholder
                  }
                  rows={6}
                />
              </label>

              <label className="admin-form-field">
                <span>
                  {
                    text.mainInfo
                      .categories
                  }
                </span>

                <input
                  type="text"
                  value={
                    categoriesText
                  }
                  onChange={(
                    event,
                  ) =>
                    setCategoriesText(
                      event.target
                        .value,
                    )
                  }
                  placeholder={
                    text.mainInfo
                      .categoriesPlaceholder
                  }
                />

                <small>
                  {
                    text.mainInfo
                      .categoriesHint
                  }
                </small>
              </label>

              <label className="admin-form-field admin-form-field-small">
                <span>
                  {
                    text.mainInfo
                      .sortOrder
                  }
                </span>

                <input
                  type="number"
                  value={
                    values.sort_order
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (current) => ({
                        ...current,

                        sort_order:
                          Number(
                            event.target
                              .value,
                          ) || 0,
                      }),
                    )
                  }
                  min="0"
                  step="1"
                />
              </label>
            </div>
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-heading admin-form-card-heading-action">
              <div>
                <span>02</span>

                <div>
                  <h2>
                    {
                      text.variants
                        .title
                    }
                  </h2>

                  <p>
                    {
                      text.variants
                        .description
                    }
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="admin-add-variant-button"
                onClick={
                  addVariant
                }
              >
                {
                  text.variants
                    .addWeight
                }
              </button>
            </div>

            <div className="admin-variants-list">
              {values.variants.map(
                (
                  variant,
                  index,
                ) => (
                  <article
                    className={`admin-variant-card ${
                      variant.is_default
                        ? "admin-variant-card-default"
                        : ""
                    }`}
                    key={index}
                  >
                    <div className="admin-variant-number">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </div>

                    <label>
                      <span>
                        {
                          text.variants
                            .weight
                        }
                      </span>

                      <input
                        type="number"
                        value={
                          variant.weight_kg
                        }
                        onChange={(
                          event,
                        ) =>
                          updateVariant(
                            index,
                            {
                              weight_kg:
                                toNumber(
                                  event
                                    .target
                                    .value,
                                ),
                            },
                          )
                        }
                        min="0.1"
                        step="0.1"
                        required
                      />
                    </label>

                    <label>
                      <span>
                        {
                          text.variants
                            .price
                        }
                      </span>

                      <input
                        type="number"
                        value={
                          variant.price
                        }
                        onChange={(
                          event,
                        ) =>
                          updateVariant(
                            index,
                            {
                              price:
                                toNumber(
                                  event
                                    .target
                                    .value,
                                ),
                            },
                          )
                        }
                        min="0"
                        step="1"
                        required
                      />
                    </label>

                    <label>
                      <span>
                        {
                          text.variants
                            .oldPrice
                        }
                      </span>

                      <input
                        type="number"
                        value={
                          variant.old_price ??
                          ""
                        }
                        onChange={(
                          event,
                        ) =>
                          updateVariant(
                            index,
                            {
                              old_price:
                                event
                                  .target
                                  .value ===
                                ""
                                  ? null
                                  : toNumber(
                                      event
                                        .target
                                        .value,
                                    ),
                            },
                          )
                        }
                        min="0"
                        step="1"
                        placeholder={
                          text.variants
                            .optional
                        }
                      />
                    </label>

                    <button
                      type="button"
                      className={`admin-default-variant-button ${
                        variant.is_default
                          ? "admin-default-variant-button-active"
                          : ""
                      }`}
                      onClick={() =>
                        setDefaultVariant(
                          index,
                        )
                      }
                    >
                      {variant.is_default
                        ? text
                            .variants
                            .default
                        : text
                            .variants
                            .makeDefault}
                    </button>

                    <button
                      type="button"
                      className="admin-delete-variant-button"
                      onClick={() =>
                        removeVariant(
                          index,
                        )
                      }
                      disabled={
                        values.variants
                          .length === 1
                      }
                      aria-label={
                        text.variants
                          .remove
                      }
                    >
                      ×
                    </button>
                  </article>
                ),
              )}
            </div>
          </section>
        </div>

        <aside className="admin-cake-form-sidebar">
          <section className="admin-form-card">
            <div className="admin-form-card-heading">
              <div>
                <span>03</span>

                <div>
                  <h2>
                    {
                      text.image
                        .title
                    }
                  </h2>

                  <p>
                    {
                      text.image
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>

            <ImageUploader
              value={
                values.image_url
              }
              onChange={(
                imageUrl,
              ) =>
                setValues(
                  (current) => ({
                    ...current,

                    image_url:
                      imageUrl,
                  }),
                )
              }
            />
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-heading">
              <div>
                <span>04</span>

                <div>
                  <h2>
                    {
                      text.publication
                        .title
                    }
                  </h2>

                  <p>
                    {
                      text.publication
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-switch-list">
              <label className="admin-switch-row">
                <div>
                  <strong>
                    {
                      text.publication
                        .published
                        .title
                    }
                  </strong>

                  <span>
                    {
                      text.publication
                        .published
                        .description
                    }
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={
                    values.is_published
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (current) => ({
                        ...current,

                        is_published:
                          event.target
                            .checked,
                      }),
                    )
                  }
                />

                <span className="admin-switch-control" />
              </label>

              <label className="admin-switch-row">
                <div>
                  <strong>
                    {
                      text.publication
                        .popular
                        .title
                    }
                  </strong>

                  <span>
                    {
                      text.publication
                        .popular
                        .description
                    }
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={
                    values.is_popular
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (current) => ({
                        ...current,

                        is_popular:
                          event.target
                            .checked,
                      }),
                    )
                  }
                />

                <span className="admin-switch-control" />
              </label>

              <label className="admin-switch-row">
                <div>
                  <strong>
                    {
                      text.publication
                        .new.title
                    }
                  </strong>

                  <span>
                    {
                      text.publication
                        .new
                        .description
                    }
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={
                    values.is_new
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (current) => ({
                        ...current,

                        is_new:
                          event.target
                            .checked,
                      }),
                    )
                  }
                />

                <span className="admin-switch-control" />
              </label>
            </div>
          </section>

          <section className="admin-form-card admin-form-summary-card">
            <span className="admin-eyebrow">
              {
                text.summary
                  .eyebrow
              }
            </span>

            <h2>
              {values.name ||
                text.summary
                  .newCake}
            </h2>

            <div>
              <span>
                {
                  text.summary
                    .variants
                }
              </span>

              <strong>
                {
                  values.variants
                    .length
                }
              </strong>
            </div>

            <div>
              <span>
                {
                  text.summary
                    .priceFrom
                }
              </span>

              <strong>
                {lowestPrice > 0
                  ? `${lowestPrice.toLocaleString(
                      intlLocale,
                    )} ₸`
                  : text.summary
                      .priceMissing}
              </strong>
            </div>

            <div>
              <span>
                {
                  text.summary
                    .status
                }
              </span>

              <strong>
                {values.is_published
                  ? text.summary
                      .published
                  : text.summary
                      .hidden}
              </strong>
            </div>
          </section>
        </aside>
      </div>

      <div className="admin-form-footer">
        <Link
          href={`/${locale}/admin/cakes`}
          className="admin-form-cancel-button"
        >
          {text.cancel}
        </Link>

        <button
          type="submit"
          className="admin-form-submit-button"
          disabled={saving}
        >
          {saving
            ? text.saving
            : isEditing
              ? text.saveChanges
              : text.addCake}
        </button>
      </div>
    </form>
  );
}