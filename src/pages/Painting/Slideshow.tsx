import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

interface SlideshowProps {
  paintings: Painting[];
}

interface Painting {
  name: string;
  description: string;
  images: {
    hero: {
      small: string;
      large: string;
    };
  };
  artist: {
    name: string;
  };
}

const Slideshow: React.FC<SlideshowProps> = ({ paintings }) => {
  const { index } = useParams<{ index: string }>();
  const [currentIndex, setCurrentIndex] = useState<number>(parseInt(index));

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Container>
      <Carousel
        selectedItem={currentIndex}
        onChange={handleSlideChange}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
      >
        {paintings.map((painting, idx) => (
          <div key={painting.name}>
            <Slide>
              <Image src={painting.images.hero.large} alt={painting.name} />
              <Text>
                <Title>{painting.name}</Title>
                <Artist>{painting.artist.name}</Artist>
                <Description>{painting.description}</Description>
              </Text>
            </Slide>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const Text = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Artist = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Slideshow;
