import MainFooter from '../components/footer/MainFooter';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* TOP BAR */}
      <div className="h-5 bg-red-700" />

      {/* PAGE CONTENT */}
      <div className="flex-1">
        {children}
      </div>

      {/* FOOTER */}
      <MainFooter />

    </div>
  );
}
