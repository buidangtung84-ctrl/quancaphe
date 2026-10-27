/* ============ Store — dữ liệu trong localStorage ============ */
const DATA_KEY = 'cafeApp.v1';

function isoToday() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function rand(a, b) { return a + Math.random() * (b - a); }
function randi(a, b) { return Math.floor(rand(a, b + 1)); }
function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }

function defaultData() {
  const staff = [
    { id: 'st1', name: 'Olivia Smith', role: 'manager', color: '#b98a63' },
    { id: 'st2', name: 'Jannie Lee',   role: 'manager', color: '#7f9db9' },
    { id: 'st3', name: 'Alex Rivera',  role: 'barista', color: '#8fae7f' },
    { id: 'st4', name: 'Taylor Kim',   role: 'barista', color: '#c98a8a' },
    { id: 'st5', name: 'Jordon Patel', role: 'cashier', color: '#b39a7f' },
  ];

  const inventory = [
    { id: 'inv1', icon: '☕', key: 'espresso', name: { vi: 'Cà phê espresso rang xay', en: 'Espresso Beans' }, unit: 'kg', stock: 11,  lowAt: 3 },
    { id: 'inv2', icon: '🥛', key: 'oatmilk',  name: { vi: 'Sữa yến mạch', en: 'Oat Milk' },               unit: 'L',  stock: 1.2, lowAt: 2 },
    { id: 'inv3', icon: '🥛', key: 'milk',     name: { vi: 'Sữa tươi nguyên kem', en: 'Whole Milk' },       unit: 'L',  stock: 5.6, lowAt: 2 },
    { id: 'inv4', icon: '🍮', key: 'caramel',  name: { vi: 'Sốt caramel', en: 'Caramel Syrup' },            unit: 'L',  stock: 0.6, lowAt: 1.5 },
    { id: 'inv5', icon: '🌼', key: 'vanilla',  name: { vi: 'Sốt vanilla', en: 'Vanilla Syrup' },            unit: 'L',  stock: 2.5, lowAt: 1 },
    { id: 'inv6', icon: '🥤', key: 'cups',     name: { vi: 'Ly giấy (12oz)', en: 'Paper Cups (12oz)' },    unit: 'pc', stock: 12, lowAt: 30 },
    { id: 'inv7', icon: '⭕', key: 'lids',     name: { vi: 'Nắp ly (12oz)', en: 'Cup Lids (12oz)' },        unit: 'pc', stock: 40, lowAt: 30 },
    { id: 'inv8', icon: '🍫', key: 'choco',    name: { vi: 'Sô-cô-la bột', en: 'Chocolate (powder)' },      unit: 'pc', stock: 4,  lowAt: 8 },
  ];

  /* ded = lượng trừ khỏi kho (theo đơn vị của nguyên liệu kho) mỗi 1 ly */
  const recipes = [
    {
      id: 'r1', name: { vi: 'Latte', en: 'Latte' },
      desc: { vi: 'Espresso đậm doubleshot quyện cùng sữa nóng mịn.', en: 'Double espresso and steamed milk.' },
      size: '12oz', price: 35000,
      ingredients: [
        { inv: 'inv1', amount: '2 shots (18g)', ded: 0.018 },
        { inv: 'inv3', amount: '10 oz (300ml)', ded: 0.3 },
        { inv: 'inv6', amount: '1 cup',         ded: 1 },
        { inv: 'inv7', amount: '1 lid',         ded: 1 },
      ],
      steps: [
        { vi: 'Bơm 2 shots espresso.', en: 'Push 2 shots of espresso.' },
        { vi: 'Hâm sữa đến 60–65°C.', en: 'Steam milk to 140°F.' },
        { vi: 'Rót sữa vào giữa ly.', en: 'Pour steamed milk into cup.' },
        { vi: 'Tạo lớp foam mỏng trên cùng.', en: 'Top with a light layer of foam.' },
        { vi: 'Phục vụ ngay và thưởng thức.', en: 'Serve and enjoy.' },
      ],
    },
    {
      id: 'r2', name: { vi: 'Caramel Macchiato', en: 'Caramel Macchiato' },
      desc: { vi: 'Vanilla, sữa tươi và caramel đậm vị.', en: 'Vanilla, milk and rich caramel.' },
      size: '12oz', price: 45000,
      ingredients: [
        { inv: 'inv1', amount: '2 shots (18g)', ded: 0.018 },
        { inv: 'inv3', amount: '10 oz (300ml)', ded: 0.3 },
        { inv: 'inv5', amount: '1 pump (10ml)', ded: 0.01 },
        { inv: 'inv4', amount: '1 drizzle (15ml)', ded: 0.015 },
        { inv: 'inv6', amount: '1 cup', ded: 1 },
        { inv: 'inv7', amount: '1 lid', ded: 1 },
      ],
      steps: [
        { vi: 'Cho sốt vanilla vào đáy ly.', en: 'Add vanilla syrup to cup.' },
        { vi: 'Thêm sữa tươi và đá.', en: 'Add milk and ice.' },
        { vi: 'Rót espresso lên trên.', en: 'Pour espresso on top.' },
        { vi: 'Tô caramel thành hình lưới.', en: 'Drizzle caramel crosshatch on top.' },
      ],
    },
    {
      id: 'r3', name: { vi: 'Cappuccino', en: 'Cappuccino' },
      desc: { vi: 'Espresso, sữa nóng và nhiều foam bồng bềnh.', en: 'Espresso, hot milk and thick foam.' },
      size: '8oz', price: 32000,
      ingredients: [
        { inv: 'inv1', amount: '2 shots (18g)', ded: 0.018 },
        { inv: 'inv3', amount: '6 oz (180ml)', ded: 0.18 },
        { inv: 'inv8', amount: '1 dust', ded: 1 },
        { inv: 'inv6', amount: '1 cup', ded: 1 },
      ],
      steps: [
        { vi: 'Bơm 2 shots espresso.', en: 'Push 2 shots of espresso.' },
        { vi: 'Tạo foam sữa mịn.', en: 'Foam milk thick and glossy.' },
        { vi: 'Rót và phủ bột cacao.', en: 'Pour and dust with cocoa.' },
      ],
    },
    {
      id: 'r4', name: { vi: 'Latte sữa yến mạch', en: 'Oat Milk Latte' },
      desc: { vi: 'Latte dịu nhẹ với sữa yến mạch thơm bùi.', en: 'A lighter latte with creamy oat milk.' },
      size: '12oz', price: 40000,
      ingredients: [
        { inv: 'inv1', amount: '2 shots (18g)', ded: 0.018 },
        { inv: 'inv2', amount: '10 oz (300ml)', ded: 0.3 },
        { inv: 'inv6', amount: '1 cup', ded: 1 },
        { inv: 'inv7', amount: '1 lid', ded: 1 },
      ],
      steps: [
        { vi: 'Bơm 2 shots espresso.', en: 'Push 2 shots of espresso.' },
        { vi: 'Hâm sữa yến mạch ( đừng sôi ).', en: 'Steam oat milk gently.' },
        { vi: 'Rót và tạo latte art.', en: 'Pour and finish with latte art.' },
      ],
    },
    {
      id: 'r5', name: { vi: 'Espresso', en: 'Espresso' },
      desc: { vi: 'Một shot nguyên bản, đậm và rang sát.', en: 'A single rich shot, bold and bright.' },
      size: '2oz', price: 25000,
      ingredients: [
        { inv: 'inv1', amount: '1 shot (9g)', ded: 0.009 },
        { inv: 'inv6', amount: '1 cup', ded: 1 },
      ],
      steps: [
        { vi: 'Xay 9g cà phê, nén chặt.', en: 'Grind 9g and tamp firm.' },
        { vi: 'Bơm 25–30 giây.', en: 'Extract 25–30 seconds.' },
        { vi: 'Phục vụ cùng ly tăm nước.', en: 'Serve with sparkling water.' },
      ],
    },
    {
      id: 'r6', name: { vi: 'Sô-cô-la nóng', en: 'Hot Chocolate' },
      desc: { vi: 'Sô-cô-la nóng ngọt ngào cho ngày mưa.', en: 'Sweet hot cocoa for rainy days.' },
      size: '12oz', price: 30000,
      ingredients: [
        { inv: 'inv8', amount: '2 scoops', ded: 2 },
        { inv: 'inv3', amount: '8 oz (240ml)', ded: 0.24 },
        { inv: 'inv6', amount: '1 cup', ded: 1 },
        { inv: 'inv7', amount: '1 lid', ded: 1 },
      ],
      steps: [
        { vi: 'Pha bột sô-cô-la với nước ấm.', en: 'Whisk cocoa powder with hot water.' },
        { vi: 'Thêm sữa nóng và khuấy đều.', en: 'Add steamed milk and stir.' },
        { vi: 'Phủ kem sữa trên cùng.', en: 'Top with milk foam.' },
      ],
    },
  ];

  const tasks = [
    { id: 'tk1', name: { vi: 'Mở cửa & tắt báo động', en: 'Opening Checklist' }, time: '06:00', done: true,  staff: 'st2', section: 'shift' },
    { id: 'tk2', name: { vi: 'Chuẩn bị máy pha cà phê', en: 'Breville Barista Prep' }, time: '06:10', done: true,  staff: 'st3', section: 'shift' },
    { id: 'tk3', name: { vi: 'Kiểm tra nhiệt độ sữa', en: 'Milk Temperature Check' }, time: '06:30', done: false, staff: 'st3', section: 'shift' },
    { id: 'tk4', name: { vi: 'Trưng bày bánh pastry', en: 'Pastry Case Setup' },     time: '07:00', done: false, staff: 'st4', section: 'shift' },
    { id: 'tk5', name: { vi: 'Bổ sung sữa', en: 'Restock Milk' },                    time: '07:45', done: false, staff: 'st3', section: 'shift' },
    { id: 'tk6', name: { vi: 'Bổ sung ly giấy', en: 'Restock Cups' },                time: '08:00', done: false, staff: 'st5', section: 'shift' },
    { id: 'tk7', name: { vi: 'Quét & lau sàn', en: 'Floor Sweep & Mop' },            time: '08:30', done: false, staff: 'st5', section: 'shift' },
  ];

  const checklist = [
    { id: 'ck1', name: { vi: 'Mở cửa & tắt báo động', en: 'Unlock doors & disarm alarm' }, done: true },
    { id: 'ck2', name: { vi: 'Kiểm tra máy espresso', en: 'Check espresso machine' },       done: true },
    { id: 'ck3', name: { vi: 'Xay cà phê & thử shot', en: 'Grind beans & test shot' },      done: true },
    { id: 'ck4', name: { vi: 'Đổ đầy bình nước', en: 'Fill water tanks' },                  done: false },
    { id: 'ck5', name: { vi: 'Lau quầy pha chế', en: 'Wipe counters' },                     done: false },
  ];

  const orders = seedOrders(recipes, staff);

  return {
    settings: { lang: 'vi', cafeName: 'Quán Cà Phê', ownerName: 'Olivia Smith', currency: 'VND' },
    staff, inventory, recipes, tasks, checklist, orders,
    kpis: { returning: { value: 68, delta: 4.8 } },
    seq: 1000,
  };
}

