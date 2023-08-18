import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Painting } from "../../types";

interface HomeProps {
  paintings: Painting[];
  setPaintings: React.Dispatch<React.SetStateAction<Painting[]>>;
}

const Home: React.FC<HomeProps> = ({ paintings, setPaintings }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL;

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldRenderGallery = screenWidth < 1440;

  useEffect(() => {
    async function getPaintings() {
      try {
        const response = await axios.get(apiUrl + "/api/paintings");
        const data = response.data;
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    }

    getPaintings();
  }, []);

  // Function to split paintings into groups of specified size
  const chunkedPaintings = (arr: Painting[], chunkSize: number) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunked.push(arr.slice(i, i + chunkSize));
    }
    return chunked;
  };

  const paintingsChunks = chunkedPaintings(paintings, 7);
  const [firstChunk, secondChunk] = paintingsChunks;

  const largeScreenChunks = chunkedPaintings(paintings, 4);
  const [chunk1, chunk2, chunk3, chunk4] = largeScreenChunks;

  return (
    <>
      <Line></Line>
      {shouldRenderGallery && (
        <Gallery className="paintings-container">
          <Piece1>
            {Array.isArray(firstChunk) &&
              firstChunk.map((painting) => (
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
              ))}
          </Piece1>
          <Piece2>
            {Array.isArray(secondChunk) &&
              secondChunk.map((painting) => (
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
              ))}
          </Piece2>
        </Gallery>
      )}

      {!shouldRenderGallery && (
        <Gallery className="paintings-container">
          <Piece1>
            {Array.isArray(chunk1) &&
              chunk1.map((painting) => (
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
              ))}
          </Piece1>
          <Piece2>
            {Array.isArray(chunk2) &&
              chunk2.map((painting) => (
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
              ))}
          </Piece2>
          <Piece3>
            {Array.isArray(chunk3) &&
              chunk3.map((painting) => (
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
              ))}
          </Piece3>
          <Piece4>
            {Array.isArray(chunk4) &&
              chunk4.map((painting) => (
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
              ))}
          </Piece4>
        </Gallery>
      )}
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
  /* justify-items: center; */
  row-gap: 24px;
  padding: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 40px;
    padding: 40px;
    align-items: start;
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
  }
`;

const PaintingSection = styled.div`
  /* position: relative;
  width: 100%; */

  display: grid;
  height: fit-content;
  cursor: pointer;
  transition: all 0.3s ease-in;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: grid;

  @media (min-width: 768px) {
  }
`;

const Image = styled.img`
  /* width: 100%; */

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
  background-color: rgba(0, 0, 0, 0.463);

  @media (min-width: 768px) {
  }
`;

const Text = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  padding-right: 44px; */
  /* 
  grid-column: 1/2;
  grid-row: 1/2; */

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
  /* color: yellow; */
  font-family: Libre Baskerville;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
`;

const Artist = styled.p`
  color: #fff;
  /* color: yellow; */
  font-family: Libre Baskerville;
  font-size: 13px;
  font-weight: 400;
  line-height: normal;
  opacity: 0.7528279423713684;
  margin-top: 7px;
`;

const Piece1 = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
  row-gap: 24px;
  @media (min-width: 768px) {
    row-gap: 40px;
  }
`;
const Piece2 = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
  row-gap: 24px;
  @media (min-width: 768px) {
    row-gap: 40px;
  }
`;
const Piece3 = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
  row-gap: 24px;
  @media (min-width: 768px) {
    row-gap: 40px;
  }
`;
const Piece4 = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
  row-gap: 24px;
  @media (min-width: 768px) {
    row-gap: 40px;
  }
`;
