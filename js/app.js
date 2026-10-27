/* ============ App — điều hướng & view ============ */
const App = {
  view: 'dashboard',
  filter: 'today',
  _orderLines: [{ recipeId: '', qty: 1 }],

  /* ---------- helpers ---------- */
  money(n) {
    const s = Store.data.settings;
    try {
      return new Intl.NumberFormat(s.lang === 'vi' ? 'vi-VN' : 'en-US',
        { style: 'currency', currency: s.currency, maximumFractionDigits: 0 }).format(n);
    } catch (e) { return n.toLocaleString() + ' ' + s.currency; }
  },
  esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g,
      c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  fmtStock(it) {
    const s = it.stock;
    if (it.unit === 'kg' && s >= 1) return s.toFixed(1).replace(/\.0$/, '') + ' kg';
    if (it.unit === 'L') return s + ' L';
    if (it.unit === 'pc') return (s >= 50 ? Math.round(s / 50) * 50 : s) + ' pcs';
    return s + ' ' + it.unit;
  },
  invQtyDisplay(it) {
    /* dòng "còn lại" trong cảnh báo */
    return this.fmtStock(it) + ' ' + t('dash.left');
  },
  stockStatus(it) {
    if (it.stock <= it.lowAt * 0.6) return 'low';
    if (it.stock <= it.lowAt) return 'medium';
    return 'good';
  },
  staffById(id) { return Store.data.staff.find(s => s.id === id); },
  recipeById(id) { return Store.data.recipes.find(r => r.id === id); },
  invById(id) { return Store.data.inventory.find(i => i.id === id); },
  dayOrders(iso) { return Store.data.orders.filter(o => o.date === iso); },
  sumOrders(list) { return list.reduce((s, o) => s + o.total, 0); },

  /* ---------- khởi động ---------- */
  init() {
    Store.load();
    document.getElementById('langToggle').addEventListener('click', () => this.setLang());
    this.render();
  },
  setLang(force) {
    const s = Store.data.settings;
    s.lang = force || (s.lang === 'vi' ? 'en' : 'vi');
    Store.save();
    this.render();
  },
  nav(view) { this.view = view; this.render(); },
  toast(msg, isErr) {
    const root = document.getElementById('toastRoot');
    const el = document.createElement('div');
    el.className = 'toast' + (isErr ? ' toast-err' : '');
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, 3200);
  },

  /* ---------- modal ---------- */
  modal(html) {
    const root = document.getElementById('modalRoot');
    root.innerHTML = `<div class="modal-mask" onclick="if(event.target===this)App.closeModal()"><div class="modal">${html}</div></div>`;
  },
  closeModal() { document.getElementById('modalRoot').innerHTML = ''; },

  /* ---------- render ---------- */
  render() {
    const s = Store.data.settings;
    document.title = s.cafeName + ' — ' + t('nav.dashboard');
    document.getElementById('brandName').textContent = s.cafeName;
    document.documentElement.lang = s.lang;
    this.renderNav();
    const view = document.getElementById('view');
    view.innerHTML = '';
    ({ dashboard: this.vDashboard, orders: this.vOrders, inventory: this.vInventory,
      recipes: this.vRecipes, team: this.vTeam, reports: this.vReports, settings: this.vSettings
    }[this.view] || this.vDashboard).call(this, view);
    view.className = 'main view-' + this.view;
  },

  renderNav() {
    const items = ['dashboard', 'orders', 'inventory', 'recipes', 'team', 'reports', 'settings'];
    const icons = {
      dashboard: '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
      orders: '<path d="M6 2h12v4H6zM8 22h8a2 2 0 0 0 2-2V6H6v14a2 2 0 0 0 2 2zM9 12h6M9 16h4"/>',
      inventory: '<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8"/>',
      recipes: '<path d="M6 2v7a3 3 0 0 0 3 3v10M9 12a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v0M14 2v6M17 2v3a2 2 0 0 1-2 2"/>',
      team: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M19 8v6M22 11h-6"/>',
      reports: '<path d="M3 3v18h18M8 17v-6M13 17V7M18 17v-3"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    };
    document.getElementById('nav').innerHTML = items.map(v => `
      <button class="nav-item ${this.view === v ? 'active' : ''}" onclick="App.nav('${v}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[v]}</svg>
        <span>${t('nav.' + v)}</span>
      </button>`).join('');
    document.getElementById('langToggle').textContent = Store.data.settings.lang === 'vi' ? 'VI / EN' : 'EN / VI';
    const st = this.staffById('st1') || Store.data.staff[0];
    document.getElementById('userChip').innerHTML = `
      <span class="avatar" style="background:${st.color}">${st.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span>
      <span><b>${this.esc(st.name)}</b><br><small>${t('role.' + st.role)}</small></span>`;
  },

  /* ================= DASHBOARD ================= */
  vDashboard(el) {
    const d = Store.data, today = isoToday(), yest = isoDaysAgo(1);
    const todayO = this.dayOrders(today), yestO = this.dayOrders(yest);
    const salesT = this.sumOrders(todayO), salesY = this.sumOrders(yestO);
    const pct = (a, b) => b ? ((a - b) / b * 100) : 0;
    const delta = p => `<span class="delta ${p >= 0 ? 'up' : 'down'}">${p >= 0 ? '▲' : '▼'} ${Math.abs(p).toFixed(1)}% ${t('stat.vsYesterday')}</span>`;
    const hour = new Date().getHours();
    const greet = t(hour < 12 ? 'dash.morning' : hour < 17 ? 'dash.afternoon' : 'dash.evening');
    const returning = d.kpis.returning;

    /* 7 ngày gần nhất cho các sparkline + bar chart */
    const days = []; for (let i = 6; i >= 0; i--) { const iso = isoDaysAgo(i); days.push(iso); }
    const daySales = days.map(iso => this.sumOrders(this.dayOrders(iso)));
    const dayOrders = days.map(iso => this.dayOrders(iso).length);
    const dayAvg = days.map((iso, i) => dayOrders[i] ? daySales[i] / dayOrders[i] : 0);

    const lowItems = [...d.inventory].filter(i => this.stockStatus(i) !== 'good')
      .sort((a, b) => a.stock / (a.lowAt || 1) - b.stock / (b.lowAt || 1)).slice(0, 4);
    const shiftTasks = d.tasks.filter(x => x.section === 'shift');
    const doneN = shiftTasks.filter(x => x.done).length;

    /* featured recipe */
    const fr = d.recipes[0];
    const featured = fr ? `
      ${this.recipeHeader(fr)}
      <div class="recipe-detail">
        <div><h5>${t('dash.ingredients')}</h5>
          ${fr.ingredients.map(ing => {
      const it = this.invById(ing.inv);
      return it ? `<div class="row flex"><span>${it.icon} ${this.esc(L(it.name))}</span><span class="muted">${this.esc(ing.amount)}</span></div>` : '';
    }).join('')}
        </div>
        <div><h5>${t('dash.steps')}</h5>
          <ol class="steps">${fr.steps.map(s => `<li>${this.esc(L(s))}</li>`).join('')}</ol>
        </div>
      </div>
      <button class="link-btn" onclick="App.openRecipeDetail('${fr.id}')">${t('dash.editRecipe')}</button>` : '';

    /* team panel */
    const teamRows = d.staff.slice(0, 5).map(st => {
      const ts = shiftTasks.filter(x => x.staff === st.id);
      const stat = ts.length ? ts.every(x => x.done) : null;
      return `<div class="row flex team-row">
        <span class="avatar" style="background:${st.color}">${st.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span>
        <span><b>${this.esc(st.name)}</b><br><small>${ts.length ? this.esc(ts[0].time) + ' · ' + this.esc(ts.filter(x => x.done).length) + '/' + ts.length : t('role.' + st.role)}</small></span>
        <span class="dot ${stat === true ? 'ok' : stat === false ? 'wait' : ''}"></span>
      </div>`;
    }).join('');

    el.innerHTML = `
      <div class="page-head">
        <div>
          <h1>${greet}, ${this.esc(d.settings.ownerName.split(' ')[0])} <span class="sun">☀️</span></h1>
          <p class="muted">${t('dash.subtitle', { cafe: this.esc(d.settings.cafeName) })}</p>
        </div>
        <input type="date" class="date-chip" value="${today}" onchange="App.jumpToOrders(this.value)">
      </div>

      <div class="dash-grid">
        <div class="dash-left">
          <div class="stats-row">
            ${this.statCard(t('stat.sales'), this.money(salesT), pct(salesT, salesY), Charts.spark(daySales, '#d1683a'))}
            ${this.statCard(t('stat.orders'), String(todayO.length), pct(todayO.length, yestO.length), Charts.spark(dayOrders, '#3e8e5a'))}
            ${this.statCard(t('stat.avgValue'), this.money(todayO.length ? Math.round(salesT / todayO.length) : 0), pct(salesT / (todayO.length || 1), salesY / (yestO.length || 1)), Charts.spark(dayAvg, '#3e8e5a'))}
            ${this.statCard(t('stat.returning'), returning.value + '%', returning.delta, Charts.spark([55, 60, 58, 62, 61, 64, returning.value], '#3e8e5a'))}
          </div>

          <div class="cards-3">
            <div class="card">
              <div class="card-head"><h4>${t('dash.todaysTasks')}</h4><span class="muted">${doneN}/${shiftTasks.length} ${t('dash.completed')}</span></div>
              ${Charts.progress(shiftTasks.length ? doneN / shiftTasks.length * 100 : 0, '#c9a583')}
              ${shiftTasks.slice(0, 6).map(x => `
                <label class="task-line"><input type="checkbox" ${x.done ? 'checked' : ''} onchange="App.toggleTask('${x.id}')">
                  <span class="task-name ${x.done ? 'strike' : ''}">${this.esc(L(x.name))}</span><span class="muted small">${x.time}</span>
                </label>`).join('')}
              <button class="link-btn" onclick="App.nav('team')">${t('dash.viewAllTasks')}</button>
            </div>

            <div class="card">
              <div class="card-head"><h4>${t('dash.lowStock')}</h4></div>
              ${lowItems.length ? lowItems.map(it => {
      const stt = this.stockStatus(it);
      return `<div class="row flex alert-line">
        <span class="inv-ico">${it.icon}</span>
        <span><b>${this.esc(L(it.name))}</b><br><small class="muted">${this.fmtStock(it)} ${t('dash.left')}</small></span>
        <span class="pill ${stt === 'low' ? 'pill-low' : 'pill-med'}">${stt === 'low' ? t('inv.low') : t('inv.medium')}</span>
      </div>`;
    }).join('') : `<p class="muted small">✅ ${t('inv.good')}</p>`}
              <button class="link-btn" onclick="App.nav('inventory')">${t('dash.viewInventory')}</button>
            </div>

            <div class="card">
              <div class="card-head"><h4>${t('dash.salesSummary')}</h4><b>${this.money(salesT)}</b></div>
              ${Charts.bars(daySales, days.map(iso => iso.slice(5).replace('-', '/')), '#7fb99d', { h: 165, colw: 42 })}
              <button class="link-btn" onclick="App.nav('reports')">${t('dash.viewFullReport')}</button>
            </div>
          </div>
        </div>

        <div class="dash-right">
          <div class="card"><div class="card-head"><h4>${t('dash.featuredRecipe')}</h4>
            <button class="icon-x" title="${t('common.close')}" onclick="App.openRecipeDetail('${fr.id}')">✕</button></div>
            ${featured}
          </div>
          <div class="card">
            <div class="card-head"><h4>${t('dash.teamTasks')}</h4></div>
            ${teamRows}
            <button class="link-btn" onclick="App.nav('team')">${t('dash.viewFullSchedule')}</button>
          </div>
        </div>
      </div>`;
  },

  statCard(label, value, deltaPct, spark) {
    return `<div class="card stat-card">
      <span class="muted small">${label}</span>
      <b class="stat-value">${value}</b>
      ${deltaPct == null ? '' : `<span class="delta ${deltaPct >= 0 ? 'up' : 'down'}">${deltaPct >= 0 ? '▲' : '▼'} ${Math.abs(deltaPct).toFixed(1)}% ${t('stat.vsYesterday')}</span>`}
      <div class="spark-wrap">${spark}</div>
    </div>`;
  },

  recipeHeader(fr, clickable) {
    return `<div class="recipe-head">
      <div>
        <h3>${this.esc(L(fr.name))}</h3>
        <p class="muted small">${this.esc(L(fr.desc))}</p>
      </div>
      <span class="recipe-img">${fr.ingredients.some(i => i.inv === 'inv2') ? '🌾' : '☕'}</span>
    </div>
    <div class="muted small">Size ${fr.size} · ${this.money(fr.price)} / ${t('recipe.perCup')}</div>`;
  },

  /* ================= ORDERS ================= */
  vOrders(el) {
    const d = Store.data, today = isoToday();
    let list = d.orders;
    if (this.filter === 'today') list = list.filter(o => o.date === today);
    else if (this.filter === 'week') list = list.filter(o => o.date >= isoDaysAgo(6));
    list = [...list].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)).slice(0, 120);
    const todayO = this.dayOrders(today);

    el.innerHTML = `
      <div class="page-head">
        <h1>${t('orders.title')}</h1>
        <button class="btn-primary" onclick="App.openNewOrder()">${t('orders.newOrder')}</button>
      </div>
      <div class="orders-kpis">
        <div class="card kpi-inline"><span class="muted small">${t('orders.ordersToday')}</span><b>${todayO.length}</b></div>
        <div class="card kpi-inline"><span class="muted small">${t('orders.revenueToday')}</span><b>${this.money(this.sumOrders(todayO))}</b></div>
        <div class="card kpi-inline"><span class="muted small">${t('rep.avgOrders')} (14)</span><b>${Math.round(d.orders.length / 14)}</b></div>
      </div>
      <div class="chips">
        ${['today', 'week', 'all'].map(f => `<button class="chip ${this.filter === f ? 'chip-on' : ''}" onclick="App.setFilter('${f}')">${t('orders.filter.' + f)}</button>`).join('')}
      </div>
      <div class="card table-card">
        <table>
          <thead><tr><th>${t('orders.code')}</th><th>${t('orders.time')}</th><th>${t('orders.items')}</th>
            <th>${t('orders.cashier')}</th><th class="ta-r">${t('orders.total')}</th></tr></thead>
          <tbody>
            ${list.length ? list.map(o => `
              <tr>
                <td><b>${o.id}</b></td>
                <td class="muted">${o.time}<br><small>${o.date}</small></td>
                <td>${o.items.map(it => `${it.qty}× ${this.esc(L(it.name))}`).join('<br>')}</td>
                <td>${(() => { const st = this.staffById(o.staff); return st ? `<span class="avatar avatar-xs" style="background:${st.color}">${st.name.split(' ').map(x => x[0]).join('').slice(0,2)}</span> ${this.esc(st.name)}` : '—'; })()}</td>
                <td class="ta-r"><b>${this.money(o.total)}</b></td>
              </tr>`).join('') : `<tr><td colspan="5" class="muted ta-c">${t('orders.empty')}</td></tr>`}
          </tbody>
        </table>
      </div>`;
  },
  setFilter(f) { this.filter = f; this.render(); },
  jumpToOrders() { this.nav('orders'); },

  openNewOrder() {
    document.getElementById('modalRoot').innerHTML = this.buildOrderModalHtml();
  },
  setOrderLine(i, key, val) {
    if (key === 'qty') this._orderLines[i].qty = Math.max(1, parseInt(val) || 1);
    else this._orderLines[i].recipeId = val;
    const tot = document.getElementById('orderTotal');
    if (tot) tot.textContent = this.money(this.orderTotal());
  },
  addOrderLine() {
    this._orderLines.push({ recipeId: '', qty: 1 });
    document.getElementById('modalRoot').innerHTML = this.buildOrderModalHtml();
  },
  removeOrderLine(i) {
    this._orderLines.splice(i, 1);
    if (!this._orderLines.length) this._orderLines.push({ recipeId: '', qty: 1 });
    document.getElementById('modalRoot').innerHTML = this.buildOrderModalHtml();
  },
  buildOrderModalHtml() {
    const d = Store.data;
    return `<div class="modal-mask" onclick="if(event.target===this)App.closeModal()"><div class="modal">
      <h3>${t('orders.newOrder')}</h3>
      ${this._orderLines.map((ln, i) => `
        <div class="order-line">
          <select onchange="App.setOrderLine(${i},'recipe',this.value)">
            <option value="">${t('orders.selectRecipe')}…</option>
            ${d.recipes.map(r => `<option value="${r.id}" ${ln.recipeId === r.id ? 'selected' : ''}>${this.esc(L(r.name))} — ${this.money(r.price)}</option>`).join('')}
          </select>
          <input type="number" min="1" max="50" value="${ln.qty}" onchange="App.setOrderLine(${i},'qty',this.value)">
          <button class="btn-ghost" onclick="App.removeOrderLine(${i})">✕</button>
        </div>`).join('')}
      <button class="link-btn" onclick="App.addOrderLine()">${t('orders.addLine')}</button>
      <div class="row flex order-total-row"><span>${t('common.total')}</span><b id="orderTotal">${this.money(this.orderTotal())}</b></div>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="App.closeModal()">${t('common.cancel')}</button>
        <button class="btn-primary" onclick="App.submitOrder()">${t('orders.placeOrder')}</button>
      </div>
    </div></div>`;
  },
  orderTotal() {
    return this._orderLines.reduce((s, ln) => {
      const r = this.recipeById(ln.recipeId);
      return s + (r ? r.price * (ln.qty || 1) : 0);
    }, 0);
  },
  submitOrder() {
    const lines = this._orderLines.filter(l => l.recipeId && l.qty > 0);
    if (!lines.length) { this.toast(t('orders.selectRecipe'), true); return; }
    const d = Store.data;
    let warned = false;
    const items = lines.map(l => {
      const r = this.recipeById(l.recipeId);
      /* trừ nguyên liệu khỏi kho */
      r.ingredients.forEach(ing => {
        const it = this.invById(ing.inv);
        if (!it) return;
        it.stock = Math.max(0, +(it.stock - ing.ded * l.qty).toFixed(3));
        if (this.stockStatus(it) !== 'good') warned = true;
      });
      return { recipeId: r.id, qty: l.qty, name: r.name, price: r.price };
    });
    const now = new Date();
    d.seq = (d.seq || 1000) + 1;
    d.orders.push({
      id: 'OD-' + d.seq, date: isoToday(), time: now.toTimeString().slice(0, 5),
      items, total: lines.reduce((s, l) => s + this.recipeById(l.recipeId).price * l.qty, 0),
      staff: (d.staff[0] || {}).id,
    });
    Store.save();
    this._orderLines = [{ recipeId: '', qty: 1 }];
    this.closeModal();
    this.toast(t('toast.orderPlaced') + (warned ? ' · ' + t('toast.lowStockWarn') : ''));
    this.render();
  },

  /* ================= INVENTORY ================= */
  vInventory(el) {
    const d = Store.data;
    el.innerHTML = `
      <div class="page-head">
        <h1>${t('inv.title')}</h1>
        <button class="btn-primary" onclick="App.openAddItem()">${t('inv.addItem')}</button>
      </div>
      <p class="muted small">${t('inv.note')}</p>
      <div class="card table-card">
        <table>
          <thead><tr><th></th><th>${t('inv.item')}</th><th>${t('inv.stock')}</th><th>${t('common.status')}</th><th></th></tr></thead>
          <tbody>
            ${d.inventory.map(it => {
      const stt = this.stockStatus(it);
      return `<tr>
        <td class="inv-ico">${it.icon}</td>
        <td><b>${this.esc(L(it.name))}</b><br><small class="muted">${it.name.en}</small></td>
        <td><b>${this.fmtStock(it)}</b><br><small class="muted">${t('inv.lowAt')}: ${it.lowAt} ${it.unit === 'kg' ? 'kg' : it.unit === 'L' ? 'L' : ''}</small></td>
        <td><span class="pill ${stt === 'good' ? 'pill-good' : stt === 'low' ? 'pill-low' : 'pill-med'}">${stt === 'good' ? t('inv.good') : stt === 'low' ? t('inv.low') : t('inv.medium')}</span></td>
        <td class="ta-r"><button class="btn-ghost" onclick="App.openRestock('${it.id}')">${t('inv.restock')} +</button></td>
      </tr>`;
    }).join('')}
          </tbody>
        </table>
      </div>`;
  },
  openRestock(id) {
    const it = this.invById(id);
    this.modal(`
      <h3>${t('inv.restockTitle')}: ${this.esc(L(it.name))}</h3>
      <label class="field"><span>${t('inv.amount')} (${it.unit === 'pc' ? 'pcs' : it.unit})</span>
        <input id="restockAmt" type="number" min="0" step="0.1" value="1"></label>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="App.closeModal()">${t('common.cancel')}</button>
        <button class="btn-primary" onclick="App.submitRestock('${id}')">${t('common.save')}</button>
      </div>`);
  },
  submitRestock(id) {
    const it = this.invById(id);
    const amt = parseFloat(document.getElementById('restockAmt').value) || 0;
    if (amt > 0) { it.stock = +(it.stock + amt).toFixed(3); Store.save(); this.toast(t('toast.restocked')); }
    this.closeModal(); this.render();
  },
  openAddItem() {
    this.modal(`
      <h3>${t('inv.addItem')}</h3>
      <label class="field"><span>${t('inv.nameVI')}</span><input id="newNameVi" placeholder="VD: Bột trà xanh"></label>
      <label class="field"><span>${t('inv.nameEN')}</span><input id="newNameEn" placeholder="Matcha powder"></label>
      <div class="row flex">
        <label class="field grow"><span>${t('inv.stock')}</span><input id="newStock" type="number" min="0" step="0.1" value="0"></label>
        <label class="field grow"><span>${t('inv.unit')}</span><input id="newUnit" value="pc"></label>
        <label class="field grow"><span>${t('inv.lowAt')}</span><input id="newLow" type="number" min="0" step="0.1" value="1"></label>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="App.closeModal()">${t('common.cancel')}</button>
        <button class="btn-primary" onclick="App.submitAddItem()">${t('common.save')}</button>
      </div>`);
  },
  submitAddItem() {
    const vi = document.getElementById('newNameVi').value.trim();
    const en = document.getElementById('newNameEn').value.trim() || vi;
    const stock = parseFloat(document.getElementById('newStock').value) || 0;
    const unit = document.getElementById('newUnit').value.trim() || 'pc';
    const lowAt = parseFloat(document.getElementById('newLow').value) || 0;
    if (!vi) return;
    Store.data.inventory.push({ id: uid('inv'), icon: '📦', key: 'custom', name: { vi, en }, unit, stock, lowAt });
    Store.save(); this.closeModal(); this.render(); this.toast(t('toast.itemAdded'));
  },

  /* ================= RECIPES ================= */
  vRecipes(el) {
    const d = Store.data;
    el.innerHTML = `
      <div class="page-head"><h1>${t('recipe.title')}</h1>
        <button class="btn-primary" onclick="App.openRecipeEdit()">${t('recipe.new')}</button></div>
      <div class="recipe-grid">
        ${d.recipes.map(r => `
          <button class="card recipe-card" onclick="App.openRecipeDetail('${r.id}')">
            <span class="recipe-img big">${r.ingredients.some(i => i.inv === 'inv2') ? '🌾' : r.ingredients.some(i => i.inv === 'inv8') ? '🍫' : '☕'}</span>
            <b>${this.esc(L(r.name))}</b>
            <span class="muted small">${this.esc(L(r.desc))}</span>
            <span class="recipe-price">${this.money(r.price)} · ${r.ingredients.length} ${t('dash.ingredients').toLowerCase()}</span>
          </button>`).join('')}
      </div>`;
  },
  openRecipeDetail(id) {
    const r = this.recipeById(id); if (!r) return;
    this.modal(`
      <div class="recipe-head">
        <h3>${this.esc(L(r.name))}</h3><span class="recipe-img">${r.ingredients.some(i => i.inv === 'inv2') ? '🌾' : '☕'}</span>
      </div>
      <p class="muted small">${this.esc(L(r.desc))} · ${this.money(r.price)}</p>
      <div class="recipe-detail">
        <div><h5>${t('recipe.ingredients')}</h5>
          ${r.ingredients.map(ing => {
      const it = this.invById(ing.inv);
      return it ? `<div class="row flex"><span>${it.icon} ${this.esc(L(it.name))}</span><span class="muted">${this.esc(ing.amount)}</span></div>` : '';
    }).join('')}
        </div>
        <div><h5>${t('recipe.steps')}</h5><ol class="steps">${r.steps.map(s => `<li>${this.esc(L(s))}</li>`).join('')}</ol></div>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost danger" onclick="App.deleteRecipe('${r.id}')">${t('common.delete')}</button>
        <button class="btn-primary" onclick="App.openRecipeEdit('${r.id}')">${t('common.edit')}</button>
      </div>`);
  },
  deleteRecipe(id) {
    if (!confirm(t('common.confirmDelete'))) return;
    Store.data.recipes = Store.data.recipes.filter(r => r.id !== id);
    Store.save(); this.closeModal(); this.render(); this.toast(t('recipe.deleted'));
  },
  openRecipeEdit(id) {
    const d = Store.data;
    const r = id ? this.recipeById(id) : null;
    this._editR = r ? JSON.parse(JSON.stringify(r)) : {
      id: null, name: { vi: '', en: '' }, desc: { vi: '', en: '' }, size: '12oz', price: 30000,
      ingredients: [], steps: [],
    };
    this.modal(this.recipeEditHtml());
  },
  recipeEditHtml() {
    const d = Store.data, r = this._editR;
    return `<div class="modal-mask" onclick="if(event.target===this)App.closeModal()"><div class="modal modal-wide">
      <h3>${r.id ? t('common.edit') : t('recipe.create')}</h3>
      <div class="row flex">
        <label class="field grow"><span>${t('inv.nameVI')}</span><input id="rNameVi" value="${this.esc(r.name.vi)}" placeholder="${t('recipe.namePlaceholder')}"></label>
        <label class="field grow"><span>${t('inv.nameEN')}</span><input id="rNameEn" value="${this.esc(r.name.en)}" placeholder="e.g. Latte"></label>
      </div>
      <div class="row flex">
        <label class="field grow"><span>${t('inv.nameVI')} (mô tả)</span><input id="rDescVi" value="${this.esc(r.desc.vi)}" placeholder="${t('recipe.descPlaceholder')}"></label>
        <label class="field grow"><span>Description (EN)</span><input id="rDescEn" value="${this.esc(r.desc.en)}"></label>
      </div>
      <div class="row flex">
        <label class="field grow"><span>${t('recipe.price')}</span><input id="rPrice" type="number" min="0" value="${r.price}"></label>
        <label class="field grow"><span>${t('recipe.size')}</span><input id="rSize" value="${r.size}"></label>
      </div>
      <h5>${t('recipe.ingredients')}</h5>
      <div id="ingRows">
        ${r.ingredients.map((ing, i) => `
          <div class="order-line">
            <select onchange="App.setEditIng(${i},'inv',this.value)">
              ${d.inventory.map(it => `<option value="${it.id}" ${ing.inv === it.id ? 'selected' : ''}>${it.icon} ${this.esc(L(it.name))}</option>`).join('')}
            </select>
            <input class="ing-amt" value="${this.esc(ing.amount)}" placeholder="2 shots (18g)" onchange="App.setEditIng(${i},'amount',this.value)">
            <input class="ing-ded" type="number" step="0.001" min="0" value="${ing.ded}" title="${t('inv.restock')} / cup" onchange="App.setEditIng(${i},'ded',this.value)">
            <button class="btn-ghost" onclick="App.removeIngRow(${i})">✕</button>
          </div>`).join('')}
      </div>
      <button class="link-btn" onclick="App.addIngRow()">+ ${t('recipe.ingredient')}</button>
      <h5>${t('recipe.steps')}</h5>
      <textarea id="rSteps" rows="4" placeholder="${t('recipe.stepsPlaceholder').replace(/\n/g, '&#10;')}">${this.esc(r.steps.map(s => L(s)).join('\n'))}</textarea>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="App.closeModal()">${t('common.cancel')}</button>
        <button class="btn-primary" onclick="App.submitRecipe()">${t('common.save')}</button>
      </div>
    </div></div>`;
  },
  refreshRecipeEdit() {
    const m = document.getElementById('modalRoot');
    if (m) m.innerHTML = this.recipeEditHtml();
  },
  setEditIng(i, key, val) {
    if (key === 'ded') this._editR.ingredients[i].ded = parseFloat(val) || 0;
    else this._editR.ingredients[i][key] = val;
  },
  addIngRow() {
    this._editR.ingredients.push({ inv: Store.data.inventory[0].id, amount: '', ded: 0 });
    this.refreshRecipeEdit();
  },
  removeIngRow(i) { this._editR.ingredients.splice(i, 1); this.refreshRecipeEdit(); },
  submitRecipe() {
    const r = this._editR;
    r.name.vi = document.getElementById('rNameVi').value.trim() || r.name.vi || 'Recipe';
    r.name.en = document.getElementById('rNameEn').value.trim() || r.name.vi;
    r.desc.vi = document.getElementById('rDescVi').value.trim();
    r.desc.en = document.getElementById('rDescEn').value.trim() || r.desc.vi;
    r.price = parseInt(document.getElementById('rPrice').value) || 0;
    r.size = document.getElementById('rSize').value.trim() || '12oz';
    r.steps = document.getElementById('rSteps').value.split('\n').map(s => s.trim()).filter(Boolean)
      .map(s => ({ vi: s, en: s }));
    if (!r.id) r.id = uid('r');
    const d = Store.data;
    const idx = d.recipes.findIndex(x => x.id === r.id);
    if (idx >= 0) d.recipes[idx] = r; else d.recipes.push(r);
    Store.save(); this.closeModal(); this.render(); this.toast(t('toast.recipeSaved'));
  },

  /* ================= TEAM & TASKS ================= */
  vTeam(el) {
    const d = Store.data;
    const shift = d.tasks.filter(x => x.section === 'shift').sort((a, b) => a.time.localeCompare(b.time));
    const doneN = shift.filter(x => x.done).length;
    el.innerHTML = `
      <div class="page-head"><h1>${t('team.title')}</h1>
        <button class="btn-primary" onclick="App.openNewTask()">${t('team.newTask')}</button></div>
      <div class="cards-3">
        <div class="card">
          <div class="card-head"><h4>${t('team.progress')}</h4><span class="muted">${doneN}/${shift.length}</span></div>
          ${Charts.progress(shift.length ? doneN / shift.length * 100 : 0, '#7fb99d')}
          ${d.staff.map(st => {
      const mine = shift.filter(x => x.staff === st.id);
      const md = mine.filter(x => x.done).length;
      return `<div class="row flex team-row">
            <span class="avatar" style="background:${st.color}">${st.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span>
            <span><b>${this.esc(st.name)}</b><br><small class="muted">${t('role.' + st.role)} · ${md}/${mine.length}</small></span>
            <span class="dot ${mine.length && md === mine.length ? 'ok' : 'wait'}"></span></div>`;
    }).join('')}
        </div>
        <div class="card">
          <div class="card-head"><h4>${t('dash.todaysTasks')}</h4></div>
          ${shift.map(x => {
      const st = this.staffById(x.staff);
      return `<div class="row flex task-row">
            <input type="checkbox" ${x.done ? 'checked' : ''} onchange="App.toggleTask('${x.id}')">
            <span><span class="task-name ${x.done ? 'strike' : ''}">${this.esc(L(x.name))}</span><br>
            <small class="muted">${x.time} · ${st ? this.esc(st.name) : '—'}</small></span>
            <select onchange="App.assignTask('${x.id}',this.value)">
              ${d.staff.map(s => `<option value="${s.id}" ${x.staff === s.id ? 'selected' : ''}>${this.esc(s.name)}</option>`).join('')}
            </select></div>`;
    }).join('') || `<p class="muted small">${t('team.noTask')}</p>`}
        </div>
        <div class="card">
          <div class="card-head"><h4>${t('dash.openingChecklist')}</h4><span class="muted">${d.checklist.filter(c => c.done).length}/${d.checklist.length}</span></div>
          ${Charts.progress(d.checklist.filter(c => c.done).length / d.checklist.length * 100, '#c9a583')}
          ${d.checklist.map(c => `
            <label class="task-line"><input type="checkbox" ${c.done ? 'checked' : ''} onchange="App.toggleChecklist('${c.id}')">
              <span class="task-name ${c.done ? 'strike' : ''}">${this.esc(L(c.name))}</span></label>`).join('')}
        </div>
      </div>`;
  },
  toggleTask(id) {
    const x = Store.data.tasks.find(x2 => x2.id === id); if (!x) return;
    x.done = !x.done; Store.save(); this.render();
  },
  toggleChecklist(id) {
    const c = Store.data.checklist.find(c2 => c2.id === id); if (!c) return;
    c.done = !c.done; Store.save(); this.render();
  },
  assignTask(id, staffId) {
    const x = Store.data.tasks.find(x2 => x2.id === id); if (!x) return;
    x.staff = staffId; Store.save();
  },
  openNewTask() {
    const d = Store.data;
    this.modal(`
      <h3>${t('team.addTitle')}</h3>
      <label class="field"><span>${t('team.taskName')}</span><input id="taskName"></label>
      <div class="row flex">
        <label class="field grow"><span>${t('common.time')}</span><input id="taskTime" type="time" value="09:00"></label>
        <label class="field grow"><span>${t('team.assignee')}</span>
          <select id="taskStaff">${d.staff.map(s => `<option value="${s.id}">${this.esc(s.name)}</option>`).join('')}</select></label>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="App.closeModal()">${t('common.cancel')}</button>
        <button class="btn-primary" onclick="App.submitTask()">${t('common.save')}</button>
      </div>`);
  },
  submitTask() {
    const name = document.getElementById('taskName').value.trim();
    if (!name) return;
    Store.data.tasks.push({
      id: uid('tk'), name: { vi: name, en: name },
      time: document.getElementById('taskTime').value || '09:00',
      done: false, staff: document.getElementById('taskStaff').value, section: 'shift',
    });
    Store.save(); this.closeModal(); this.render(); this.toast(t('toast.taskAdded'));
  },

  /* ================= REPORTS ================= */
  vReports(el) {
    const d = Store.data;
    const days = []; for (let i = 13; i >= 0; i--) days.push(isoDaysAgo(i));
    const sales = days.map(iso => this.sumOrders(this.dayOrders(iso)));
    const counts = days.map(iso => this.dayOrders(iso).length);
    const totalRev = sales.reduce((a, b) => a + b, 0);
    const totalOrd = counts.reduce((a, b) => a + b, 0);
    const best = sales.indexOf(Math.max(...sales));

    /* top món bán chạy */
    const sold = {};
    d.orders.forEach(o => o.items.forEach(it => { sold[it.recipeId] = (sold[it.recipeId] || 0) + it.qty; }));
    const top = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5);

    el.innerHTML = `
      <div class="page-head"><h1>${t('rep.title')} <span class="muted h-small">· ${t('rep.range')}</span></h1></div>
      <div class="stats-row">
        <div class="card stat-card"><span class="muted small">${t('rep.totalRevenue')}</span><b class="stat-value">${this.money(totalRev)}</b></div>
        <div class="card stat-card"><span class="muted small">${t('rep.totalOrders')}</span><b class="stat-value">${totalOrd}</b></div>
        <div class="card stat-card"><span class="muted small">${t('rep.avgOrders')}</span><b class="stat-value">${Math.round(totalOrd / 14)}</b></div>
        <div class="card stat-card"><span class="muted small">${t('rep.bestDay')}</span><b class="stat-value">${days[best].slice(5)}</b><span class="delta up">▲ ${this.money(sales[best])}</span></div>
      </div>
      <div class="cards-2">
        <div class="card"><div class="card-head"><h4>${t('rep.revenueChart')}</h4></div>
          ${Charts.bars(sales, days.map(x => x.slice(5).replace('-', '/')), '#7fb99d', { h: 190, colw: 46 })}</div>
        <div class="card"><div class="card-head"><h4>${t('rep.ordersChart')}</h4></div>
          ${Charts.bars(counts, days.map(x => x.slice(5).replace('-', '/')), '#c9a583', { h: 190, colw: 46 })}</div>
      </div>
      <div class="card table-card">
        <table>
          <thead><tr><th>${t('rep.rank')}</th><th>${t('common.name')}</th><th class="ta-r">${t('rep.sold')}</th><th class="ta-r">${t('rep.revenue')}</th></tr></thead>
          <tbody>${top.map(([rid, n], i) => {
      const r = this.recipeById(rid); if (!r) return '';
      return `<tr><td><b>${i + 1}</b></td><td>${this.esc(L(r.name))}</td>
        <td class="ta-r">${n}</td><td class="ta-r"><b>${this.money(n * r.price)}</b></td></tr>`;
    }).join('')}</tbody>
        </table>
      </div>`;
  },

  /* ================= SETTINGS ================= */
  vSettings(el) {
    const s = Store.data.settings;
    el.innerHTML = `
      <div class="page-head"><h1>${t('set.title')}</h1></div>
      <div class="cards-2">
        <div class="card">
          <h4>${t('set.title')}</h4>
          <label class="field"><span>${t('set.language')}</span>
            <select id="setLang"><option value="vi" ${s.lang === 'vi' ? 'selected' : ''}>Tiếng Việt</option><option value="en" ${s.lang === 'en' ? 'selected' : ''}>English</option></select></label>
          <label class="field"><span>${t('set.cafeName')}</span><input id="setCafe" value="${this.esc(s.cafeName)}"></label>
          <label class="field"><span>${t('set.ownerName')}</span><input id="setOwner" value="${this.esc(s.ownerName)}"></label>
          <label class="field"><span>${t('set.currency')}</span>
            <select id="setCur"><option value="VND" ${s.currency === 'VND' ? 'selected' : ''}>VND ₫</option><option value="USD" ${s.currency === 'USD' ? 'selected' : ''}>USD $</option></select></label>
          <button class="btn-primary" onclick="App.saveSettings()">${t('set.save')}</button>
        </div>
        <div class="card">
          <h4>${t('set.data')}</h4>
          <p class="muted small">${t('set.resetDesc')}</p>
          <div class="modal-actions" style="justify-content:flex-start">
            <button class="btn-ghost" onclick="Store.export()">${t('set.export')}</button>
            <label class="btn-ghost file-btn">${t('set.import')}<input type="file" accept=".json" hidden onchange="Store.import(this.files[0])"></label>
            <button class="btn-ghost danger" onclick="App.resetData()">${t('set.reset')}</button>
          </div>
        </div>
      </div>`;
  },
  saveSettings() {
    const s = Store.data.settings;
    const lang = document.getElementById('setLang').value;
    s.lang = lang;
    s.cafeName = document.getElementById('setCafe').value.trim() || s.cafeName;
    s.ownerName = document.getElementById('setOwner').value.trim() || s.ownerName;
    s.currency = document.getElementById('setCur').value;
    Store.save(); this.toast(t('set.saved')); this.render();
  },
  resetData() {
    if (!confirm(t('set.resetConfirm'))) return;
    this.filter = 'today';
    Store.reset(false); this.toast(t('set.saved')); this.render();
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
