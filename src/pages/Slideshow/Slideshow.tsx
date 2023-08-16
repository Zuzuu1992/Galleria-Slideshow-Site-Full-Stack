import React, { useEffect, useState } from "react";
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
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL;

  useEffect(() => {
    if (paintings[currentIndex]?.source) {
      setSourceUrl(paintings[currentIndex]?.source);
    } else {
      setSourceUrl(null);
    }
  }, [currentIndex, paintings]);

  useEffect(() => {}, [currentIndex]);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleEnlargedImage = () => {
    setEnlargedImageVisible(!enlargedImageVisible);
  };

  const totalSlides = paintings.length;
  const currentSlide = currentIndex + 1;

  const slidePercentage = (currentSlide / totalSlides) * 100;

  const currentPainting = paintings[currentIndex];

  const handleBackClick = () => {
    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
  };

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
                  <Intro>
                    <ImageSet>
                      <Image src={apiUrl + painting.images.hero.small} />
                      <Enlarge onClick={toggleEnlargedImage}>
                        <ViewImage />
                        <ViewText>View Image</ViewText>
                      </Enlarge>
                      <WhiteBack>
                        <Title>{painting.name}</Title>
                        <Artist>{painting.artist.name}</Artist>
                      </WhiteBack>
                    </ImageSet>
                    <ArtistImage src={apiUrl + painting.artist.image} />
                  </Intro>
                  <TextSection>
                    <Year> {painting.year}</Year>
                    <Description>{painting.description}</Description>
                    {sourceUrl && (
                      <SourceLink href={sourceUrl} target="_blank">
                        GO TO SOURCE
                      </SourceLink>
                    )}
                  </TextSection>
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
            src={`apiUrl${paintings[currentIndex].images.gallery}`}
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
          <Back
            onClick={handleBackClick}
            fill={currentIndex === 0 ? "#d8d8d8" : "#000000"}
          />
          <Next
            onClick={handleNextClick}
            fill={currentIndex === totalSlides - 1 ? "#d8d8d8" : "#000000"}
          />
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
  padding: 24px;
  width: 100%;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const SlideIndicator = styled.div<SlideIndicatorProps>`
  position: absolute;
  bottom: 100%;
  left: 0;
  height: 2px;
  width: ${(props) => (props.percent || 0) + "%"};
  background-color: #000;
  transition: width 0.3s ease-in-out;
`;

const Image = styled.img`
  width: 100%;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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

const WhiteBack = styled.div`
  background-color: white;
  position: absolute;
  padding: 24px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  transform: translate(0%, -52%);
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

  margin-left: 16px;
`;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
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

const SourceLink = styled.a`
  color: #7d7d7d;
  font-family: Libre Baskerville;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
  text-decoration-line: underline;
  text-align: left;
  margin-top: 68px;
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
`;

export default Slideshow;
