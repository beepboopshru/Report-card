import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AdminKits() {
  const kits = useQuery(api.kits.list);
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Admin", to: "/admin" }, { label: "Kits" }]} />
      <h1 className="font-serif text-2xl text-accent mb-4">All kits ({kits?.length ?? "…"})</h1>
      <ul className="divide-y bg-white border rounded-xl">
        {kits?.map((k) => (
          <li key={k._id}>
            <Link
              to={`/admin/rubrics/${k._id}`}
              className="block px-4 py-3 hover:bg-gray-50 text-sm"
            >
              <div className="font-medium">#{k.kitNumber} · {k.kitName}</div>
              <div className="text-xs text-gray-500">
                {k.concept} · {k.category} · {k.subject} · Grade {k.grade}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
