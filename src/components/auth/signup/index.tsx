"use client";

import { useSignup } from "./hook";
import styles from "./styles.module.css";

export default function Signup() {
  const {
    email,
    password,
    passwordConfirm,
    name,
    phone,
    agreedToTerms,
    agreedToPrivacy,
    agreedToMarketing,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setName,
    setPhone,
    handleSignup,
    handleAllAgree,
    handleSingleAgree,
    handleNavigateToLogin,
  } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup();
  };

  const allAgreed = agreedToTerms && agreedToPrivacy && agreedToMarketing;

  return (
    <div className={styles.signupContainer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>회원가입</h1>
          <p className={styles.subtitle}>My Trip Talk에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                이메일 <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                비밀번호 <span className={styles.required}>*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요 (최소 8자, 영문+숫자)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirm" className={styles.label}>
                비밀번호 확인 <span className={styles.required}>*</span>
              </label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                이름 <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>

          <div className={styles.agreementSection}>
            <div className={styles.agreementItem}>
              <input
                type="checkbox"
                id="allAgree"
                checked={allAgreed}
                onChange={handleAllAgree}
                className={styles.checkbox}
                disabled={isLoading}
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
                  checked={agreedToTerms}
                  onChange={() => handleSingleAgree("terms")}
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className={styles.checkboxLabel}>
                  [필수] 이용약관 동의
                </label>
              </div>

              <div className={styles.agreementItem}>
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={() => handleSingleAgree("privacy")}
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <label htmlFor="privacy" className={styles.checkboxLabel}>
                  [필수] 개인정보 처리방침 동의
                </label>
              </div>

              <div className={styles.agreementItem}>
                <input
                  type="checkbox"
                  id="marketing"
                  checked={agreedToMarketing}
                  onChange={() => handleSingleAgree("marketing")}
                  className={styles.checkbox}
                  disabled={isLoading}
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
              className={styles.signupButton}
              disabled={isLoading}
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </button>

            <button
              type="button"
              className={styles.loginLinkButton}
              onClick={handleNavigateToLogin}
              disabled={isLoading}
            >
              이미 계정이 있으신가요? 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

