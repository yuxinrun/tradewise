import type { CSSProperties } from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const paths: Record<string, JSX.Element> = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  box: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  ship: <><path d="M3 17h18l-2 4H5z" /><path d="M5 17V9l7-4 7 4v8M12 5v12" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></>,
  cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11L21 7H6" /></>,
  store: <><path d="M4 9h16v11H4z" /><path d="M3 9l2-5h14l2 5M9 20v-6h6v6" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  growth: <><path d="M3 20h18M5 16l5-5 4 3 6-8" /><path d="M16 6h4v4" /></>,
  calculator: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 12h2m4 0h2m-8 4h2m4 0h2" /></>,
  exchange: <><path d="M4 8h13l-3-3m3 3-3 3M20 16H7l3-3m-3 3 3 3" /></>,
  container: <><rect x="2" y="7" width="20" height="10" rx="1" /><path d="M7 7v10m5-10v10m5-10v10" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6m-6 4h6" /></>,
  message: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8m-8 3h5" /></>,
  checklist: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="m8 8 1.5 1.5L12 7m-4 7 1.5 1.5L12 14m2-7h3m-3 7h3" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5a3 3 0 0 1 0 6m2 3c1.8.9 3 2.6 3 5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  arrowRight: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
  arrowUp: <><path d="M12 20V4m-6 6 6-6 6 6" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  chevronRight: <><path d="m9 6 6 6-6 6" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  book: <><path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z" /><path d="M20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3z" /></>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
  external: <><path d="M14 4h6v6m0-6-9 9" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4m8-4v4" /></>,
  alert: <><path d="M12 3 2 20h20z" /><path d="M12 9v5m0 3h.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-9h.01" /></>,
  lightbulb: <><path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z" /></>,
  route: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v5a4 4 0 0 0 4 4h4a4 4 0 0 1 4 3M6 7a4 4 0 0 1 4 4" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  flag: <><path d="M5 21V4m0 1c4-3 8 3 14 0v11c-6 3-10-3-14 0" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="M8 16v-4m4 4V8m4 8v-6" /></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6 9a7 7 0 0 1 12-2l2 5M4 12l2 5a7 7 0 0 0 12-2" /></>,
};

export default function Icon({ name, size = 20, color = 'currentColor', className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.info}
    </svg>
  );
}
