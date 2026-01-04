import MainFooter from '../components/footer/MainFooter';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      
      {/* TOP BAR */}
      <div className="h-5 bg-red-700 w-full" />

      {/* PAGE CONTENT */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <MainFooter />
    </div>
  );
}