export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <div className="flex flex-col flex-auto gap-2 m-auto h-full">{children}</div>;
}
