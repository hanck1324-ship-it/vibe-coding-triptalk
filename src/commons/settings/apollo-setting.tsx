"use client"

import { ApolloClient, ApolloProvider, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

interface IApolloSetting {
    children: React.ReactNode
}

export default function ApolloSetting(props: IApolloSetting) {
    // 파일 업로드를 지원하는 uploadLink 사용
    const uploadLink = createUploadLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
    });

    // Authorization 헤더를 추가하는 link
    const authLink = setContext((request, { headers }) => {
        // 로그인/회원가입 요청에는 토큰을 보내지 않음
        const operationName = request.operation?.operationName;
        const isAuthOperation = operationName === "loginUser" || operationName === "createUser";
        
        // localStorage에서 토큰 가져오기
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        
        // 토큰 확인 로그 (디버깅용 - 로그인/회원가입 요청에만)
        if (typeof window !== "undefined" && isAuthOperation) {
            const storedToken = localStorage.getItem("accessToken");
            console.log("=== 로컬스토리지 토큰 확인 ===");
            console.log("토큰 존재 여부:", storedToken ? "✅ 있음" : "❌ 없음");
            if (storedToken) {
                console.log("토큰 길이:", storedToken.length);
                console.log("토큰 (처음 20자):", storedToken.substring(0, 20) + "...");
            }
            console.log("현재 요청:", operationName, "- 토큰 제외 (인증 불필요)");
        }
        
        return {
            headers: {
                ...headers,
                // 인증이 필요한 요청에만 토큰 추가 (로그인/회원가입은 제외)
                authorization: !isAuthOperation && token ? `Bearer ${token}` : "",
            }
        };
    });

    // GraphQL 요청 로깅 link (디버깅용 - 모든 요청 로깅)
    const loggingLink = new ApolloLink((operation, forward) => {
        // 요청 정보 로깅
        console.log("=== GraphQL 요청 ===");
        console.log("Operation:", operation.operationName);
        console.log("Variables:", JSON.stringify(operation.variables, null, 2));
        
        // 로그인/회원가입 요청인 경우 변수 확인
        if (operation.operationName === "loginUser" && operation.variables) {
            const vars = operation.variables as { email?: string; password?: string };
            console.log("📧 이메일:", vars.email);
            if (vars.password) {
                console.log("🔒 비밀번호 길이:", vars.password.length);
                console.log("🔒 비밀번호 (처음 2자):", vars.password.substring(0, 2) + "***");
                console.log("🔒 비밀번호 전체:", vars.password); // 디버깅용
            }
        }

        if (operation.operationName === "createUser" && operation.variables) {
            const vars = operation.variables as { createUserInput?: { email?: string; name?: string; password?: string } };
            if (vars.createUserInput) {
                console.log("📧 회원가입 이메일:", vars.createUserInput.email);
                console.log("👤 이름:", vars.createUserInput.name);
                if (vars.createUserInput.password) {
                    console.log("🔒 비밀번호 길이:", vars.createUserInput.password.length);
                    console.log("🔒 비밀번호 (처음 2자):", vars.createUserInput.password.substring(0, 2) + "***");
                    console.log("🔒 비밀번호 전체:", vars.createUserInput.password); // 디버깅용
                }
            }
        }

        return forward(operation).map((response) => {
            // 응답 로깅
            if (operation.operationName === "loginUser" || operation.operationName === "createUser") {
                console.log("=== GraphQL 응답 ===");
                console.log("Response:", JSON.stringify(response.data, null, 2));
            }
            return response;
        });
    });

    // GraphQL 에러 로깅 link
    const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
        // 실제 에러가 있을 때만 로깅
        if (!graphQLErrors && !networkError) {
            return;
        }

        console.group("🔴 GraphQL 에러 발생");
        console.log("Operation:", operation?.operationName);
        console.log("Variables:", JSON.stringify(operation?.variables, null, 2));

        if (graphQLErrors && graphQLErrors.length > 0) {
            graphQLErrors.forEach((error) => {
                const errorMessage = error.message || "";
                const operationName = operation?.operationName || "";
                
                // 예상 가능한 에러(로그인/회원가입 실패)는 간단히 로깅
                const isExpectedError = 
                    errorMessage.includes("인증에 실패") ||
                    errorMessage.includes("존재하지 않는") ||
                    errorMessage.includes("이미 존재") ||
                    (operationName === "loginUser" && errorMessage.includes("회원정보")) ||
                    (operationName === "createUser" && errorMessage.includes("이메일"));
                
                if (isExpectedError) {
                    // 예상 가능한 에러는 간단하게 로깅
                    console.warn(`⚠️ ${operationName}: ${errorMessage}`);
                } else {
                    // 예상치 못한 에러는 상세하게 로깅
                    const errorDetails: {
                        message?: string;
                        locations?: any;
                        path?: any;
                        extensions?: any;
                        [key: string]: any;
                    } = {};
                    
                    if (error) {
                        // 기본 속성 추출
                        if (error.message) errorDetails.message = error.message;
                        if (error.locations) errorDetails.locations = error.locations;
                        if (error.path) errorDetails.path = error.path;
                        if (error.extensions) errorDetails.extensions = error.extensions;
                        
                        // 에러 객체의 모든 속성을 추출 (직접 접근이 안 되는 경우 대비)
                        try {
                            const errorString = JSON.stringify(error, null, 2);
                            if (errorString && errorString !== "{}") {
                                console.error("GraphQL 에러 (JSON):", errorString);
                            }
                        } catch (e) {
                            // JSON 직렬화 실패 시 원본 에러 출력
                            console.error("GraphQL 에러 (원본):", error);
                        }
                    }
                    
                    // 추출한 속성이 있으면 출력
                    if (Object.keys(errorDetails).length > 0) {
                        console.error("GraphQL 에러 상세:", errorDetails);
                    } else {
                        // 속성이 없으면 원본 에러 객체 출력
                        console.error("GraphQL 에러 (원본 객체):", error);
                    }
                }

                // 토큰 만료 에러 처리 (UNAUTHENTICATED)
                const errorCode = error.extensions?.code;
                
                if (errorCode === "UNAUTHENTICATED" || errorMessage.includes("토큰 만료")) {
                    console.warn("⚠️ 토큰이 만료되었습니다. 로그인 페이지로 이동합니다.");
                    
                    // 토큰 삭제
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("accessToken");
                    }
                    
                    // 로그인 페이지로 리다이렉트 (로그인/회원가입 요청은 제외)
                    const operationName = operation?.operationName;
                    const isAuthOperation = operationName === "loginUser" || operationName === "createUser";
                    
                    if (!isAuthOperation && typeof window !== "undefined") {
                        // 현재 경로 저장 (로그인 후 돌아올 수 있도록)
                        const currentPath = window.location.pathname;
                        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
                    }
                }
            });
        }

        if (networkError) {
            console.warn("네트워크 에러 상세:", {
                name: networkError.name,
                message: networkError.message,
                statusCode: (networkError as any).statusCode,
                result: (networkError as any).result,
                response: (networkError as any).response,
            });

            // HTTP 상태 코드 확인
            if ((networkError as any).statusCode) {
                console.warn(`HTTP 상태 코드: ${(networkError as any).statusCode}`);
            }

            // 응답 본문 확인
            if ((networkError as any).result) {
                console.warn("응답 본문:", JSON.stringify((networkError as any).result, null, 2));
            }
        }

        if (response) {
            console.log("응답 객체:", response);
        }
        console.groupEnd();
    });

    const client = new ApolloClient({
        link: from([loggingLink, errorLink, authLink, uploadLink]),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}