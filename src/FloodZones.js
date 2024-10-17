import React from 'react';

function FloodZones() {
  return (
    <div className="flood-zones-container">
      <h2>홍수 다수 발생 지역 및 특징</h2>

      {/* 서구 용문동 */}
      <div className="flood-zone">
        <h3>1. 서구 용문동</h3>
        <div className="flood-images">
          <img src="/assets/KakaoTalk_Photo_2024-09-17-22-57-23.png" alt="서구 용문동 홍수 피해 이미지 1" />
          <img src="/assets/KakaoTalk_Photo_2024-09-17-22-57-35.png" alt="서구 용문동 홍수 피해 이미지 2" />
        </div>
        <p><strong>홍수가 발생하는 이유:</strong> 서구 용문동은 바로 앞 유등천과 맞닿아 있으며, 저지대에 위치해 비가 오면 물이 모여 하천 범람 피해가 자주 발생합니다.</p>
        <p><strong>문제의 심각성:</strong> 물에 젖은 물품들이 거리 곳곳에 쌓여 있으며, 도로는 하수구에서 역류한 토사로 덮여 악취가 발생합니다. 차량이 물에 잠겨 엔진 피해를 입고, 공식 홍수 대피소는 1곳에 불과해 피해 대응이 어렵습니다.</p>
        <p><strong>출처:</strong> <a href="https://m.joongdo.co.kr/view.php?key=20240710010003262" target="_blank" rel="noopener noreferrer">중도일보</a>, <a href="https://m.naeil.com/news/read/517830" target="_blank" rel="noopener noreferrer">내일신문</a></p>
      </div>

      {/* 서구 용촌동 (정뱅이 마을) */}
      <div className="flood-zone">
        <h3>2. 서구 용촌동 (정뱅이 마을)</h3>
        <div className="flood-images">
          <img src="/assets/KakaoTalk_Photo_2024-09-17-22-57-46.png" alt="서구 용촌동 홍수 피해 이미지 1" />
          <img src="/assets/KakaoTalk_Photo_2024-09-17-22-57-54.png" alt="서구 용촌동 홍수 피해 이미지 2" />
        </div>
        <p><strong>홍수가 발생하는 이유:</strong> 마을이 저지대에 있고, 인근 하천은 계룡산과 대둔산에서 내려오는 물이 합류하는 지점이라 홍수 피해에 취약합니다. 평촌 산업단지가 들어서면서 빗물이 하천으로 유입돼 유량과 유속이 급증하여 피해를 가중시킵니다.</p>
        <p><strong>문제의 심각성:</strong> 정뱅이 마을 인근의 제방이 무너지면서 마을 전체가 침수되고, 토사가 마을을 덮쳐 도로가 진흙으로 뒤덮였습니다. 피해 발생 두 달이 지났지만 아직도 완전히 복구되지 않았습니다.</p>
        <p><strong>출처:</strong> <a href="https://m.joongdo.co.kr/view.php?key=20240717010005569" target="_blank" rel="noopener noreferrer">중도일보</a>, <a href="https://www.newstnt.com/news/articleView.html?idxno=390064" target="_blank" rel="noopener noreferrer">뉴스TNT</a></p>
      </div>
      {/* 추가 지역 정보 */}
      <div className="flood-zone">
        <h3>추가 저지대 침수 위험 지역</h3>
        <p><strong>저지대 침수 위험 동네:</strong> 동구-중앙동, 삼성동, 신인동</p>
        <p><strong>유성구:</strong> 봉명동</p>
        <p><strong>서구:</strong> 정림동</p>
        <p><strong>홍수 발생 이유:</strong> 이 지역들은 하천과 가까이 있고, 도시 구조 자체가 저지대이기 때문에 비가 올 때 물이 쉽게 고이는 문제가 있습니다.</p>
      </div>
    </div>
  );
}

export default FloodZones;
