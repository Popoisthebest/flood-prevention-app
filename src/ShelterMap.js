import React, { useEffect } from 'react';
import { fetchShelterData } from './api';

function ShelterMap() {
  useEffect(() => {
    const loadMap = async () => {
      const shelterData = await fetchShelterData();

      // 카카오 지도 초기화
      const mapContainer = document.getElementById('map');
      const mapOption = { 
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표로 초기화
        level: 7 // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 대피소 마커 표시
      shelterData.forEach((shelter) => {
        const markerPosition = new window.kakao.maps.LatLng(shelter.latitude, shelter.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div>${shelter.name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });
      });
    };
    loadMap();
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

export default ShelterMap;
