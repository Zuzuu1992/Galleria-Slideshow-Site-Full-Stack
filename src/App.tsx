import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home/Home"));

function App() {
  return (
    <Main>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading..."}>
              <Home />
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
