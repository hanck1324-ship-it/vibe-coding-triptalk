"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/components/mypage/queries";
import { gql } from "@apollo/client";
import styles from "./styles.module.css";

// 포인트 충전 뮤테이션
const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
    }
  }
`;

export default function PointCharge() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // 사용자 포인트 조회
  const { data: userData, refetch } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-and-network",
  });

  const currentPoint = userData?.fetchUserLoggedIn?.userPoint?.amount || 0;

  // 포인트 충전 뮤테이션
  const [createPointTransaction] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

  const handleCharge = () => {
    if (!selectedAmount) {
      alert("충전할 금액을 선택해주세요.");
      return;
    }

    // 아임포트 결제 연동
    const IMP = (window as any).IMP;
    if (!IMP) {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    IMP.init("imp49910675"); // 아임포트 가맹점 식별코드

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        name: "포인트 충전",
        amount: selectedAmount,
        buyer_email: userData?.fetchUserLoggedIn?.email || "",
        buyer_name: userData?.fetchUserLoggedIn?.name || "",
      },
      async (rsp: any) => {
        if (rsp.success) {
          // 결제 성공 시 백엔드에 포인트 충전 요청
          try {
            await createPointTransaction({
              variables: { impUid: rsp.imp_uid },
            });
            alert(`${selectedAmount.toLocaleString()}원 충전이 완료되었습니다!`);
            refetch(); // 포인트 정보 새로고침
            setSelectedAmount(null);
          } catch (error: any) {
            console.error("포인트 충전 에러:", error);
            alert(error.message || "포인트 충전에 실패했습니다.");
          }
        } else {
          alert(`결제에 실패했습니다: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div className={styles.pointChargeContainer}>
      <div className={styles.container}>
        <h1>포인트 충전</h1>

        <div className={styles.pointSection}>
          <div className={styles.currentPoint}>
            <span className={styles.label}>현재 보유 포인트</span>
            <span className={styles.value}>{currentPoint.toLocaleString()} P</span>
          </div>

          <div className={styles.chargeOptions}>
            <h3>충전 금액 선택</h3>
            <div className={styles.chargeButtons}>
              {[10000, 30000, 50000, 100000].map((amount) => (
                <button
                  key={amount}
                  className={`${styles.chargeButton} ${selectedAmount === amount ? styles.selected : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.confirmButton}
            onClick={handleCharge}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
}
