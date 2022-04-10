import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  padding: 10px;
  &:hover {
    transform: scale(1.5);
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

export const NavLinks = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 5px;
`;

export const Navlink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  border: 2px solid purple;
  border-radius: 3px;
  background-color: papayawhip;
  &:hover {
    background-color: Turquoise;
    box-shadow: 1px 1px 10px yellow;
  }
`;

//     height: 70px;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
//     .logo-container {
//         height: 100%;
//         width: 70px;
//         padding: 25px;
//     }
//     .nav-links-container {
//         width: 50%;
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: flex-end;
//         .nav-link {
//             padding: 10px 15px;
//             cursor: pointer;
//             font: bolder;
//             .nav-link:hover {
//                 color: red;
//             }
//         }
//     }
// }
