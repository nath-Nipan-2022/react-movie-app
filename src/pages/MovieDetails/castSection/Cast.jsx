import { useSelector } from "react-redux";
import avatar from "../../../assets/images/avatar.png";
import Image from "../../../components/lazyLoadImg/Image";
import Container from "../../../components/Container";

const Cast = ({ data }) => {
  const { urls } = useSelector((state) => state.ImagesUrls);
  const imageUrl = urls.images.secure_base_url;

  if (data.lenth <= 0) {
    return "";
  }

  return (
    <section className="bg-dark-color">
      <Container className={"p-8 text-gray-200"}>
        <div>Top Cast</div>
        <div className="flex gap-4 pb-4 my-4 overflow-y-hidden">
          {data.map((c) => (
            <div key={c.id} className="text-center shrink-0">
              <figure className="w-16 h-16 mx-auto overflow-hidden rounded-full">
                {c.profile_path ? (
                  <Image src={`${imageUrl}original${c.profile_path}`} />
                ) : (
                  <img src={avatar} />
                )}
              </figure>
              <div className="my-1 text-xs">{c.name}</div>
              <div className="text-[10px] text-gray-400/80">{c.character}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default Cast;
