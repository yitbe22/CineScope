const BASE = 'https://api.themoviedb.org/3';

async function request(path){
    const res = await fetch(`${BASE}${path}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: 'application/json',
        },
    });

    if(!res.ok) throw new Error(`TMBD error ${res.status}`)

    return res.json();
}

export const img = (path, size ='w500') => {
    return path? `https://image.tmdb.org/t/p/${size}/${path}`: null
}

export const getTrending = () => request('/trending/all/week');

export const getList = (type, list, page=1) => (
    request(`/${type}/${list}?page=${page}`)
)

export const getDetails = (type, id ) => 
    request(`/${type}/${id}?append_to_response=credits,videos,similar`)

export const titleOf = (i) => i.title || i.name || 'Untitled';
export const dateOf = (i) => i.first_air_date || i.release_date || '';
export const yearOf = (i) => dateOf(i).slice(0,4);

export const searchMulti = (q, page=1) => {
   return request(`/search/multi?query=${encodeURIComponent(q)}&pages=${page}`)}



