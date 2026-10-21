import { useSearchParams } from "react-router-dom";
import { searchMulti } from "../api/tmdb";
import { ErrorBox } from "../components/skeleton";
import { MediaGrid } from "../components/MediaGrid";
import useFetch from "../Hooks/useFetch";

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const { data, loading, error, retry } = useFetch(
    () => (q ? searchMulti(q) : Promise.resolve({ results: [] })),
    [q],
  );

  const results = (data?.results || []).filter(
    (r) => r.media_type !== "person",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-8">
      <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">
        Results for "{q}"
      </h1>

      {error ? (
        <ErrorBox message={error.message} onRetry={retry} />
      ) : (
        <>
          <MediaGrid items={results} loading={loading} />
          {!loading && q && results.length === 0 && (
            <p className="py-2- text-center text-white/50">No result found</p>
          )}
          {!q && (
            <p className="py-2- text-center text-white/50">
              Type something in the search bar
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
