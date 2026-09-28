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
  const promptPath = document.getElementById('terminal-pwd');
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
    lines.insertBefore(line, form);
    lines.scrollTop = lines.scrollHeight;
  };
  const promptLocation = () => `~${cwd.length ? '/' + cwd.join('/') : ''}`;
  const setPrompt = () => { promptPath.textContent = promptLocation(); };
  const addCommandLine = command => {
    const line = document.createElement('div'); line.className = 'terminal-command-history';
    const head = document.createElement('div'); head.className = 'prompt-head';
    [['prompt-branch', '┌──('], ['prompt-user', 'jason@Jason'], ['prompt-branch', ')-['], ['prompt-path', promptLocation()], ['prompt-branch', ']']].forEach(([className, text]) => { const span = document.createElement('span'); span.className = className; span.textContent = text; head.append(span); });
    const row = document.createElement('div'); row.className = 'prompt-command-history';
    const symbol = document.createElement('span'); symbol.className = 'prompt-symbol'; symbol.textContent = '└─$';
    const text = document.createElement('span'); text.textContent = command;
    row.append(symbol, text); line.append(head, row); lines.insertBefore(line, form); lines.scrollTop = lines.scrollHeight;
  };
  const clearScreen = () => { lines.replaceChildren(form); input.focus(); lines.scrollTop = lines.scrollHeight; };
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
  async function showLs(directory = cwd, showHidden = false, longFormat = false) {
    if (!directory.length) {
      const repos = await listRepos();
      if (!repos.length) { addLine('没有找到公开仓库。'); return; }
      repos.forEach(repo => addLine(`${repo.name}/` + (repo.description ? `  — ${repo.description}` : ''), 'directory'));
      addLine('进入项目：cd 项目名');
      return;
    }
    const [repo, ...folders] = directory;
    const entries = await getJson(pathUrl(repo, folders.join('/')));
    const items = Array.isArray(entries) ? entries : [entries];
    const visible = items.filter(item => ['dir', 'file'].includes(item.type) && (showHidden || !item.name.startsWith('.')));
    if (!visible.length) { addLine('此目录为空。'); return; }
    visible.forEach(item => {
      const name = item.type === 'dir' ? `${item.name}/` : item.name;
      const detail = longFormat ? `${item.type === 'dir' ? '目录' : '文件'}\t${item.size ?? 0} B\t` : '';
      addLine(detail + name, item.type === 'dir' ? 'directory' : 'file');
    });
  }
  function showHelp() {
    addLine('可用命令：');
    addLine('  ls [-a] [-l] [路径] 显示当前目录或指定路径（-a 含隐藏文件，-l 详细信息）');
    addLine('  cd <项目/目录>      进入仓库或子目录');
    addLine('  cd . / ./           留在当前目录');
    addLine('  cd .. / ../         返回上一级');
    addLine('  cd ../项目/目录     使用相对路径跳转');
    addLine('  cd ~/项目 或 /项目  从根目录跳转');
    addLine('  cat <文件路径>     查看公开仓库中的文件');
    addLine('  vim <文件路径>     只读 Vim 风格查看器（:q 退出）');
    addLine('  pwd                 显示当前虚拟路径');
    addLine('  person              查看个人简介');
    addLine('  clear               清空终端');
    addLine('Tab 补全命令、公开目录和文件；↑/↓ 浏览命令历史。');
    addLine('vim 中：hjkl/方向键移动，v/V 选择，y 复制，yy 复制当前行，:q 退出。');
    addLine('只读模式不会修改文件；复制需要浏览器剪贴板权限。');
  }
  async function run(raw) {
    const command = raw.trim();
    if (!command) return;
    addCommandLine(command);
    const [verb, ...args] = command.split(/\s+/);
    try {
      if (verb === 'help') showHelp();
      else if (verb === 'person') {
        addLine('叶子森（Jason Ye）｜西安电子科技大学计算机科学与技术硕士。');
        addLine('研究方向：入侵检测与网络安全；熟悉 C/C++、Python。');
        addLine('输入 ls 浏览 GitHub 公开项目，输入 help 查看命令。');
      } else if (verb === 'clear') clearScreen();
      else if (verb === 'pwd') addLine('/' + cwd.join('/'));
      else if (verb === 'ls') {
        const flags = new Set(args.filter(arg => arg.startsWith('-')).flatMap(arg => [...arg.slice(1)]));
        if ([...flags].some(flag => !['a', 'l'].includes(flag))) throw new Error('ls 支持 -a、-l 和 -la/-al。');
        const target = args.filter(arg => !arg.startsWith('-')).join(' ');
        const directory = target ? await resolveDirectory(target) : cwd;
        if (!directory) throw new Error(`找不到目录：${target}`);
        await showLs(directory, flags.has('a'), flags.has('l'));
      }
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
        setPrompt();
      } else if (verb === 'cat' || verb === 'vim') {
        if (!cwd.length) throw new Error(`请先 cd 进入一个公开项目，再使用 ${verb} <文件路径>。`);
        const requestedPath = args.join(' ');
        if (!requestedPath) throw new Error(`用法：${verb} <文件路径>`);
        const [repo, ...currentFolders] = cwd;
        let folders = [...currentFolders];
        let filePath = requestedPath.replace(/^\.\//, '');
        if (filePath.startsWith('/')) { folders = []; filePath = filePath.replace(/^\/+/, ''); }
        for (const part of filePath.split('/')) {
          if (!part || part === '.') continue;
          if (part === '..') { if (folders.length) folders.pop(); else throw new Error('路径不能离开当前公开仓库。'); }
          else folders.push(part);
        }
        const file = await getJson(pathUrl(repo, folders.join('/')));
        if (Array.isArray(file) || file.type !== 'file') throw new Error('目标不是文件；cat 和 vim 只读取公开仓库中的文件。');
        let content;
        if (typeof file.content === 'string' && file.content.trim()) {
          const bytes = Uint8Array.from(atob(file.content.replace(/\s/g, '')), char => char.charCodeAt(0));
          content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
        } else if (file.download_url) {
          const response = await fetch(file.download_url);
          if (!response.ok) throw new Error(`文件读取失败（${response.status}）。`);
          content = await response.text();
        } else throw new Error('GitHub API 未返回文件内容。');
        if (verb === 'cat') { addLine(''); content.split('\n').forEach(line => addLine(line)); }
        else openVim(repo + '/' + folders.join('/'), content);
      } else addLine(`未找到命令：${verb}。输入 help 查看可用命令。`, 'error');
    } catch (error) { addLine(error.message || '读取失败，请稍后再试。', 'error'); }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    const command = input.value; input.value = ''; if (command.trim()) history.push(command); historyIndex = history.length; tabState = null; busy = true; input.disabled = true;
    try { await run(command); } finally { busy = false; input.disabled = false; if (vimViewer.hidden) input.focus(); }
  });
  document.getElementById('terminal-clear').addEventListener('click', clearScreen);
  const vimViewer = document.getElementById('vim-viewer');
  const vimContent = document.getElementById('vim-content');
  let vimLineHeight = 22;
  let visualMode = null;
  let visualAnchor = 0;
  let cursorColumn = null;
  let pendingYank = false;
  const vimExCommand = document.getElementById('vim-ex-command');
  function vimTextNode() { return vimContent.firstChild; }
  let vimCursorIndex = 0;
  function cursorPosition() {
    if (visualMode) return vimCursorIndex;
    const selection = window.getSelection(); const node = vimTextNode();
    if (selection && selection.focusNode === node) return selection.focusOffset;
    return 0;
  }
  function placeCursor(position) {
    const node = vimTextNode(); if (!node) return;
    const offset = Math.max(0, Math.min(position, node.length));
    vimCursorIndex = offset;
    const range = document.createRange(); range.setStart(node, offset); range.collapse(true);
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
  }
  function updateVisualSelection(position) {
    const node = vimTextNode(); if (!node) return;
    let start = Math.min(visualAnchor, position), end = Math.max(visualAnchor, position);
    if (visualMode === 'line') {
      const text = node.textContent;
      start = text.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
      const lineEnd = text.indexOf('\n', end);
      end = lineEnd < 0 ? text.length : lineEnd + 1;
    } else if (end < node.length) end += 1;
    const range = document.createRange(); range.setStart(node, start); range.setEnd(node, Math.max(start, end));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
  }
  function setVimCursor(position) {
    const node = vimTextNode(); if (!node) return;
    const offset = Math.max(0, Math.min(position, node.length));
    vimCursorIndex = offset;
    if (visualMode) updateVisualSelection(offset); else placeCursor(offset);
    const selection = window.getSelection();
    if (selection?.focusNode === node) {
      const range = document.createRange(); range.setStart(node, Math.min(offset, node.length)); range.collapse(true);
      const rect = range.getBoundingClientRect(); const box = vimContent.getBoundingClientRect();
      if (rect.top < box.top) vimContent.scrollTop -= box.top - rect.top;
      else if (rect.bottom > box.bottom) vimContent.scrollTop += rect.bottom - box.bottom;
    }
  }
  async function yankSelection(text) {
    try {
      await navigator.clipboard.writeText(text);
      document.getElementById('vim-mode').textContent = `YANKED ${text.length} CHARACTERS`;
      return true;
    } catch {
      document.getElementById('vim-mode').textContent = 'Clipboard unavailable — selection kept; press Ctrl+C';
      return false;
    }
  }
  function openVim(filename, content) {
    document.getElementById('vim-filename').textContent = filename;
    vimContent.textContent = content;
    vimViewer.hidden = false;
    vimLineHeight = parseFloat(getComputedStyle(vimContent).lineHeight) || 22;
    vimExCommand.hidden = true; vimExCommand.value = '';
    visualMode = null; visualAnchor = 0; cursorColumn = null; pendingYank = false; vimCursorIndex = 0;
    document.getElementById('vim-mode').textContent = '-- NORMAL --';
    vimContent.scrollTop = 0; vimContent.scrollLeft = 0; vimContent.focus();
    requestAnimationFrame(() => setVimCursor(0));
  }
  function closeVim() { vimViewer.hidden = true; vimExCommand.hidden = true; vimExCommand.value = ''; input.focus(); }
  vimExCommand.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const command = vimExCommand.value.trim().replace(/^:/, '');
      if (command === 'q' || command === 'q!') closeVim();
      else {
        document.getElementById('vim-mode').textContent = command.startsWith('w') ? 'E45: readonly file — changes are not saved' : `Unknown command: ${command}`;
        vimExCommand.hidden = true; vimContent.focus();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault(); vimExCommand.hidden = true; vimExCommand.value = ''; vimContent.focus();
      document.getElementById('vim-mode').textContent = '-- VIEW ONLY --';
    }
  });
  vimContent.addEventListener('beforeinput', event => event.preventDefault());
  vimContent.addEventListener('paste', event => event.preventDefault());
  vimContent.addEventListener('cut', event => event.preventDefault());
  vimContent.addEventListener('drop', event => event.preventDefault());
  document.addEventListener('keydown', async event => {
    if (vimViewer.hidden) return;
    if (event.target === vimExCommand) return;
    if ((!visualMode && event.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) ||
        ((event.ctrlKey || event.metaKey) && ['a', 'c'].includes(event.key.toLowerCase()))) return;
    const mode = document.getElementById('vim-mode');
    const node = vimTextNode(); if (!node) return;
    const text = node.textContent;
    const length = node.length;
    const current = Math.min(cursorPosition(), Math.max(0, length - 1));
    const lineStart = index => text.lastIndexOf('\n', Math.max(0, index - 1)) + 1;
    const lineEnd = index => { const at = text.indexOf('\n', index); return at < 0 ? Math.max(0, length - 1) : Math.max(index, at - 1); };
    let next = current;
    let handled = true;
    if (event.key === ':') {
      event.preventDefault(); vimExCommand.hidden = false; vimExCommand.value = ':'; mode.textContent = 'COMMAND'; vimExCommand.focus(); vimExCommand.setSelectionRange(1, 1); return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (visualMode) { visualMode = null; placeCursor(current); }
      pendingYank = false;
      mode.textContent = '-- NORMAL --';
      return;
    }
    if (event.key === 'q') { event.preventDefault(); return; }
    if (event.key === 'v' || event.key === 'V') {
      event.preventDefault();
      if (visualMode) { visualMode = null; mode.textContent = '-- NORMAL --'; placeCursor(current); }
      else { visualMode = event.key === 'V' ? 'line' : 'char'; visualAnchor = current; mode.textContent = visualMode === 'line' ? '-- VISUAL LINE --' : '-- VISUAL --'; updateVisualSelection(current); }
      return;
    }
    if (event.key === 'y') {
      event.preventDefault();
      if (visualMode) {
        const selection = window.getSelection(); const selected = selection?.toString() || '';
        visualMode = null; pendingYank = false; const copied = await yankSelection(selected); if (copied) placeCursor(vimCursorIndex); mode.textContent = copied ? `-- NORMAL --  ${selected.length} chars yanked` : 'Selection kept — press Ctrl+C to copy';
      } else if (pendingYank) {
        const start = lineStart(current), end = lineEnd(current);
        const selected = text.slice(start, end + (text[end + 1] === '\n' ? 1 : 0));
        const range = document.createRange(); range.setStart(node, start); range.setEnd(node, Math.min(length, start + selected.length));
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        pendingYank = false; const copied = await yankSelection(selected); if (copied) placeCursor(vimCursorIndex);
      } else { pendingYank = true; mode.textContent = 'y'; }
      return;
    }
    if (pendingYank) { pendingYank = false; mode.textContent = visualMode ? '-- VISUAL --' : '-- NORMAL --'; }
    const start = lineStart(current), end = lineEnd(current), column = cursorColumn ?? (current - start);
    if (event.key === 'h' || event.key === 'ArrowLeft') next = Math.max(start, current - 1);
    else if (event.key === 'l' || event.key === 'ArrowRight') next = Math.min(end, current + 1);
    else if (event.key === 'j' || event.key === 'ArrowDown' || event.key === 'k' || event.key === 'ArrowUp') {
      const down = event.key === 'j' || event.key === 'ArrowDown';
      const targetStart = down ? (text.indexOf('\n', end) < 0 ? -1 : text.indexOf('\n', end) + 1) : start - 1;
      if (targetStart >= 0) {
        const targetEnd = lineEnd(targetStart); next = Math.min(targetStart + column, targetEnd); cursorColumn = column;
      }
    } else if (event.key === '0' || event.key === 'Home') { next = start; cursorColumn = 0; }
    else if (event.key === '$' || event.key === 'End') { next = end; cursorColumn = null; }
    else if (event.key === 'w') { const match = /\w+|\W+/.exec(text.slice(current + 1)); next = match ? current + 1 + match[0].length : length - 1; cursorColumn = null; }
    else if (event.key === 'b') { const before = text.slice(0, current).match(/\w+|\W+$/); next = before ? Math.max(0, current - before[0].length) : 0; cursorColumn = null; }
    else if (event.key === 'g') { next = 0; cursorColumn = null; }
    else if (event.key === 'G') { next = Math.max(0, length - 1); cursorColumn = null; }
    else if (event.key === 'H' || event.key === 'M' || event.key === 'L') {
      const rows = text.split('\n');
      const currentRow = text.slice(0, current).split('\n').length - 1;
      const visibleRows = Math.max(1, Math.floor(vimContent.clientHeight / vimLineHeight));
      const targetRow = event.key === 'H' ? Math.max(0, currentRow - Math.floor(visibleRows / 2)) : event.key === 'M' ? Math.min(rows.length - 1, currentRow + Math.floor(visibleRows / 2)) : Math.min(rows.length - 1, currentRow + visibleRows - 1);
      next = rows.slice(0, targetRow).reduce((sum, row) => sum + row.length + 1, 0); cursorColumn = null;
    }
    else if (event.key === 'PageDown' || event.key === ' ' || (event.ctrlKey && event.key.toLowerCase() === 'f')) { vimContent.scrollTop += vimContent.clientHeight * .85; handled = true; }
    else if (event.key === 'PageUp' || (event.ctrlKey && event.key.toLowerCase() === 'b')) { vimContent.scrollTop -= vimContent.clientHeight * .85; handled = true; }
    else handled = false;
    if (handled) {
      event.preventDefault();
      if (!['PageDown', 'PageUp', ' '].includes(event.key) && !(event.ctrlKey && ['f', 'b'].includes(event.key.toLowerCase()))) {
        cursorColumn ??= next - lineStart(next);
        setVimCursor(next);
      }
    } else if (event.key.length === 1 || event.key.startsWith('Arrow')) event.preventDefault();
  }, true);
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
  async function completionCandidates(directory = cwd, includeFiles = false) {
    if (!directory.length) return (await listRepos()).map(repo => repo.name + '/');
    const [repo, ...folders] = directory;
    const entries = await getJson(pathUrl(repo, folders.join('/')));
    return (Array.isArray(entries) ? entries : [entries]).filter(item => item.type === 'dir' || (includeFiles && item.type === 'file')).map(item => item.name + (item.type === 'dir' ? '/' : ''));
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
        const value = input.value; const match = value.match(/^(\s*)(?:(cd|cat|vim|ls)\s+)?(.*)$/);
        if (!match) return;
        const commandPrefix = match[1] + (match[2] ? match[2] + ' ' : '');
        const token = match[3];
        const commands = ['ls', 'cd', 'cat', 'vim', 'person', 'help', 'pwd', 'clear'];
        let tokenPrefix = '';
        let candidates;
        if (!match[2]) candidates = commands;
        else if (match[2] === 'ls' && token.startsWith('-') && !token.includes('/')) candidates = ['-a', '-l', '-al', '-la'];
        else if (match[2] === 'cat' || match[2] === 'vim' || match[2] === 'cd' || match[2] === 'ls') {
          const slash = token.lastIndexOf('/');
          tokenPrefix = slash >= 0 ? token.slice(0, slash + 1) : '';
          const parentPath = slash >= 0 ? (slash === 0 ? '/' : token.slice(0, slash)) : '';
          const directory = parentPath ? await resolveDirectory(parentPath) : cwd;
          const includeFiles = match[2] === 'cat' || match[2] === 'vim' || match[2] === 'ls';
          candidates = directory ? await completionCandidates(directory, includeFiles) : [];
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
        input.setSelectionRange(input.value.length, input.value.length); lines.scrollTop = lines.scrollHeight;
      } catch (error) { addLine(error.message || '补全失败。', 'error'); }
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === 'l') { event.preventDefault(); clearScreen(); }
    if (event.ctrlKey && event.key.toLowerCase() === 'c') { event.preventDefault(); addCommandLine(`${input.value}^C`); input.value = ''; }
    tabState = null;
  });
  document.querySelector('.terminal').addEventListener('click', event => { if (!event.target.closest('button, .vim-viewer')) input.focus(); });
  addLine('欢迎来到 Jason 的项目空间。输入 help 查看命令，或输入 ls 浏览公开项目。');
  addLine('');
  lines.append(form);
}
