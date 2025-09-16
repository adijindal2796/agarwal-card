export function AppFooter({ brand }) {
  return (
    <footer className="mx-auto max-w-xl px-5 py-10 text-center text-xs text-stone-500">
      <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
      <p className="mt-1">Crafted for QR visits • Built with ❤️</p>
    </footer>
  );
}
