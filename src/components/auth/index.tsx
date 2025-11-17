"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { useSignup } from "./signup/hook";
import { useLogin } from "./login/hook";
import FindPassword from "./find-password";
import travelIcon from "@/assets/icons/travel.png";

type AuthMode = "login" | "signup";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as AuthMode) || "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useState(false);

  // 로그인 훅
  const loginHook = useLogin();

  // 회원가입 훅
  const signupHook = useSignup();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginHook.onSubmit();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    signupHook.handleSignup();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    // 에러 상태 초기화는 각 훅에서 관리
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            {mode === "login" && (
              <Image
                src={travelIcon}
                alt="travel"
                width={32}
                height={32}
                className={styles.logoIcon}
              />
            )}
            <h1 className={styles.logo}>
              {mode === "login" ? "TripTalk" : "회원가입"}
            </h1>
          </div>
          <p className={styles.subtitle}>
            {mode === "login"
              ? "여행 이야기를 나누는 공간"
              : "My Trip Talk에 오신 것을 환영합니다"}
          </p>
        </div>

        {/* 탭 전환 버튼 */}
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === "login" ? styles.active : ""}`}
            onClick={() => switchMode("login")}
            disabled={loginHook.isLoading || signupHook.isLoading}
          >
            로그인
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === "signup" ? styles.active : ""}`}
            onClick={() => switchMode("signup")}
            disabled={loginHook.isLoading || signupHook.isLoading}
          >
            회원가입
          </button>
        </div>

        {/* 로그인 폼 */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={loginHook.inputs.email}
                  onChange={loginHook.onChange}
                  className={styles.input}
                  disabled={loginHook.isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginHook.inputs.password}
                  onChange={loginHook.onChange}
                  className={styles.input}
                  disabled={loginHook.isLoading}
                />
              </div>

              {loginHook.error && <p className={styles.error}>{loginHook.error}</p>}
            </div>

            <div className={styles.findPasswordSection}>
              <button
                type="button"
                className={styles.findPasswordLink}
                onClick={() => setIsFindPasswordOpen(true)}
                disabled={loginHook.isLoading}
              >
                비밀번호 찾기
              </button>
            </div>

            <div className={styles.buttonSection}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loginHook.isLoading}
              >
                {loginHook.isLoading ? "로그인 중..." : "로그인"}
              </button>
            </div>
          </form>
        )}

        {/* 회원가입 폼 */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.inputSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="signup-email" className={styles.label}>
                  이메일 <span className={styles.required}>*</span>
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={signupHook.email}
                  onChange={(e) => signupHook.setEmail(e.target.value)}
                  className={styles.input}
                  disabled={signupHook.isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="signup-password" className={styles.label}>
                  비밀번호 <span className={styles.required}>*</span>
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="비밀번호를 입력하세요 (최소 8자, 영문+숫자)"
                  value={signupHook.password}
                  onChange={(e) => signupHook.setPassword(e.target.value)}
                  className={styles.input}
                  disabled={signupHook.isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="signup-passwordConfirm" className={styles.label}>
                  비밀번호 확인 <span className={styles.required}>*</span>
                </label>
                <input
                  id="signup-passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={signupHook.passwordConfirm}
                  onChange={(e) =>
                    signupHook.setPasswordConfirm(e.target.value)
                  }
                  className={styles.input}
                  disabled={signupHook.isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="signup-name" className={styles.label}>
                  이름 <span className={styles.required}>*</span>
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={signupHook.name}
                  onChange={(e) => signupHook.setName(e.target.value)}
                  className={styles.input}
                  disabled={signupHook.isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="signup-phone" className={styles.label}>
                  전화번호
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={signupHook.phone}
                  onChange={(e) => signupHook.setPhone(e.target.value)}
                  className={styles.input}
                  disabled={signupHook.isLoading}
                />
              </div>

              {signupHook.errorMessage && (
                <p className={styles.error}>{signupHook.errorMessage}</p>
              )}
            </div>

            <div className={styles.agreementSection}>
              <div className={styles.agreementItem}>
                <input
                  type="checkbox"
                  id="allAgree"
                  checked={
                    signupHook.agreedToTerms &&
                    signupHook.agreedToPrivacy &&
                    signupHook.agreedToMarketing
                  }
                  onChange={signupHook.handleAllAgree}
                  className={styles.checkbox}
                  disabled={signupHook.isLoading}
                />
                <label htmlFor="allAgree" className={styles.checkboxLabel}>
                  전체 동의
                </label>
              </div>

              <div className={styles.agreementList}>
                <div className={styles.agreementItem}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={signupHook.agreedToTerms}
                    onChange={() => signupHook.handleSingleAgree("terms")}
                    className={styles.checkbox}
                    disabled={signupHook.isLoading}
                  />
                  <label htmlFor="terms" className={styles.checkboxLabel}>
                    [필수] 이용약관 동의
                  </label>
                </div>

                <div className={styles.agreementItem}>
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={signupHook.agreedToPrivacy}
                    onChange={() => signupHook.handleSingleAgree("privacy")}
                    className={styles.checkbox}
                    disabled={signupHook.isLoading}
                  />
                  <label htmlFor="privacy" className={styles.checkboxLabel}>
                    [필수] 개인정보 처리방침 동의
                  </label>
                </div>

                <div className={styles.agreementItem}>
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={signupHook.agreedToMarketing}
                    onChange={() => signupHook.handleSingleAgree("marketing")}
                    className={styles.checkbox}
                    disabled={signupHook.isLoading}
                  />
                  <label htmlFor="marketing" className={styles.checkboxLabel}>
                    [선택] 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.buttonSection}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={signupHook.isLoading}
              >
                {signupHook.isLoading ? "회원가입 중..." : "회원가입"}
              </button>
            </div>
          </form>
        )}

        {/* 비밀번호 찾기 모달 */}
        <FindPassword
          isOpen={isFindPasswordOpen}
          onClose={() => setIsFindPasswordOpen(false)}
        />
      </div>
    </div>
  );
}

