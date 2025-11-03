"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";


interface DaumMapProps {
  address: string;
  onCoordinatesChange?: (lat: string, lng: string) => void;
}

declare global {
  interface Window {
    daum: any;
    kakao: any;
  }
}

export default function DaumMap({ address, onCoordinatesChange }: DaumMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!address || !mapRef.current) return;

    console.log("DaumMap - 주소:", address);

    // 카카오 지도 API 스크립트 로드
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    
    console.log("카카오 API 키:", kakaoKey ? "설정됨" : "미설정");
    
    if (!kakaoKey || kakaoKey === "YOUR_KAKAO_API_KEY_HERE") {
      console.warn("카카오 지도 API 키가 설정되지 않았습니다. .env.local 파일에 NEXT_PUBLIC_KAKAO_MAP_KEY를 설정해주세요.");
      // API 키 없어도 기본 좌표는 전달
      if (onCoordinatesChange) {
        console.log("기본 좌표 전달: 37.5665, 126.9780");
        onCoordinatesChange("37.5665", "126.9780");
      }
      return;
    }

    const scriptId = "kakao-maps-sdk";
    const existingScript = document.getElementById(scriptId);

    const loadMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표 검색
          geocoder.addressSearch(address, (result: any, status: any) => {
            console.log("Geocoding 결과:", status, result);
            
            if (status === window.kakao.maps.services.Status.OK && result[0]) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              console.log("좌표 찾음:", result[0].y, result[0].x);

              // 위도/경도를 부모 컴포넌트로 전달
              if (onCoordinatesChange) {
                onCoordinatesChange(result[0].y, result[0].x);
                console.log("좌표 전달 완료");
              }

              // 지도 생성
              const map = new window.kakao.maps.Map(mapRef.current, {
                center: coords,
                level: 3,
              });

              // 마커 생성
              let marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우 생성
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${address}</div>`,
              });
              infowindow.open(map, marker);

              // 지도 클릭 이벤트
              window.kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
                const latlng = mouseEvent.latLng;
                marker.setPosition(latlng);
                
                if (onCoordinatesChange) {
                  onCoordinatesChange(latlng.getLat().toString(), latlng.getLng().toString());
                }
              });

              setIsMapLoaded(true);
            }
          });
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
      script.onerror = (error) => {
        console.error("DaumMap - 카카오 API 로드 실패:", error);
      };
      document.head.appendChild(script);
    }
  }, [address, onCoordinatesChange]);

  return <div ref={mapRef} className={styles.map_container}></div>;
}
