import { gql } from "@apollo/client";

export const FETCH_TRAVELPRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
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
      }
      buyer {
        _id
        name
        email
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

