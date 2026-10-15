import { useRef } from "react"
import MediaCard from "./MediaCard"
import {CardSkeleton} from "./skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"


const MediaRow = ({title, items, loading, type}) => {

  const rowRef = useRef();

  const scroll = (direction) => {
      const el = rowRef.current
      if(!el) return;

      el.scrollBy({
          left: direction * el.clientWidth * 0.8,
          behavior: "smooth",
      });

  }


  return (
    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-8">
       <div className="mb-3 flex items-center justify-between font-bold sm:text-2xl">
           <h2 className="text-xl">{title}</h2>
           <div className="flex gap-2">
                <button onClick={() => scroll(-1)} aria-label="Scroll left" className="glass rounded-full p-1 cursor-pointer"><ChevronLeft strokeWidth={1.5}  /></button>
                <button onClick={() => scroll(1)} aria-label="Scroll left" className="glass rounded-full p-1 cursor-pointer"><ChevronRight strokeWidth={1.5} /></button>
           </div>
       </div>
       <div ref={rowRef} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4">
           {loading? (
              Array.from({length: 8}).map((_, i) => (
                   <CardSkeleton key={i} className="w-32 shrink-0 snap-start sm:w-40 md:w-44"/>
              ))
           )
              :items?.map((it) => (
                
               <MediaCard 
                   key={it.id}
                   item={it}
                   type={type}
                   className="w-32 shrink-0 snap-start sm:w-40 md:w-44"
                  />
           ))}
       </div>
    </section>
  )
}

export default MediaRow