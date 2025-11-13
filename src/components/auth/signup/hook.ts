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

    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            name,
          },
        },
      });

      if (result.data?.createUser) {
        alert("회원가입이 완료되었습니다!");
        router.push("/login?mode=login");
      }
    } catch (err: any) {
      console.error("회원가입 에러:", err);
      
      // GraphQL 에러 메시지 처리
      const errorMessage = err.message || err.graphQLErrors?.[0]?.message;
      
      if (errorMessage?.includes("이메일") || errorMessage?.includes("email") || errorMessage?.includes("중복")) {
        setErrorMessage("이미 사용 중인 이메일입니다.");
      } else if (errorMessage?.includes("비밀번호") || errorMessage?.includes("password")) {
        setErrorMessage("비밀번호 형식이 올바르지 않습니다.");
      } else {
        setErrorMessage(errorMessage || "회원가입에 실패했습니다. 다시 시도해주세요.");
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

