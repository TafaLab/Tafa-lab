type PreviewValueProps = {
  label: string;
  value: string;
};

export default function PreviewValue({
  label,
  value,
}: PreviewValueProps) {
  return (
    <div className="rounded-2xl bg-[#f7f3ef] p-3">
      <span className="block text-xs text-black/40">
        {label}
      </span>

      <strong className="mt-1 block truncate text-sm">
        {value}
      </strong>
    </div>
  );
}