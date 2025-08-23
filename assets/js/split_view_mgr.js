document.addEventListener("DOMContentLoaded", () => {
  const tabsEl = document.getElementById('tabs');
  const leftPane = document.getElementById("left-pane");
  const rightPane = document.getElementById("right-pane");
  const splitView = document.getElementById("splitView");
  const toggleBtn = document.getElementById("sidebarToggle");
  let rightPaneTargetSize = -1;
  let canvasResizeDisabled = true;

  class TabManager {
    constructor(){
      this.contentEl = document.getElementById('tab-content');
      this.contentE1Height = (this.contentEl.getBoundingClientRect())['height'] - 15;
    }
    
    async loadAndDisplay(fileUrl) {
      try {
        const res = await fetch(fileUrl);
        const text = await res.text();
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-javascript';
        code.textContent = text;
        pre.appendChild(code);
        pre.setAttribute("id", "pre_code_container");
        hljs.highlightElement(code);
        this.contentEl.innerHTML = '';
        this.contentEl.appendChild(pre);

        // dynamically set the height, because I can't figure out the CSS
        pre.style.height =  (this.contentE1Height) + "px";
      } catch (err) {
        this.contentEl.innerHTML = `<p style="color:red;">Error loading ${fileUrl}</p>`;
      }
    }
  }
  const tabMgr = new TabManager();

  const excludePatterns = [
    /^https:\/\/cdnjs\.cloudflare\.com\//,
    /^https:\/\/cdn\.jsdelivr\.net\//,
    /\/vendor\//,
    /\.min\.js$/
  ];
  
  let scripts = Array.from(document.querySelectorAll('script[src]'));
  scripts.reverse();
  scripts = scripts.filter(script => !excludePatterns.some(regex => regex.test(script.getAttribute('src'))) );

  scripts.forEach((script, i) => {
    const src = script.getAttribute('src');
    const fileName = src.split('/').pop();
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.textContent = fileName;
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabMgr.loadAndDisplay(src);
    });
    tabsEl.appendChild(tab);

    // Load first tab by default
    if (i == 0) {
      tab.classList.add('active');
      tabMgr.loadAndDisplay(src);
    }
  });


  // Add left/right buttons to scroll through the tabs
  document.querySelector(".scroll-btn.left").addEventListener("click", () => {
    tabsEl.scrollBy({ left: -150, behavior: "smooth" });
  });
  document.querySelector(".scroll-btn.right").addEventListener("click", () => {
    tabsEl.scrollBy({ left: 150, behavior: "smooth" });
  });

  function resizeToContainer() {
    if (canvasResizeDisabled){
      return;
    }

    const canvas = document.getElementById("defaultCanvas0");
    if (canvas && leftPane && window.p5 && window._renderer) {
      const w = leftPane.clientWidth;
      const h = innerHeight - leftPane.getBoundingClientRect().top;
      resizeCanvas(w, h); // <-- p5.js global function
    }
  }

  // MutationObserver: wait until p5.js creates the canvas
  const observer = new MutationObserver(() => {
    const canvas = document.getElementById("defaultCanvas0");
    if (canvas) {
      leftPane.appendChild(canvas);
      resizeToContainer(); // initial resize
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Listen to Split.js dragging, to handle when it has reached the target size
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if ( entry.contentRect.width == rightPaneTargetSize){
        resizeToContainer();
      }
    }
  });
  resizeObserver.observe(rightPane);

  toggleBtn.addEventListener("click", () => {
    splitView.classList.toggle("expanded");
    if (splitView.classList.contains("expanded")) {
      // It was collapsed, now we're expanding
      toggleBtn.textContent = "→"; // collapse icon
      rightPaneTargetSize = paneSizes[1] / 100.0 * innerWidth - 2.5;  // the 2.5px is because SplitView applies that; maybe for borders
      splitJsInstance.setSizes(paneSizes);
    } else {
      // It was expands, now we're collapsing
      toggleBtn.textContent = "←"; // expand icon
      let sizes = splitJsInstance.getSizes();
      rightPaneTargetSize = 0;
      splitJsInstance.collapse(1);
      paneSizes[0] = sizes[0];
      paneSizes[1] = sizes[1];
    }
  });

  const splitJsInstance = Split(['.split_view #left-pane', '.split_view #right-pane'], {
    sizes: [100, 0],
    gutterSize: 5,
    onDrag: resizeToContainer // maybe: onDragEnd
  });
  const paneSizes = [40, 60]; // Default on initial expansion
  window.splitJSInst = splitJsInstance;
  rightPaneTargetSize = 0;
  splitJsInstance.collapse(1);
});