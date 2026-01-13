import { gql } from "@apollo/client";

export const FETCH_TRAVELPRODUCTS = gql`
  query fetchTravelproducts($search: String, $page: Int, $isSoldout: Boolean) {
    fetchTravelproducts(search: $search, page: $page, isSoldout: $isSoldout) {
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

export const DELETE_TRAVELPRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;
