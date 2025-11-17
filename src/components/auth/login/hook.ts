"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./queries";

// 1. 상수는 외부로 분리하여 관리 (재사용성 및 가독성 UP)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLogin() {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);

  // 2. 관련된 상태들을 객체 하나로 묶어서 관리
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 입력값 변경 핸들러 (하나의 함수로 두 입력 모두 처리)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setError(""); // 입력 시 에러 메시지 초기화
  };

  // 3. 검증 로직 분리
  const validateInputs = () => {
    if (!inputs.email.trim()) return "이메일을 입력해주세요.";
    if (!inputs.password.trim()) return "비밀번호를 입력해주세요.";
    if (!EMAIL_REGEX.test(inputs.email)) return "올바른 이메일 형식이 아닙니다.";
    return null; // 에러 없음
  };

  // 4. 에러 메시지 처리 로직 분리
  const handleLoginError = (err: any) => {
    // GraphQL 에러 우선순위로 메시지 추출
    const msg = 
      err?.graphQLErrors?.[0]?.message ||
      err?.message || 
      err?.networkError?.message ||
      "";

    if (msg.includes("인증에 실패") || msg.includes("틀림") || msg.includes("일치하지")) {
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    }
    if (msg.includes("존재하지 않는") || msg.includes("이메일") || msg.includes("email")) {
      return "가입되지 않은 이메일입니다.";
    }
    if (msg.includes("비밀번호") || msg.includes("password")) {
      return "비밀번호가 올바르지 않습니다.";
    }
    if (msg.includes("네트워크") || msg.includes("network") || msg.includes("Failed to fetch")) {
      return "네트워크 연결을 확인해주세요.";
    }
    return msg || "로그인 중 문제가 발생했습니다.";
  };

  const onSubmit = async () => {
    // 검증 실행
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    // 디버깅: 전송 전 입력값 확인
    console.log("=== 로그인 시도 (Hook) ===");
    console.log("이메일:", inputs.email);
    console.log("비밀번호 길이:", inputs.password.length);
    console.log("비밀번호 (처음 2자만):", inputs.password.substring(0, 2) + "***");
    console.log("전송할 variables:", {
      email: inputs.email.trim(),
      password: `[${inputs.password.length}자리 비밀번호]`,
    });

    try {
      const result = await loginUser({
        variables: {
          email: inputs.email.trim(),
          password: inputs.password,
        },
      });

      const accessToken = result.data?.loginUser?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        // 네비게이션 상태 업데이트를 위한 이벤트 발생
        window.dispatchEvent(new Event("localStorageChange"));
        router.push("/");
      } else {
        throw new Error("토큰을 받아오지 못했습니다.");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      const userFriendlyMessage = handleLoginError(err);
      setError(userFriendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputs,       // 개별 값 대신 객체 반환
    error,
    isLoading,
    onChange,     // 통합된 핸들러
    onSubmit,
  };
}

