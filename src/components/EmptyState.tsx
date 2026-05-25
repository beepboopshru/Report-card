export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed rounded-xl p-12 text-center bg-white">
      <h3 className="font-serif text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
