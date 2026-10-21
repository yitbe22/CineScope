import { useState } from "react";
import { discover, getGenres } from "../api/tmdb";
import useFetch from "../Hooks/useFetch";
import { MediaGrid } from "../components/MediaGrid";
import { ErrorBox } from "../components/skeleton";

const Browse = ({ type }) => {
  const [genre, setGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");

  const genres = useFetch(() => getGenres(type), [type]);
  const { data, loading, error, retry } = useFetch(
    () => discover(type, { genre, page, sort }),
    [type, genre, page, sort],
  );

  const sorts = [
    { value: "popularity.desc", label: "Popular" },
    { value: "vote_average.desc", label: "Top rated" },
    {
      value:
        type === "tv" ? "first_air_date.desc" : "primary_release_date.desc",
      label: "Newest",
    },
  ];

  const pickGenre = (id) => {
    setGenre(id);
    setPage(1);
  };

  const pickSort = (value) => {
    setSort(value);
    setPage(1);
  };

  const btn = (active) =>
    `shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${active ? "bg-white text-black" : "glass text-white/80"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-8">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">
        {type === "tv" ? "Series" : "Movies"}
      </h1>

      <div className="no-scrollbar flex mb-3 gap-2 overflow-x-auto">
        {sorts.map((s) => (
          <button
            key={s.value}
            className={btn(sort === s.value)}
            onClick={() => pickSort(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="no-scrollbar flex mb-5 gap-2 overflow-x-auto">
        <button className={btn(genre === null)} onClick={() => pickGenre(null)}>
          All
        </button>
        {genres.data?.genres.map((g) => (
          <button
            key={g.id}
            onClick={() => pickGenre(g.id)}
            className={btn(genre === g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorBox message={error.message} onRetry={retry} />
      ) : (
        <MediaGrid items={data?.results || []} loading={loading} type={type} />
      )}

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          className="glass rounded-full px-6 py-2 text-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-white/60 disabled:opacity-40">
          Page {page}
        </span>
        <button
          className="glass rounded-full px-6 py-2 text-sm disabled:opacity-40"
          disabled={!data || page >= data.total_pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Browse;
