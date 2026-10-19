import { img, titleOf, yearOf} from "../api/tmdb";
import { Link } from "react-router-dom";
import { Star, Info } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = ({items, loading}) => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const list = (items || []).filter((x) => x.backdrop_path).splice(0,5);

   useEffect(() => {
      const interval = setInterval(() => {
           setCurrentIndex((prev) => (prev+1) % list.length)
      }, 5000);

      return () => clearInterval(interval);

   })

   

   if (loading || !list.length) {
      return <div className="h-[70vh] animate-pulse bg-white/5 md:h-[85vh]" />
   }

   const currentList = list[currentIndex];

  return (
     <section className="relative h-[75vh] min-h-120 w-full overflow-hidden md:h-[88vh]">
        <img 
           id=""
           src={img(currentList.backdrop_path, 'original')}
           className="absolute inset-0 size-full object-cover transition-opacity"
           />

         <div className="relative mx-auto h-full flex flex-col justify-end px-4 pb-12 sm:px-8 sm:pb-16 z-50">
               <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                     <span className="glass rounded-full font-semibold text-xs uppercase px-3 py-1 tracking-wide">{currentList.media_type}</span>
                     <span className="flex items-center gap-1 font-semibold"><Star strokeWidth={1.5} size={14} fill="#FCC600"
  color="#FCC600"/> {currentList.vote_average.toFixed(1)}</span>
                     <span className="text-white/60 ">{yearOf(currentList)}</span>
                  </div>
                  <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                     {titleOf(currentList)}
                  </h1>
                  <p className="text-sm sm:text-base text-white/75 line-clamp-3 mt-4">{currentList.overview}</p>
                  <Link to={`/${currentList.media_type}/${currentList.id}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm text-black font-bold transition hover:bg-white/85"><Info 
                  strokeWidth={1.5}/>View details</Link>
               </div>

                    <div className="mt-8 flex gap-2">
              {list.map((list, index) => (
                  <button
                     key={index}
                     onClick={() => setCurrentIndex(index)}
                     className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === index
                           ? "w-8 bg-white"
                           : "w-3 bg-white/40"
                     }`}
                   />
               ))}
                   </div>
         </div>

        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/30 to-transparent" />


     </section>

  )

}
export default Hero