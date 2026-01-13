"use client";

import { useEffect } from "react";
import styles from "../styles.module.css";

declare global {
  interface Window {
    kakao: any;
  }
}

interface DetailMapProps {
  lat: number;
  lng: number;
  address?: string;
}

export default function DetailMap({ lat, lng, address }: DetailMapProps) {
  useEffect(() => {
    if (!lat || !lng) return;

    console.log("DetailMap - 좌표:", lat, lng);

    const loadMap = () => {
      const container = document.getElementById("detail-map");
      if (!container) {
        console.error("지도 컨테이너를 찾을 수 없습니다.");
        return;
      }

      // 좌표 객체 생성
      const coords = new window.kakao.maps.LatLng(lat, lng);

      // 지도 옵션
      const options = {
        center: coords,
        level: 3,
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 인포윈도우 생성 (주소가 있는 경우)
      if (address) {
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${address}</div>`,
        });
        infowindow.open(map, marker);
      }

      console.log("DetailMap - 지도 로드 완료");
    };

    // 카카오 맵 SDK가 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadMap);
    } else {
      console.error("카카오 맵 SDK가 로드되지 않았습니다.");
    }
  }, [lat, lng, address]);

  return <div id="detail-map" className={styles.map_container}></div>;
}
