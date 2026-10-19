import MediaCard from "./MediaCard"
import { CardSkeleton } from "./skeleton"


export const MediaGrid = ({items, type, loading}) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
       {items.map((item) => (
          <MediaCard key={`${item.media_type || type}-${item.id}`} item={item} type={type} />
       ))}

       {loading && Array.from({length: 12}).map((_, i) => <CardSkeleton key={`s${i}`} /> )}
    </div>
  )
}
