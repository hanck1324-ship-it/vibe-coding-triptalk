import React from "react";
import styles from "./styles.module.css";

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className={styles.authPageContainer}>
      {children}
    </div>
  );
}
