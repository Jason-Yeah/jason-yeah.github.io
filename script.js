'use strict';
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
let statusTimer;
if (copyButton && copyStatus) {
  copyButton.addEventListener('click', async () => {
    clearTimeout(statusTimer);
    try { await navigator.clipboard.writeText('jasonye247@gmail.com'); copyStatus.textContent = '邮箱已复制'; }
    catch { copyStatus.textContent = '请手动复制上方邮箱地址'; }
    statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 4500);
  });
}
if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

const form = document.getElementById('terminal-form');
if (form) {
  const output = document.getElementById('terminal-output');
  const lines = document.getElementById('terminal-lines');
  const input = document.getElementById('terminal-input');
  const prompt = document.getElementById('terminal-prompt');
  const cache = new Map();
  let cwd = [];
  let busy = false;
  const history = [];
  let historyIndex = 0;
  let tabState = null;
  const owner = 'Jason-Yeah';
  const api = 'https://api.github.com';
  const addLine = (text, className = '') => {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    lines.append(line);
    output.scrollTop = output.scrollHeight;
  };
  const setPrompt = () => { prompt.textContent = `visitor@jason:~${cwd.length ? '/' + cwd.join('/') : ''}$`; };
  const clearScreen = () => { lines.replaceChildren(); input.focus(); output.scrollTop = output.scrollHeight; };
  async function getJson(url) {
    if (cache.has(url)) return cache.get(url);
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(response.status === 404 ? '找不到这个公开目录或文件。' : `GitHub API 暂时不可用（${response.status}）。请稍后重试。`);
    const data = await response.json(); cache.set(url, data); return data;
  }
  const pathUrl = (repo, path = '') => `${api}/repos/${owner}/${encodeURIComponent(repo)}/contents/${path.split('/').filter(Boolean).map(encodeURIComponent).join('/')}`;
  async function listRepos() {
    const repos = [];
    for (let page = 1; page <= 3; page++) {
      const part = await getJson(`${api}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`);
      repos.push(...part);
      if (part.length < 100) break;
    }
    return repos;
  }
  async function showLs() {
    if (!cwd.length) {
      const repos = await listRepos();
      if (!repos.length) { addLine('没有找到公开仓库。'); return; }
      repos.forEach(repo => addLine(`${repo.name}/` + (repo.description ? `  — ${repo.description}` : ''), 'directory'));
      addLine('进入项目：cd 项目名');
      return;
    }
    const [repo, ...folders] = cwd;
    const entries = await getJson(pathUrl(repo, folders.join('/')));
    const items = Array.isArray(entries) ? entries : [entries];
    const visible = items.filter(item => item.type === 'dir' || (item.type === 'file' && item.name.toLowerCase() === 'readme.md'));
    if (!visible.length) { addLine('此目录下没有可展示的子目录或 README.md。'); return; }
    visible.forEach(item => addLine(item.type === 'dir' ? `${item.name}/` : item.name, item.type === 'dir' ? 'directory' : 'file'));
  }
  function showHelp() {
    addLine('可用命令：');
    addLine('  ls                  查看公开仓库或当前目录');
    addLine('  cd <项目/目录>      进入仓库或子目录');
    addLine('  cd . / ./           留在当前目录');
    addLine('  cd .. / ../         返回上一级');
    addLine('  cd ../项目/目录     使用相对路径跳转');
    addLine('  cd ~/项目 或 /项目  从根目录跳转');
    addLine('  cat README.md       阅读当前目录的项目说明');
    addLine('  person              查看个人简介');
    addLine('  clear               清空终端');
    addLine('所有仓库内容均从 GitHub 公开 API 读取。');
  }
  async function run(raw) {
    const command = raw.trim();
    if (!command) return;
    addLine(`${prompt.textContent} ${command}`, 'command');
    const [verb, ...args] = command.split(/\s+/);
    try {
      if (verb === 'help') showHelp();
      else if (verb === 'person') {
        addLine('叶子森（Jason Ye）｜西安电子科技大学计算机科学与技术硕士。');
        addLine('研究方向：入侵检测与网络安全；熟悉 C/C++、Python。');
        addLine('输入 ls 浏览 GitHub 公开项目，输入 help 查看命令。');
      } else if (verb === 'clear') clearScreen();
      else if (verb === 'pwd') addLine('/' + cwd.join('/'));
      else if (verb === 'ls') await showLs();
      else if (verb === 'cd') {
        const target = args.join(' ');
        if (!target || target === '~' || target === '/') cwd = [];
        else {
          const absolute = target.startsWith('/') || target === '~' || target.startsWith('~/');
          const path = target.replace(/^~(?=\/|$)/, '');
          const next = absolute ? [] : [...cwd];
          let triedAboveRoot = false;
          for (const part of path.split('/').filter(Boolean)) {
            if (part === '.' ) continue;
            if (part === '..') { if (next.length) next.pop(); else triedAboveRoot = true; continue; }
            if (!next.length) {
              const repos = await listRepos();
              const repo = repos.find(item => item.name.toLowerCase() === part.toLowerCase());
              if (!repo) throw new Error('只能进入 ls 显示的公开仓库。');
              next.push(repo.name);
            } else {
              const entries = await getJson(pathUrl(next[0], next.slice(1).join('/')));
              const items = Array.isArray(entries) ? entries : [entries];
              const directory = items.find(item => item.type === 'dir' && item.name.toLowerCase() === part.toLowerCase());
              if (!directory) throw new Error('只能进入 ls 显示的公开目录。');
              next.push(directory.name);
            }
          }
          cwd = next;
          if (triedAboveRoot && !cwd.length && path.split('/').filter(Boolean).every(part => part === '..' || part === '.')) {
            addLine('已经在根目录，无法再向上。');
            return;
          }
        }
        setPrompt(); await showLs();
      } else if (verb === 'cat') {
        if (args.length !== 1 || args[0].toLowerCase() !== 'readme.md') throw new Error('为保护浏览范围，cat 仅支持 README.md。');
        if (!cwd.length) throw new Error('请先 cd 进入一个公开项目或目录。');
        const [repo, ...folders] = cwd;
        const parent = await getJson(pathUrl(repo, folders.join('/')));
        const items = Array.isArray(parent) ? parent : [parent];
        const readme = items.find(item => item.type === 'file' && item.name.toLowerCase() === 'readme.md');
        if (!readme) throw new Error('这个目录没有 README.md。');
        const file = await getJson(pathUrl(repo, [...folders, readme.name].join('/')));
        if (!file.content) throw new Error('无法读取 README.md。');
        const bytes = Uint8Array.from(atob(file.content.replace(/\s/g, '')), char => char.charCodeAt(0));
        const text = new TextDecoder().decode(bytes);
        addLine(''); text.split('\n').forEach(line => addLine(line));
      } else addLine(`未找到命令：${verb}。输入 help 查看可用命令。`, 'error');
    } catch (error) { addLine(error.message || '读取失败，请稍后再试。', 'error'); }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    const command = input.value; input.value = ''; if (command.trim()) history.push(command); historyIndex = history.length; tabState = null; busy = true; input.disabled = true;
    try { await run(command); } finally { busy = false; input.disabled = false; input.focus(); }
  });
  document.getElementById('terminal-clear').addEventListener('click', clearScreen);
  async function resolveDirectory(path) {
    const absolute = path.startsWith('/') || path === '~' || path.startsWith('~/');
    const normalized = path.replace(/^~(?=\/|$)/, '');
    const next = absolute ? [] : [...cwd];
    for (const part of normalized.split('/').filter(Boolean)) {
      if (part === '.') continue;
      if (part === '..') { next.pop(); continue; }
      if (!next.length) {
        const repos = await listRepos();
        const repo = repos.find(item => item.name.toLowerCase() === part.toLowerCase());
        if (!repo) return null;
        next.push(repo.name);
      } else {
        const entries = await getJson(pathUrl(next[0], next.slice(1).join('/')));
        const items = Array.isArray(entries) ? entries : [entries];
        const directory = items.find(item => item.type === 'dir' && item.name.toLowerCase() === part.toLowerCase());
        if (!directory) return null;
        next.push(directory.name);
      }
    }
    return next;
  }
  async function completionCandidates(directory = cwd) {
    if (!directory.length) return (await listRepos()).map(repo => repo.name + '/');
    const [repo, ...folders] = directory;
    const entries = await getJson(pathUrl(repo, folders.join('/')));
    return (Array.isArray(entries) ? entries : [entries]).filter(item => item.type === 'dir' || (item.type === 'file' && item.name.toLowerCase() === 'readme.md')).map(item => item.name + (item.type === 'dir' ? '/' : ''));
  }
  input.addEventListener('keydown', async event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault(); if (!history.length) return;
      if (event.key === 'ArrowUp') historyIndex = Math.max(0, historyIndex - 1);
      else historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || ''; input.setSelectionRange(input.value.length, input.value.length); return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      try {
        const value = input.value; const match = value.match(/^(\s*)(?:(cd|cat)\s+)?(.*)$/);
        if (!match) return;
        const commandPrefix = match[1] + (match[2] ? match[2] + ' ' : '');
        const token = match[3];
        const commands = ['ls', 'cd', 'cat', 'person', 'help', 'pwd', 'clear'];
        let tokenPrefix = '';
        let candidates;
        if (!match[2]) candidates = commands;
        else if (match[2] === 'cat') candidates = ['README.md'];
        else {
          const slash = token.lastIndexOf('/');
          tokenPrefix = slash >= 0 ? token.slice(0, slash + 1) : '';
          const parentPath = slash >= 0 ? (slash === 0 ? '/' : token.slice(0, slash)) : '';
          const directory = parentPath ? await resolveDirectory(parentPath || '/') : cwd;
          candidates = directory ? await completionCandidates(directory) : [];
        }
        const leaf = token.slice(tokenPrefix.length);
        const choices = candidates.filter(name => name.toLowerCase().startsWith(leaf.toLowerCase()));
        const makeValue = name => commandPrefix + tokenPrefix + name;
        if (choices.length === 1) input.value = makeValue(choices[0]);
        else if (choices.length > 1) {
          if (tabState === value) choices.forEach(name => addLine(name, name.endsWith('/') ? 'directory' : 'file'));
          else tabState = value;
          const common = choices.reduce((prefix, name) => { let i = 0; while (i < prefix.length && i < name.length && prefix[i].toLowerCase() === name[i].toLowerCase()) i++; return prefix.slice(0, i); });
          if (common.length > leaf.length) input.value = makeValue(common);
        }
        input.setSelectionRange(input.value.length, input.value.length); output.scrollTop = output.scrollHeight;
      } catch (error) { addLine(error.message || '补全失败。', 'error'); }
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === 'l') { event.preventDefault(); clearScreen(); }
    if (event.ctrlKey && event.key.toLowerCase() === 'c') { event.preventDefault(); addLine(`${prompt.textContent} ${input.value}^C`, 'command'); input.value = ''; }
    tabState = null;
  });
  document.querySelector('.terminal').addEventListener('click', event => { if (!event.target.closest('button')) input.focus(); });
  addLine('欢迎来到 Jason 的项目空间。输入 help 查看命令，或输入 ls 浏览公开项目。');
  addLine('');
}
