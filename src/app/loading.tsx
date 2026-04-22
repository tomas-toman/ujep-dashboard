export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-theme-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-theme-black border-t-transparent"></div>
        <p className="text-theme-black animate-pulse font-medium">Načítání...</p>
      </div>
    </div>
  );
}
