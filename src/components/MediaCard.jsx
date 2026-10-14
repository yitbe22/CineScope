import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { img, titleOf, yearOf } from "../api/tmdb";

const MediaCard = ({item, type ,className=''}) => {

   const t = type || item.media_type || 'movie';

  return (
      <Link className={`group block ${className}`}
          //to={`/${type}/${}`}
      >
         <div className="relative aspect-2/3 rounded-2xl bg-surface overflow-hidden">
            <img src={img(item?.poster_path, 'w342')} loading="lazy" alt="" className="size-full object-cover transition duration-500 group-hover:scale-105"/>
            <span className="glass flex gap-1 items-center text-xs font-semibold absolute top-2 left-2 px-2 py-0.5 rounded-full "><Star strokeWidth={1.5} size={12} fill="#FCC600"color="#FCC600"/> {item.vote_average.toFixed(1)}</span>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent opacity-0 transition group-hover:opacity-100"></div>
         </div>
         <h3 className="mt-3 text-sm font-semibold truncate">{titleOf(item)}</h3>
         <p className="text-xs text-white/50">
             {yearOf(item) || '-'} • {t === 'tv' ? 'Series': 'Movie'}
          </p>
      </Link>
    
    
  )
}

export default MediaCard