import { getTrending } from "../api/tmdb"
import Hero from "../components/Hero"
import MediaRow from "../components/MediaRow";
import useFetch from "../Hooks/useFetch"

const Home = () => {
   
  const trending = useFetch(getTrending, []);
  //const popularMovies = useFetch(getList('movie', 'popular'), [] );
  //const nowPlaying = useFetch(getList('movie', 'now_playing'), [] );
  //const topMovies = useFetch(getList('movie', 'topRated'), [] );
  //const popularSeries = useFetch(getList('tv', 'popular'), [] );
 // const topSeries = useFetch(getList('tv', 'top_rated'), [] );
 // const airing = useFetch(getList('tv', 'on_the_air'), [] );

  if(trending.error){
     return <div>
          error
     </div>
  }


  return (
    <div>
      <Hero items={trending.data?.results} loading={trending.loading} />
      <MediaRow />
    </div>
  )
}

export default Home