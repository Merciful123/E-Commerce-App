import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
   @media screen and (max-width: 800px) { 
    display: flex;
    width: 100vw;
    min-height:90vh;
    margin

`;

export const CheckoutHeader = styled.div`
  width: 100%;
  // padding: 10px 10px 10px 10px;
  align-item: space-between;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  @media screen and (max-width: 800px) {
    display: flex;
    width: 100vw;
    align-items: stretch;
    justify-content: space-between;
  }
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;

  @media screen and (max-width: 800px) {
    display: flex;
    font-size: 25px;
    justify-content: flex-end;
    padding-right: 35px;
  }
`;
