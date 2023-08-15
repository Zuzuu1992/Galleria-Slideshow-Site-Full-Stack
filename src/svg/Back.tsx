import styled from "styled-components";

const Back = () => {
  return (
    <Svg>
      <g stroke="#000" fill="none" fillRule="evenodd">
        <path
          d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
          strokeWidth="2"
        />
        <path fill="#D8D8D8" d="M.986.5h-1v22.775h1z" />
      </g>
    </Svg>
  );
};

export default Back;

const attrs = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
})``;

const Svg = styled(attrs)`
  width: 26px;
  height: 24px;
  cursor: pointer;
`;
