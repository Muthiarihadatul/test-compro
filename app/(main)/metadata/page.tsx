'use client';

import { useEffect, useState } from 'react';
import MainFooter from '@/app/components/footer/MainFooter';
import AuthorPopup from '@/app/components/metadata/AuthorPopup';

// /* =======================
//    DUMMY AUTHOR DATA
// ======================= */
// const AUTHORS = {
//   author1: {
//     name: 'T. Maisha Shahrani',
//     affiliation: 'Universitas Telkom',
//     department: 'S1 Teknik Telekomunikasi',
//     totalArticle: 12,
//     totalCitation: 45,
//     hIndexScopus: 10,
//     hIndexGoogle: 14,
//     hIndexWos: 3,
//   },
//   author2: {
//     name: 'Aliyya Nur Ramdhania',
//     affiliation: 'Universitas Telkom',
//     department: 'S1 Teknik Telekomunikasi',
//     totalArticle: 2,
//     totalCitation: 5,
//     hIndexScopus: 0,
//     hIndexGoogle: 1,
//     hIndexWos: 0,
//   },
//   author3: {
//     name: 'Muharman Lubis',
//     affiliation: 'Universitas Telkom',
//     department: 'S1 Teknik Telekomunikasi',
//     totalArticle: 7,
//     totalCitation: 20,
//     hIndexScopus: 3,
//     hIndexGoogle: 6,
//     hIndexWos: 1,
//   },
// };


type Author = {
  id: string;
  name: string;
  affiliation: string;
  department: string;
  totalArticle: number;
  totalCitation: number;
  hIndexScopus: number;
  hIndexGoogle: number;
  hIndexWos: number;
};

type Publication = {
  id: string;
  title: string;
  year: number;
  journal: string;
  citation: number;
  doi: string;
  authors: Author[];
};

type PageProps = {
  params: {
    id: string;
  };
};





export default function PublicationPage({ params }: PageProps) {
  const publicationId = params.id;

  const [publication, setPublication] = useState<Publication | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/journal/${publicationId}`
        );

        if (!res.ok) throw new Error('Failed to fetch publication');

        const data = await res.json();
        setPublication(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [publicationId]);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!publication) {
    return <p className="text-center py-20">Publication not found</p>;
  }


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
            <div className="text-gray-500 text-right">Authors</div>
            <div className="space-x-2">
              {publication.authors.map((author, index) => (
                <button
                  key={author.id}
                  onClick={() => setSelectedAuthor(author)}
                  className="text-red-700 hover:underline"
                >
                  {author.name}
                  {index < publication.authors.length - 1 && ','}
                </button>
              ))}
            </div>


            <div className="text-gray-500 text-right">Year</div>
            <div>{publication.year}</div>

            <div className="text-gray-500 text-right">Journal</div>
            <div>{publication.journal}</div>

            <div className="text-gray-500 text-right">Citation</div>
            <div>{publication.citation}</div>

            <div className="text-gray-500 text-right">DOI</div>
            <div>
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                className="text-blue-600 hover:underline break-all"
              >
                {publication.doi}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* AUTHOR POPUP */}
      {selectedAuthor && (
        <AuthorPopup
          publicationId={publicationId}
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}

    </>
  );
}