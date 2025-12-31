import MainFooter from '@/app/components/footer/MainFooter';

export default function PublicationPage() {
  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        
        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-semibold text-red-700 leading-snug mb-8">
          Implementation of Building Construction and Environment Control for
          Data Centre Based on ANSI/TIA-942 in Networking Content Company
        </h1>

        {/* METADATA */}
        <div className="
            max-w-4xl
            mx-auto
            px-4
            grid
            grid-cols-1
            min-[502px]:grid-cols-[150px_1fr]
            lg:grid-cols-[200px_1fr]
            gap-x-6
            gap-y-4
            text-sm
            text-gray-800
            leading-relaxed
    ">
          {/* AUTHORS */}
          <div className="text-gray-500 md:text-right">Authors 1</div>
          <div>T. Maisha Shahrani ; h-Index (10)</div>

          <div className="text-gray-500 md:text-right">Authors 2</div>
          <div>Aliyya Nur Ramdhania ; h-Index (0)</div>

          <div className="text-gray-500 md:text-right">Authors 3</div>
          <div>Muharman Lubis ; h-Index (3)</div>

          <div className="text-gray-500 md:text-right">Publication Year</div>
          <div>2019</div>

          <div className="text-gray-500 md:text-right">Publication Date</div>
          <div>2019-12-18</div>

          <div className="text-gray-500 md:text-right">Publication Name</div>
          <div>Journal of Physics: Conference Series</div>

          <div className="text-gray-500 md:text-right">Citation</div>
          <div>5</div>

          <div className="text-gray-500 md:text-right">Article</div>
          <div>
            <p className="font-medium">
              Implementation of Building Construction and Environment Control for
              Data Centre Based on ANSI/TIA-942 in Networking Content Company
            </p>
            <p className="mt-1 text-gray-600">
              T. Maisha Shahrani, Aliyya Nur Ramdhania, Muharman Lubis
            </p>
          </div>

          <div className="text-gray-500 md:text-right">DOI</div>
          <div>
            <a
              href="https://doi.org/10.1088/1742-6596/1361/1/012074"
              target="_blank"
              className="text-blue-600 break-all hover:underline"
            >
              10.1088/1742-6596/1361/1/012074
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
