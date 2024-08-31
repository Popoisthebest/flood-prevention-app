const path = require('path');

module.exports = {
  // 기타 설정...

  resolve: {
    fallback: {
      "timers": require.resolve("timers-browserify"),
      // 다른 필요한 폴리필 추가
    }
  },

  // 기타 설정...
};
