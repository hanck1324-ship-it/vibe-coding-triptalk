"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login-styles.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      console.log("로그인 시도:", { email, password });
      localStorage.setItem("accessToken", "temporary-token");
      alert("로그인 성공! (실제 API는 추후 연동 예정)");
      router.push("/");
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error("로그인 에러:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/signup");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>TripTalk</h1>
          <p className={styles.subtitle}>여행 이야기를 나누는 공간</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.buttonSection}>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>

            <button
              type="button"
              className={styles.signupButton}
              onClick={handleSignupClick}
              disabled={isLoading}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
