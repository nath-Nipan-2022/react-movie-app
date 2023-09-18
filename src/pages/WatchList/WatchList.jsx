import { useSelector } from "react-redux";
import Container from "../../components/Container";
import MovieCard from "../../components/MovieCard";

const WatchList = () => {
  const watchList = useSelector((state) => state.watchList);

  const renderCards = watchList.map((item) => {
    return (
      <MovieCard
        key={item.id}
        movie={item}
        endpoint={item.endpoint || item.media_type}
        className="shrink-0 bg-skeleton aspect-[1/1.35]"
      />
    );
  });

  return (
    <main>
      <section className="pb-12">
        <Container>
          <h2 className="pb-2 mb-8 text-xl font-medium border-b border-skeleton">
            Your <span className="font-bold text-orange-400">Watchlist</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6 lg:gap-4 lg:grid-cols-5">
            {renderCards}
          </div>
          {watchList?.length <= 0 && (
            <div className="w-48 p-4 mx-auto leading-normal text-gray-200 rounded-md bg-skeleton">
              You have no movies or tv shows in your watchlist
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};
export default WatchList;
