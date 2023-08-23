import styled from "styled-components";
import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import { Painting } from "./types";
import axios from "axios";

const Home = lazy(() => import("./pages/Home/Home"));
const Slideshow = lazy(() => import("./pages/Slideshow/Slideshow"));

function App() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [slideshowRunning, setSlideshowRunning] = useState(false);
  const [enlargedImageVisible, setEnlargedImageVisible] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL;

  useEffect(() => {
    async function getPaintings() {
      try {
        const response = await axios.get(apiUrl + "/api/paintings");
        const data = response.data;
        data.sort((a: Painting, b: Painting) => a._id.localeCompare(b._id));
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    }

    getPaintings();
  }, []);

  return (
    <Main>
      <Header
        slideshowRunning={slideshowRunning}
        setSlideshowRunning={setSlideshowRunning}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading..."}>
              <Home
                paintings={paintings}
                setSlideshowRunning={setSlideshowRunning}
              />
            </Suspense>
          }
        />
        <Route
          path="/slideshow/:index"
          element={
            <Suspense fallback={"Loading..."}>
              <Slideshow
                paintings={paintings}
                setPaintings={setPaintings}
                enlargedImageVisible={enlargedImageVisible}
                setEnlargedImageVisible={setEnlargedImageVisible}
              />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Main>
  );
}

export default App;

const Main = styled.main`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;
