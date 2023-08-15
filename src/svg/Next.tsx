import styled from "styled-components";

const Next = () => {
  return (
    <Svg>
      <g stroke="#000" fill="none" fillRule="evenodd">
        <path
          d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z"
          strokeWidth="2"
        />
        <path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z" />
      </g>
    </Svg>
  );
};

export default Next;

const attrs = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
})``;

const Svg = styled(attrs)`
  width: 26px;
  height: 24px;
  cursor: pointer;
`;
