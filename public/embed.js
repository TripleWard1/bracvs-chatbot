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
    'border-radius:50%;border:none;cursor:pointer;background:#f80000;' +
    'box-shadow:0 4px 16px rgba(0,0,0,.25);display:grid;place-items:center;';
  btn.innerHTML =
    '<img src="' + ORIGIN + '/bracvs-avatar.png" alt="" width="46" height="46" style="border-radius:50%;display:block;pointer-events:none;">';

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
    btn.style.background = open ? '#b50000' : '#f80000';
  });

  document.body.appendChild(panel);
  document.body.appendChild(btn);
})();
