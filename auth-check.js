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
        // 기존 문서 내용을 강제로 지우고 풀스크린 경고창 생성
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #1e1f22; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Noto Sans KR', sans-serif; z-index: 999999; margin: 0; padding: 20px; box-sizing: border-box;">
            <div style="background: #2b2d31; border: 2px solid rgba(239, 68, 68, 0.4); padding: 40px; border-radius: 20px; max-width: 500px; width: 100%; text-align: box; box-shadow: 0 20px 40px rgba(0,0,0,0.6); text-align: center;">
              <div style="font-size: 48px; margin-bottom: 15px;">🚨</div>
              <h2 style="color: #f87171; font-size: 26px; margin-bottom: 15px; font-weight: 900; letter-spacing: -0.5px;">불법 접근 경고</h2>
              <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                이 게임 페이지는 <strong style="color: #ffffff;">Capper</strong> 플랫폼을 통해서만 이용할 수 있습니다.<br>
                무단 링크 공유나 직접 접속은 엄격히 금지됩니다.
              </p>
              <a href="https://dohyuni4321.github.io/Capper/" style="background-color: #4f46e5; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-size: 15px; font-weight: bold; display: inline-block; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); transition: background 0.2s;">
                Capper 메인으로 돌아가기
              </a>
            </div>
          </div>
        `;
      });
    }
  }
})();
