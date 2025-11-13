"use client";

import styles from "./styles.module.css"; 
import Image from "next/image";
import { useNavigation } from "./hook";
import logo from "@/assets/icons/logo.png";
import profileImage from "@/assets/icons/profile_image.png";

export default function Navigation() {
  const { onClickMenu, isLoggedIn, user, handleLogout } = useNavigation();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.wrapperLeft}>
        <Image
          src={logo}
          alt="logo"
          width={120}
          height={40}
          className={styles.logo}
          onClick={onClickMenu("/")}
        />
        <span className={styles.menuItem} onClick={onClickMenu("/boards")}>
          트립토크
        </span>
        <span className={styles.menuItem} onClick={onClickMenu("/purchase")}>
          숙박권 구매
        </span>
        {isLoggedIn && (
          <span className={styles.menuItem} onClick={onClickMenu("/myPage")}>
            마이 페이지
          </span>
        )}
      </div>
      <div className={styles.wrapperRight}>
        {isLoggedIn && user ? (
          <div className={styles.profileSection}>
            <div className={styles.profileInfo} onClick={onClickMenu("/myPage")}>
              <Image
                src={user.picture || profileImage}
                alt="프로필"
                width={32}
                height={32}
                className={styles.profileImage}
              />
              <span className={styles.profileName}>{user.name}</span>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className={styles.loginButton} onClick={onClickMenu("/login")}>
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}