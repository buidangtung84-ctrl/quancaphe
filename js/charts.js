/* ============ Chart helpers (SVG, no library) ============ */
const Charts = {
  /* Sparkline for stat cards */
  spark(values, color, w, h) {
    color = color || '#3e8e5a'; w = w || 120; h = h || 34;
    const min = Math.min(...values), max = Math.max(...values), range = (max - min) || 1;
    const step = w / Math.max(values.length - 1, 1);
    const pts = values.map((v, i) =>
      `${(i * step).toFixed(1)},${(h - 3 - ((v - min) / range) * (h - 6)).toFixed(1)}`);
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="spark">
      <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  },

  /* Vertical bar chart with labels; returns svg sized w x h */
  bars(values, labels, color, opts) {
    opts = opts || {};
    const h = opts.h || 170;
    const colw = opts.colw || 48;
    const n = values.length;
    const w = n * colw;
    const max = Math.max(...values, 1);
    const barw = Math.min(colw * 0.55, 34);
    const chartH = h - 26;
    let rects = '', texts = '';
    values.forEach((v, i) => {
      const bh = Math.max((v / max) * (chartH - 10), 2);
      const x = i * colw + (colw - barw) / 2;
      const y = chartH - bh;
      rects += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barw}" height="${bh.toFixed(1)}"
        rx="5" fill="${color}" data-bar="${i}" class="bar${opts.valueIndex===i?' bar-hot':''}"/>`;
      if (labels) {
        texts += `<text x="${(x + barw / 2).toFixed(1)}" y="${h - 8}" font-size="9.5"
          text-anchor="middle" fill="#9a917f">${labels[i] || ''}</text>`;
      }
    });
    return `<div class="bars-scroll"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${rects}${texts}</svg></div>`;
  },

  /* Small horizontal progress bar */
  progress(pct, color) {
    color = color || '#c9a583';
    return `<div class="progress-track"><div class="progress-fill" style="width:${Math.min(pct, 100)}%;background:${color}"></div></div>`;
  }
};
