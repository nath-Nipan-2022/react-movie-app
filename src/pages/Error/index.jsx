// import { GoArrowLeft } from "react-icons/go";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="grid h-screen pb-10 bg-[#ffc7c3] text-amber-700 place-items-center"
    >
      <div className="max-w-[260px] p-4">
        <h1 className="mb-4">
          <div className="font-semibold">Oops!</div>
          <div className="font-semibold tracking-wide text-9xl">404</div>
          <div className="text-3xl">
            Something went <span className="font-bold">WRONG!</span>
          </div>
        </h1>

        <div className="mt-6">
          <Link
            to={"/"}
            className="px-6 py-2 text-sm font-semibold transition duration-300 bg-white rounded-full shadow-lg text-amber-800 hover:text-white hover:bg-black"
          >
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
