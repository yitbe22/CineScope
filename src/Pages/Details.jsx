import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import {
  dateOf,
  getDetails,
  getSeason,
  img,
  titleOf,
  yearOf,
} from "../api/tmdb";
import { ErrorBox } from "../components/skeleton";
import { Star, Calendar, Clock4, Play } from "lucide-react";
import MediaRow from "../components/MediaRow";

const Details = () => {
  const { type, id } = useParams();
  const [season, setSeason] = useState(1);
  const { data, loading, error, retry } = useFetch(
    () => getDetails(type, id),
    [type, id],
  );

  const seasonQ = useFetch(
    async () => type === "tv" && getSeason(id, season),
    [type, id, season],
  );

  const trailer = data?.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );
  const seasons = (data?.seasons || []).filter((s) => s.season_number > 0);

  useEffect(() => {
    setSeason(1);
  }, [type, id]);

  if (error) {
    return (
      <div className="pt-32">
        <ErrorBox message={error.message} onRetry={retry} />
      </div>
    );
  }

  if (loading || !data) {
    return <div className="h-screen animate-pulse bg-white/5" />;
  }

  console.log(seasonQ.data?.episodes)

  return (
    <div>
      <div className="relative h-[55vh] min-h-90 w-full overflow-hidden md:h-[70vh]">
        {data.backdrop_path && (
          <img
            alt=""
            className="size-full object-cover"
            src={img(data.backdrop_path, "original")}
          ></img>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/50 to-bg/20"></div>
      </div>
      <div className="relative z-10 mx-auto -mt-40 max-w-7xl px-4 sm:px-8 md:-mt-64">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div className="mx-auto w-48 shrink-0 sm:w-56 md:mx-0 md:w-72">
            {data.poster_path ? (
              <img
                src={img(data.poster_path, "w500")}
                alt={titleOf(data)}
                className="w-full rounded-2xl shadow-2xl shadow-black/60"
              />
            ) : (
              <div className="aspect-2/3 rounded-2xl bg-surface" />
            )}
          </div>
          <div className="flex-1 text-center md:pt-24 md:text-left">
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              {titleOf(data)}
              <span className="font-medium text-white/50 pl-2">
                ({yearOf(data)})
              </span>
            </h1>
            {data.tagline && (
              <p className="mt-2 italic text-white/60">{data.tagline}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
              <span className="flex items-center gap-2 font-semibold">
                <Star
                  strokeWidth={1.5}
                  size={16}
                  fill="#FCC600"
                  color="#FCC600"
                />{" "}
                {data.vote_average.toFixed(1)}
              </span>
              {data.runtime && (
                <span className="flex items-center gap-1 text-white/70">
                  <Clock4 strokeWidth={2} size={15} />
                  {data.runtime} min
                </span>
              )}
              <span className="flex items-center gap-1   text-white/70">
                <Calendar strokeWidth={2} size={15} />
                {dateOf(data)}
              </span>
              {type === "tv" && (
                <span className="text-white/70">
                  {data.number_of_seasons} seasons • {data.number_of_episodes}{" "}
                  episodes
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {data.genres?.map((g) => (
                <span
                  key={g.id}
                  className="glass rounded-full  px-3 py-1 text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>
            <h2 className="mt-6 font-bold text-lg">Overview</h2>
            {data.overview && (
              <p className="mt-2 max-w-3xl leading-relaxed text-white/75">
                {data.overview}
              </p>
            )}

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 bg-white inline-flex items-center text-black gap-2 rounded-full text-sm font-bold px-6 py-3 hover:bg-white/85"
              >
                <Play strokeWidth={1.75} size={16} fill="#000" color="#000" />
                Watch trailer
              </a>
            )}
          </div>
        </div>
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">Cast</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto">
            {data.credits?.cast?.slice(0, 15).map((c) => (
              <div key={c.id} className="w-24 shrink-0 text-center sm:w-28">
                {c.profile_path ? (
                  <img
                    src={img(c.profile_path, "w185")}
                    alt={c.name}
                    loading="lazy"
                    className="mx-auto size-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto size-20 rounded-full bg-surface" />
                )}
                <p className="mt-2 truncate text-sm font-semibold">{c.name}</p>
                <p className="truncate text-xs text-white/50">{c.character}</p>
              </div>
            ))}
          </div>
        </section>

        {type === "tv" && (
          <section className="mt-12">
            <div className="mb-3 flex flex-wrap gap-3 items-center justify-between">
              <h1 className="text-xl font-bold sm:text-2xl">Episodes</h1>
              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="glass rounded-2xl bg-surface px-4 py-2 text-sm outline-none"
              >
                {seasons.map((s) => (
                  <option
                    key={s.id}
                    value={s.season_number}
                    className="bg-surface"
                  >
                    Season {s.season_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
               {seasonQ.loading &&  Array.from({length: 4}).map((_, i)=> (
                  <div key={i} className="h-28 animate-pulse rounded-b-2xl bg-white/10"/>
               ))}
              {seasonQ.data?.episodes.map((ep) => (
                <div key={ep.id} className="flex gap-3 glass rounded-2xl p-3">
                  {ep.still_path ? (
                    <>
                        <img
                      src={img(ep.still_path, "w300")}
                      alt={ep.name}
                      loading="lazy"
                      className=" relative h-20 w-32 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-40"
                    /> 
                     <span className="bg-surface/90 flex gap-1 items-center text-xs font-light absolute top-2 left-2 px-1.5 py-0.5 rounded-full "><Star strokeWidth={1.5} size={10} fill="#FCC600"color="#FCC600"/> {ep.vote_average.toFixed(1)}</span>

                    </>
                   
                    
                  ) : (
                    <div className="h-20 w-32 shrink-0 rounded-2xl bg-surface sm:h-24 sm:w-40" />
                  )}

                  <div className="min-w-0">
                    <p className="turncate text-sm font-semibold">
                      {ep.episode_number}. {ep.name}
                    </p>
                    <p className="text-xs text-white/50">
                      {ep.air_date} • {ep.runtime} min
                    </p>
                    <p className="mt-1 text-xs line-clamp-2 text-white/50">
                      {ep.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

       {data.similar?.results.length > 0 && (
          <div className="mt-6">
            <MediaRow
              title="More like this"
              items={data.similar.results}
              type={type}
            />
          </div>
        )}
    </div>
  );
};

export default Details;
