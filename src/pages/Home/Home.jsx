import { useDispatch } from "react-redux";
import { useGetConfigurationQuery } from "../../store/apis/moviesApi";
import { setImgUrls } from "../../store/slices/moviesSlice";
import MoviesList from "../../components/MoviesList";
import Container from "../../components/Container";
import HeroSection from "./HeroSection";

const Home = () => {
  const dispatch = useDispatch();

  const { data: urls, isSuccess } = useGetConfigurationQuery();
  isSuccess && dispatch(setImgUrls(urls));

  return (
    <Container className="min-h-screen">
      <main>
        <HeroSection />

        <section className="mt-6">
          <h2 className="mb-2 font-medium py-2">Popular Movies</h2>
          {isSuccess && <MoviesList moviesType={"popular"} />}
        </section>

        <section className="mt-6">
          <h2 className="py-2 mb-2 font-medium">Upcoming Movies</h2>
          {isSuccess && <MoviesList moviesType={"upcoming"} />}
        </section>

        <section className="mt-6">
          <h2 className="py-2 mb-2 font-medium">Featured</h2>
          {/* {isSuccess && <MoviesList moviesType={} />} */}
        </section>
      </main>
    </Container>
  );
};
export default Home;