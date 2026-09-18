const languageButton = document.getElementById('language');
function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-ko]').forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  languageButton.innerHTML = (language === 'en' ? 'KO' : 'EN') + ' <span aria-hidden="true">↗</span>';
  languageButton.setAttribute('aria-label', language === 'en' ? '한국어로 변경' : 'Switch to English');
  const pageTitle = document.documentElement.dataset[language === 'en' ? 'pageEn' : 'pageKo'];
  document.title = pageTitle ? pageTitle + ' | FluxMotion' : (language === 'en' ? 'FluxMotion — PCB Motors for Robot Joints' : '플럭스모션 — PCB 기반 로봇관절 모터');
  try { localStorage.setItem('fluxmotion-language', language); } catch {}
}
languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'ko' : 'en'));
try { if (localStorage.getItem('fluxmotion-language') === 'ko') setLanguage('ko'); } catch {}
const menu = document.getElementById('mega-menu');
const triggers = [...document.querySelectorAll('.nav-trigger, .mobile-menu')];
const header = document.querySelector('.site-header');
function showMenu(show) {
  menu.hidden = !show;
  triggers.forEach(button => button.setAttribute('aria-expanded', String(show)));
}
triggers.forEach(button => {
  button.addEventListener('click', () => showMenu(button.classList.contains('mobile-menu') ? menu.hidden : true));
  button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && window.innerWidth > 760) showMenu(true); });
});
header.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse' && !header.contains(document.activeElement)) showMenu(false); });
header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) showMenu(false); });
document.addEventListener('click', event => { if (!header.contains(event.target)) showMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { showMenu(false); triggers[0].focus(); } });
