import axios from 'axios';

const API_KEY = 'YOUR_SERVICE_KEY'; // 기상청 API 서비스 키를 여기에 입력하세요.
const BASE_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

export async function fetchWeatherData(nx, ny) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        serviceKey: API_KEY,     
        pageNo: '1',             
        numOfRows: '1000',       
        dataType: 'JSON',        
        base_date: '20210628',   
        base_time: '0500',       
        nx: nx,                  
        ny: ny                   
      }
    });

    const items = response.data.response.body.items.item;
    const rainfall = items.find(item => item.category === 'RN1');
    
    return {
      rainfall: rainfall ? parseFloat(rainfall.fcstValue) : 0,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { rainfall: 0 };
  }
}

// 새로 추가할 함수
export async function fetchShelterData() {
  try {
    // 한국농어촌공사 API URL과 필요한 요청 파라미터
    const response = await axios.get('https://api.example.com/shelters', {
      params: {
        serviceKey: API_KEY,
        dataType: 'JSON'
      }
    });

    const shelters = response.data.response.body.items.item.map(shelter => ({
      name: shelter.name,
      latitude: shelter.latitude,
      longitude: shelter.longitude,
    }));

    return shelters;
  } catch (error) {
    console.error('Error fetching shelter data:', error);
    return [];
  }
}
