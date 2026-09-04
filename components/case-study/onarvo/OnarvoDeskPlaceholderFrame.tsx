interface OnarvoDeskPlaceholderFrameProps {
  label: string;
  className?: string;
}

export function OnarvoDeskPlaceholderFrame({
  label,
  className = "",
}: OnarvoDeskPlaceholderFrameProps) {
  return (
    <div
      className={`onarvo-placeholder-frame flex aspect-[4/3] w-full items-center justify-center rounded-sm p-6 ${className}`}
    >
      <p className="text-body max-w-md text-center text-text-muted">{label}</p>
    </div>
  );
}
