import { gql } from "@apollo/client";

// 여행 상품 등록 mutation
export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      images
      tags
      seller {
        _id
        name
        email
      }
      travelproductAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
      }
      createdAt
    }
  }
`;

// 이미지 업로드 mutation
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// 여행 상품 삭제 mutation
export const DELETE_TRAVELPRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;
