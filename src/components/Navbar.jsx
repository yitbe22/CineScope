import { Clapperboard, Search, Menu, X } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const links = [
        { to: "/", label: "Home"},
        { to: "/movies", label: "Movies"},
        { to: "/Series", label: "Series"},
    ]


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');
    const { pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
       setOpen(false)
      }, [pathname]);
   
    const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition hover:text-white ${
      isActive ? "bg-white/10 text-white" : "text-white/60"
    }`
    const mobileLinkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-white ${
      isActive ? "bg-white/10 text-white" : "text-white/60"
    }`

    const submit = (e) => {
         e.preventDefault();
         const term = q.trim();
         if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
    }



    const searchForm = ( extra = "", size = "py-1.5") => (
        <form onSubmit={submit} role="search" className={extra}>
              <div className={`flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 ${size} focus-within:bg-white/20`}>
                    <Search strokeWidth={1.75} size={16} className="text-white/40"/>
                    <input 
                       value={q}
                       onChange={(e) => setQ(e.target.value)}
                       type="text" 
                       placeholder="Search..." 
                       aria-label="Search movies and series"
                       className="w-32 outline-none text-sm bg-transparent placeholder:text-white/40 lg:w-44 " />
                     </div>
                </form>
    )

  return (
    <>
     <header className="fixed inset-x-0 top-3 z-100 flex justify-center px-3 sm:top-4 sm:px-4 ">
        <div className="mx-auto w-full max-w-5xl">
              <nav className="glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6 transition-colors ">
            <NavLink className="flex gap-2 items-center text-lg font-extrabold tracking-tight" href="">
                 <Clapperboard strokeWidth={1.75} className="text-accent"/>
                 <span>CineScope</span>
            </NavLink>
            
            <div className="hidden items-center gap-1 md:flex">
                {
                    links.map((l) => (
                        <NavLink key={l.to} to={l.to} className={linkClass}>
                            {l.label}
                        </NavLink>
                    ))
                }
            </div>

            <div className="flex items-center gap-2">
               {searchForm("hidden md:block")}
               <button
                   type="button"
                   onClick={() => setOpen((o) => !o)}
                   className="rounded-full bg-white/20 p-2 md:hidden"
                
                 >
                    {open ? <X strokeWidth={1.75} size={18} /> : <Menu strokeWidth={1.75} size={18} />}
               </button>
            </div>
            
        </nav>
        {open && (
                <div className="glass inset-x-0 top-full flex flex-col gap-1 rounded-3xl mt-2 px-6 py-4 md:hidden">
                    {searchForm("mb-3", "py-2.5")}
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to}
                         className={mobileLinkClass} >
                            {l.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
       
     </header>
     </>
  )
}

export default Navbar