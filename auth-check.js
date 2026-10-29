// auth-check.js
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  // 1. Capper를 통해 정상적으로 들어온 경우
  if (token === 'capper_verified') {
    // 주소창에서 ?token=capper_verified를 깔끔하게 지워버림 (유출 방지)
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  } else {
    // 2. 토큰 없이 직접 들어온 경우 (불법 접근 차단)
    document.body.innerHTML = `
      <div style="background-color: #2b2d31; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; text-align: center; padding: 20px;">
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 30px; border-radius: 16px; max-width: 400px;">
          <h2 style="color: #f87171; font-size: 22px; margin-bottom: 12px; font-weight: bold;">🚫 불법 접근 (Unauthorized)</h2>
          <p style="color: #d1d5db; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            이 게임은 <strong>Capper</strong> 플랫폼을 통해서만 플레이할 수 있습니다.<br>무단 링크 공유나 직접 접속은 허용되지 않습니다.
          </p>
          <a href="https://dohyuni4321.github.io/Capper/" style="background-color: #4f46e5; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; display: inline-block;">
            Capper로 이동하기
          </a>
        </div>
      </div>
    `;
  }
});
