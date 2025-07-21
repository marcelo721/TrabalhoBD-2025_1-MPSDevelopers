export function CardSkeleton() {
  return (
    <div className="bg-accent/20 border-border group h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors">
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full animate-pulse items-center justify-center transition-colors">
        <div className="bg-accent size-6 animate-pulse rounded-full"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 py-4">
        <div className="bg-foreground/10 h-4 w-12 animate-pulse rounded-full text-xs"></div>
        <div className="bg-foreground/10 h-5 w-24 animate-pulse rounded-full text-base first-letter:uppercase"></div>
      </div>
    </div>
  )
}
