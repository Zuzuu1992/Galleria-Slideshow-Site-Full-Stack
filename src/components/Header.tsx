import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

interface HeaderProps {
  slideshowRunning: boolean;
  setSlideshowRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ slideshowRunning, setSlideshowRunning }: HeaderProps) {
  const handleClick = () => {
    setSlideshowRunning(!slideshowRunning);
  };
  return (
    <Div>
      <Img src={Logo} />
      <CustomLink
        to={slideshowRunning ? "/" : "/slideshow/0"}
        onClick={handleClick}
      >
        <P>{slideshowRunning ? "Stop Slideshow" : "Start Slideshow"}</P>
      </CustomLink>
    </Div>
  );
}

export default Header;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px;
`;

const Img = styled.img`
  height: 32px;
`;

const P = styled.p`
  color: #7d7d7d;
  text-align: right;
  font-family: Libre Baskerville;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 12px;
    letter-spacing: 2.571px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;
