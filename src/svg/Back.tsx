import styled from "styled-components";

interface ArrowProps {
  onClick: () => void;
  fill: string;
}

const Back: React.FC<ArrowProps> = ({ onClick, fill }) => {
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
        d="M18.4,21.8 L6.4,12.8 C5.86666667,12.4 5.86666667,11.6 6.4,11.2 L18.4,2.2 C19.0592363,1.70557281 20,2.17595468 20,3 L20,21 C20,21.8240453 19.0592363,22.2944272 18.4,21.8 Z M18,5 L8.66666667,12 L18,19 L18,5 Z M6,22 L4,22 L4,2 L6,2 L6,22 Z"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default Back;

const attrs = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
})``;

const Svg = styled(attrs)`
  display: block;
  width: 16px;
  height: 16px;
  /* fill: #d8d8d8; */
  /* width: 100%;
  height: 100%; */
  cursor: pointer;
`;
