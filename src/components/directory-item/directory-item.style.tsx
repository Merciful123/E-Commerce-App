import styled from "styled-components";

type BackgroundImageProps = {
  imageUrl: string;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Body = styled.div`
        height: 90px;
        padding: 0 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius:3px;
        background-color: rgb(255, 255, 255);
        opacity: 0.7;
        position: absolute;
        

        h2 {
           
            margin: 0 6px 0;
            font-size: 25px;
            color: #4a4a4a;
        }
        p {
            font-weight: lighter;
            font-size: 16px;
`;

export const DirectoryItemContainer = styled.div`
 
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius:3px;
    margin: 0 7.5px 15px;
    overflow: hidden;


    &:hover {
        cursor: pointer;
        box-shadow:0.5px 0.5px 10px purple;

        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }

        & ${Body} {
            opacity: 0;
        }

    &:first-child {
        margin-right: 7.5px;
     }
    &:last-child {
        margin-left: 7.5px;

    }

    
    @media screen and (max-width:800px){
        height:200px;
    }

 `;

// .directory - item - container {
//     min-width: 30%;
//     height: 240px;
//     flex: 1 1 auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 1px solid black;
//     margin: 0 7.5px 15px;
//     overflow: hidden;
//     &:hover {
//         cursor: pointer;
//         & .background-image {
//             transform: scale(1.1);
//             transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
//         }
//         & .body {
//             opacity: 0;
//         }
//     }
//     &.large {
//         height: 380px;
//     }
//     &:first-child {
//         margin-right: 7.5px;
//     }
//     &:last-child {
//         margin-left: 7.5px;
//     }
//     .background-image {
//         width: 100%;
//         height: 100%;
//         background-size: cover;
//         background-position: center;
//     }
//     .body {
//         height: 90px;
//         padding: 0 25px;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         border: 1px solid black;
//         background-color: rgb(255, 255, 255);
//         opacity: 0.7;
//         position: absolute;
//         h2 {
//             font-weight: bold;
//             margin: 0 6px 0;
//             font-size: 22px;
//             color: #4a4a4a;
//         }
//         p {
//             font-weight: lighter;
//             font-size: 16px;
//         }
//     }
// }
