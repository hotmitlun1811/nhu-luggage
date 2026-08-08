// Shared building blocks + constants for the Terms of Service and Privacy
// Policy content. Used by both the full legal pages (/terms-of-service,
// /privacy-policy) and the ConsentModal popup, so the two never drift.

export const EFFECTIVE = "1 June 2026";
export const EMAIL = "stowdanang@gmail.com";
export const PHONE = "+84 905 955 161";

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-[88px]">
      <h2
        className="text-[18px] font-bold text-[#16243F] mb-[16px] pb-3 border-b border-[#EAEAE6]"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h2>
      <div
        className="text-[15px] text-[#4B5563] leading-relaxed flex flex-col gap-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-[#E8742C] flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
