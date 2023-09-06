const Skeletons = ({ times = 1, className = "" }) => {
  const skeletons = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <article
          key={i}
          className={`relative bg-skeleton overflow-hidden before:absolute before:bg-gradient-to-r before:from-transparent before:via-[hsl(232,25%,49%)] before:to-transparent before:-translate-x-full before:animate-shimmer before:w-full before:h-full before:top-0 before:left-0 ${className}`}
          style={{ animationDelay: `${i * 100}ms` }}
        ></article>
      );
    });
  return skeletons;
};

export default Skeletons;
