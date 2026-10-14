
export const CardSkeleton = ({className=''}) => {
  return (
    <div className={className}>
        <div className="aspect-2/3 animate-pulse rounded-2xl bg-white/10" />
        <div className="mt-2 w-3/4 h-3 animate-pulse rounded bg-white/10" />
        <div className="mt-1.5 h-2.5 w-1/2 animate-pulse rounded bg-white/10" />
    </div>
  )
}

export function ErrorBox({message, onRetry}){
    return (
        <div className="mx-auto max-w-md my-16 rounded-2xl glass p-6 text-center z-1">
            <p className="mb-1 font-semibold">Something Went Wrong</p>
            <p className="mb-4 text-sm text-white/60">{message || 'Could not load data'}
            </p>
           {onRetry && (<button
              onClick={onRetry}
              className="rounded-full bg-accent text-sm font-semibold px-3 py-2 cursor-pointer">Try again</button>)}
        </div>
    )
}

