export default function MainFooter() {
  return (
    <footer className="bg-red-800 text-white px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Logo + Deskripsi */}
        <div className="flex flex-col gap-3">
          {/* Logo Image */}
          <img
            src="whitelogo.png"
            alt="Pub-Hub Logo"
            width={140}          
            height={40}
            className="w-28 sm:w-36 md:w-40 h-auto"
          />

          {/* Deskripsi */}
          <p className="text-xs text-red-100 max-2-xl">
            A central website for searching and managing scientific publications
            issued by Telkom University.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-red-700 my-2"></div>

        {/* Copyright */}
        <p className="text-xs text-red-200">
          © 2025 PubHub Telkom University. All intellectual property rights
          reserved, including permissions for text and data mining, artificial
          intelligence training, and related technologies.
        </p>
      </div>
    </footer>
  );
}
