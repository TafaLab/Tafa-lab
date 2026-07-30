"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CakeFormValues,
  CakeVariant,
  createAdminCake,
  updateAdminCake,
} from "../../../../lib/cake-admin";
import ImageUploader from "./ImageUploader";

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
  variants: [{ ...emptyVariant }],
};

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[а-яё]/g, (letter) => {
      const map: Record<string, string> = {
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

      return map[letter] ?? letter;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toNumber(value: string): number {
  const normalized = value.replace(",", ".");
  const result = Number(normalized);

  return Number.isFinite(result) ? result : 0;
}

export default function CakeForm({
  cakeId,
  initialValues = defaultValues,
}: CakeFormProps) {
  const router = useRouter();

  const [values, setValues] = useState<CakeFormValues>({
    ...initialValues,
    categories: [...initialValues.categories],
    variants: initialValues.variants.map((variant) => ({ ...variant })),
  });

  const [categoriesText, setCategoriesText] = useState(
    initialValues.categories.join(", "),
  );

  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(cakeId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(cakeId);

  const lowestPrice = useMemo(() => {
    const prices = values.variants
      .map((variant) => Number(variant.price))
      .filter((price) => Number.isFinite(price) && price > 0);

    return prices.length > 0 ? Math.min(...prices) : 0;
  }, [values.variants]);

  function handleNameChange(name: string) {
    setValues((current) => ({
      ...current,
      name,
      slug: slugWasEdited ? current.slug : createSlug(name),
    }));
  }

  function updateVariant(
    index: number,
    patch: Partial<CakeVariant>,
  ) {
    setValues((current) => ({
      ...current,
      variants: current.variants.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, ...patch } : variant,
      ),
    }));
  }

  function setDefaultVariant(index: number) {
    setValues((current) => ({
      ...current,
      variants: current.variants.map((variant, variantIndex) => ({
        ...variant,
        is_default: variantIndex === index,
      })),
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
          sort_order: current.variants.length,
        },
      ],
    }));
  }

  function removeVariant(index: number) {
    setValues((current) => {
      if (current.variants.length === 1) {
        return current;
      }

      const remaining = current.variants.filter(
        (_, variantIndex) => variantIndex !== index,
      );

      if (!remaining.some((variant) => variant.is_default)) {
        remaining[0] = {
          ...remaining[0],
          is_default: true,
        };
      }

      return {
        ...current,
        variants: remaining.map((variant, variantIndex) => ({
          ...variant,
          sort_order: variantIndex,
        })),
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedCategories = categoriesText
      .split(",")
      .map((category) => category.trim())
      .filter(Boolean)
      .filter(
        (category, index, categories) =>
          categories.indexOf(category) === index,
      );

    if (!values.name.trim()) {
      setError("Введите название торта.");
      return;
    }

    if (!values.slug.trim()) {
      setError("Введите slug.");
      return;
    }

    if (
      values.variants.some(
        (variant) => variant.weight_kg <= 0 || variant.price < 0,
      )
    ) {
      setError("Проверьте вес и цену вариантов.");
      return;
    }

    setSaving(true);
    setError("");

    const payload: CakeFormValues = {
      ...values,
      name: values.name.trim(),
      slug: createSlug(values.slug),
      description: values.description.trim(),
      categories: cleanedCategories,
      variants: values.variants.map((variant, index) => ({
        ...variant,
        sort_order: index,
      })),
    };

    try {
      if (cakeId) {
        await updateAdminCake(cakeId, payload);
      } else {
        await createAdminCake(payload);
      }

      router.push("/admin/cakes");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось сохранить торт.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-cake-form" onSubmit={handleSubmit}>
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
                  <h2>Основная информация</h2>
                  <p>Название и описание торта для каталога.</p>
                </div>
              </div>
            </div>

            <div className="admin-form-fields">
              <label className="admin-form-field">
                <span>Название торта *</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={(event) =>
                    handleNameChange(event.target.value)
                  }
                  placeholder="Например: Клубничное облако"
                  maxLength={120}
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>Slug *</span>
                <input
                  type="text"
                  value={values.slug}
                  onChange={(event) => {
                    setSlugWasEdited(true);
                    setValues((current) => ({
                      ...current,
                      slug: createSlug(event.target.value),
                    }));
                  }}
                  placeholder="strawberry-cloud"
                  maxLength={140}
                  required
                />
                <small>
                  Адрес страницы: /cakes/{values.slug || "nazvanie-torta"}
                </small>
              </label>

              <label className="admin-form-field">
                <span>Описание</span>
                <textarea
                  value={values.description}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Опишите вкус, оформление и особенности торта"
                  rows={6}
                />
              </label>

              <label className="admin-form-field">
                <span>Категории</span>
                <input
                  type="text"
                  value={categoriesText}
                  onChange={(event) =>
                    setCategoriesText(event.target.value)
                  }
                  placeholder="Детские, Для девочек, Ягодные"
                />
                <small>Разделяйте категории запятыми.</small>
              </label>

              <label className="admin-form-field admin-form-field-small">
                <span>Порядок отображения</span>
                <input
                  type="number"
                  value={values.sort_order}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      sort_order: Number(event.target.value) || 0,
                    }))
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
                  <h2>Вес и стоимость</h2>
                  <p>Добавьте все доступные варианты торта.</p>
                </div>
              </div>

              <button
                type="button"
                className="admin-add-variant-button"
                onClick={addVariant}
              >
                + Добавить вес
              </button>
            </div>

            <div className="admin-variants-list">
              {values.variants.map((variant, index) => (
                <article
                  className={`admin-variant-card ${
                    variant.is_default
                      ? "admin-variant-card-default"
                      : ""
                  }`}
                  key={index}
                >
                  <div className="admin-variant-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <label>
                    <span>Вес, кг</span>
                    <input
                      type="number"
                      value={variant.weight_kg}
                      onChange={(event) =>
                        updateVariant(index, {
                          weight_kg: toNumber(event.target.value),
                        })
                      }
                      min="0.1"
                      step="0.1"
                      required
                    />
                  </label>

                  <label>
                    <span>Цена, ₸</span>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(event) =>
                        updateVariant(index, {
                          price: toNumber(event.target.value),
                        })
                      }
                      min="0"
                      step="1"
                      required
                    />
                  </label>

                  <label>
                    <span>Старая цена, ₸</span>
                    <input
                      type="number"
                      value={variant.old_price ?? ""}
                      onChange={(event) =>
                        updateVariant(index, {
                          old_price:
                            event.target.value === ""
                              ? null
                              : toNumber(event.target.value),
                        })
                      }
                      min="0"
                      step="1"
                      placeholder="Необязательно"
                    />
                  </label>

                  <button
                    type="button"
                    className={`admin-default-variant-button ${
                      variant.is_default
                        ? "admin-default-variant-button-active"
                        : ""
                    }`}
                    onClick={() => setDefaultVariant(index)}
                  >
                    {variant.is_default ? "Основной" : "Сделать основным"}
                  </button>

                  <button
                    type="button"
                    className="admin-delete-variant-button"
                    onClick={() => removeVariant(index)}
                    disabled={values.variants.length === 1}
                    aria-label="Удалить вариант"
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="admin-cake-form-sidebar">
          <section className="admin-form-card">
            <div className="admin-form-card-heading">
              <div>
                <span>03</span>
                <div>
                  <h2>Фотография</h2>
                  <p>Главное изображение для карточки.</p>
                </div>
              </div>
            </div>

            <ImageUploader
              value={values.image_url}
              onChange={(imageUrl) =>
                setValues((current) => ({
                  ...current,
                  image_url: imageUrl,
                }))
              }
            />
          </section>

          <section className="admin-form-card">
            <div className="admin-form-card-heading">
              <div>
                <span>04</span>
                <div>
                  <h2>Публикация</h2>
                  <p>Настройте видимость и метки.</p>
                </div>
              </div>
            </div>

            <div className="admin-switch-list">
              <label className="admin-switch-row">
                <div>
                  <strong>Опубликован</strong>
                  <span>Торт отображается клиентам.</span>
                </div>

                <input
                  type="checkbox"
                  checked={values.is_published}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      is_published: event.target.checked,
                    }))
                  }
                />

                <span className="admin-switch-control" />
              </label>

              <label className="admin-switch-row">
                <div>
                  <strong>Популярный</strong>
                  <span>Показывать метку «Популярный».</span>
                </div>

                <input
                  type="checkbox"
                  checked={values.is_popular}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      is_popular: event.target.checked,
                    }))
                  }
                />

                <span className="admin-switch-control" />
              </label>

              <label className="admin-switch-row">
                <div>
                  <strong>Новинка</strong>
                  <span>Показывать метку «Новинка».</span>
                </div>

                <input
                  type="checkbox"
                  checked={values.is_new}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      is_new: event.target.checked,
                    }))
                  }
                />

                <span className="admin-switch-control" />
              </label>
            </div>
          </section>

          <section className="admin-form-card admin-form-summary-card">
            <span className="admin-eyebrow">Предварительно</span>
            <h2>{values.name || "Новый торт"}</h2>

            <div>
              <span>Вариантов</span>
              <strong>{values.variants.length}</strong>
            </div>

            <div>
              <span>Цена от</span>
              <strong>
                {lowestPrice > 0
                  ? `${lowestPrice.toLocaleString("ru-RU")} ₸`
                  : "Не указана"}
              </strong>
            </div>

            <div>
              <span>Статус</span>
              <strong>
                {values.is_published ? "Опубликован" : "Скрыт"}
              </strong>
            </div>
          </section>
        </aside>
      </div>

      <div className="admin-form-footer">
        <Link href="/admin/cakes" className="admin-form-cancel-button">
          Отмена
        </Link>

        <button
          type="submit"
          className="admin-form-submit-button"
          disabled={saving}
        >
          {saving
            ? "Сохранение..."
            : isEditing
              ? "Сохранить изменения"
              : "Добавить торт"}
        </button>
      </div>
    </form>
  );
}
