import { useParams } from "react-router-dom";
import List from "../../../components/MoviesList";
import Container from "../../../components/Container";
import { useGetMoviesQuery } from "../../../store/apis/moviesApi";

const Recommended = () => {
  const { media_type, id } = useParams();
  const { data, isFetching, error } = useGetMoviesQuery(
    `/${media_type}/${id}/recommendations`
  );

  if (!data?.results?.length > 0) {
    return "";
  }

  return (
    <section className="relative pb-12">
      <Container className="px-6">
        <article className="flex items-center justify-between mb-4">
          <h2 className="py-2 font-medium">Recommended for you</h2>
        </article>
        <List data={data} isLoading={isFetching} endpoint={media_type} />
      </Container>
    </section>
  );
};

export default Recommended;
