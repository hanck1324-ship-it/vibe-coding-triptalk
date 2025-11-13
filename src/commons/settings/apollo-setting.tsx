"use client"

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface IApolloSetting {
    children: React.ReactNode
}

export default function ApolloSetting(props: IApolloSetting) {
    const httpLink = createHttpLink({
        // ❗️ 바로 이 주소가 올바른 서버 주소입니다.
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
    });

    // Authorization 헤더를 추가하는 link
    const authLink = setContext((_, { headers }) => {
        // localStorage에서 토큰 가져오기
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        };
    });

    const client = new ApolloClient({
        link: from([authLink, httpLink]),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}