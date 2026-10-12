import { useState, useEffect } from "react";

export default function useFetch(fn , deps = []){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(()=> {
        fn()
           .then(setData)
           .catch(setError)
           .finally(()=> setLoading(false))

    }, deps)

    return {data ,loading, error}
}


