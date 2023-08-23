import styled from "styled-components";
import React from "react";
import { Painting } from "../../types";
import { Link } from "react-router-dom";

interface HomeProps {
  paintings: Painting[];
  setSlideshowRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ paintings, setSlideshowRunning }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL;

  return (
    <>
      <Line></Line>

      <Gallery className="paintings-container">
        {paintings.map((painting, index) => (
          <CustomLink
            key={painting.name}
            to={`/slideshow/${index}`}
            onClick={() => setSlideshowRunning(true)}
          >
            <PaintingSection key={painting.name} className="painting">
              <ImageWrapper>
                <Image
                  src={apiUrl + painting.images.thumbnail}
                  alt={painting.name}
                />
                <Overlay></Overlay>
              </ImageWrapper>
              <Text>
                <Masterpiece>{painting.name}</Masterpiece>
                <Artist>{painting.artist.name}</Artist>
              </Text>
            </PaintingSection>
          </CustomLink>
        ))}
      </Gallery>
    </>
  );
};

export default Home;

const Line = styled.div`
  background-color: #e5e5e5;
  height: 1px;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 24px;
  padding: 24px;

  @media (min-width: 768px) {
    column-count: 2;
    display: inline-block;
    column-gap: 40px;
    width: 100%;
  }
  @media (min-width: 1440px) {
    column-count: 4;
    display: inline-block;
  }
`;

const PaintingSection = styled.div`
  display: grid;
  height: fit-content;
  cursor: pointer;
  transition: all 0.3s ease-in;
  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
  @media (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: grid;

  @media (min-width: 768px) {
    display: unset;
    overflow: visible;
  }
  @media (min-width: 1440px) {
    display: unset;
    overflow: visible;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  grid-column: 1/2;
  grid-row: 1/2;
  @media (min-width: 768px) {
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.396);
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.364);
  }
  @media (min-width: 768px) {
    height: 99%;
  }

  @media (min-width: 1440px) {
    height: 99%;
  }
`;

const Text = styled.div`
  margin-top: -113px;
  z-index: 5;
  align-self: end;
  padding: 0 46px 32px 32px;
  display: block;
  @media (min-width: 768px) {
  }
`;

const Masterpiece = styled.h2`
  color: #fff;
  font-family: Libre Baskerville;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
`;

const Artist = styled.p`
  color: #fff;
  font-family: Libre Baskerville;
  font-size: 13px;
  font-weight: 400;
  line-height: normal;
  opacity: 0.7528279423713684;
  margin-top: 7px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;
