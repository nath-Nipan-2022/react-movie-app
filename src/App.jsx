import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import ErrorPage from "./pages/Error";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { useGetConfigurationQuery } from "./store/apis/moviesApi";
import { setImgUrls } from "./store/slices/moviesSlice";
import SearchResults from "./pages/SearchResults/SearchResults";

const App = () => {
  const dispatch = useDispatch();
  const { data: urls, isSuccess } = useGetConfigurationQuery();

  useEffect(() => {
    isSuccess && dispatch(setImgUrls(urls));
  }, [dispatch, urls, isSuccess]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:media_type/:id",
          element: <MovieDetails />,
        },
        {
          path: "search/:query",
          element: <SearchResults />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
