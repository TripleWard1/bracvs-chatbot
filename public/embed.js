/**
 * Widget Bracvs para o visitbraga.travel
 * Uso: <script src="https://O-TEU-DOMINIO.vercel.app/embed.js" defer></script>
 * Injeta um botão flutuante que abre o chat num painel.
 */
(function () {
  var ORIGIN = document.currentScript && document.currentScript.src
    ? new URL(document.currentScript.src).origin
    : '';
  if (!ORIGIN) return;

  var open = false;

  // Botão flutuante
  var btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Bracvs — Visit Braga chat');
  btn.style.cssText =
    'position:fixed;bottom:20px;right:20px;z-index:99998;width:60px;height:60px;' +
    'border-radius:50%;border:none;cursor:pointer;background:#1d4e89;' +
    'box-shadow:0 4px 16px rgba(0,0,0,.25);display:grid;place-items:center;';
  btn.innerHTML =
    '<svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">' +
    '<path d="M11 30 V20 a9 9 0 0 1 18 0 V30" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>' +
    '<circle cx="20" cy="17" r="2.2" fill="#b98a2f"/></svg>';

  // Painel com iframe
  var panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;bottom:92px;right:20px;z-index:99999;width:380px;height:600px;' +
    'max-width:calc(100vw - 24px);max-height:calc(100dvh - 110px);' +
    'border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.3);' +
    'display:none;background:#fff;';
  var frame = document.createElement('iframe');
  frame.src = ORIGIN;
  frame.title = 'Bracvs — Visit Braga';
  frame.style.cssText = 'width:100%;height:100%;border:0;';
  panel.appendChild(frame);

  btn.addEventListener('click', function () {
    open = !open;
    panel.style.display = open ? 'block' : 'none';
    btn.style.background = open ? '#143a68' : '#1d4e89';
  });

  document.body.appendChild(panel);
  document.body.appendChild(btn);
})();
