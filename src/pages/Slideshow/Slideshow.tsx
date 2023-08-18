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
    <Wrapper>
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
                      <picture>
                        <source
                          srcSet={apiUrl + painting.images.hero.large}
                          media="(min-width: 768px)"
                        />
                        <Image
                          src={apiUrl + painting.images.hero.small}
                          alt={painting.name}
                        />
                      </picture>
                      <Enlarge onClick={toggleEnlargedImage}>
                        <ViewImage />
                        <ViewText>View Image</ViewText>
                      </Enlarge>
                    </ImageSet>
                    <WhiteBack>
                      <Title>{painting.name}</Title>
                      <Artist>{painting.artist.name}</Artist>
                    </WhiteBack>

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
            src={`${apiUrl}${paintings[currentIndex].images.gallery}`}
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  @media (min-width: 768px) {
    padding: 40px;
  }
  @media (min-width: 1440px) {
    padding-top: 100px;
    padding-bottom: 75px;
  }
`;

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
  && .carousel .slide img {
    height: auto;
  }
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  @media (min-width: 768px) {
  }
  @media (min-width: 1440px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
  }
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
  @media (min-width: 768px) {
    height: 560px;
  }
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto repeat(2, minmax(3.5rem, 4.2rem)) auto;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 17.6rem auto;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 60% 10% 60%;
    grid-template-rows: none;
  }
`;

const ImageSet = styled.div`
  position: relative;
  grid-row: 1/3;
  grid-column: 1/2;
  position: relative;
  display: flex;
  @media (min-width: 768px) {
    grid-column: 1/3;
    grid-row: 1/3;
  }
  @media (min-width: 1440px) {
    grid-column: 1/3;
    grid-row: 1/2;
  }
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
  @media (min-width: 768px) {
    top: auto;
    bottom: 16px;
  }
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
  position: relative;
  background-color: var(--white);
  grid-row: 2/4;
  grid-column: 1/2;
  max-width: 90%;
  padding: 24px;
  text-align: left;
  @media (min-width: 768px) {
    grid-column: 2/4;
    grid-row: 1/2;
    padding: initial;
    padding-left: 65px;
    padding-bottom: 65px;
    max-width: none;
    width: 95%;
    margin-top: -1px;
  }
  @media (min-width: 1440px) {
    height: fit-content;
  }
`;

const Title = styled.h2`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
  margin-bottom: 8px;
  @media (min-width: 768px) {
    font-size: 56px;
    line-height: 64px;
    margin-bottom: 24px;
  }
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
  position: relative;
  width: 64px !important;
  height: 64px !important;
  position: relative;
  margin-left: 16px;
  @media (min-width: 768px) {
    width: 128px !important;
    height: 128px !important;
    margin-left: 46px;
    grid-column: 3/4;
    justify-self: start;
  }
  @media (min-width: 1440px) {
    /* grid-row: 1/2; */
    align-self: end;
    justify-self: auto;
    /* transform: translate(0%, 40%); */
    z-index: 1001;
    margin-top: -80px !important;
  }
`;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  @media (min-width: 768px) {
    margin-top: 60px;
    align-items: flex-start;
  }
  @media (min-width: 1440px) {
    margin-top: 0px;
  }
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
  @media (min-width: 768px) {
    font-size: 200px;
    line-height: 150px;
    margin-top: 0px;
  }
  @media (min-width: 1440px) {
    align-self: flex-end;
    line-height: 180px;
  }
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
  @media (min-width: 768px) {
    width: 84%;
    padding-left: 115px;
    margin-top: -75px;
  }
  @media (min-width: 1440px) {
    padding-left: 180px;
    margin-top: -50px;
  }
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
  @media (min-width: 768px) {
    padding-left: 115px;
  }
  @media (min-width: 1440px) {
    padding-left: 180px;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 10%;
  padding: 48px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    padding: 56px 40px;
  }
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
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const FooterArtist = styled.p`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.7528279423713684;
  @media (min-width: 768px) {
    font-size: 13px;
  }
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
  @media (min-width: 768px) {
    padding: 40px;
  }
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
  @media (min-width: 768px) {
    max-height: 100%;
  }
`;

export default Slideshow;
