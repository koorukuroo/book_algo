import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-8">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-[var(--color-muted)] mb-2">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] mb-6">
      {children}
    </p>
  );
}

export function Callout({
  variant = "default",
  title,
  children,
}: {
  variant?: "default" | "tip" | "warn" | "key";
  title?: string;
  children: ReactNode;
}) {
  const styles: Record<string, string> = {
    default: "bg-[var(--color-bg-soft)] border-[var(--color-line)]",
    tip: "bg-[var(--color-mint-soft)] border-[var(--color-mint)]/30",
    warn: "bg-[var(--color-sun-soft)] border-[var(--color-sun)]/30",
    key: "bg-[var(--color-accent-soft)] border-[var(--color-accent)]/30",
  };
  const icons: Record<string, string> = {
    default: "💡",
    tip: "✅",
    warn: "⚠️",
    key: "🔑",
  };
  return (
    <div className={`rounded-2xl border-2 p-5 my-6 ${styles[variant]}`}>
      {title && (
        <p className="font-display text-lg mb-2 flex items-center gap-2">
          <span>{icons[variant]}</span>
          <span>{title}</span>
        </p>
      )}
      <div className="text-[var(--color-ink-soft)] leading-relaxed">{children}</div>
    </div>
  );
}

export function Quote({
  children,
  source,
}: {
  children: ReactNode;
  source?: string;
}) {
  return (
    <blockquote className="my-8 border-l-4 border-[var(--color-accent)] pl-6 py-2">
      <p className="font-display text-2xl md:text-3xl text-[var(--color-ink)] leading-snug">
        {`"`}{children}{`"`}
      </p>
      {source && (
        <footer className="mt-3 text-sm text-[var(--color-muted)]">— {source}</footer>
      )}
    </blockquote>
  );
}

export function Stat({
  value,
  label,
  description,
  color = "accent",
}: {
  value: string;
  label: string;
  description?: string;
  color?: "accent" | "mint" | "sky" | "sun" | "plum";
}) {
  const colors: Record<string, string> = {
    accent: "text-[var(--color-accent)]",
    mint: "text-[var(--color-mint)]",
    sky: "text-[var(--color-sky)]",
    sun: "text-[var(--color-sun)]",
    plum: "text-[var(--color-plum)]",
  };
  return (
    <div className="rounded-2xl border-2 border-[var(--color-line)] bg-white p-5">
      <p className={`num-badge text-4xl font-bold mb-1 ${colors[color]}`}>{value}</p>
      <p className="text-sm font-display text-[var(--color-ink)]">{label}</p>
      {description && (
        <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function StoryCard({
  who,
  when,
  title,
  children,
}: {
  who: string;
  when?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border-2 border-[var(--color-line)] bg-white p-6 my-4 hover:border-[var(--color-accent)]/30 transition">
      <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-2 font-mono uppercase tracking-wider">
        <span>👤 {who}</span>
        {when && <span>· {when}</span>}
      </div>
      {title && <h4 className="font-display text-xl mb-2">{title}</h4>}
      <div className="text-[var(--color-ink-soft)] leading-relaxed">{children}</div>
    </article>
  );
}
