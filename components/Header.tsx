import Link from "next/link";

const nav = [
  { href: "#why", label: "Why it matters" },
  { href: "#offer", label: "What we do" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur supports-[backdrop-filter]:bg-stone-50/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-stone-900"
        >
          Nachfolge Ready
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-stone-600 sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-teal-800"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-teal-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-900"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
