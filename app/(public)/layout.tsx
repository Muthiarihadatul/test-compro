export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[url('/bg.png')]
          bg-cover bg-center
        "
      />
      <div className="absolute inset-0 bg-white/70" />

      {/* Content */}
      <main className="relative z-10 w-full flex justify-center">
        {children}
      </main>
    </div>
  );
}
