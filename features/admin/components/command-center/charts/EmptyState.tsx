export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <p className="text-xs text-gray-500">{message}</p>
    </div>
  );
}
