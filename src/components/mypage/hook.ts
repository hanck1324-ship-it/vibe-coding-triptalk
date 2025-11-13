"use client";

import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "./queries";

export const useMyPage = () => {
  const { data, loading, error, refetch } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-and-network",
  });

  const user = data?.fetchUserLoggedIn;
  const userPoint = user?.userPoint?.amount || 0;

  return {
    user,
    userPoint,
    loading,
    error,
    refetch,
  };
};


