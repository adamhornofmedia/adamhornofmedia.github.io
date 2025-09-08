(() => {
  if (document.getElementById("unified-footer")) return;

  const css = `
    .unified-footer {
      font: 14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      color: var(--uf-fg, #111);
      background: var(--uf-bg, #f7f7f7);
      border-top: 1px solid rgba(0,0,0,.06);
    }
    .unified-footer .uf-wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 14px 16px;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
    }
    .unified-footer a {
      color: inherit;
      text-decoration: none;
      font-weight: 600;
    }
    .unified-footer a:hover {
      text-decoration: underline;
    }
    @media (prefers-color-scheme: dark) {
      .unified-footer { --uf-bg: #0f1115; --uf-fg: #e7e7e7; border-top-color: rgba(255,255,255,.08); }
    }
  `;

  // injektuj CSS
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // vytvoř patičku
  const footer = document.createElement("footer");
  footer.id = "unified-footer";
  footer.className = "unified-footer";
  footer.setAttribute("role", "contentinfo");
  footer.setAttribute("aria-label", "Site footer");

  footer.innerHTML = `
    <div class="uf-wrap">
      <span>Made with <span aria-label="love">❤</span> by</span>
      <a href="https://hornof.dev/?utm_source=footer&utm_medium=link" target="_blank" rel="noopener nofollow">hornof.dev</a>
    </div>
    <div class="tool-icons">
      <div>
        <img src="/icons/javascript.svg" alt="JavaScript" title="JavaScript" />
        <div style="margin-top:0.4rem;font-size:0.98em;color:#aaa;">JavaScript</div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
})();