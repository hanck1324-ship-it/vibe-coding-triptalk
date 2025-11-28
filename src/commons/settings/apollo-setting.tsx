"use client"

import { ApolloClient, ApolloProvider, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

interface IApolloSetting {
    children: React.ReactNode
}

export default function ApolloSetting(props: IApolloSetting) {
    const uploadLink = createUploadLink({
        // ❗️ 바로 이 주소가 올바른 서버 주소입니다.
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        headers: {
            "Apollo-Require-Preflight": "true",
        },
        isExtractableFile: (value: any) => {
            // 1. 정확한 File 인스턴스 체크
            if (typeof File !== "undefined" && value instanceof File) {
                console.log("✅ [isExtractableFile] File 인스턴스 감지:", value.name);
                return true;
            }
            // 2. Blob 인스턴스 체크
            if (typeof Blob !== "undefined" && value instanceof Blob) {
                console.log("✅ [isExtractableFile] Blob 인스턴스 감지");
                return true;
            }
            // 3. Duck Typing (File 객체가 다른 window context에서 생성되었을 경우 대비)
            if (value && typeof value === "object" && "name" in value && "size" in value && "type" in value) {
                console.log("🦆 [isExtractableFile] Duck Typing 감지:", value.name);
                return true;
            }
            return false;
        },
    });

    // Authorization 헤더를 추가하는 link
    const authLink = setContext((request, { headers }) => {
        // 로그인/회원가입 요청에는 토큰을 보내지 않음
        const operationName = request.operationName;
        const isAuthOperation = operationName === "loginUser" || operationName === "createUser";
        
        // localStorage에서 토큰 가져오기
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        
        // 토큰 확인 로그 (디버깅용 - 로그인/회원가입 요청에만)
        if (typeof window !== "undefined" && isAuthOperation) {
             // ... 기존 로그 유지 ...
        }
        
        const authHeaders: Record<string, string> = { ...headers };
        
        // 인증이 필요한 요청에만 토큰 추가 (로그인/회원가입은 제외)
        if (!isAuthOperation && token) {
            authHeaders.authorization = `Bearer ${token}`;
        }

        return {
            headers: authHeaders
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
            graphQLErrors.forEach((error, index) => {
                // 에러 정보를 단계별로 출력 (console.warn 사용하여 Next.js 에러로 인식되지 않도록)
                console.groupCollapsed(`🔴 GraphQL 에러 [${index + 1}]`);
                
                // 1. 기본 메시지 출력
                if (error) {
                    // message 속성 직접 확인
                    const message = (error as any).message;
                    if (message) {
                        console.warn("메시지:", message);
                    } else {
                        // message가 없으면 에러 객체를 문자열로 변환 시도
                        try {
                            const errorString = String(error);
                            if (errorString !== "[object Object]") {
                                console.warn("에러:", errorString);
                            } else {
                                console.warn("메시지: (없음)");
                            }
                        } catch (e) {
                            console.warn("메시지: (추출 실패)");
                        }
                    }
                    
                    // 2. locations 출력
                    const locations = (error as any).locations;
                    if (locations && Array.isArray(locations) && locations.length > 0) {
                        console.log("위치:", locations);
                    }
                    
                    // 3. path 출력
                    const path = (error as any).path;
                    if (path && Array.isArray(path) && path.length > 0) {
                        console.log("경로:", path);
                    }
                    
                    // 4. extensions 출력
                    const extensions = (error as any).extensions;
                    if (extensions && typeof extensions === 'object') {
                        try {
                            const extensionsStr = JSON.stringify(extensions, null, 2);
                            console.log("확장 정보:", JSON.parse(extensionsStr));
                            
                            // extensions의 주요 속성들 개별 출력
                            if (extensions.code) {
                                console.log("에러 코드:", extensions.code);
                            }
                            if (extensions.exception) {
                                console.log("예외 정보:", extensions.exception);
                            }
                        } catch (e) {
                            console.warn("확장 정보: (직렬화 실패)");
                        }
                    }
                    
                    // 5. 에러 객체의 모든 속성 이름 출력 (디버깅용)
                    try {
                        const errorKeys = Object.keys(error);
                        if (errorKeys.length > 0) {
                            console.log("에러 객체 속성:", errorKeys);
                        }
                    } catch (e) {
                        // 키 추출 실패 시 무시
                    }
                } else {
                    console.warn("에러 객체가 null 또는 undefined입니다.");
                }
                
                console.groupEnd();
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