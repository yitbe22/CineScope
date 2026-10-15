import { getTrending, getList } from "../api/tmdb"
import Hero from "../components/Hero"
import MediaRow from "../components/MediaRow";
import { ErrorBox } from "../components/skeleton";
import useFetch from "../Hooks/useFetch"

const Home = () => {
   
  const trending = useFetch(getTrending, []);
  const popularMovies = useFetch(() => getList('movie', 'popular'), [] );
  const nowPlaying = useFetch(() => getList('movie', 'now_playing'), [] );
  const topMovies = useFetch(() => getList('movie', 'top_rated'), [] );
  const popularSeries = useFetch(() => getList('tv', 'popular'), [] );
  const topSeries = useFetch(() => getList('tv', 'top_rated'), [] );
  const airing = useFetch(() => getList('tv', 'on_the_air'), [] );

  if(trending.error){
     return <div className="pt-32">
          <ErrorBox message={trending.error.message} onRetry={trending.retry}/>
     </div>
  }


  return (
    <div>
      <Hero items={trending.data?.results} loading={trending.loading} />
      <div className="mt-10 relative z-10">
         <MediaRow title="Trending this week" items={trending.data?.results} loading={trending.loading}/>
         <MediaRow title="Popular movies" items={popularMovies.data?.results} type="movie" loading={popularMovies.loading}/>
         <MediaRow title="Now in Cinemas" items={ nowPlaying.data?.results} type="movie" loading={nowPlaying.loading}/>
         <MediaRow title="Top rated movies" items={ topMovies.data?.results} type="movie" loading={topMovies.loading}/>
         <MediaRow title="Popular series" items={ popularSeries.data?.results} type="tv" loading={popularSeries.loading}/>
         <MediaRow title="Airing now" items={ airing.data?.results} type="tv" loading={airing.loading}/>
         <MediaRow title="Top rated series" items={ topSeries.data?.results} type="tv" loading={topSeries.loading}/>
      </div>
      
    </div>
  )
}

export default Home