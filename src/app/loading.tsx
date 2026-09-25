export default function HomeLoading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className="container mx-auto px-4 py-10 sm:py-16">
      {/* Heading skeleton */}
      <div className="mb-8 sm:mb-10">
        <div className="h-8 w-56 animate-pulse rounded bg-base-300 sm:h-10 sm:w-72" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-base-300" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-base-300 bg-base-200"
          >
            {/* Image placeholder */}
            <div className="aspect-[4/3] w-full animate-pulse bg-base-300" />

            <div className="p-4">
              {/* Tags placeholder */}
              <div className="mb-3 flex gap-1.5">
                <div className="h-5 w-14 animate-pulse rounded-full bg-base-300" />
                <div className="h-5 w-14 animate-pulse rounded-full bg-base-300" />
              </div>

              {/* Title placeholder */}
              <div className="h-4 w-3/4 animate-pulse rounded bg-base-300" />
              {/* Equipment placeholder */}
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-base-300" />

              <div className="my-3 border-t border-base-300" />

              {/* Stats placeholder */}
              <div className="flex justify-between">
                <div className="h-3 w-10 animate-pulse rounded bg-base-300" />
                <div className="h-3 w-10 animate-pulse rounded bg-base-300" />
                <div className="h-3 w-10 animate-pulse rounded bg-base-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}