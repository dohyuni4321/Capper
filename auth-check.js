(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token === 'capper_verified') {
    // 1. Capper를 통해 정상 진입한 경우: 세션 인증 도장 찍기
    sessionStorage.setItem('capper_auth', 'true');
    
    // 2. 주소창에서 ?token=capper_verified 즉시 삭제 및 정리
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    
  } else {
    // 3. 토큰도 없고 세션 인증도 없는 경우 (무단 접속 차단)
    if (sessionStorage.getItem('capper_auth') !== 'true') {
      
      // 즉시 원하는 링크로 강제 이동 (딜레이 없음)
      window.location.replace('https://www.youtube.com/shorts/KYgKgfLCBo8');
      
      // 혹시 리다이렉트 되기 전에 잠깐 보일 수 있는 비상 경고 화면 (문구 제거됨)
      document.addEventListener('DOMContentLoaded', () => {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(800, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.3);
        } catch(e) {}

        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #f02828; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; z-index: 999999; margin: 0; box-sizing: border-box; overflow: hidden; text-align: center;">
            <div style="max-width: 800px; width: 100%;">
              <h1 style="font-size: 72px; font-weight: 900; margin: 0 0 20px 0; letter-spacing: -2px; line-height: 1.1;">불법접근</h1>
              <p style="font-size: 28px; font-weight: 700; margin: 0; line-height: 1.4;">불법 접근이 감지되었습니다.</p>
            </div>
          </div>
        `;
      });
    }
  }
})();
