import { useEffect } from "react";
import ReactPlayer from "react-player";
import closeIcon from "../assets/icons/close.svg";

const PopupVideo = ({ videoId, open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-full z-20`}>
      <div
        className={`absolute w-80 sm:w-[420px] aspect-video left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2`}
      >
        <div
          className={`relative w-80 sm:w-[440px] rounded-xl overflow-hidden aspect-video bg-gray-600 popup-video`}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
          />

          {/*  close by button*/}
          <div
            onClick={onClose}
            className="absolute right-0 grid w-8 h-8 -translate-y-full bg-red-600 rounded-full cursor-pointer -top-3 place-items-center group opacity-70 hover:opacity-100"
          >
            <img
              src={closeIcon}
              alt="close icon"
              width={20}
              title="close icon"
            />
          </div>
        </div>
      </div>

      {/* close by background */}
      <div
        onClick={onClose}
        className={`absolute -z-10 inset-0 bg-black/50`}
      ></div>
    </div>
  );
};
export default PopupVideo;