/* Tạo ~14 ngày đơn hàng mẫu để biểu đồ có dữ liệu */
function seedOrders(recipes, staff) {
  const orders = [];
  for (let d = 13; d >= 0; d--) {
    const date = isoDaysAgo(d);
    const base = d === 0 ? 118 : Math.round(rand(96, 152) * (d % 7 === 5 ? 1.15 : 1));
    for (let i = 0; i < base; i++) {
      const hour = randi(6, 21);
      const hh = String(hour).padStart(2, '0');
      const mm = String(randi(0, 59)).padStart(2, '0');
      const nLines = rand() < 0.55 ? 1 : 2;
      const items = [];
      let total = 0;
      for (let l = 0; l < nLines; l++) {
        const r = recipes[randi(0, recipes.length - 1)];
        const qty = rand() < 0.8 ? 1 : 2;
        const exist = items.find(x => x.recipeId === r.id);
        if (exist) exist.qty += qty; else items.push({ recipeId: r.id, qty, name: r.name, price: r.price });
        total += r.price * qty;
      }
      orders.push({
        id: 'OD-' + (9000 + orders.length) + '-' + d, date, time: hh + ':' + mm,
        items, total, staff: staff[randi(1, staff.length - 1)].id,
      });
    }
  }
  return orders;
}

const Store = {
  data: null,
  load() {
    try {
      const raw = localStorage.getItem(DATA_KEY);
      if (raw) { this.data = JSON.parse(raw); }
    } catch (e) { this.data = null; }
    if (!this.data || !this.data.settings) this.reset(false);
    return this.data;
  },
  save() { localStorage.setItem(DATA_KEY, JSON.stringify(this.data)); },
  reset(rerender) {
    this.data = defaultData();
    this.save();
    if (rerender && typeof App !== 'undefined') App.render();
  },
  export() {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cafe-data-' + isoToday() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  },
  import(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !data.settings) throw new Error('bad');
        this.data = data; this.save(); App.render(); App.toast(t('toast.imported'));
      } catch (e) { App.toast(t('toast.badFile'), true); }
    };
    reader.readAsText(file);
  },
};
