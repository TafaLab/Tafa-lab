type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export default function RangeControl({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: RangeControlProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm">
        <strong>{label}</strong>

        <span className="text-black/50">
          {value}
          {suffix}
        </span>
      </span>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="w-full accent-[#6a4433]"
      />
    </label>
  );
}