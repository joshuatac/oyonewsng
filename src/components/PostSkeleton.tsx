// src/components/PostSkeleton.tsx

export default function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-64 bg-gray-300 rounded-md" />
      <div className="h-6 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-4/6" />
    </div>
  );
}
