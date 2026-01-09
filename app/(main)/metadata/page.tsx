'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthorPopup from '@/app/components/metadata/AuthorPopup';

/* =====================
   TYPES
===================== */

// Author di publication (ringkas)
type PublicationAuthor = {
  id: string | null;
  name: string;
};

// Author detail dari /author/:id
type AuthorDetail = {
  id: string;
  name: string;
  affiliation: string;
  department: string;
  totalArticle: number;
  totalCitation: number;
  hIndexScopus: number;
  hIndexGoogle: number;
  hIndexWos: number;
  sintaScoreOverall: number;
  sintaScore3yr: number;
};

type Publication = {
  title: string;
  year: number;
  journal: string;
  citation: number;
  doi: string;
  authors: PublicationAuthor[];
};

/* =====================
   PAGE
===================== */

export default function PublicationPage() {
  const searchParams = useSearchParams();
  const publicationId = searchParams.get('id');

  const [publication, setPublication] = useState<Publication | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorLoading, setAuthorLoading] = useState(false);

  /* =====================
     FETCH PUBLICATION
  ===================== */
  useEffect(() => {
    if (!publicationId) return;

    const fetchPublication = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${base}/journal/${publicationId}`);

        if (!res.ok) throw new Error('Failed to fetch publication');

        const data = await res.json();

        const mappedPublication: Publication = {
          title: data.title,
          year: Number(data.publicationYear),
          journal: data.publicationName,
          citation: data.citation,
          doi: data.doi.replace('DOI: ', ''),
          authors: data.authors.map((a: any) => ({
            id: a.id,
            name: a.name,
          })),
        };

        setPublication(mappedPublication);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [publicationId]);

  /* =====================
     FETCH AUTHOR DETAIL
  ===================== */
  const fetchAuthorDetail = async (authorId: string) => {
    try {
      setAuthorLoading(true);

      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${base}/author/${authorId}`);

      if (!res.ok) throw new Error('Failed to fetch author');

      const data = await res.json();

      const mappedAuthor: AuthorDetail = {
        id: authorId,
        name: data.nama,
        affiliation: data.affiliation,
        department: data.department,
        totalArticle: data.article,
        totalCitation: data.citation,
        hIndexScopus: data.hindex_scopus,
        hIndexGoogle: data.hindex_gscholar,
        hIndexWos: data.hindex_wos,
        sintaScoreOverall: data.sinta_score_overall,
        sintaScore3yr: data.sinta_score_3yr,
      };

      setSelectedAuthor(mappedAuthor);
    } catch (error) {
      console.error(error);
    } finally {
      setAuthorLoading(false);
    }
  };

  /* =====================
     STATES
  ===================== */
  if (!publicationId) {
    return <p className="text-center py-20">Invalid publication ID</p>;
  }

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!publication) {
    return <p className="text-center py-20">Publication not found</p>;
  }

  /* =====================
     RENDER
  ===================== */
  return (
    <>
      <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl font-semibold text-red-700 mb-8">
            {publication.title}
          </h1>

          {/* METADATA */}
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-[150px_1fr] gap-x-6 gap-y-4 text-sm">
            <div className="text-gray-500 text-right">Authors</div>
            <div className="space-x-2">
              {publication.authors.map((author, index) => (
                <button
                  key={author.id ?? author.name}
                  disabled={!author.id}
                  onClick={() => author.id && fetchAuthorDetail(author.id)}
                  className="text-red-700 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
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

      {/* AUTHOR LOADING */}
      {authorLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center text-white z-50">
          Loading author...
        </div>
      )}

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
