import { useState } from "react";
import Container from "../../../components/Container";
import PopupVideo from "../../../components/PopupVideo";
import Image from "../../../components/lazyLoadImg/Image";
import { playIcon } from "../../../assets/icons";

const VideosSection = ({ videos }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const openVideo = (video) => {
    setShowVideo(true);
    setVideoId(video.key);
  };

  const renderVideos = videos?.map((video) => (
    <div key={video.id} className="relative shrink-0">
      <figure
        onClick={() => openVideo(video)}
        className="relative w-40 overflow-hidden rounded-md aspect-video"
      >
        <Image src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />

        <div className="absolute inset-0 grid cursor-pointer place-items-center bg-black/20 hover:bg-black/30">
          <img src={playIcon} width={32} height={32} alt="play icon" />
        </div>
      </figure>

      <div className="mt-2 text-xs text-gray-400 max-w-[22ch] break-words h-8 overflow-hidden">
        {video.name}
      </div>
    </div>
  ));

  const closeVideo = () => {
    setShowVideo(false);
    setVideoId(null);
  };

  if (!(videos?.length > 0)) {
    return "";
  }

  return (
    <section className="bg-dark-color">
      <Container className={"p-6 pt-0 text-gray-200"}>
        <div>Official Videos</div>

        <div className="flex gap-4 pb-4 mt-4 overflow-y-hidden">
          {renderVideos}
        </div>

        {showVideo && (
          <PopupVideo videoId={videoId} open={showVideo} onClose={closeVideo} />
        )}
      </Container>
    </section>
  );
};
export default VideosSection;
