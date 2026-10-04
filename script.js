'use strict';
const params = new URLSearchParams(location.search);
const isEnglish = params.get('lang') !== 'zh';
const languageToggle = document.getElementById('language-toggle');
if (languageToggle) languageToggle.addEventListener('click', () => {
  const next = new URL(location.href);
  if (isEnglish) next.searchParams.set('lang', 'zh'); else next.searchParams.delete('lang');
  location.href = next.href;
});
if (isEnglish) {
  document.documentElement.lang = 'en';
  document.querySelector('.hero nav')?.setAttribute('aria-label', 'Page navigation');
  document.title = 'Jason Ye | Personal Website';
  const t = (selector, value, html = false) => { const node = document.querySelector(selector); if (node) html ? node.innerHTML = value : node.textContent = value; };
  const nav = ['About', 'Research Interests', 'Publications & Patents', 'Awards', 'Projects & Experience', 'Skills & Learning', 'Contact'];
  document.querySelectorAll('.hero nav a').forEach((a, i) => { if (nav[i]) a.textContent = nav[i]; });
  t('.skip-link', 'Skip to content'); t('.hero h1', 'Hello, I’m<span> Jason Ye</span>', true);
  t('.hero-summary', 'M.S. in Computer Science and Technology, Xidian University<br>Researching intrusion detection and cybersecurity, with a passion for building systems.', true);
  t('.hero-links a:first-child', 'Contact ↗');
  t('.terminal-hint', 'Enter <code>help</code> to see available commands', true);
  t('#terminal-clear', 'Clear'); document.getElementById('terminal-clear')?.setAttribute('aria-label', 'Clear terminal output');
  t('.terminal-caption', 'A read-only browser for my work. Repository contents are retrieved from the public GitHub API.');
  t('#about', `<h2 id="about-title">About <span lang="en">Biography</span></h2><p>I’m <strong>Jason Ye (Zisen Ye)</strong>, a CPC member and master’s student in the School of Computer Science and Technology at <strong>Xidian University</strong>. I conduct research with the Network and System Security (NSS) team at the Shaanxi Key Laboratory of Network and System Security. My work focuses on <strong>intrusion detection and cybersecurity</strong>, including threat identification in network traffic, agent security, and the research and implementation of security defenses.</p><p>I have published an EI-indexed international conference paper (NaNA 2026), received multiple invention patent grants, filed patent applications, and contributed to defense, national R&amp;D, and Huawei collaboration projects. These research and engineering experiences keep me focused on connecting security challenges with practical implementation.</p><p>For development, I work with C/C++ and Python and am interested in related software engineering roles.</p><p class="education"><strong>Education:</strong> M.S., School of Computer Science and Technology, Xidian University</p>`, true);
  t('#interests', `<h2 id="interests-title">Research Interests <span lang="en">Research Interests</span></h2><ul><li><strong>Intrusion Detection:</strong> Network traffic analysis, anomaly identification, and malicious traffic detection.</li><li><strong>Cybersecurity:</strong> Network threat identification, security risk analysis, and dynamic defense.</li><li><strong>Systems Development:</strong> Building with C/C++ and Python and studying computer systems through a RISC-V emulator.</li><li><strong>AI Agent Development:</strong> Agent workflows, tool use, and task collaboration, explored through Python projects.</li></ul>`, true);
  t('#research', `<h2 id="research-title">Publications &amp; Patents <span lang="en">Publications &amp; Patents</span></h2><h3>Conference Paper</h3><ol class="entries"><li><strong><a href="https://ieeexplore.ieee.org/document/11710201" target="_blank" rel="noopener noreferrer">MineTS: Robust Cryptomining Traffic Detection Based on Temporal-Statistical Learning.</a></strong><br><em>NaNA 2026</em> · EI-indexed conference paper · <a href="https://ieeexplore.ieee.org/document/11710201" target="_blank" rel="noopener noreferrer">IEEE Xplore ↗</a><p class="entry-note">Research topic: Cryptomining traffic detection using temporal and statistical learning, with an emphasis on robust identification.</p></li></ol><h3>Patents</h3><ol class="entries"><li><strong>Method and apparatus for dynamic security defense in wireless networks based on risk evolution reasoning.</strong><br>Invention patent, <span>CN122054149B</span>, <strong>Granted</strong>.<p class="entry-note">Research topic: Risk evolution reasoning and dynamic security defense for wireless networks.</p><details class="evidence-item"><summary>View invention patent certificate</summary><object data="docs/2026101610746-发明专利证书.pdf" type="application/pdf" aria-label="CN122054149B invention patent certificate"><p>PDF preview is unavailable. <a href="docs/2026101610746-发明专利证书.pdf" target="_blank" rel="noopener noreferrer">Open certificate</a></p></object></details></li><li><strong>Method and apparatus based on ******.</strong><br>Defense-related patent; details are redacted.</li><li><strong>Dynamic prediction method and system for unknown attacks based on adaptive Kalman filtering.</strong><br>Invention patent, filing no. 2026102128303, <strong>Granted</strong>.<details class="evidence-item"><summary>View patent grant certificate</summary><object data="docs/发明专利-授权证书-2026102128303-基于自适应卡尔曼滤波的未知攻击动态预测方法及系统.pdf" type="application/pdf"><p>PDF preview is unavailable. <a href="docs/发明专利-授权证书-2026102128303-基于自适应卡尔曼滤波的未知攻击动态预测方法及系统.pdf" target="_blank" rel="noopener noreferrer">Open certificate</a></p></object></details></li><li><strong>Continuous task risk analysis for industrial Internet.</strong><br>Invention patent application, filing no. 2026110454840, <strong>Accepted</strong>.<details class="evidence-item"><summary>View patent application receipt</summary><object data="docs/2026110454840-专利申请受理通知书.pdf" type="application/pdf"><p>PDF preview is unavailable. <a href="docs/2026110454840-专利申请受理通知书.pdf" target="_blank" rel="noopener noreferrer">Open receipt</a></p></object></details></li></ol>`, true);
  t('#awards', `<h2 id="awards-title">Awards &amp; Qualifications <span lang="en">Awards &amp; Qualifications</span></h2><ul><li><strong>Third Prize, National Finals, 2nd China Graduate Open-source Innovation Competition in Operating Systems.</strong><details class="evidence-item"><summary>View award certificate</summary><object data="docs/第二届中国研究生操作系统开源创新大赛获奖证书.pdf" type="application/pdf"><p>PDF preview is unavailable. <a href="docs/第二届中国研究生操作系统开源创新大赛获奖证书.pdf" target="_blank" rel="noopener noreferrer">Open certificate</a></p></object></details></li><li><strong>First Prize, 37th Spark Cup and 2026 Challenge Cup College Students’ Entrepreneurship Plan Competition.</strong><details class="evidence-item"><summary>View Spark Cup award certificate</summary><object data="docs/星火杯一等奖证书.pdf" type="application/pdf"><p>PDF preview is unavailable. <a href="docs/星火杯一等奖证书.pdf" target="_blank" rel="noopener noreferrer">Open certificate</a></p></object></details></li><li><strong>Software Designer</strong>, Intermediate Professional Qualification.</li></ul>`, true);
  t('#projects', `<h2 id="projects-title">Projects &amp; Experience <span lang="en">Projects &amp; Experience</span></h2><article><h3>RISC-V Emulator <span class="inline-link">[<a href="https://github.com/Jason-Yeah/riscvemu-study" target="_blank" rel="noopener noreferrer">Code</a>]</span></h3><p>A personal learning project exploring RISC-V emulation. Through reading and writing code, I turn my understanding of computer architecture, instruction execution, and system behavior into working implementations.</p><p><strong>Topics:</strong> RISC-V ISA, emulator implementation, and computer systems.</p><p class="repository">Repository: <a href="https://github.com/Jason-Yeah/riscvemu-study" target="_blank" rel="noopener noreferrer">github.com/Jason-Yeah/riscvemu-study</a></p></article><article><h3>C Kernel Learning</h3><p>An open-source learning project with notes and code covering C/C++ fundamentals, operating systems, and the Linux kernel. I organize low-level concepts and deepen my understanding through experiments.</p><p class="repository">Repository: <a href="https://github.com/Jason-Yeah/c-kernel-learning" target="_blank" rel="noopener noreferrer">github.com/Jason-Yeah/c-kernel-learning</a></p></article><article><h3>Defense and Innovation Projects</h3><p>I have contributed to defense research, national R&amp;D, and Huawei collaboration projects, supporting technical discussions, integration testing, and project documentation.</p><p>1. Defense research: UAV technology (details redacted)</p><p>2. Defense research: UAV security (details redacted)</p><p>3. Defense innovation: endogenous security (details redacted)</p><p>4. National R&amp;D: Key Technologies for Highly Reliable Real-time Industrial Wireless Network Security</p><p>5. Huawei collaboration: Security risk prediction and reasoning (Phase III)</p></article><p class="entry-note">More projects and learning notes will be added here.</p>`, true);
  t('#skills', `<h2 id="skills-title">Skills &amp; Learning <span lang="en">Skills &amp; Learning</span></h2><ul><li><strong>Programming:</strong> C/C++ and Python; familiar with AI agent concepts and continuing to build practical development experience.</li><li><strong>Research:</strong> Intrusion detection and cybersecurity, including cryptomining traffic detection and dynamic defense for wireless networks.</li><li><strong>Systems:</strong> Studying computer systems through a RISC-V emulator project.</li></ul>`, true);
  t('#contact', `<h2 id="contact-title">Contact <span lang="en">Contact</span></h2><p>Feel free to get in touch about intrusion detection, cybersecurity, C/C++, AI agent development, and related learning projects.</p><p>Email: <a href="mailto:jasonye247@gmail.com">jasonye247@gmail.com</a> <button id="copy-email" type="button">[Copy email]</button> <span id="copy-status" role="status" aria-live="polite"></span><br>GitHub: <a href="https://github.com/Jason-Yeah" target="_blank" rel="noopener noreferrer">github.com/Jason-Yeah</a></p>`, true);
  t('footer', '© ' + new Date().getFullYear() + ' Jason Ye <a href="#home">Back to top ↑</a>', true);
  document.getElementById('language-toggle').textContent = '中文';
  document.getElementById('language-toggle').setAttribute('aria-label', '切换为中文');
  document.querySelector('.terminal').setAttribute('aria-label', 'Interactive project terminal');
  document.getElementById('terminal-input').setAttribute('aria-label', 'Enter terminal command');
  document.querySelector('.vim-viewer').setAttribute('aria-label', 'Read-only file viewer');
  document.getElementById('vim-ex-command').setAttribute('aria-label', 'Vim command');
  document.querySelector('.vim-status span:last-child').textContent = 'hjkl/arrows move · v/V select · y yank · Ctrl+f/b page · Ctrl+d/u half-page · :q quit';
} else {
  document.getElementById('language-toggle')?.setAttribute('aria-label', '切换为英文');
}

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
  const terminalTranslations = new Map([
    ['欢迎来到 Jason 的项目空间。输入 help 查看命令，或输入 ls 浏览公开项目。', 'Welcome to Jason’s project space. Type help to see commands or ls to browse public repositories.'],
    ['没有找到公开仓库。', 'No public repositories found.'], ['进入项目：cd 项目名', 'Enter a project with: cd <project>'], ['此目录为空。', 'This directory is empty.'],
    ['已经在根目录，无法再向上。', 'Already at the root directory.'], ['可用命令：', 'Available commands:'],
    ['  ls [-a] [-l] [路径] 显示当前目录或指定路径（-a 含隐藏文件，-l 详细信息）', '  ls [-a] [-l] [path]  List the current or specified directory (-a includes hidden files; -l shows details)'],
    ['  cd <项目/目录>      进入仓库或子目录', '  cd <project/directory>  Enter a repository or subdirectory'], ['  cd . / ./           留在当前目录', '  cd . / ./               Stay in the current directory'],
    ['  cd .. / ../         返回上一级', '  cd .. / ../             Go up one level'], ['  cd ../项目/目录     使用相对路径跳转', '  cd ../project/path      Navigate with a relative path'],
    ['  cd ~/项目 或 /项目  从根目录跳转', '  cd ~/project or /project  Navigate from the root'], ['  cat <文件路径>     查看公开仓库中的文件', '  cat <file path>         Read a file in the public repository'],
    ['  vim <文件路径>     只读 Vim 风格查看器（:q 退出）', '  vim <file path>         Read-only Vim-style viewer (:q to quit)'], ['  pwd                 显示当前虚拟路径', '  pwd                     Print the current virtual path'],
    ['  person              查看个人简介', '  person                  Show my bio'], ['  clear               清空终端', '  clear                   Clear the terminal'],
    ['Tab 补全命令、公开目录和文件；↑/↓ 浏览命令历史。', 'Tab completes commands, public directories, and files; ↑/↓ browse command history.'],
    ['vim 中：hjkl/方向键移动，v/V 选择，y/yy 复制，Ctrl+f/b 全页翻动，Ctrl+d/u 半页翻动，:q 退出。', 'In vim: hjkl/arrows move, v/V select, y/yy yank, Ctrl+f/b page, Ctrl+d/u half-page, :q quit.'],
    ['只读模式不会修改文件；复制需要浏览器剪贴板权限。', 'Read-only mode never changes files; yanking requires clipboard permission.'],
    ['叶子森（Jason Ye）｜西安电子科技大学计算机科学与技术硕士。', 'Jason Ye | M.S. in Computer Science and Technology, Xidian University.'],
    ['研究方向：入侵检测与网络安全；熟悉 C/C++、Python。', 'Research: intrusion detection and cybersecurity; skills include C/C++ and Python.'],
    ['输入 ls 浏览 GitHub 公开项目，输入 help 查看命令。', 'Type ls to browse public GitHub repositories or help to see commands.'],
    ['目标不是文件；cat 和 vim 只读取公开仓库中的文件。', 'Target is not a file; cat and vim only read files in public repositories.']
  ]);
  const addLine = (text, className = '') => {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = isEnglish ? (terminalTranslations.get(text) || text.replace('未找到命令：', 'Command not found: ').replace('。输入 help 查看可用命令。', '. Type help to see available commands.').replace('找不到目录：', 'Directory not found: ').replace('只能进入 ls 显示的公开仓库。', 'Only public repositories listed by ls can be entered.').replace('只能进入 ls 显示的公开目录。', 'Only public directories listed by ls can be entered.')) : text;
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
  const builtinCommands = ['ls', 'cd', 'cat', 'vim', 'clear', 'pwd', 'whoami', 'tree'];
  const pathUrl = (repo, path = '') => `${api}/repos/${owner}/${encodeURIComponent(repo)}/contents/${path.split('/').filter(Boolean).map(encodeURIComponent).join('/')}`;
  async function listRepos() {
    const repos = [];
    for (let page = 1; page <= 3; page++) {
      const part = await getJson(`${api}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`);
      repos.push(...part);
      if (part.length < 100) break;
    }
    return repos.filter(repo => !repo.archived && repo.name.toLowerCase() !== 'daily_morning');
  }
  const addMarkdownLine = (marker, text = '') => {
    const line = document.createElement('div');
    line.className = marker.startsWith('#') ? 'terminal-line markdown-heading' : 'terminal-line';
    if (marker) { const token = document.createElement('span'); token.className = 'markdown-marker'; token.textContent = marker; line.append(token); }
    if (text) { const body = document.createElement('span'); body.textContent = text; line.append(body); }
    lines.insertBefore(line, form); lines.scrollTop = lines.scrollHeight;
  };
  async function showLs(directory = cwd, showHidden = false, longFormat = false) {
    if (!directory.length) {
      addLine('bin/', 'directory'); addLine('prj/', 'directory'); addLine('intr'); addLine('help'); return;
    }
    if (directory.length === 1 && directory[0] === 'bin') {
      builtinCommands.forEach(command => addLine(command, 'file')); return;
    }
    if (directory.length === 1 && directory[0] === 'prj') {
      const repos = await listRepos();
      if (!repos.length) { addLine(isEnglish ? 'No active public repositories found.' : '没有找到有效的公开仓库。'); return; }
      repos.forEach(repo => addLine(`${repo.name}/` + (repo.description ? `  — ${repo.description}` : ''), 'directory'));
      return;
    }
    if (directory[0] !== 'prj' || directory.length < 2) { addLine(isEnglish ? 'This directory is empty.' : '此目录为空。'); return; }
    const [_, repo, ...folders] = directory;
    const entries = await getJson(pathUrl(repo, folders.join('/')));
    const items = Array.isArray(entries) ? entries : [entries];
    const visible = items.filter(item => ['dir', 'file'].includes(item.type) && (showHidden || !item.name.startsWith('.')));
    if (!visible.length) { addLine(isEnglish ? 'This directory is empty.' : '此目录为空。'); return; }
    visible.forEach(item => {
      const name = item.type === 'dir' ? `${item.name}/` : item.name;
      const detail = longFormat ? `${item.type === 'dir' ? (isEnglish ? 'directory' : '目录') : (isEnglish ? 'file' : '文件')}\t${item.size ?? 0} B\t` : '';
      addLine(detail + name, item.type === 'dir' ? 'directory' : 'file');
    });
  }
  function showHelp() {
    addMarkdownLine('#', isEnglish ? 'Help' : '操作说明'); addMarkdownLine('─────'); addMarkdownLine('');
    addMarkdownLine('##', isEnglish ? 'Directories' : '目录');
    addLine(isEnglish ? 'ls [path]       List the current directory or a path' : 'ls [路径]       显示当前目录或指定路径');
    addLine(isEnglish ? 'cd <path>       Change directory (., .., ~ and relative paths)' : 'cd <路径>       切换目录（支持 ., .., ~ 和相对路径）');
    addLine(isEnglish ? 'pwd             Print the current virtual path' : 'pwd             显示当前虚拟路径');
    addLine(isEnglish ? 'tree [path]     Show a directory tree' : 'tree [路径]     以树形结构显示目录');
    addMarkdownLine(''); addMarkdownLine('##', isEnglish ? 'Commands' : '命令');
    addLine(isEnglish ? 'whoami          Show the current user' : 'whoami          显示当前用户');
    addLine(isEnglish ? 'cat <file>      Read a public repository file' : 'cat <文件>      查看公开仓库中的文件');
    addLine(isEnglish ? 'vim <file>      Read-only Vim viewer (:q to quit)' : 'vim <文件>      只读 Vim 查看器（:q 退出）');
    addLine(isEnglish ? 'clear           Clear the terminal' : 'clear           清空终端');
    addLine(isEnglish ? 'help            Show this help' : 'help            显示本说明');
    addLine(isEnglish ? 'intr            Show my introduction and highlights' : 'intr            查看个人介绍与成果');
    addMarkdownLine(''); addMarkdownLine('##', isEnglish ? 'Shortcuts' : '快捷操作');
    addLine(isEnglish ? 'Tab completes commands, directories, and files; ↑/↓ browse command history.' : 'Tab 补全命令、目录和文件；↑/↓ 浏览命令历史；&& 可顺序执行多条命令。');
    addLine(isEnglish ? 'In vim: hjkl/arrows move, v/V select, y/yy copy, Ctrl+f/b page, Ctrl+d/u half-page, :q quit.' : 'vim 中：hjkl/方向键移动，v/V 选择，y/yy 复制，Ctrl+f/b 全页，Ctrl+d/u 半页，:q 退出。');
    addLine(isEnglish ? 'The viewer is read-only. Text selection and system copy are supported.' : '查看器为只读；支持鼠标选择文本并复制到系统剪贴板。');
  }
  function showIntroduction() {
    addMarkdownLine('#', isEnglish ? 'Introduction' : '个人介绍'); addMarkdownLine('─────'); addMarkdownLine('');
    addMarkdownLine('##', isEnglish ? 'About' : '个人简介');
    addLine(isEnglish ? 'Jason Ye (Zisen Ye) is a CPC member and a master’s student at the School of Computer Science and Technology, Xidian University.' : '叶子森（Jason Ye），中共党员，西安电子科技大学计算机科学与技术学院硕士研究生。');
    addLine(isEnglish ? 'He conducts research with the Network and System Security (NSS) team at the Shaanxi Key Laboratory of Network and System Security.' : '在陕西省网络与系统安全重点实验室西安电子科技大学 NSS 团队开展科研。');
    addLine(isEnglish ? 'His work focuses on intrusion detection and cybersecurity, including network threat identification, AI agent security, and security defense.' : '研究方向包括入侵检测、网络安全、网络威胁识别、AI Agent 安全与安全防御。');
    addLine(isEnglish ? 'He works with C/C++ and Python and enjoys building systems through hands-on projects.' : '熟悉 C/C++、Python，喜欢通过动手实践理解并构建计算机系统。');
    addMarkdownLine(''); addMarkdownLine('##', isEnglish ? 'Selected Achievements' : '所获成果');
    addLine(isEnglish ? 'Paper: MineTS, NaNA 2026 (EI-indexed international conference).' : '论文：MineTS，发表于 NaNA 2026 EI 国际会议。');
    addLine(isEnglish ? 'Patents: multiple invention patents granted; an industrial Internet risk analysis application accepted.' : '专利：多项发明专利已授权；工业互联网任务风险分析发明专利申请已受理。');
    addLine(isEnglish ? 'Awards: First Prize, 37th Spark Cup / 2026 Challenge Cup; Third Prize in the national graduate OS competition.' : '比赛：第37届“星火杯”暨2026年“挑战杯”大学生创业计划竞赛一等奖；研究生操作系统开源创新大赛国赛三等奖。');
    addLine(isEnglish ? 'Projects: contributed to GF foundational reinforcement, GF innovation, the National Key R&D Program “Key Technologies for Industrial Wireless Network Security with Highly Reliable Real-Time Interconnection,” and Huawei Technologies Co., Ltd. Security Risk Prediction and Inference Technology Exploration Cooperation Project.' : '参与项目：GF基础加强、GF创新、国家重点研发计划《高可靠实时互联的工业无线网络安全关键技术》及华为科技有限公司安全风险预测推理技术探索合作项目。');
  }
  async function showTree(directory = cwd, depth = 0, prefix = '') {
    if (depth > 2) return;
    let entries = [];
    if (!directory.length) entries = [{ name: 'bin/', dir: true }, { name: 'prj/', dir: true }, { name: 'intr' }, { name: 'help' }];
    else if (directory.length === 1 && directory[0] === 'bin') entries = builtinCommands.map(name => ({ name }));
    else if (directory.length === 1 && directory[0] === 'prj') entries = (await listRepos()).map(repo => ({ name: repo.name + '/', dir: true }));
    else if (directory[0] === 'prj' && directory.length >= 2) {
      const items = await getJson(pathUrl(directory[1], directory.slice(2).join('/')));
      entries = (Array.isArray(items) ? items : [items]).filter(item => ['dir', 'file'].includes(item.type) && !item.name.startsWith('.')).map(item => ({ name: item.name + (item.type === 'dir' ? '/' : ''), dir: item.type === 'dir' }));
    }
    const capped = entries.slice(0, 80);
    for (let i = 0; i < capped.length; i++) {
      const item = capped[i], last = i === capped.length - 1;
      addLine(prefix + (last ? '└── ' : '├── ') + item.name, item.dir ? 'directory' : 'file');
      if (item.dir && depth < 2 && !(directory.length === 0 && item.name === 'bin/')) {
        const childPath = item.name.endsWith('/') ? item.name.slice(0, -1) : item.name;
        await showTree([...directory, childPath], depth + 1, prefix + (last ? '    ' : '│   '));
      } else if (directory.length === 0 && item.name === 'bin/') {
        for (const command of builtinCommands) addLine(prefix + (last ? '    ' : '│   ') + '├── ' + command, 'file');
      }
    }
    if (entries.length > capped.length) addLine(prefix + '└── …');
  }
  async function run(raw) {
    const command = raw.trim();
    if (!command) return;
    if (command.includes('&&')) {
      for (const part of command.split('&&').map(value => value.trim()).filter(Boolean)) await run(part);
      return;
    }
    const [verb, ...args] = command.split(/\s+/);
    const isIntro = ['intr', 'introduction'].includes(verb);
    if (verb === 'help' || isIntro) clearScreen(); else addCommandLine(command);
    try {
      if (verb === 'help') showHelp();
      else if (isIntro) showIntroduction();
      else if (verb === 'clear') clearScreen();
      else if (verb === 'pwd') addLine('/' + cwd.join('/'));
      else if (verb === 'whoami') addLine('jason');
      else if (verb === 'ls') {
        const flags = new Set(args.filter(arg => arg.startsWith('-')).flatMap(arg => [...arg.slice(1)]));
        if ([...flags].some(flag => !['a', 'l'].includes(flag))) throw new Error(isEnglish ? 'ls supports -a, -l, and -al/-la.' : 'ls 支持 -a、-l 和 -la/-al。');
        const target = args.filter(arg => !arg.startsWith('-')).join(' ');
        const directory = target ? await resolveDirectory(target) : cwd;
        if (!directory) throw new Error(`${isEnglish ? 'Directory not found: ' : '找不到目录：'}${target}`);
        await showLs(directory, flags.has('a'), flags.has('l'));
      } else if (verb === 'tree') {
        const target = args.join(' ');
        const directory = target ? await resolveDirectory(target) : cwd;
        if (!directory) throw new Error(`${isEnglish ? 'Directory not found: ' : '找不到目录：'}${target}`);
        addLine(target || directory.length ? (directory.at(-1) || '~') : '.');
        await showTree(directory);
      } else if (verb === 'cd') {
        const target = args.join(' ') || '~';
        let aboveRoot = false;
        const path = target.replace(/^~(?=\/|$)/, '');
        const parts = path.split('/').filter(Boolean);
        const absolute = target.startsWith('/') || target === '~' || target.startsWith('~/');
        const start = absolute ? [] : [...cwd];
        let resolved = [...start];
        for (const part of parts) {
          if (part === '.') continue;
          if (part === '..') { if (resolved.length) resolved.pop(); else aboveRoot = true; continue; }
          const candidate = [...resolved, part];
          if (candidate.length === 1 && !['bin', 'prj'].includes(part)) throw new Error(isEnglish ? 'At root, enter bin/ or prj/ first.' : '根目录下请先进入 bin/ 或 prj/。');
          if (candidate.length === 2 && candidate[0] === 'prj') {
            const repos = await listRepos();
            const repo = repos.find(item => item.name.toLowerCase() === part.toLowerCase());
            if (!repo) throw new Error(isEnglish ? 'Only active public repositories in prj/ can be entered.' : '只能进入 prj/ 中列出的有效公开仓库。');
            candidate[1] = repo.name;
          } else if (candidate.length >= 3 && candidate[0] === 'prj') {
            const parent = candidate.slice(2, -1);
            const items = await getJson(pathUrl(candidate[1], parent.join('/')));
            const found = (Array.isArray(items) ? items : [items]).find(item => item.type === 'dir' && item.name.toLowerCase() === part.toLowerCase());
            if (!found) throw new Error(isEnglish ? 'Directory not found in the public repository.' : '公开仓库中找不到这个目录。');
            candidate[candidate.length - 1] = found.name;
          } else if (candidate[0] === 'bin' && candidate.length > 1) throw new Error(isEnglish ? 'bin/ contains command entries, not subdirectories.' : 'bin/ 中是命令列表，没有子目录。');
          resolved = candidate;
        }
        cwd = resolved;
        setPrompt();
        if (aboveRoot) addLine(isEnglish ? 'Already at the root; cannot go up further.' : '已经在根目录，无法再向上。');
      } else if (verb === 'cat' || verb === 'vim') {
        if (cwd[0] !== 'prj' || cwd.length < 2) throw new Error(isEnglish ? `Use cd prj/<repository> before ${verb} <file>.` : `请先进入 prj/ 下的公开项目，再使用 ${verb} <文件路径>。`);
        const requestedPath = args.join(' ');
        if (!requestedPath) throw new Error(`${isEnglish ? 'Usage: ' : '用法：'}${verb} <${isEnglish ? 'file path' : '文件路径'}>`);
        const repo = cwd[1]; let folders = [...cwd.slice(2)];
        let filePath = requestedPath.replace(/^\.\//, '');
        if (filePath.startsWith('/')) { folders = []; filePath = filePath.replace(/^\/+/, ''); }
        for (const part of filePath.split('/')) {
          if (!part || part === '.') continue;
          if (part === '..') { if (folders.length) folders.pop(); else throw new Error(isEnglish ? 'Path cannot leave the public repository.' : '路径不能离开当前公开仓库。'); }
          else folders.push(part);
        }
        const file = await getJson(pathUrl(repo, folders.join('/')));
        if (Array.isArray(file) || file.type !== 'file') throw new Error(isEnglish ? 'Target is not a file; cat and vim only read public repository files.' : '目标不是文件；cat 和 vim 只读取公开仓库中的文件。');
        let content;
        if (typeof file.content === 'string' && file.content.trim()) {
          const bytes = Uint8Array.from(atob(file.content.replace(/\s/g, '')), char => char.charCodeAt(0));
          content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
        } else if (file.download_url) {
          const response = await fetch(file.download_url);
          if (!response.ok) throw new Error(`${isEnglish ? 'File read failed' : '文件读取失败'} (${response.status}).`);
          content = await response.text();
        } else throw new Error(isEnglish ? 'GitHub API did not return file contents.' : 'GitHub API 未返回文件内容。');
        if (verb === 'cat') {
          addLine('');
          const ext = folders.at(-1).split('.').pop().toLowerCase();
          content.split('\n').forEach(line => {
            if (['md','markdown','txt','rst'].includes(ext) && /^#{1,6}\s/.test(line)) addMarkdownLine(line.match(/^#{1,6}/)[0], line.replace(/^#{1,6}\s*/, ''));
            else addLine(line, ['md','markdown','txt','rst'].includes(ext) ? 'file-content prose-line' : 'file-content');
          });
        }
        else openVim(['prj', repo, ...folders].join('/'), content);
      } else addLine(`${isEnglish ? 'Command not found: ' : '未找到命令：'}${verb}. ${isEnglish ? 'Type help for commands.' : '输入 help 查看可用命令。'}`, 'error');
    } catch (error) { addLine(error.message || (isEnglish ? 'Read failed; please try again.' : '读取失败，请稍后再试。'), 'error'); }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    const command = input.value; input.value = ''; if (command.trim()) history.push(command); historyIndex = history.length; tabState = null; busy = true; input.disabled = true;
    try { await run(command); } finally { busy = false; input.disabled = false; if (vimViewer.hidden) input.focus(); }
  });
  document.getElementById('terminal-clear').addEventListener('click', clearScreen);
  document.querySelector('.terminal').addEventListener('click', event => {
    if (event.target.closest('button, a, .vim-viewer')) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) input.focus();
  });
  const vimViewer = document.getElementById('vim-viewer');
  const vimContent = document.getElementById('vim-content');
  const vimHighlight = document.getElementById('vim-highlight');
  function highlightVimText(filename, content) {
    const ext = filename.split('.').pop().toLowerCase();
    const escapeHtml = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const kind = ['md','markdown','txt','rst'].includes(ext) ? 'prose' : ['json','yml','yaml','toml'].includes(ext) ? 'data' : ['js','jsx','ts','tsx','py','go','rs','c','cpp','java','sh','css','html'].includes(ext) ? 'code' : 'plain';
    vimHighlight.className = `vim-highlight vim-${kind}`;
    if (kind === 'prose') {
      vimHighlight.innerHTML = content.split('\n').map(line => {
        const escaped = escapeHtml(line);
        if (/^#{1,6}\s/.test(line)) return `<span class="syn-heading">${escaped}</span>`;
        if (/^\s*([-*+] |\d+\. )/.test(line)) return `<span class="syn-list">${escaped}</span>`;
        if (/^\s*>/.test(line)) return `<span class="syn-quote">${escaped}</span>`;
        return escaped.replace(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g, '<span class="syn-emphasis">$1</span>');
      }).join('\n');
    } else if (kind === 'code' || kind === 'data') {
      const tokenPattern = /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|if|else|for|while|class|import|from|export|async|await|new|def|self|in|with|as|try|except|true|false|null|None|True|False)\b|\b\d+(?:\.\d+)?\b)/gm;
      let html = '', last = 0, match;
      while ((match = tokenPattern.exec(content))) {
        html += escapeHtml(content.slice(last, match.index));
        const token = match[0], cls = /^(\/\/|#|\/\*)/.test(token) ? 'syn-comment' : /^["'`]/.test(token) ? 'syn-string' : /^\d/.test(token) ? 'syn-number' : 'syn-keyword';
        html += `<span class="${cls}">${escapeHtml(token)}</span>`; last = tokenPattern.lastIndex;
      }
      vimHighlight.innerHTML = html + escapeHtml(content.slice(last));
    } else vimHighlight.textContent = content;
  }
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
    highlightVimText(filename, content);
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
    else if (event.ctrlKey && event.key.toLowerCase() === 'd') { vimContent.scrollTop += vimContent.clientHeight * .5; handled = true; }
    else if (event.ctrlKey && event.key.toLowerCase() === 'u') { vimContent.scrollTop -= vimContent.clientHeight * .5; handled = true; }
    else handled = false;
    if (handled) {
      event.preventDefault();
      if (!['PageDown', 'PageUp', ' '].includes(event.key) && !(event.ctrlKey && ['f', 'b', 'd', 'u'].includes(event.key.toLowerCase()))) {
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
      const candidate = [...next, part];
      if (candidate.length === 1) {
        if (!['bin', 'prj'].includes(part)) return null;
      } else if (candidate.length === 2 && candidate[0] === 'prj') {
        const repos = await listRepos();
        const repo = repos.find(item => item.name.toLowerCase() === part.toLowerCase());
        if (!repo) return null;
        candidate[1] = repo.name;
      } else if (candidate.length >= 3 && candidate[0] === 'prj') {
        const items = await getJson(pathUrl(candidate[1], candidate.slice(2, -1).join('/')));
        const found = (Array.isArray(items) ? items : [items]).find(item => item.type === 'dir' && item.name.toLowerCase() === part.toLowerCase());
        if (!found) return null;
        candidate[candidate.length - 1] = found.name;
      } else return null;
      next.splice(0, next.length, ...candidate);
    }
    return next;
  }
  async function completionCandidates(directory = cwd, includeFiles = false) {
    if (!directory.length) return ['bin/', 'prj/'];
    if (directory.length === 1 && directory[0] === 'bin') return [...builtinCommands];
    if (directory.length === 1 && directory[0] === 'prj') return (await listRepos()).map(repo => repo.name + '/');
    if (directory[0] !== 'prj' || directory.length < 2) return [];
    const [, repo, ...folders] = directory;
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
        const value = input.value; const match = value.match(/^(\s*)(?:(cd|cat|vim|ls|tree)\s+)?(.*)$/);
        if (!match) return;
        const commandPrefix = match[1] + (match[2] ? match[2] + ' ' : '');
        const token = match[3];
        const commands = ['ls', 'cd', 'cat', 'vim', 'clear', 'pwd', 'whoami', 'tree', 'intr', 'help'];
        let tokenPrefix = '';
        let candidates;
        if (!match[2]) candidates = commands;
        else if (match[2] === 'ls' && token.startsWith('-') && !token.includes('/')) candidates = ['-a', '-l', '-al', '-la'];
        else if (match[2] === 'cat' || match[2] === 'vim' || match[2] === 'cd' || match[2] === 'ls' || match[2] === 'tree') {
          const slash = token.lastIndexOf('/');
          tokenPrefix = slash >= 0 ? token.slice(0, slash + 1) : '';
          const parentPath = slash >= 0 ? (slash === 0 ? '/' : token.slice(0, slash)) : '';
          const directory = parentPath ? await resolveDirectory(parentPath) : cwd;
          const includeFiles = match[2] === 'cat' || match[2] === 'vim' || match[2] === 'ls' || match[2] === 'tree';
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
    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && lines.contains(selection.anchorNode)) return;
      event.preventDefault(); addCommandLine(`${input.value}^C`); input.value = '';
    }
    tabState = null;
  });
  addLine(isEnglish ? 'Welcome to Jason’s terminal. Type help to see commands or ls to browse.' : '欢迎来到 Jason 的终端。输入 help 查看说明，或输入 ls 浏览目录。');
  addLine('');
  lines.append(form);
}
