import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Papa from 'papaparse';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = {
  lat: 37.5665,  // 서울의 기본 위도
  lng: 126.9780  // 서울의 기본 경도
};

function ShelterMap() {
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    const fetchShelterData = async () => {
      const response = await fetch('/output_file_with_latlng.csv');
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder('euc-kr');
      const text = decoder.decode(new Uint8Array(buffer));

      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const shelterData = results.data.map(item => ({
            name: item['대피소명'],
            address: item['소재지'],
            latitude: parseFloat(item['위도']),
            longitude: parseFloat(item['경도']),
          }));
          setShelters(shelterData);
        }
      });
    };

    fetchShelterData();

    // 현재 위치를 가져와서 지도 중심으로 설정하고 현재 위치에 마커 추가
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("User's Current Location:", userLocation); // 위치 정보 확인용 로그
        setCurrentPosition(userLocation);
        setShelters(prevShelters => [
          ...prevShelters,
          { 
            name: "내 위치", 
            address: "현재 위치", 
            latitude: userLocation.lat, 
            longitude: userLocation.lng, 
            isCurrentLocation: true  // 내 위치 표시를 위해 플래그 추가
          }
        ]);
      },
      (error) => {
        console.error("현재 위치를 가져올 수 없습니다.", error);
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDzRaJvYNRbafCNmrOrtZRYCsoUy4yiRxo">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={15}  // 줌 레벨을 더 높게 설정
      >
        {shelters.map((shelter, index) => (
          <Marker
            key={index}
            position={{ lat: shelter.latitude, lng: shelter.longitude }}
            onClick={() => {
              setSelectedShelter(shelter);
            }}
            icon={shelter.isCurrentLocation ? { 
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  // 내 위치를 나타내는 아이콘 URL
            } : undefined}
          />
        ))}

        {selectedShelter && (
          <InfoWindow
            position={{
              lat: selectedShelter.latitude,
              lng: selectedShelter.longitude
            }}
            onCloseClick={() => {
              setSelectedShelter(null);
            }}
          >
            <div>
              <h2>{selectedShelter.name}</h2>
              <p>{selectedShelter.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default ShelterMap;
