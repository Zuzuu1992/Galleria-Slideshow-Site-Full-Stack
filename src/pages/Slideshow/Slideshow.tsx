import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { Painting } from "../../types";
import BackButton from "../../assets/icon-back-button.svg";
import NextButton from "../../assets/icon-next-button.svg";

interface SlideIndicatorProps {
  percent: number;
}

interface SlideshowProps {
  paintings: Painting[];
  setPaintings: React.Dispatch<React.SetStateAction<Painting[]>>;
}

const Slideshow: React.FC<SlideshowProps> = ({ paintings, setPaintings }) => {
  const { index } = useParams<{ index: string | undefined }>();
  const [currentIndex, setCurrentIndex] = useState<number>(
    parseInt(index || "0")
  );

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const totalSlides = paintings.length;
  const currentSlide = currentIndex + 1; // Adding 1 because indices are 0-based

  const slidePercentage = (currentSlide / totalSlides) * 100;

  const currentPainting = paintings[currentIndex];

  return (
    <>
      <Container className="1">
        <CarouselWrapper
          style={{ width: "100%", margin: "0 auto" }}
          className="2"
        >
          <CustomCarousel
            className="3"
            selectedItem={currentIndex}
            onChange={handleSlideChange}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
          >
            {paintings.map((painting, idx) => (
              <div key={painting.name} className="4">
                <Slide className="5">
                  <Image
                    src={
                      "https://galleria-arzk.onrender.com" +
                      painting.images.hero.small
                    }
                  />
                  <Text>
                    <Title>{painting.name}</Title>
                    <Artist>{painting.artist.name}</Artist>
                    <ArtistImage
                      src={
                        "https://galleria-arzk.onrender.com" +
                        painting.artist.image
                      }
                    />
                    <Year> {painting.year}</Year>
                    <Description>{painting.description}</Description>
                  </Text>
                </Slide>
              </div>
            ))}
          </CustomCarousel>
        </CarouselWrapper>
      </Container>
      <LineWrapper>
        <Line></Line>
        <SlideIndicator percent={slidePercentage} />
      </LineWrapper>
      <Footer>
        {currentPainting && (
          <FooterText>
            <FooterTitle>{currentPainting.name}</FooterTitle>
            <FooterArtist>{currentPainting.artist.name}</FooterArtist>
          </FooterText>
        )}
        <SlideArrows>
          <img src={BackButton} />
          <img src={NextButton} />
        </SlideArrows>
      </Footer>
    </>
  );
};

const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CustomCarousel = styled(Carousel)`
  .carousel .control-dots {
    display: none;
  }
  && .carousel .control-arrow {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
  /* background-color: black; */
  padding: 24px;
  width: 100%;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  position: relative;
  width: 100%;
  /* background-color: red; */
`;

const SlideIndicator = styled.div<SlideIndicatorProps>`
  position: absolute;
  bottom: 100%;
  left: 0;
  height: 4px;
  width: ${(props) => (props.percent || 0) + "%"};
  background-color: #000;
  transition: width 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
`;

const Text = styled.div`
  color: white;
`;

const Title = styled.h2`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
`;

const Artist = styled.p`
  color: #7d7d7d;
  font-family: Libre Baskerville;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ArtistImage = styled.img`
  width: 64px !important;
  height: 64px !important;
`;

const Year = styled.h1`
  color: #f3f3f3;
  text-align: right;
  font-family: Libre Baskerville;
  font-size: 100px;
  font-style: normal;
  font-weight: 700;
  line-height: 100px;
`;

const Description = styled.p`
  color: #7d7d7d;
  font-family: Libre Baskerville;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 10%;
  padding: 17px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LineWrapper = styled.div`
  position: relative;
`;

const Line = styled.div`
  background-color: #e5e5e5;
  height: 1px;
  width: 100%;
  /* position: relative; */
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const FooterTitle = styled.h2`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const FooterArtist = styled.p`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.7528279423713684;
`;

const SlideArrows = styled.div`
  display: flex;
  gap: 24px;
`;

export default Slideshow;
