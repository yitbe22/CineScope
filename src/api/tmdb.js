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

export const getList = (type, list, page=1) => {
    request(`/${type}/${list}?page=${page}`)
}

console.log(getTrending());