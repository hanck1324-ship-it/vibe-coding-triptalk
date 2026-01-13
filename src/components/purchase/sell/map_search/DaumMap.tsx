"use client";

import { useEffect } from "react";
import styles from "../styles.module.css";

declare global {
  interface Window {
    kakao: any;
  }
}

interface DaumMapProps {
  address: string;
  onCoordinatesChange?: (lat: string, lng: string) => void;
}

export default function DaumMap({ address, onCoordinatesChange }: DaumMapProps) {
  useEffect(() => {
    if (!address) return;

    console.log("DaumMap - 주소:", address);

    const loadMap = () => {
      const container = document.getElementById("map");
      if (!container) {
        console.error("지도 컨테이너를 찾을 수 없습니다.");
        return;
      }

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
        } else {
          console.error("Geocoding 실패:", status);
          // 기본 좌표로 지도 생성
          const defaultCoords = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const options = {
            center: defaultCoords,
            level: 3,
          };
          new window.kakao.maps.Map(container, options);

          if (onCoordinatesChange) {
            onCoordinatesChange("37.5665", "126.9780");
          }
        }
      });
    };

    // 카카오 맵 SDK가 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadMap);
    } else {
      console.error("카카오 맵 SDK가 로드되지 않았습니다.");
    }
  }, [address, onCoordinatesChange]);

  return (
    <>
      <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        async
      />
      <div id="map" className={styles.map_container}></div>
    </>
  );
}
