"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { useNavigation } from "./hook";
import logo from "@/assets/icons/logo.png";
import profileImage from "@/assets/icons/profile_image.png";

export default function Navigation() {
  const {
    onClickMenu,
    isLoggedIn,
    user,
    handleLogout,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    handlePointCharge,
  } = useNavigation();

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
          <div className={styles.profileSection} ref={dropdownRef}>
            <div className={styles.profileInfo} onClick={toggleDropdown}>
              <Image
                src={user.picture || profileImage}
                alt="프로필"
                width={32}
                height={32}
                className={styles.profileImage}
              />
              <span className={styles.profileName}>{user.name}</span>
            </div>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {/* 항목 1: 프로필 이름 */}
                <div className={styles.dropdownItemInfo}>
                  <span className={styles.dropdownLabel}>이름</span>
                  <span className={styles.dropdownValue}>{user.name}</span>
                </div>

                {/* 항목 2: 포인트 */}
                <div className={styles.dropdownItemInfo}>
                  <span className={styles.dropdownLabel}>보유 포인트</span>
                  <span className={styles.dropdownValue}>
                    {user.userPoint?.amount?.toLocaleString() || 0} P
                  </span>
                </div>

                <div className={styles.dropdownDivider} />

                {/* 항목 3: 포인트 충전 */}
                <button
                  className={styles.dropdownItemButton}
                  onClick={handlePointCharge}
                >
                  포인트 충전
                </button>

                {/* 항목 4: 로그아웃 */}
                <button
                  className={styles.dropdownItemButton}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
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