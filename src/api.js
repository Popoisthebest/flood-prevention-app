import axios from 'axios';
import xml2js from 'xml2js';

const API_KEY = 'j73TTQYeGG5TZMEpdW8z6XIfoYy+jH0LCknMjY+1iYkMuoO6NNEV0NSyuIDodmhbkoDqDa+Dd4Jz3bmw487ErA==';
const BASE_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

function getPreviousDateTime() {
  const now = new Date();
  now.setDate(now.getDate()); // 현재 날짜로 설정
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  const base_date = `${year}${month}${date}`;
  
  return { base_date };
}

export async function fetchWeatherData(nx, ny) {
  try {
    const { base_date } = getPreviousDateTime();
    console.log('Request Parameters:', { nx, ny, base_date });

    const response = await axios.get(BASE_URL, {
      params: {
        serviceKey: API_KEY,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'XML',
        base_date,
        base_time: '0630',
        nx,
        ny,
      }
    });

    console.log('API Response:', response.data);

    // XML 파싱
    const parsedResponse = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });

    const items = parsedResponse.response.body[0].items[0].item;

    if (!items) {
      console.log('Full Response Data:', response.data);
      throw new Error('Invalid API response structure');
    }

    // 모든 POP 요소 추출
    const popValues = items
      .filter(item => item.category[0] === 'POP')
      .map(item => parseFloat(item.fcstValue[0]));

    // POP 값들의 평균 계산
    const avgPop = popValues.length > 0 ? popValues.reduce((a, b) => a + b, 0) / popValues.length : 0;

    console.log('Precipitation Probability (POP) Data:', avgPop);

    // 강수 확률을 반환
    return {
      precipitationProbability: avgPop,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return { precipitationProbability: 0 };
  }
}

// 예시로 fetchWeatherData 함수 호출 후 결과를 콘솔에 출력
fetchWeatherData(55, 127)
  .then(data => {
    console.log(`종합된 강수 확률: ${data.precipitationProbability}%`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
