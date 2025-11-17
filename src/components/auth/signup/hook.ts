"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./queries";

export function useSignup() {
  const router = useRouter();

  // GraphQL mutation
  const [createUser] = useMutation(CREATE_USER);

  // 폼 데이터 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 약관 동의 상태
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);

  // UI 상태
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation 함수들
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // 최소 8자, 영문 + 숫자 조합
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswordMatch = (): boolean => {
    return password === passwordConfirm && passwordConfirm !== "";
  };

  const validateRequiredFields = (): boolean => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      passwordConfirm.trim() !== "" &&
      name.trim() !== "" &&
      agreedToTerms &&
      agreedToPrivacy
    );
  };

  // 약관 동의 처리
  const handleAllAgree = () => {
    const allAgreed = agreedToTerms && agreedToPrivacy && agreedToMarketing;
    const newValue = !allAgreed;
    setAgreedToTerms(newValue);
    setAgreedToPrivacy(newValue);
    setAgreedToMarketing(newValue);
  };

  const handleSingleAgree = (type: "terms" | "privacy" | "marketing") => {
    switch (type) {
      case "terms":
        setAgreedToTerms(!agreedToTerms);
        break;
      case "privacy":
        setAgreedToPrivacy(!agreedToPrivacy);
        break;
      case "marketing":
        setAgreedToMarketing(!agreedToMarketing);
        break;
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    setErrorMessage(null);

    // Validation 검증
    if (!validateRequiredFields()) {
      setErrorMessage("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("비밀번호는 최소 8자 이상, 영문과 숫자를 포함해야 합니다.");
      return;
    }

    if (!validatePasswordMatch()) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    // 디버깅: 전송 전 입력값 확인
    console.log("=== 회원가입 시도 ===");
    console.log("이메일:", email);
    console.log("이름:", name);
    console.log("비밀번호 길이:", password.length);
    console.log("전송할 variables:", {
      createUserInput: {
        email: email.trim(),
        name: name.trim(),
        password: `[${password.length}자리 비밀번호]`,
      },
    });

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: email.trim(),
            password,
            name: name.trim(),
          },
        },
      });

      if (result.data?.createUser) {
        alert("회원가입이 완료되었습니다!");
        router.push("/login?mode=login");
      }
    } catch (err: any) {
      console.error("회원가입 에러:", err);
      
      // 에러 상세 정보 추출
      const errorDetails: {
        message?: string;
        graphQLErrors?: any[];
        networkError?: any;
      } = {};

      if (err) {
        if (err.message) errorDetails.message = err.message;
        if (err.graphQLErrors) errorDetails.graphQLErrors = err.graphQLErrors;
        if (err.networkError) errorDetails.networkError = err.networkError;
      }

      console.error("에러 상세:", errorDetails);

      // GraphQL 에러 메시지 처리 (우선순위: GraphQL 에러 > 네트워크 에러 > 일반 에러)
      const errorMessage = 
        err?.graphQLErrors?.[0]?.message ||
        err?.networkError?.message ||
        err?.message ||
        "회원가입에 실패했습니다.";

      // 네트워크 에러의 응답 본문에서 실제 에러 메시지 추출
      let finalErrorMessage = errorMessage;
      
      if (err?.networkError?.result) {
        const result = err.networkError.result;
        console.error("서버 응답 본문:", result);
        
        // 서버에서 반환한 에러 메시지 확인
        if (result.errors && result.errors.length > 0) {
          const serverError = result.errors[0];
          console.error("서버 에러:", serverError);
          
          // 서버 에러 메시지를 우선 사용
          if (serverError.message) {
            finalErrorMessage = serverError.message;
          }
          
          // extensions에서 추가 정보 확인
          if (serverError.extensions) {
            console.error("에러 확장 정보:", serverError.extensions);
          }
        }
      }

      // 사용자 친화적 메시지로 변환
      if (finalErrorMessage?.includes("이메일") || finalErrorMessage?.includes("email") || finalErrorMessage?.includes("중복") || finalErrorMessage?.includes("already") || finalErrorMessage?.includes("이미")) {
        setErrorMessage("이미 사용 중인 이메일입니다.");
      } else if (finalErrorMessage?.includes("비밀번호") || finalErrorMessage?.includes("password")) {
        setErrorMessage("비밀번호 형식이 올바르지 않습니다.");
      } else if (finalErrorMessage?.includes("400") || finalErrorMessage?.includes("Bad Request")) {
        setErrorMessage("입력한 정보를 확인해주세요.");
      } else if (finalErrorMessage?.includes("토큰") || finalErrorMessage?.includes("만료")) {
        // 토큰 관련 에러는 회원가입과 무관하므로 무시
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      } else {
        setErrorMessage(finalErrorMessage || "회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 이동
  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return {
    // 폼 상태
    email,
    password,
    passwordConfirm,
    name,
    phone,

    // 약관 동의 상태
    agreedToTerms,
    agreedToPrivacy,
    agreedToMarketing,

    // UI 상태
    isLoading,
    errorMessage,

    // 상태 변경 함수
    setEmail,
    setPassword,
    setPasswordConfirm,
    setName,
    setPhone,
    setErrorMessage,

    // 액션 함수
    handleSignup,
    handleAllAgree,
    handleSingleAgree,
    handleNavigateToLogin,

    // Validation 함수
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateRequiredFields,
  };
}

