import type { ReactNode } from "react";
export default function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="card welcome">
      <img src="/illustrations/empty-state.svg" width="180" alt="" />
      <h2>{title}</h2>
      {children}
    </section>
  );
}
