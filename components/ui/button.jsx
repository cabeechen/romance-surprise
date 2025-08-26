export function Button({ className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  const variants = {
    default: "bg-white/90 text-black hover:bg-white",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };
  const cls = `${base} ${variants[variant] || variants.default} ${className}`;
  return <button className={cls} {...props} />;
}
