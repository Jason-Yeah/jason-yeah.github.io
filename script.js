'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
let statusTimer;
copyButton.addEventListener('click', async () => {
  clearTimeout(statusTimer);
  try {
    await navigator.clipboard.writeText('jasonye247@gmail.com');
    copyStatus.textContent = '邮箱已复制';
  } catch {
    copyStatus.textContent = '请手动复制上方邮箱地址';
  }
  statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 4500);
});
if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
