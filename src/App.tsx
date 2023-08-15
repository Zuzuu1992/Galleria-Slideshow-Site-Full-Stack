import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { Painting } from "./types";

const Home = lazy(() => import("./pages/Home/Home"));
const Slideshow = lazy(() => import("./pages/Slideshow/Slideshow"));

function App() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [slideshowRunning, setSlideshowRunning] = useState(false);
  const [enlargedImageVisible, setEnlargedImageVisible] = useState(false);

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
              <Home paintings={paintings} setPaintings={setPaintings} />
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
