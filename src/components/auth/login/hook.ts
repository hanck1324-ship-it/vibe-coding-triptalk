"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./queries";

export function useLogin() {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const onSubmit = async () => {
    // 입력값 검증
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });

      console.log("=== 로그인 응답 전체 ===", result);
      console.log("=== 응답 데이터 ===", result.data);
      console.log("=== loginUser 객체 ===", result.data?.loginUser);

      if (result.data?.loginUser?.accessToken) {
        const accessToken = result.data.loginUser.accessToken;
        console.log("=== 받은 토큰 ===", accessToken);
        console.log("=== 토큰 길이 ===", accessToken.length);
        
        localStorage.setItem("accessToken", accessToken);
        
        // 커스텀 이벤트 발생 (네비게이션에서 로그인 상태 변경 감지)
        window.dispatchEvent(new Event("localStorageChange"));
        
        // 저장 확인
        const savedToken = localStorage.getItem("accessToken");
        console.log("=== localStorage에 저장된 토큰 ===", savedToken);
        console.log("=== 토큰 저장 확인 ===", savedToken === accessToken ? "✅ 성공" : "❌ 실패");
        
        router.push("/");
      } else {
        console.error("❌ 토큰이 응답에 없습니다.");
        console.error("응답 구조:", JSON.stringify(result.data, null, 2));
        setError("로그인 응답에 토큰이 없습니다.");
      }
    } catch (err: any) {
      console.error("로그인 에러:", err);
      console.error("에러 상세:", {
        message: err.message,
        graphQLErrors: err.graphQLErrors,
        networkError: err.networkError,
      });
      
      // GraphQL 에러 메시지 처리
      // ApolloError의 경우 err.message에 서버 에러 메시지가 포함됨
      const errorMessage = 
        err.graphQLErrors?.[0]?.message ||
        err.message || 
        err.networkError?.message ||
        "로그인에 실패했습니다.";
      
      // 서버에서 반환한 에러 메시지를 그대로 표시
      if (errorMessage?.includes("회원정보 인증에 실패") || errorMessage?.includes("인증에 실패")) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (errorMessage?.includes("이메일") || errorMessage?.includes("email") || errorMessage?.includes("존재") || errorMessage?.includes("없")) {
        setError("존재하지 않는 이메일입니다.");
      } else if (errorMessage?.includes("비밀번호") || errorMessage?.includes("password") || errorMessage?.includes("틀림") || errorMessage?.includes("일치")) {
        setError("비밀번호가 올바르지 않습니다.");
      } else if (errorMessage?.includes("네트워크") || errorMessage?.includes("network") || errorMessage?.includes("Failed to fetch")) {
        setError("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
      } else {
        // 서버에서 반환한 메시지를 그대로 표시
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    isLoading,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  };
}

