import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-grow: 1;
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 25px;
  text-align: center;
  text-shadow: 2px 2px 10px cyan;
`;
