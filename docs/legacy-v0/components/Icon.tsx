// Pictogrammes au trait, 24×24, couleur héritée.
const PATHS: Record<string, string> = {
  compass: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M15.5 8.5l-2 5-5 2 2-5z",
  arrow: "M4 18h4v-5H4zM10 18h4V9h-4zM16 18h4V5h-4zM3 21h18",
  scale: "M12 4v16M6 20h12M5 8h14M5 8l-2.5 6h5zM19 8l-2.5 6h5zM12 4l-1 1h2z",
  table: "M4 5h16v14H4zM4 10h16M9 10v9M15 10v9",
  key: "M8.5 15.5a3.5 3.5 0 1 0 0-.01M11 13l8-8M16 8l2 2M14 10l1.5 1.5",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9",
  map: "M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14",
  list: "M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
};

export default function Icon({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name] ?? PATHS.doc} />
    </svg>
  );
}
