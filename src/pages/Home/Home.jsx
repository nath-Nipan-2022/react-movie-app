import Container from "../../components/Container";
import HeroSection from "./HeroSection";
import Popular from "./popular/Popular";
import Trending from "./trending/Trending";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <main className="-mt-[64px]">
      <HeroSection />
      <Container>
        <Trending />
        <Popular />
        <TopRated />
      </Container>
    </main>
  );
};
export default Home;
