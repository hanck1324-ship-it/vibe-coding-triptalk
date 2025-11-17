"use client";

import { useState } from "react";
import styles from "./styles.module.css";

interface IFindPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindPassword({ isOpen, onClose }: IFindPasswordProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
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
      // TODO: 비밀번호 재설정 이메일 전송 API 연동
      // const response = await sendPasswordResetEmail(email);
      
      // 임시로 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError("비밀번호 재설정 이메일 전송에 실패했습니다. 다시 시도해주세요.");
      console.error("비밀번호 찾기 에러:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>비밀번호 찾기</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {isSuccess ? (
          <div className={styles.successContent}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.successMessage}>
              비밀번호 재설정 링크를 <strong>{email}</strong>로 전송했습니다.
            </p>
            <p className={styles.successSubMessage}>
              이메일을 확인하여 비밀번호를 재설정해주세요.
            </p>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleClose}
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.content}>
              <p className={styles.description}>
                가입하신 이메일 주소를 입력하시면
                <br />
                비밀번호 재설정 링크를 보내드립니다.
              </p>

              <div className={styles.inputGroup}>
                <label htmlFor="find-password-email" className={styles.label}>
                  이메일
                </label>
                <input
                  id="find-password-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={handleEmailChange}
                  className={styles.input}
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.buttonSection}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleClose}
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "전송 중..." : "전송"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

