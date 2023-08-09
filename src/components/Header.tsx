import styled from "styled-components";
// import Logo from "../assets/shared/logo.svg";

function Header() {
  return (
    <Div>
      <Img src={"../assets/shared/logo.svg"} />
      <P>start slideshow</P>
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
