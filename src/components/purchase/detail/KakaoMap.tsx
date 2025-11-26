"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function KakaoMap({ latitude, longitude, address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || !latitude || !longitude) return;

    const win = window as any;
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

    if (!kakaoKey || kakaoKey === "YOUR_KAKAO_API_KEY_HERE") {
      setError("카카오 지도 API 키가 설정되지 않았습니다.");
      return;
    }

    const scriptId = "kakao-maps-sdk";
    const existingScript = document.getElementById(scriptId);

    const loadMap = () => {
      if (win.kakao && win.kakao.maps) {
        win.kakao.maps.load(() => {
          const coords = new win.kakao.maps.LatLng(latitude, longitude);

          // 지도 생성
          const map = new win.kakao.maps.Map(mapRef.current, {
            center: coords,
            level: 3,
          });

          // 마커 생성
          const marker = new win.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우 생성 (주소가 있는 경우)
          if (address) {
            const infowindow = new win.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;white-space:nowrap;">${address}</div>`,
            });
            infowindow.open(map, marker);
          }

          setIsMapLoaded(true);
        });
      }
    };

    if (existingScript) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = loadMap;
      script.onerror = () => {
        setError("카카오 지도 API를 불러오는데 실패했습니다.");
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude, address]);

  if (error) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>{error}</div>
      </div>
    );
  }

  if (!latitude || !longitude) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>위치 정보가 없습니다.</div>
      </div>
    );
  }

  return <div ref={mapRef} className={styles.mapContainer}></div>;
}
