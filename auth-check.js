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
      document.addEventListener('DOMContentLoaded', () => {
        
        // 경고음 발생
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          function playBeep() {
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
          }
          playBeep();
        } catch(e) {}

        // 강렬한 빨간색 풀스크린 경고 화면 표시
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #f02828; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; z-index: 999999; margin: 0; box-sizing: border-box; overflow: hidden; text-align: center;">
            <div style="max-width: 800px; width: 100%;">
              <h1 style="font-size: 72px; font-weight: 900; margin: 0 0 20px 0; letter-spacing: -2px; line-height: 1.1;">불법접근</h1>
              <p style="font-size: 28px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.4;">불법 접근이 감지되었습니다.</p>
              <p style="font-size: 24px; font-weight: 700; margin: 0; line-height: 1.4; opacity: 0.9;">Capper 플랫폼으로 강제 이동합니다...</p>
            </div>
          </div>
        `;

        // 1.5초(1500밀리초) 동안 경고 화면을 보여준 뒤 원하는 링크로 강제 이동 (주소는 아래에서 변경 가능)
        setTimeout(() => {
          window.location.href = 'https://www.youtube.com/shorts/KYgKgfLCBo8';
        }, 1500);
      });
    }
  }
})();
