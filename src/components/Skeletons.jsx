const Skeletons = ({ times = 1, className = "" }) => {
  const skeletons = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <article
          key={i}
          className={`bg-skeleton rounded-lg animate-pulse ${className}`}
          style={{ animationDelay: `${i * 100}ms` }}
        ></article>
      );
    });
  return skeletons;
};

export default Skeletons;
