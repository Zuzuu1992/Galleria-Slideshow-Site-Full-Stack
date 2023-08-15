import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { Painting } from "../../types";
import Back from "../../svg/Back";
import Next from "../../svg/Next";
import ViewImage from "../../svg/ViewImage";

interface SlideIndicatorProps {
  percent: number;
}

interface SlideshowProps {
  paintings: Painting[];
  setPaintings: React.Dispatch<React.SetStateAction<Painting[]>>;
  enlargedImageVisible: boolean;
  setEnlargedImageVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Slideshow: React.FC<SlideshowProps> = ({
  paintings,
  setPaintings,
  enlargedImageVisible,
  setEnlargedImageVisible,
}) => {
  const { index } = useParams<{ index: string | undefined }>();
  const [currentIndex, setCurrentIndex] = useState<number>(
    parseInt(index || "0")
  );

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleEnlargedImage = () => {
    setEnlargedImageVisible(!enlargedImageVisible);
  };

  const totalSlides = paintings.length;
  const currentSlide = currentIndex + 1; // Adding 1 because indices are 0-based

  const slidePercentage = (currentSlide / totalSlides) * 100;

  const currentPainting = paintings[currentIndex];

  return (
    <>
      <Line></Line>
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
                  <ImageSet>
                    <Image
                      src={
                        "https://galleria-arzk.onrender.com" +
                        painting.images.hero.small
                      }
                    />
                    {/* <Text> */}
                    <Enlarge onClick={toggleEnlargedImage}>
                      <ViewImage />
                      <ViewText>View Image</ViewText>
                    </Enlarge>
                    <WhiteBack>
                      <Title>{painting.name}</Title>
                      <Artist>{painting.artist.name}</Artist>
                    </WhiteBack>
                  </ImageSet>
                  <ArtistImage
                    src={
                      "https://galleria-arzk.onrender.com" +
                      painting.artist.image
                    }
                  />
                  <Year> {painting.year}</Year>
                  <Description>{painting.description}</Description>
                  {/* </Text> */}
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
      {enlargedImageVisible && (
        <EnlargedImageOverlay>
          <Close onClick={toggleEnlargedImage}>close</Close>
          <EnlargedImage
            src={`https://galleria-arzk.onrender.com${paintings[currentIndex].images.hero.small}`}
          />
        </EnlargedImageOverlay>
      )}
      <Footer>
        {currentPainting && (
          <FooterText>
            <FooterTitle>{currentPainting.name}</FooterTitle>
            <FooterArtist>{currentPainting.artist.name}</FooterArtist>
          </FooterText>
        )}
        <SlideArrows>
          <Arrow1>
            <Back />
          </Arrow1>
          <Arrow2>
            <Next />
          </Arrow2>
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
  /* align-items: center;
  justify-content: center; */
  /* min-height: 100vh; */
  /* background-color: black; */
  padding: 24px;
  width: 100%;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
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

const ImageSet = styled.div`
  position: relative;
`;

const Enlarge = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 16px;
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.745);
  cursor: pointer;
`;

const ViewText = styled.p`
  color: #fff;
  text-align: right;
  font-family: Libre Baskerville;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.143px;
  text-transform: uppercase;
`;

// const Text = styled.div`
//   color: white;
// `;
const WhiteBack = styled.div`
  background-color: white;
  position: absolute;
  bottom: -18%;
  left: 0px;
  padding: 24px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
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
  margin-top: 50px;
  margin-left: 16px;
`;

const Year = styled.h1`
  color: #f3f3f3;
  text-align: right;
  font-family: Libre Baskerville;
  font-size: 100px;
  font-style: normal;
  font-weight: 700;
  line-height: 100px;
  margin-top: -20px;
`;

const Description = styled.p`
  color: #7d7d7d;
  font-family: Libre Baskerville;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  text-align: left;
  margin-top: -25px;
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

const Arrow1 = styled.div`
  width: 20px;
`;

const Arrow2 = styled.div`
  width: 20px;
`;

const EnlargedImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: 33px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 24px;
`;

const Close = styled.p`
  color: #fff;
  text-align: right;
  font-family: Libre Baskerville;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 3px;
  text-transform: uppercase;
  align-self: flex-end;
`;

const EnlargedImage = styled.img`
  max-width: 100%;
  max-height: 80%;
  /* padding: 24px; */
  /* width: 327px; */
`;

export default Slideshow;
