import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { Painting } from "../../types";

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

  return (
    <Container>
      <CarouselWrapper style={{ width: "100%", margin: "0 auto" }}>
        <CustomCarousel
          selectedItem={currentIndex}
          onChange={handleSlideChange}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
        >
          {paintings.map((painting, idx) => (
            <div key={painting.name}>
              <Slide>
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
        <SlideIndicator percent={slidePercentage} />
      </CarouselWrapper>
    </Container>
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
  .carousel .slide img {
    width: 64px;
    height: 64px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* background-color: black; */
  padding: 24px;
  width: 100%;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  width: 100%;
  /* background-color: red; */
`;

const SlideIndicator = styled.div<SlideIndicatorProps>`
  position: absolute;
  bottom: -30%;
  left: 0;
  height: 4px;
  width: ${(props) => (props.percent || 0) + "%"};
  background-color: #000;
  transition: width 0.3s ease-in-out;
`;

const Image = styled.img`
  /* width: 100%; */
`;

const Text = styled.div`
  /* position: absolute; */
  /* bottom: 70px;
  left: 0px; */
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
  /* width: 64px;
  height: 64px; */
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

export default Slideshow;
