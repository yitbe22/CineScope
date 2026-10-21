
const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white px-4 py-10 text-center text-sm text-white/50">
       <p className="mb-2 font-semibold text-white/80">CineScope</p>
       <p className="mx-auto max-w-xl">
          This product uses the TMDB API but is not endorsed or certified TMDB. CineScope is discovery-only learning project and does not hostor stream any content.
       </p>
       <p className="mt-1">Developed by Yitbarek</p>
       <a 
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-blobk text-accent hover:underline"
       
       >
        Data provided by The Movie Database (TMDB)
       </a>
    </footer>
  )
}

export default Footer