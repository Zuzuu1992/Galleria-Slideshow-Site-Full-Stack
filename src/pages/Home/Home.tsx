import styled from "styled-components";
import React, { useEffect } from "react";
import axios from "axios";
import { Painting } from "../../types";

// import Header from "../../components/Header";

interface HomeProps {
  paintings: Painting[];
  setPaintings: React.Dispatch<React.SetStateAction<Painting[]>>;
}

const Home: React.FC<HomeProps> = ({ paintings, setPaintings }) => {
  // const [paintings, setPaintings] = useState<Painting[]>([]);

  useEffect(() => {
    async function getPaintings() {
      try {
        const response = await axios.get(
          "https://galleria-arzk.onrender.com/api/paintings"
        );
        const data = response.data;
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    }

    getPaintings();
  }, []);

  return (
    <>
      {/* <Header></Header> */}
      <Line></Line>
      <Gallery className="paintings-container">
        {paintings.map((painting) => (
          <PaintingSection key={painting.name} className="painting">
            <ImageWrapper>
              <Image src={painting.images.thumbnail} alt={painting.name} />
              <Overlay></Overlay>
            </ImageWrapper>
            <Text>
              <Masterpiece>{painting.name}</Masterpiece>
              <Artist>{painting.artist.name}</Artist>
            </Text>
          </PaintingSection>
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
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: 24px;
  padding: 24px;
`;

const PaintingSection = styled.div`
  position: relative;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden; /* Hide any overflowing content */
`;

const Image = styled.img`
  /* position: relative; */
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.463);
`;

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  padding-right: 44px;
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
`;
