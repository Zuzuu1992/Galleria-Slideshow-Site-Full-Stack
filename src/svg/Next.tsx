import styled from "styled-components";

interface ArrowProps {
  onClick: () => void;
  fill: string;
}

const Next: React.FC<ArrowProps> = ({ onClick, fill }) => {
  return (
    <Svg
      fill={fill}
      onClick={onClick}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4,21 L4,3 C4,2.17595468 4.94076375,1.70557281 5.6,2.2 L17.6,11.2 C18.1333333,11.6 18.1333333,12.4 17.6,12.8 L5.6,21.8 C4.94076375,22.2944272 4,21.8240453 4,21 Z M6,19 L15.3333333,12 L6,5 L6,19 Z M20,22 L18,22 L18,2 L20,2 L20,22 Z"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default Next;

const attrs = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
})``;

const Svg = styled(attrs)`
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;
