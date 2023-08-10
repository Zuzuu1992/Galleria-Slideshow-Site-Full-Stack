import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Header() {
  return (
    <Div>
      <Img src={Logo} />
      <Link to="/slideshow/0">
        <P>start slideshow</P>
      </Link>
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
`;
