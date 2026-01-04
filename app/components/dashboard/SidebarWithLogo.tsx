import Image from 'next/image';
import FilterSidebar from './FilterSidebar';

export default function SidebarWithLogo() {
  return (
    <aside className="flex flex-col items-start gap-4">
      
      {/* LOGO */}
      <div className="w-full flex justify-center">
        <Image
          src="/pubhub-logo.png"
          alt="Pub-Hub Logo"
          width={200}
          height={60}
        />
      </div>

      {/* FILTER */}
      <FilterSidebar />
    </aside>
  );
}

