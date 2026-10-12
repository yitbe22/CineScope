import { getTrending } from "../api/tmdb"
import Hero from "../components/Hero"
import useFetch from "../Hooks/useFetch"

const Home = () => {
   
  const trending = useFetch(getTrending, []);


  return (
    <div>
      <Hero items={trending.data?.results} loading={trending.loading} />
    </div>
  )
}

export default Home