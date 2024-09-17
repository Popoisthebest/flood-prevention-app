import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api';

function FloodProbability() {
  const [probability, setProbability] = useState(null);
  const [rainfall, setRainfall] = useState(null);

  useEffect(() => {
    const getProbability = async () => {
      const weatherData = await fetchWeatherData(55, 127); // 예: 특정 위치의 격자 좌표
      const rainfallValue = weatherData.rainfall;
      setRainfall(rainfallValue);
      const calculatedProbability = calculateFloodProbability(rainfallValue);
      setProbability(calculatedProbability);
    };
    getProbability();
  }, []);

  const calculateFloodProbability = (rainfall) => {
    // 강수량에 따라 홍수 확률 계산
    if (rainfall > 100) return 90;
    if (rainfall > 50) return 60;
    if (rainfall > 20) return 30;
    return 10;
  };

  return (
    <div>
      <h2>홍수 확률</h2>
      {rainfall !== null && <p>현재 강수량: {rainfall}mm</p>}
      {probability !== null ? (
        <p>현재 홍수 확률은 {probability}%입니다.</p>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}

export default FloodProbability;
