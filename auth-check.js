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
        // 고딕체 적용 및 버튼 제거된 강렬한 빨간색 풀스크린 경고 화면
        document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #f02828; color: white; display: flex; flex-direction: column; justify-content: center; padding: 60px; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; z-index: 999999; margin: 0; box-sizing: border-box; overflow: hidden;">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%; max-width: 1200px; margin: 0 auto;">
              <div>
                <h1 style="font-size: 84px; font-weight: 900; margin: 0 0 20px 0; letter-spacing: -2px; line-height: 1.1; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;">불법접근</h1>
                <p style="font-size: 32px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.4; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;">불법 접근이 감지되었습니다.</p>
                <p style="font-size: 32px; font-weight: 700; margin: 0; line-height: 1.4; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;">Capper 플랫폼을 통한 접근 이외는 보안 위반으로 간주됩니다.</p>
              </div>

              <!-- 주의/경고 삼각형 아이콘 -->
              <div style="margin-left: 40px; flex-shrink: 0;">
                <svg width="220" height="190" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
                  <path d="M12 0L23.4282 20.25H0.571796L12 0Z" fill="white" fill-opacity="0.15"/>
                  <path d="M12 1.5L22.2552 19.5H1.7448L12 1.5Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M12 7V13" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="12" cy="16.5" r="1.5" fill="white"/>
                </svg>
              </div>
            </div>

          </div>
        `;
      });
    }
  }
})();
