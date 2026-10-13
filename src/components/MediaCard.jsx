import { Link } from "react-router-dom"
import { Star } from "lucide-react"

const MediaCard = ({className=''}) => {
  return (
      <Link className={`group block ${className}  w-32 shrink-0 snap-start sm:w-40 md:w-44`}>
         <div className="relative aspect-2/3 rounded-2xl bg-surface overflow-hidden">
            <img src="https://image.tmdb.org/t/p/w342/wo9jwu5qMvXzhW2cyy5E6hOVs92.jpg" loading="lazy" alt="" className="size-full object-cover transition duration-500 group-hover:scale-105"/>
            <span className="glass flex gap-1 items-center text-xs font-semibold absolute top-2 left-2 px-2 py-0.5 rounded-full "><Star strokeWidth={1.5} size={12} fill="#FCC600"color="#FCC600"/> 8.5</span>
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent opacity-0 transition group-hover:opacity-100"></div>
         </div>
         <h3 className="mt-3 text-sm font-semibold truncate">Link Click</h3>
         <p className="text-xs text-white/50">2021 . Movie</p>
      </Link>
    
    
  )
}

export default MediaCard