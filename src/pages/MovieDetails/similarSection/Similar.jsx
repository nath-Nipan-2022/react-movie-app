import { useParams } from "react-router-dom";
import List from "../../../components/MoviesList";
import Container from "../../../components/Container";
import { useGetMoviesQuery } from "../../../store/apis/moviesApi";

const Similar = () => {
  const { media_type, id } = useParams();

  const title = media_type === "tv" ? "Similar TV Shows" : "Similar Movies";

  const { data, isFetching, error } = useGetMoviesQuery(
    `/${media_type}/${id}/similar`
  );

  if (!data?.results?.length > 0) {
    return "";
  }

  return (
    <section className="relative z-0">
      <Container className="px-6">
        <article className="flex items-center justify-between mb-4">
          <div>{title || ""}</div>
        </article>
        <List data={data} isLoading={isFetching} endpoint={media_type} />
      </Container>
    </section>
  );
};

export default Similar;
