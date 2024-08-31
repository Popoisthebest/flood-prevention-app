import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api';

function FloodProbability() {
  const [probability, setProbability] = useState(null);
  const [precipitationProbability, setPrecipitationProbability] = useState(null);

  useEffect(() => {
    const getProbability = async () => {
      const weatherData = await fetchWeatherData(55, 127);
      const avgPop = weatherData.precipitationProbability;
      setPrecipitationProbability(avgPop);
      const calculatedProbability = calculateFloodProbability(avgPop);
      setProbability(calculatedProbability);
    };
    getProbability();
  }, []);

  const calculateFloodProbability = (avgPop) => {
    if (avgPop > 80) return 90;
    if (avgPop > 60) return 70;
    if (avgPop > 40) return 50;
    if (avgPop > 20) return 30;
    return 10;
  };

  return (
    <div className="container">
      <h2>홍수 확률</h2>
      {precipitationProbability !== null && <p>현재 강수 확률: {precipitationProbability}%</p>}
      {probability !== null ? (
        <p>현재 홍수 확률은 {probability}%입니다.</p>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}

export default FloodProbability;
