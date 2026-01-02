'use client';

import { useState } from 'react';
import MainFooter from '@/app/components/footer/MainFooter';
import AuthorPopup from '@/app/components/metadata/AuthorPopup';

/* =======================
   DUMMY AUTHOR DATA
======================= */
const AUTHORS = {
  author1: {
    name: 'T. Maisha Shahrani',
    affiliation: 'Universitas Telkom',
    department: 'S1 Teknik Telekomunikasi',
    totalArticle: 12,
    totalCitation: 45,
    hIndexScopus: 10,
    hIndexGoogle: 14,
    hIndexWos: 3,
  },
  author2: {
    name: 'Aliyya Nur Ramdhania',
    affiliation: 'Universitas Telkom',
    department: 'S1 Teknik Telekomunikasi',
    totalArticle: 2,
    totalCitation: 5,
    hIndexScopus: 0,
    hIndexGoogle: 1,
    hIndexWos: 0,
  },
  author3: {
    name: 'Muharman Lubis',
    affiliation: 'Universitas Telkom',
    department: 'S1 Teknik Telekomunikasi',
    totalArticle: 7,
    totalCitation: 20,
    hIndexScopus: 3,
    hIndexGoogle: 6,
    hIndexWos: 1,
  },
};

export default function PublicationPage() {
  const [selectedAuthor, setSelectedAuthor] = useState<
    keyof typeof AUTHORS | null
  >(null);

  return (
    <>
      <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto">
          
          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl font-semibold text-red-700 leading-snug mb-8">
            Implementation of Building Construction and Environment Control for
            Data Centre Based on ANSI/TIA-942 in Networking Content Company
          </h1>

          {/* METADATA */}
          <div
            className="
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
            "
          >
            {/* AUTHORS */}
            <div className="text-gray-500 md:text-right">Authors 1</div>
            <div>
              <button
                onClick={() => setSelectedAuthor('author1')}
                className="
                  text-red-700
                  font-medium
                  transition
                  duration-200
                  hover:text-red-800
                  hover:underline
                  underline-offset-4
                "
              >
                T. Maisha Shahrani
              </button>{' '}
            </div>

            <div className="text-gray-500 md:text-right">Authors 2</div>
            <div>
              <button
                onClick={() => setSelectedAuthor('author2')}
                className="
                  text-red-700
                  font-medium
                  transition
                  duration-200
                  hover:text-red-800
                  hover:underline
                  underline-offset-4
                "
              >
                Aliyya Nur Ramdhania
              </button>{' '}
            </div>

            <div className="text-gray-500 md:text-right">Authors 3</div>
            <div>
              <button
                onClick={() => setSelectedAuthor('author3')}
                className="
                  text-red-700
                  font-medium
                  transition
                  duration-200
                  hover:text-red-800
                  hover:underline
                  underline-offset-4
                "
              >
                Muharman Lubis
              </button>{' '}
            </div>

            <div className="text-gray-500 md:text-right">Publication Year</div>
            <div>2019</div>

            <div className="text-gray-500 md:text-right">Publication Name</div>
            <div>Journal of Physics: Conference Series</div>

            <div className="text-gray-500 md:text-right">Citation</div>
            <div>5</div>

            <div className="text-gray-500 md:text-right">Article</div>
            <div>
              <p className="font-medium">
                Implementation of Building Construction and Environment Control
                for Data Centre Based on ANSI/TIA-942 in Networking Content Company
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

      {/* POPUP */}
      {selectedAuthor && (
        <AuthorPopup
          author={AUTHORS[selectedAuthor]}
          onClose={() => setSelectedAuthor(null)}
        />
      )}

    </>
  );
}
