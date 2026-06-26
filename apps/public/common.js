// common.js - React 앱에서는 React 컴포넌트로 처리됨

/* 브라우저 확대/축소 방지 */
(function() {
  // Ctrl + +/-/0 키보드 단축키 방지
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0')) {
      e.preventDefault();
    }
  });

  // Ctrl + 마우스휠 확대/축소 방지
  document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // 모바일 더블탭 확대 방지
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function(e) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // pinch zoom 방지 (두 손가락 터치)
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
})();
