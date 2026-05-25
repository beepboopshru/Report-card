import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="text-xs text-gray-500 mb-4">
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {c.to ? (
            <Link to={c.to} className="hover:text-accent">{c.label}</Link>
          ) : (
            <span className="text-gray-700">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
