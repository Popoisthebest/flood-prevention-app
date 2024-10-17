import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import FloodCases from './FloodCases';
import FloodZones from './FloodZones';
import FloodProbability from './FloodProbability';
import ShelterMap from './ShelterMap';

function Home() {
  return (
    <div className="container">
      <h2>메인 화면</h2>
      <nav>
        <ul>
          <li>
            <Link to="/flood-cases">
              <button>홍수로 인한 피해별 예방책</button>
            </Link>
          </li>
          <li>
            <Link to="/flood-zones">
              <button>홍수 다수 발생 지역 및 특징</button>
            </Link>
          </li>
          <li>
            <Link to="/flood-probability">
              <button>홍수 확률</button>
            </Link>
          </li>
          <li>
            <Link to="/shelters">
              <button>근처 대피소</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div>
      <header>
        {location.pathname !== '/' && (
          <Link to="/" className="home-icon">
            <FaHome size={30} />
          </Link>
        )}
        <h1>홍수 알림이</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flood-cases" element={<FloodCases />} />
        <Route path="/flood-zones" element={<FloodZones />} />
        <Route path="/flood-probability" element={<FloodProbability />} />
        <Route path="/shelters" element={<ShelterMap />} />
      </Routes>
      <h5>Made by 김재민</h5>
    </div>
  );
}

export default App;
