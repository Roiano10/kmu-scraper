export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              Nachfolge Ready
            </p>
            <p className="mt-1 max-w-md text-sm text-stone-600">
              Digital readiness for SME owners planning succession in
              Switzerland. Replace placeholder contact details before launch.
            </p>
          </div>
          <a
            href="mailto:hello@example.com"
            className="text-sm font-medium text-teal-800 hover:text-teal-900"
          >
            hello@example.com
          </a>
        </div>
        <p className="mt-8 text-xs text-stone-500">
          © {new Date().getFullYear()} Nachfolge Ready. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
