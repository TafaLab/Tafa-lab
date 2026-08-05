"use client";

import { useLocale } from "next-intl";

import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";

import {
  uploadCakeImage,
} from "@/lib/cake-admin";

import {
  adminMessages,
  type AdminLocale,
} from "@/messages/admin";

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
  const currentLocale = useLocale();

  const locale: AdminLocale =
    currentLocale === "en"
      ? "en"
      : "ru";

  const text =
    adminMessages[locale]
      .imageUploader;

  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [error, setError] =
    useState("");

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (
      !allowedTypes.includes(
        file.type,
      )
    ) {
      setError(
        text.allowedTypesError,
      );
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(text.sizeError);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const publicUrl =
        await uploadCakeImage(
          file,
        );

      onChange(publicUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : text.uploadError,
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-image-uploader">
      <div className="admin-image-preview">
        {value ? (
          <img
            src={value}
            alt={text.imageAlt}
          />
        ) : (
          <div className="admin-image-placeholder">
            <span>◉</span>

            <strong>
              {
                text.placeholderTitle
              }
            </strong>

            <small>
              {
                text
                  .placeholderDescription
              }
            </small>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={
          handleFileChange
        }
        hidden
      />

      <div className="admin-image-actions">
        <button
          type="button"
          className="admin-upload-button"
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
        >
          {uploading
            ? text.uploading
            : value
              ? text.replace
              : text.upload}
        </button>

        {value ? (
          <button
            type="button"
            className="admin-remove-image-button"
            onClick={() =>
              onChange("")
            }
            disabled={uploading}
          >
            {text.remove}
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="admin-field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}