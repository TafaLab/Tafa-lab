"use client";

import { ChangeEvent, useRef, useState } from "react";
import { uploadCakeImage } from "../../../../lib/cake-admin";

type ImageUploaderProps = {
  value: string;
  onChange: (value: string) => void;
};

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export default function ImageUploader({
  value,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Поддерживаются JPG, PNG, WebP и AVIF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Размер изображения не должен превышать 10 МБ.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const publicUrl = await uploadCakeImage(file);
      onChange(publicUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Не удалось загрузить фотографию.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-image-uploader">
      <div className="admin-image-preview">
        {value ? (
          <img src={value} alt="Фотография торта" />
        ) : (
          <div className="admin-image-placeholder">
            <span>◉</span>
            <strong>Фотография торта</strong>
            <small>JPG, PNG или WebP до 10 МБ</small>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        hidden
      />

      <div className="admin-image-actions">
        <button
          type="button"
          className="admin-upload-button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading
            ? "Загрузка..."
            : value
              ? "Заменить фотографию"
              : "Загрузить фотографию"}
        </button>

        {value ? (
          <button
            type="button"
            className="admin-remove-image-button"
            onClick={() => onChange("")}
            disabled={uploading}
          >
            Удалить
          </button>
        ) : null}
      </div>

      {error ? <p className="admin-field-error">{error}</p> : null}
    </div>
  );
}
