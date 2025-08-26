export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-md border border-white/20 bg-black/30 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 ${className}`}
      {...props}
    />
  );
}
