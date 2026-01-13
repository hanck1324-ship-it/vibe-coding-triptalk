import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      size
      isUsed
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      images
        seller {
        _id
        name
        email
        picture
      }
      travelproductAddress {
        _id
        address
        addressDetail
        zipcode
        lat
        lng
      }
    }
  }
`;

export const UPDATE_TRAVELPRODUCT = gql`
  mutation updateTravelproduct(
    $travelproductId: ID!
    $updateTravelproductInput: UpdateTravelproductInput!
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: $updateTravelproductInput
    ) {
      _id
      name
      remarks
      contents
      price
      images
      tags
      pickedCount
      createdAt
      updatedAt
      soldAt
      seller {
        _id
        name
        email
        picture
      }
      travelproductAddress {
        _id
        address
        addressDetail
        zipcode
        lat
        lng
      }
    }
  }
`;

export const FETCH_TRAVELPRODUCT_FOR_EDIT = gql`
  query fetchTravelproductForEdit($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      images
      tags
      pickedCount
      createdAt
      updatedAt
      soldAt
      seller {
        _id
        name
        email
        picture
        userPoint {
          _id
          amount
          balance
          createdAst
          updatedAts
          deletedAt
        }
      }
      travelproductAddress {
        _id
        address
        addressDetail
        zipcode
        lat
        lng
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;
