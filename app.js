/* ==========================================================
   Клодитет · Кабінет студента — прототип (без бекенду)
   ========================================================== */
'use strict';

const STORAGE_KEY = 'kloditet.state.v1';

const STUDENT = {
  name: 'Петро Лось', first: 'Петро', initials: 'ПЛ',
  id: 'КН-2023-0417', group: 'КН-31', course: 3, semester: 6,
  faculty: 'Факультет інформаційних технологій',
  speciality: '122 Комп’ютерні науки', form: 'Денна, бюджет',
  email: 'p.los@student.kloditet.ua', phone: '+380 67 555 01 17',
  birth: '14.03.2005', ticket: 'СТ № 2417-КН', dorm: 'Гуртожиток №3, кімн. 412',
  advisor: 'доц. Ірина Коваленко', gpa: 88.4, rating: 7, groupSize: 24,
  cardExpires: '30.06.2027'
};

const COURSES = [
  { id: 'c1', name: 'Машинне навчання', teacher: 'проф. Андрій Гриценко', credits: 5, type: 'Екзамен', color: '#0A84FF', progress: 72, current: 86, room: '3-412', lectures: 18, labs: 9, done: 13, absences: 1,
    topics: ['Лінійна регресія', 'Логістична регресія', 'Дерева рішень', 'Ансамблі', 'Нейронні мережі', 'CNN', 'RNN та трансформери'] },
  { id: 'c2', name: 'Бази даних', teacher: 'доц. Ірина Коваленко', credits: 4, type: 'Екзамен', color: '#34C759', progress: 80, current: 91, room: '2-205', lectures: 16, labs: 8, done: 13, absences: 0,
    topics: ['Реляційна модель', 'SQL: DDL/DML', 'Нормалізація', 'Індекси', 'Транзакції', 'NoSQL'] },
  { id: 'c3', name: 'Веброзробка', teacher: 'ст. викл. Максим Ткачук', credits: 4, type: 'Залік', color: '#FF9F0A', progress: 65, current: 78, room: '3-301', lectures: 14, labs: 14, done: 9, absences: 2,
    topics: ['HTML5/CSS3', 'JavaScript ES2023', 'DOM та події', 'REST API', 'React', 'Деплой'] },
  { id: 'c4', name: 'Операційні системи', teacher: 'доц. Олег Бондар', credits: 4, type: 'Екзамен', color: '#AF52DE', progress: 58, current: 74, room: '1-118', lectures: 16, labs: 8, done: 9, absences: 3,
    topics: ['Процеси та потоки', 'Планування', 'Пам’ять', 'Файлові системи', 'Linux shell'] },
  { id: 'c5', name: 'Англійська мова (проф.)', teacher: 'викл. Олена Шевчук', credits: 3, type: 'Залік', color: '#5AC8FA', progress: 85, current: 93, room: '4-210', lectures: 0, labs: 16, done: 14, absences: 0,
    topics: ['Technical writing', 'Presentations', 'Code review vocabulary', 'Interviews'] },
  { id: 'c6', name: 'Теорія ймовірностей', teacher: 'проф. Василь Руденко', credits: 4, type: 'Екзамен', color: '#FF2D55', progress: 60, current: 69, room: '2-110', lectures: 16, labs: 8, done: 10, absences: 2,
    topics: ['Випадкові події', 'Випадкові величини', 'Розподіли', 'ЗВЧ та ЦГТ', 'Мат. статистика'] },
];

// Day index: 1=Пн … 5=Пт
const SCHEDULE = [
  { day: 1, time: '08:30', end: '09:50', course: 'c2', kind: 'Лекція',      room: '2-205', week: 'all' },
  { day: 1, time: '10:05', end: '11:25', course: 'c1', kind: 'Лекція',      room: '3-412', week: 'all' },
  { day: 1, time: '11:40', end: '13:00', course: 'c3', kind: 'Лабораторна', room: '3-301', week: 'odd' },
  { day: 1, time: '13:30', end: '14:50', course: 'c5', kind: 'Практична',   room: '4-210', week: 'all' },
  { day: 2, time: '10:05', end: '11:25', course: 'c4', kind: 'Лекція',      room: '1-118', week: 'all' },
  { day: 2, time: '11:40', end: '13:00', course: 'c6', kind: 'Практична',   room: '2-110', week: 'all' },
  { day: 2, time: '13:30', end: '14:50', course: 'c1', kind: 'Лабораторна', room: '3-412', week: 'even' },
  { day: 3, time: '08:30', end: '09:50', course: 'c6', kind: 'Лекція',      room: '2-110', week: 'all' },
  { day: 3, time: '10:05', end: '11:25', course: 'c3', kind: 'Лекція',      room: '3-301', week: 'all' },
  { day: 3, time: '11:40', end: '13:00', course: 'c2', kind: 'Лабораторна', room: '2-205', week: 'all' },
  { day: 4, time: '10:05', end: '11:25', course: 'c1', kind: 'Лекція',      room: '3-412', week: 'all' },
  { day: 4, time: '11:40', end: '13:00', course: 'c4', kind: 'Лабораторна', room: '1-118', week: 'odd' },
  { day: 4, time: '13:30', end: '14:50', course: 'c5', kind: 'Практична',   room: '4-210', week: 'all' },
  { day: 5, time: '08:30', end: '09:50', course: 'c3', kind: 'Лабораторна', room: '3-301', week: 'all' },
  { day: 5, time: '10:05', end: '11:25', course: 'c6', kind: 'Практична',   room: '2-110', week: 'even' },
  { day: 5, time: '11:40', end: '13:00', course: 'c2', kind: 'Лекція',      room: '2-205', week: 'all' },
];

const DEFAULT_ASSIGNMENTS = [
  { id: 'a1', course: 'c1', title: 'Лаб. 5: Класифікація зображень (CNN)', due: '2026-10-19', status: 'todo', max: 10, desc: 'Навчити згорткову мережу на CIFAR-10, досягти точності ≥ 75%. Здати ноутбук .ipynb та короткий звіт.' },
  { id: 'a2', course: 'c3', title: 'Проєкт: SPA на React (етап 2)', due: '2026-10-17', status: 'todo', max: 20, desc: 'Реалізувати роутинг, стан застосунку та інтеграцію з публічним API. Репозиторій на GitHub.' },
  { id: 'a3', course: 'c2', title: 'Лаб. 6: Індекси та план виконання', due: '2026-10-22', status: 'todo', max: 10, desc: 'Порівняти EXPLAIN ANALYZE до та після створення індексів для 5 запитів.' },
  { id: 'a4', course: 'c6', title: 'ДЗ 4: Неперервні розподіли', due: '2026-10-16', status: 'todo', max: 5, desc: 'Задачі 4.1–4.12 зі збірника. Фото розв’язків або PDF.' },
  { id: 'a5', course: 'c4', title: 'Лаб. 4: Планувальник процесів', due: '2026-10-12', status: 'graded', grade: 8, max: 10, desc: 'Симуляція Round Robin та SJF на C.', feedback: 'Добре, але бракує обробки крайніх випадків при quantum = 0.' },
  { id: 'a6', course: 'c5', title: 'Essay: Future of AI in Industry', due: '2026-10-10', status: 'graded', grade: 5, max: 5, desc: '500 words, APA style.', feedback: 'Excellent structure and vocabulary!' },
  { id: 'a7', course: 'c1', title: 'Лаб. 4: Ансамблеві методи', due: '2026-10-05', status: 'graded', grade: 9, max: 10, desc: 'Random Forest vs Gradient Boosting.', feedback: 'Чудовий аналіз feature importance.' },
  { id: 'a8', course: 'c2', title: 'Лаб. 5: Транзакції', due: '2026-10-08', status: 'submitted', max: 10, desc: 'Рівні ізоляції та аномалії.' },
];

const GRADES_HISTORY = [
  { sem: 1, items: [['Вища математика', 'Екзамен', 85], ['Програмування (C++)', 'Екзамен', 92], ['Дискретна математика', 'Екзамен', 78], ['Історія України', 'Залік', 90], ['Фізика', 'Залік', 74]] },
  { sem: 2, items: [['Математичний аналіз', 'Екзамен', 81], ['ООП', 'Екзамен', 94], ['Архітектура комп’ютерів', 'Екзамен', 76], ['Англійська мова', 'Залік', 88], ['Філософія', 'Залік', 83]] },
  { sem: 3, items: [['Алгоритми та структури даних', 'Екзамен', 90], ['Комп’ютерні мережі', 'Екзамен', 84], ['Лінійна алгебра', 'Екзамен', 79], ['Python', 'Залік', 96], ['Укр. мова (проф.)', 'Залік', 87]] },
  { sem: 4, items: [['Чисельні методи', 'Екзамен', 82], ['Системне програмування', 'Екзамен', 88], ['Комп’ютерна графіка', 'Залік', 91], ['Економіка', 'Залік', 80], ['Англійська мова', 'Залік', 89]] },
  { sem: 5, items: [['Штучний інтелект', 'Екзамен', 95], ['Паралельні обчислення', 'Екзамен', 86], ['Програмна інженерія', 'Екзамен', 90], ['Кібербезпека', 'Залік', 93], ['Фізвиховання', 'Залік', 100]] },
];

const DEFAULT_FINANCE = {
  scholarship: 2100, scholarshipDate: '2026-10-25', dormDebt: 1850, dormDue: '2026-10-31',
  history: [
    { date: '2026-10-01', title: 'Оплата гуртожитку (вересень)', amount: -1850, status: 'ok' },
    { date: '2026-09-25', title: 'Академічна стипендія', amount: 2100, status: 'ok' },
    { date: '2026-09-02', title: 'Оплата гуртожитку (серпень)', amount: -1850, status: 'ok' },
    { date: '2026-08-25', title: 'Академічна стипендія', amount: 2100, status: 'ok' },
    { date: '2026-07-25', title: 'Академічна стипендія', amount: 2100, status: 'ok' },
  ]
};

const LIBRARY = {
  taken: [
    { id: 'b1', title: 'Deep Learning', author: 'Goodfellow, Bengio, Courville', until: '2026-10-28', color: '#0A84FF' },
    { id: 'b2', title: 'Database System Concepts', author: 'Silberschatz, Korth', until: '2026-10-20', color: '#34C759' },
    { id: 'b3', title: 'Operating System Concepts', author: 'Silberschatz, Galvin', until: '2026-11-05', color: '#AF52DE' },
  ],
  catalog: [
    { id: 'b4', title: 'Hands-On Machine Learning', author: 'Aurélien Géron', available: 3, color: '#FF9F0A' },
    { id: 'b5', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', available: 0, color: '#FF2D55' },
    { id: 'b6', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', available: 5, color: '#5AC8FA' },
    { id: 'b7', title: 'Теорія ймовірностей: курс лекцій', author: 'В. Руденко', available: 12, color: '#636366' },
    { id: 'b8', title: 'Clean Code', author: 'Robert C. Martin', available: 1, color: '#1C1C1E' },
    { id: 'b9', title: 'The Pragmatic Programmer', author: 'Hunt, Thomas', available: 2, color: '#5E5CE6' },
  ]
};

const DEFAULT_THREADS = [
  { id: 't1', name: 'Ірина Коваленко', role: 'Куратор групи', initials: 'ІК', unread: 2, msgs: [
    { from: 'in', text: 'Петре, доброго дня! Нагадую про зустріч групи у п’ятницю о 15:00 в ауд. 2-205.', t: '09:12' },
    { from: 'in', text: 'І не забудьте, будь ласка, здати лабораторну 6 до 22 жовтня.', t: '09:13' },
  ]},
  { id: 't2', name: 'Деканат ФІТ', role: 'Офіційні повідомлення', initials: 'ДФ', unread: 1, msgs: [
    { from: 'in', text: 'Шановні студенти! З 20 жовтня розпочинається реєстрація на вибіркові дисципліни на 7 семестр. Докладніше у розділі «Заявки».', t: 'Вчора' },
  ]},
  { id: 't3', name: 'Максим Ткачук', role: 'Веброзробка', initials: 'МТ', unread: 0, msgs: [
    { from: 'out', text: 'Доброго дня! Чи можна здати етап 2 проєкту на день пізніше? Перекинули дедлайн на роботі.', t: 'Пн' },
    { from: 'in', text: 'Добре, до 18.10 включно без штрафу. Але не пізніше 🙂', t: 'Пн' },
    { from: 'out', text: 'Дякую!', t: 'Пн' },
  ]},
  { id: 't4', name: 'Група КН-31', role: 'Чат групи · 24 учасники', initials: 'КН', unread: 0, msgs: [
    { from: 'in', text: 'Хтось має конспект з ОС за минулий тиждень?', t: 'Нд' },
    { from: 'in', text: 'Я скину в Google Drive ввечері', t: 'Нд' },
  ]},
];

const DEFAULT_REQUESTS = [
  { id: 'r1', type: 'Довідка про навчання (форма №20)', date: '2026-10-06', status: 'ready', comment: 'Для військкомату', steps: 3 },
  { id: 'r2', type: 'Заява на поселення в гуртожиток', date: '2026-08-20', status: 'done', comment: 'На 2026/27 н.р.', steps: 3 },
  { id: 'r3', type: 'Запис на вибіркову дисципліну', date: '2026-10-13', status: 'review', comment: '«Комп’ютерний зір» (7 семестр)', steps: 3 },
];

const REQUEST_TYPES = [
  'Довідка про навчання (форма №20)', 'Довідка про стипендію', 'Витяг із залікової книжки', 'Запис на вибіркову дисципліну',
  'Заява на академічну відпустку', 'Заява на перескладання', 'Заява на поселення в гуртожиток', 'Дублікат студентського квитка', 'Інше'
];

const DEFAULT_NOTIFS = [
  { id: 'n1', ico: '📝', title: 'Новий дедлайн', text: 'ДЗ 4 з теорії ймовірностей — до 16 жовтня', unread: true },
  { id: 'n2', ico: '🎓', title: 'Оцінку виставлено', text: 'Лаб. 4 з ОС: 8/10', unread: true },
  { id: 'n3', ico: '📄', title: 'Довідка готова', text: 'Довідку про навчання можна забрати в деканаті (каб. 104)', unread: true },
  { id: 'n4', ico: '📖', title: 'Бібліотека', text: '«Database System Concepts» — повернути до 20 жовтня', unread: false },
  { id: 'n5', ico: '💳', title: 'Стипендія', text: 'Наступна виплата 25 жовтня — 2 100 ₴', unread: false },
];

const DAYS = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const DAYS_FULL = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'];
const PAGE_TITLES = { dashboard: 'Головна', schedule: 'Розклад', courses: 'Дисципліни', assignments: 'Завдання', grades: 'Залікова книжка', finance: 'Фінанси', library: 'Бібліотека', messages: 'Повідомлення', requests: 'Заявки та довідки', profile: 'Профіль' };

/* ---------- state ---------- */
let state = loadState();
function defaultState() {
  return {
    loggedIn: false,
    assignments: JSON.parse(JSON.stringify(DEFAULT_ASSIGNMENTS)),
    finance: JSON.parse(JSON.stringify(DEFAULT_FINANCE)),
    threads: JSON.parse(JSON.stringify(DEFAULT_THREADS)),
    requests: JSON.parse(JSON.stringify(DEFAULT_REQUESTS)),
    notifs: JSON.parse(JSON.stringify(DEFAULT_NOTIFS)),
    library: JSON.parse(JSON.stringify(LIBRARY)),
    activeThread: 't1',
    scheduleDay: null,
    scheduleWeek: 'odd',
    profile: { phone: STUDENT.phone, email: STUDENT.email, notifEmail: true, notifPush: true, lang: 'uk' }
  };
}
function loadState() {
  try { const s = localStorage.getItem(STORAGE_KEY); if (s) return Object.assign(defaultState(), JSON.parse(s)); } catch (e) {}
  return defaultState();
}
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const course = id => COURSES.find(c => c.id === id);
const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const fmtDate = iso => { const d = new Date(iso + 'T00:00:00'); return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' }); };
const fmtMoney = n => (n < 0 ? '−' : '+') + Math.abs(n).toLocaleString('uk-UA') + ' ₴';
const today = () => new Date();
const daysLeft = iso => Math.ceil((new Date(iso + 'T00:00:00') - new Date(new Date().toDateString())) / 86400000);
const gradeClass = g => g >= 90 ? 'a' : g >= 75 ? 'b' : g >= 60 ? 'c' : 'd';
const ects = g => g >= 90 ? 'A' : g >= 82 ? 'B' : g >= 74 ? 'C' : g >= 64 ? 'D' : g >= 60 ? 'E' : 'F';
const nowTime = () => { const d = today(); return d.getHours() * 60 + d.getMinutes(); };
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

function toast(msg, type = '') {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast ' + type; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2600);
}
function openModal(title, html) { $('#modal-title').textContent = title; $('#modal-body').innerHTML = html; $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; }
function addNotif(ico, title, text) { state.notifs.unshift({ id: 'n' + Date.now(), ico, title, text, unread: true }); save(); renderBadges(); }

/* ---------- auth ---------- */
$('#login-form').addEventListener('submit', e => {
  e.preventDefault();
  const u = $('#login-user').value.trim().toLowerCase();
  const p = $('#login-pass').value;
  if (u !== 'demo' || !p) { $('#login-error').hidden = false; $('#login-user').focus(); return; }
  $('#login-error').hidden = true;
  const btn = e.target.querySelector('button'); btn.disabled = true; btn.textContent = 'Вхід…';
  setTimeout(() => { state.loggedIn = true; save(); btn.disabled = false; btn.textContent = 'Увійти'; showApp(); toast('Вітаємо, Петре! 👋', 'ok'); }, 600);
});
$('#logout-btn').addEventListener('click', () => {
  state.loggedIn = false; save();
  $('#app').hidden = true; $('#login-screen').hidden = false; $('#login-pass').value = ''; location.hash = '';
});
function showApp() { $('#login-screen').hidden = true; $('#app').hidden = false; route(); }

/* ---------- routing ---------- */
function route() {
  const page = (location.hash.replace('#', '') || 'dashboard').split('/')[0];
  const fn = PAGES[page] ? page : 'dashboard';
  $('#page-title').textContent = PAGE_TITLES[fn];
  $$('[data-page]').forEach(a => a.classList.toggle('active', a.dataset.page === fn));
  const c = $('#content'); c.innerHTML = PAGES[fn](); c.scrollTop = 0; window.scrollTo(0, 0);
  $('.sidebar').classList.remove('open');
  renderBadges();
  document.title = 'Клодитет · ' + PAGE_TITLES[fn];
}
window.addEventListener('hashchange', route);
function renderBadges() {
  const todo = state.assignments.filter(a => a.status === 'todo').length;
  const unread = state.threads.reduce((s, t) => s + t.unread, 0);
  $('#badge-assign').textContent = todo || ''; $('#badge-msg').textContent = unread || '';
  $('#notif-dot').classList.toggle('on', state.notifs.some(n => n.unread));
}

/* ---------- pages ---------- */
const PAGES = {};

PAGES.dashboard = () => {
  const d = today(); const dow = d.getDay();
  const lessonsToday = SCHEDULE.filter(l => l.day === dow && (l.week === 'all' || l.week === state.scheduleWeek)).sort((a, b) => a.time.localeCompare(b.time));
  const todo = state.assignments.filter(a => a.status === 'todo').sort((a, b) => a.due.localeCompare(b.due));
  const unread = state.threads.reduce((s, t) => s + t.unread, 0);
  const hour = d.getHours(); const greet = hour < 12 ? 'Доброго ранку' : hour < 18 ? 'Доброго дня' : 'Доброго вечора';
  return `
  <div class="card" style="background:linear-gradient(135deg,#0A84FF,#5E5CE6);color:#fff;margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
      <div>
        <div style="opacity:.85;font-size:13px">${DAYS_FULL[dow]}, ${d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })} · ${state.scheduleWeek === 'odd' ? 'непарний' : 'парний'} тиждень</div>
        <h2 style="font-size:26px;margin:4px 0 6px">${greet}, ${STUDENT.first}! 👋</h2>
        <div style="opacity:.9">${lessonsToday.length ? `Сьогодні ${lessonsToday.length} ${plural(lessonsToday.length, 'пара', 'пари', 'пар')}, перша о ${lessonsToday[0].time}` : 'Сьогодні пар немає — гарний день для самостійної роботи 😎'}</div>
      </div>
      <div style="display:flex;gap:10px"><a href="#schedule" class="btn" style="background:rgba(255,255,255,.2);color:#fff">Розклад</a><a href="#assignments" class="btn" style="background:#fff;color:#0A84FF">Завдання</a></div>
    </div>
  </div>
  <div class="grid c4" style="margin-bottom:16px">
    ${stat('🎓', 'tint-blue', STUDENT.gpa.toFixed(1), 'Середній бал', '#grades')}
    ${stat('🏆', 'tint-orange', `#${STUDENT.rating}`, `Рейтинг у групі з ${STUDENT.groupSize}`, '#grades')}
    ${stat('📝', 'tint-red', todo.length, 'Активних завдань', '#assignments')}
    ${stat('💬', 'tint-green', unread, 'Непрочитаних', '#messages')}
  </div>
  <div class="grid c2">
    <div class="card">
      <h3>Розклад на сьогодні <a class="btn btn-small btn-ghost" href="#schedule">Весь тиждень</a></h3>
      ${lessonsToday.length ? lessonsToday.map(lessonHtml).join('') : '<div class="empty">Пар немає 🎉</div>'}
    </div>
    <div class="card">
      <h3>Найближчі дедлайни <a class="btn btn-small btn-ghost" href="#assignments">Усі</a></h3>
      <div class="list">
        ${todo.slice(0, 4).map(a => `<div class="list-item clickable" onclick="openAssignment('${a.id}')">
          <div class="ico" style="width:10px;height:10px;border-radius:50%;background:${course(a.course).color};flex-shrink:0"></div>
          <div class="grow"><div class="title">${esc(a.title)}</div><div class="sub">${course(a.course).name}</div></div>
          ${dueChip(a.due)}</div>`).join('') || '<div class="empty">Усе здано ✅</div>'}
      </div>
    </div>
    <div class="card">
      <h3>Успішність за семестр</h3>
      ${COURSES.map(c => `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px"><span>${c.name}</span><b class="grade ${gradeClass(c.current)}" style="font-size:14px">${c.current}</b></div><div class="progress"><div style="width:${c.current}%;background:${c.color}"></div></div></div>`).join('')}
    </div>
    <div class="card">
      <h3>Оголошення</h3>
      <div class="list">
        <div class="list-item"><span style="font-size:22px">🗓️</span><div class="grow"><div class="title">Реєстрація на вибіркові дисципліни</div><div class="sub">20 жовтня – 3 листопада · 7 семестр</div></div></div>
        <div class="list-item"><span style="font-size:22px">🏛️</span><div class="grow"><div class="title">День відкритих дверей Клодитету</div><div class="sub">25 жовтня, 11:00 · головний корпус</div></div></div>
        <div class="list-item"><span style="font-size:22px">💻</span><div class="grow"><div class="title">Хакатон «Klod AI Hack 2026»</div><div class="sub">Реєстрація команд до 30 жовтня</div></div></div>
        <div class="list-item"><span style="font-size:22px">📚</span><div class="grow"><div class="title">Бібліотека працює до 21:00</div><div class="sub">у період сесії з 1 грудня</div></div></div>
      </div>
    </div>
  </div>`;
};
function stat(ico, tint, val, lbl, href) { return `<a class="card stat" href="${href}" style="color:inherit"><div class="ico ${tint}">${ico}</div><div class="val">${val}</div><div class="lbl">${lbl}</div></a>`; }
function plural(n, a, b, c) { const m = n % 10, h = n % 100; return (m === 1 && h !== 11) ? a : (m >= 2 && m <= 4 && (h < 10 || h >= 20)) ? b : c; }
function dueChip(iso) {
  const n = daysLeft(iso);
  if (n < 0) return `<span class="chip chip-red">Прострочено</span>`;
  if (n === 0) return `<span class="chip chip-red">Сьогодні</span>`;
  if (n === 1) return `<span class="chip chip-orange">Завтра</span>`;
  if (n <= 3) return `<span class="chip chip-orange">${n} дн.</span>`;
  return `<span class="chip chip-gray">${fmtDate(iso)}</span>`;
}
function lessonHtml(l, showNow = true) {
  const c = course(l.course); const isToday = l.day === today().getDay();
  const now = showNow && isToday && nowTime() >= toMin(l.time) && nowTime() <= toMin(l.end);
  return `<div class="lesson ${now ? 'now' : ''}"><div class="time">${l.time}<small>${l.end}</small></div><div class="bar" style="background:${c.color}"></div>
    <div class="body"><div class="name">${c.name} ${now ? '<span class="chip chip-blue">зараз</span>' : ''}</div><div class="meta">${l.kind} · ауд. ${l.room} · ${c.teacher}${l.week !== 'all' ? ' · ' + (l.week === 'odd' ? 'непарн.' : 'парн.') : ''}</div></div></div>`;
}

PAGES.schedule = () => {
  const dow = today().getDay();
  const day = state.scheduleDay ?? (dow >= 1 && dow <= 5 ? dow : 1);
  const lessons = SCHEDULE.filter(l => l.day === day && (l.week === 'all' || l.week === state.scheduleWeek)).sort((a, b) => a.time.localeCompare(b.time));
  return `
  <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
    <div class="seg">${[1, 2, 3, 4, 5].map(d => `<button class="${d === day ? 'active' : ''}" onclick="setDay(${d})">${DAYS[d]}${d === dow ? ' •' : ''}</button>`).join('')}</div>
    <div class="seg"><button class="${state.scheduleWeek === 'odd' ? 'active' : ''}" onclick="setWeek('odd')">Непарний</button><button class="${state.scheduleWeek === 'even' ? 'active' : ''}" onclick="setWeek('even')">Парний</button></div>
  </div>
  <div class="grid c2">
    <div class="card"><h3>${DAYS_FULL[day]} <span class="muted small" style="font-weight:500">${lessons.length} ${plural(lessons.length, 'пара', 'пари', 'пар')}</span></h3>
      ${lessons.length ? lessons.map(lessonHtml).join('') : '<div class="empty">Пар немає</div>'}</div>
    <div>
      <div class="card" style="margin-bottom:16px"><h3>Весь тиждень</h3>
        ${[1, 2, 3, 4, 5].map(d => { const ls = SCHEDULE.filter(l => l.day === d && (l.week === 'all' || l.week === state.scheduleWeek)); return `<div class="list-item clickable" onclick="setDay(${d})"><div class="grow"><div class="title">${DAYS_FULL[d]}</div><div class="sub">${ls.length ? ls.map(l => course(l.course).name.split(' ')[0]).join(', ') : '—'}</div></div><span class="chip chip-gray">${ls.length}</span></div>`; }).join('')}
      </div>
      <div class="card"><h3>Дзвінки</h3>
        <div class="kv"><dt>1 пара</dt><dd>08:30 – 09:50</dd><dt>2 пара</dt><dd>10:05 – 11:25</dd><dt>3 пара</dt><dd>11:40 – 13:00</dd><dt>4 пара</dt><dd>13:30 – 14:50</dd><dt>5 пара</dt><dd>15:05 – 16:25</dd></div>
        <button class="btn btn-block" style="margin-top:14px" onclick="exportICS()">📆 Експорт у календар (.ics)</button>
      </div>
    </div>
  </div>`;
};
window.setDay = d => { state.scheduleDay = d; save(); route(); };
window.setWeek = w => { state.scheduleWeek = w; save(); route(); };
window.exportICS = () => {
  const monday = new Date(); monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const pad = n => String(n).padStart(2, '0');
  const ev = SCHEDULE.filter(l => l.week === 'all' || l.week === state.scheduleWeek).map((l, i) => {
    const d = new Date(monday); d.setDate(d.getDate() + l.day - 1);
    const ds = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    return `BEGIN:VEVENT\nUID:kloditet-${i}@demo\nDTSTART:${ds}T${l.time.replace(':', '')}00\nDTEND:${ds}T${l.end.replace(':', '')}00\nSUMMARY:${course(l.course).name} (${l.kind})\nLOCATION:ауд. ${l.room}\nEND:VEVENT`;
  }).join('\n');
  download('kloditet-schedule.ics', `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Kloditet//UA\n${ev}\nEND:VCALENDAR`, 'text/calendar');
  toast('Файл розкладу завантажено', 'ok');
};
function download(name, text, type) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }

PAGES.courses = () => `
  <div class="grid c3">${COURSES.map(c => `
    <div class="card" style="cursor:pointer" onclick="openCourse('${c.id}')">
      <div style="display:flex;gap:14px;align-items:center;margin-bottom:12px">
        <div class="ring" style="--p:${c.current};--c:${c.color}"><span>${c.current}</span></div>
        <div><div style="font-weight:700;font-size:16px">${c.name}</div><div class="muted small">${c.teacher}</div></div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px"><span class="chip chip-gray">${c.credits} кред.</span><span class="chip ${c.type === 'Екзамен' ? 'chip-purple' : 'chip-blue'}">${c.type}</span><span class="chip ${c.absences > 2 ? 'chip-red' : 'chip-green'}">Пропусків: ${c.absences}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:5px"><span>Пройдено програми</span><span>${c.progress}%</span></div>
      <div class="progress"><div style="width:${c.progress}%;background:${c.color}"></div></div>
    </div>`).join('')}</div>`;
window.openCourse = id => {
  const c = course(id); const as = state.assignments.filter(a => a.course === id);
  const doneT = Math.round(c.topics.length * c.progress / 100);
  openModal(c.name, `
    <dl class="kv"><dt>Викладач</dt><dd>${c.teacher}</dd><dt>Аудиторія</dt><dd>${c.room}</dd><dt>Контроль</dt><dd>${c.type}, ${c.credits} кредитів ECTS</dd><dt>Поточний бал</dt><dd><b class="grade ${gradeClass(c.current)}">${c.current}</b> / 100 (${ects(c.current)})</dd><dt>Відвідуваність</dt><dd>${c.done} з ${c.done + c.absences} занять · ${c.absences} пропуск${plural(c.absences, '', 'и', 'ів')}</dd></dl>
    <h4 style="margin:18px 0 8px">Програма курсу</h4>
    <div class="tl">${c.topics.map((t, i) => `<div class="tl-item ${i < doneT ? 'done' : i === doneT ? 'cur' : ''}">${t}${i === doneT ? ' <span class="chip chip-blue">зараз</span>' : ''}</div>`).join('')}</div>
    <h4 style="margin:10px 0 8px">Завдання (${as.length})</h4>
    <div class="list">${as.map(a => `<div class="list-item clickable" onclick="closeModal();openAssignment('${a.id}')"><div class="grow"><div class="title">${esc(a.title)}</div><div class="sub">до ${fmtDate(a.due)}</div></div>${statusChip(a)}</div>`).join('') || '<div class="muted">Немає</div>'}</div>
    <div class="modal-actions"><button class="btn" onclick="toast('Матеріали курсу відкрито у Moodle (імітація)')">📂 Матеріали</button><button class="btn btn-primary" onclick="closeModal()">Закрити</button></div>`);
};

function statusChip(a) {
  return a.status === 'todo' ? dueChip(a.due) : a.status === 'submitted' ? '<span class="chip chip-blue">На перевірці</span>' : `<span class="chip chip-green">${a.grade}/${a.max}</span>`;
}
PAGES.assignments = () => {
  const f = PAGES.assignments.filter || 'todo';
  const list = state.assignments.filter(a => f === 'all' || a.status === f).sort((a, b) => a.due.localeCompare(b.due));
  const cnt = s => state.assignments.filter(a => a.status === s).length;
  return `
  <div class="seg">${[['todo', 'До виконання', cnt('todo')], ['submitted', 'На перевірці', cnt('submitted')], ['graded', 'Оцінені', cnt('graded')], ['all', 'Усі', state.assignments.length]].map(([k, l, n]) => `<button class="${f === k ? 'active' : ''}" onclick="setAssignFilter('${k}')">${l} · ${n}</button>`).join('')}</div>
  <div class="card"><div class="list">
    ${list.map(a => `<div class="list-item clickable" onclick="openAssignment('${a.id}')">
      <div style="width:42px;height:42px;border-radius:12px;background:${course(a.course).color}20;color:${course(a.course).color};display:grid;place-items:center;font-weight:800;flex-shrink:0">${course(a.course).name.slice(0, 2).toUpperCase()}</div>
      <div class="grow"><div class="title">${esc(a.title)}</div><div class="sub">${course(a.course).name} · термін до ${fmtDate(a.due)} · макс. ${a.max} б.</div></div>${statusChip(a)}</div>`).join('') || '<div class="empty">Нічого немає</div>'}
  </div></div>`;
};
window.setAssignFilter = f => { PAGES.assignments.filter = f; route(); };
window.openAssignment = id => {
  const a = state.assignments.find(x => x.id === id); const c = course(a.course);
  let body = `<dl class="kv"><dt>Дисципліна</dt><dd>${c.name}</dd><dt>Викладач</dt><dd>${c.teacher}</dd><dt>Термін</dt><dd>${new Date(a.due + 'T00:00:00').toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })} ${dueChip(a.due)}</dd><dt>Максимум</dt><dd>${a.max} балів</dd></dl><p style="margin:14px 0">${esc(a.desc)}</p>`;
  if (a.status === 'todo') body += `
    <div class="dropzone" id="dz" onclick="document.getElementById('fileinp').click()">📎 Перетягніть файл або натисніть, щоб обрати<br><span class="small">PDF, ZIP, IPYNB, DOCX · до 50 МБ</span></div>
    <input type="file" id="fileinp" hidden onchange="pickFile(this)"><div id="file-name"></div>
    <label style="margin-top:14px"><span>Коментар викладачу</span><textarea id="a-comment" placeholder="Необов’язково"></textarea></label>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Скасувати</button><button class="btn btn-primary" id="submit-btn" disabled onclick="submitAssignment('${a.id}')">Здати роботу</button></div>`;
  else if (a.status === 'submitted') body += `<div class="chip chip-blue">Здано ${a.submittedAt || ''} · очікує перевірки</div>${a.file ? `<div class="file-pill">📄 ${esc(a.file)}</div>` : ''}<div class="modal-actions"><button class="btn btn-danger" onclick="withdraw('${a.id}')">Відкликати</button><button class="btn btn-primary" onclick="closeModal()">OK</button></div>`;
  else body += `<div class="card" style="background:#F2F2F7;box-shadow:none"><div style="display:flex;align-items:center;gap:14px"><div class="grade ${gradeClass(a.grade / a.max * 100)}" style="font-size:34px">${a.grade}<span class="muted" style="font-size:16px">/${a.max}</span></div><div><div style="font-weight:600">Відгук викладача</div><div class="muted">${esc(a.feedback || '—')}</div></div></div></div><div class="modal-actions"><button class="btn" onclick="toast('Запит на апеляцію надіслано (імітація)','ok');closeModal()">Апеляція</button><button class="btn btn-primary" onclick="closeModal()">OK</button></div>`;
  openModal(a.title, body);
  const dz = $('#dz'); if (dz) { dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); }; dz.ondragleave = () => dz.classList.remove('over'); dz.ondrop = e => { e.preventDefault(); dz.classList.remove('over'); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0].name); }; }
};
window.pickFile = inp => { if (inp.files[0]) setFile(inp.files[0].name); };
function setFile(name) { openAssignment._file = name; $('#file-name').innerHTML = `<div class="file-pill">📄 ${esc(name)} <span class="muted">· готово</span></div>`; $('#submit-btn').disabled = false; }
window.submitAssignment = id => {
  const btn = $('#submit-btn'); btn.disabled = true; btn.textContent = 'Завантаження…';
  setTimeout(() => {
    const a = state.assignments.find(x => x.id === id); a.status = 'submitted'; a.file = openAssignment._file; a.submittedAt = today().toLocaleDateString('uk-UA'); openAssignment._file = null;
    save(); closeModal(); route(); toast('Роботу здано ✅', 'ok'); addNotif('📝', 'Роботу здано', a.title);
  }, 900);
};
window.withdraw = id => { const a = state.assignments.find(x => x.id === id); a.status = 'todo'; a.file = null; save(); closeModal(); route(); toast('Роботу відкликано'); };

PAGES.grades = () => {
  const all = GRADES_HISTORY.flatMap(s => s.items.map(i => i[2]));
  const avg = all.reduce((a, b) => a + b, 0) / all.length;
  const semAvg = GRADES_HISTORY.map(s => Math.round(s.items.reduce((a, i) => a + i[2], 0) / s.items.length));
  return `
  <div class="grid c4" style="margin-bottom:16px">
    ${stat('📊', 'tint-blue', avg.toFixed(1), 'Середній бал за всі семестри', '#grades')}
    ${stat('🎯', 'tint-green', all.filter(g => g >= 90).length, 'Відмінних оцінок', '#grades')}
    ${stat('📚', 'tint-purple', all.length, 'Дисциплін складено', '#grades')}
    ${stat('🏅', 'tint-orange', 'Так', 'Право на стипендію', '#finance')}
  </div>
  <div class="grid c2" style="margin-bottom:16px">
    <div class="card"><h3>Динаміка по семестрах</h3><div class="bars">${semAvg.map((v, i) => `<div class="b"><b style="color:var(--text)">${v}</b><div style="height:${(v - 50) / 50 * 100}%"></div>${i + 1} сем</div>`).join('')}<div class="b"><b style="color:var(--blue)">${Math.round(COURSES.reduce((a, c) => a + c.current, 0) / COURSES.length)}</b><div style="height:${(Math.round(COURSES.reduce((a, c) => a + c.current, 0) / COURSES.length) - 50) / 50 * 100}%;opacity:.5"></div>6 сем*</div></div><div class="muted small" style="margin-top:8px">* поточний семестр, попередній бал</div></div>
    <div class="card"><h3>Поточний семестр (6) <span class="chip chip-blue">триває</span></h3><div class="table-wrap"><table class="table"><tr><th>Дисципліна</th><th>Контроль</th><th>Бал</th></tr>${COURSES.map(c => `<tr><td>${c.name}</td><td class="muted">${c.type}</td><td><span class="grade ${gradeClass(c.current)}">${c.current}</span> <span class="muted small">${ects(c.current)}</span></td></tr>`).join('')}</table></div></div>
  </div>
  ${GRADES_HISTORY.slice().reverse().map(s => `<div class="card" style="margin-bottom:16px"><h3>Семестр ${s.sem} <span class="muted small" style="font-weight:500">середній ${semAvg[s.sem - 1]}</span></h3><div class="table-wrap"><table class="table"><tr><th>Дисципліна</th><th>Контроль</th><th>Бал</th><th>ECTS</th><th>Нац.</th></tr>${s.items.map(([n, t, g]) => `<tr><td>${n}</td><td class="muted">${t}</td><td><span class="grade ${gradeClass(g)}">${g}</span></td><td>${ects(g)}</td><td class="muted">${g >= 90 ? 'Відмінно' : g >= 74 ? 'Добре' : g >= 60 ? 'Задовільно' : 'Незадовільно'}</td></tr>`).join('')}</table></div></div>`).join('')}
  <button class="btn btn-primary" onclick="toast('Витяг із залікової книжки сформовано у PDF (імітація)','ok')">⬇️ Завантажити витяг (PDF)</button>`;
};

PAGES.finance = () => {
  const f = state.finance;
  return `
  <div class="grid c3" style="margin-bottom:16px">
    <div class="card stat"><div class="ico tint-green">💰</div><div class="val">${f.scholarship.toLocaleString('uk-UA')} ₴</div><div class="lbl">Стипендія · наступна ${fmtDate(f.scholarshipDate)}</div></div>
    <div class="card stat"><div class="ico ${f.dormDebt ? 'tint-red' : 'tint-green'}">🏠</div><div class="val">${f.dormDebt.toLocaleString('uk-UA')} ₴</div><div class="lbl">${f.dormDebt ? 'До сплати за гуртожиток до ' + fmtDate(f.dormDue) : 'Гуртожиток сплачено'}</div></div>
    <div class="card stat"><div class="ico tint-blue">🎓</div><div class="val">0 ₴</div><div class="lbl">Контракт · бюджетна форма</div></div>
  </div>
  <div class="grid c2">
    <div class="card"><h3>Рахунки до сплати</h3>
      ${f.dormDebt ? `<div class="list-item"><div class="grow"><div class="title">Проживання в гуртожитку №3 (жовтень)</div><div class="sub">Термін до ${fmtDate(f.dormDue)}</div></div><b>${f.dormDebt.toLocaleString('uk-UA')} ₴</b></div><button class="btn btn-primary btn-block" style="margin-top:12px" onclick="payDorm()">💳 Сплатити онлайн</button>` : '<div class="empty">Заборгованості немає ✅</div>'}
      <h3 style="margin-top:22px">Реквізити</h3>
      <dl class="kv"><dt>Отримувач</dt><dd>Університет «Клодитет»</dd><dt>IBAN</dt><dd style="font-family:monospace">UA12 3456 7890 0000 0260 0123 4567 8</dd><dt>ЄДРПОУ</dt><dd>01234567</dd><dt>Призначення</dt><dd>Гуртожиток, Лось П., КН-31</dd></dl>
    </div>
    <div class="card"><h3>Історія операцій</h3><div class="list">${f.history.map(h => `<div class="list-item"><div style="width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:${h.amount > 0 ? 'rgba(52,199,89,.15)' : '#F2F2F7'}">${h.amount > 0 ? '⬇️' : '⬆️'}</div><div class="grow"><div class="title">${esc(h.title)}</div><div class="sub">${fmtDate(h.date)}</div></div><b style="color:${h.amount > 0 ? '#1E8E3E' : 'inherit'}">${fmtMoney(h.amount)}</b></div>`).join('')}</div></div>
  </div>`;
};
window.payDorm = () => {
  const f = state.finance;
  openModal('Оплата', `<dl class="kv"><dt>Сума</dt><dd><b>${f.dormDebt.toLocaleString('uk-UA')} ₴</b></dd><dt>Призначення</dt><dd>Гуртожиток №3, жовтень 2026</dd></dl>
    <div class="form-row" style="margin-top:14px"><label><span>Номер картки</span><input id="pay-card" placeholder="4441 1144 2222 3333" maxlength="19" oninput="this.value=this.value.replace(/\\D/g,'').replace(/(.{4})/g,'$1 ').trim()"></label></div>
    <div class="form-row two"><label><span>Термін дії</span><input placeholder="MM/YY" maxlength="5"></label><label><span>CVV</span><input type="password" placeholder="•••" maxlength="3"></label></div>
    <p class="muted small">🔒 Це імітація платежу. Жодні дані не передаються.</p>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Скасувати</button><button class="btn btn-success" id="pay-btn" onclick="doPay()">Сплатити ${f.dormDebt.toLocaleString('uk-UA')} ₴</button></div>`);
};
window.doPay = () => {
  if (($('#pay-card').value.replace(/\s/g, '').length) < 16) { toast('Введіть номер картки (16 цифр)', 'err'); return; }
  const b = $('#pay-btn'); b.disabled = true; b.textContent = 'Обробка…';
  setTimeout(() => { const f = state.finance; f.history.unshift({ date: today().toISOString().slice(0, 10), title: 'Оплата гуртожитку (жовтень)', amount: -f.dormDebt, status: 'ok' }); f.dormDebt = 0; save(); closeModal(); route(); toast('Платіж успішний ✅', 'ok'); addNotif('💳', 'Платіж проведено', 'Гуртожиток за жовтень сплачено'); }, 1400);
};

PAGES.library = () => {
  const L = state.library; const q = (PAGES.library.q || '').toLowerCase();
  const cat = L.catalog.filter(b => !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  return `
  <div class="grid c2">
    <div class="card"><h3>Мої книги <span class="chip chip-gray">${L.taken.length} / 5</span></h3><div class="list">
      ${L.taken.map(b => `<div class="list-item"><div class="book"><div class="cover" style="background:${b.color}">${esc(b.title.slice(0, 18))}</div></div><div class="grow"><div class="title">${esc(b.title)}</div><div class="sub">${esc(b.author)}</div><div class="sub">Повернути до ${fmtDate(b.until)} ${daysLeft(b.until) <= 5 ? '<span class="chip chip-orange">скоро</span>' : ''}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn btn-small" onclick="prolong('${b.id}')">Продовжити</button><button class="btn btn-small btn-ghost" onclick="returnBook('${b.id}')">Повернути</button></div></div>`).join('') || '<div class="empty">Книг на руках немає</div>'}
    </div>
    <div class="muted small" style="margin-top:10px">Читальна зала: Пн–Пт 9:00–20:00 · Абонемент: корпус 1, к. 115</div></div>
    <div class="card"><h3>Каталог</h3><input type="search" placeholder="Пошук за назвою або автором" value="${esc(PAGES.library.q || '')}" oninput="libSearch(this.value)" style="margin-bottom:12px"><div class="list">
      ${cat.map(b => `<div class="list-item"><div class="book"><div class="cover" style="background:${b.color}">${esc(b.title.slice(0, 18))}</div></div><div class="grow"><div class="title">${esc(b.title)}</div><div class="sub">${esc(b.author)}</div><div class="sub">${b.available ? `<span class="chip chip-green">доступно: ${b.available}</span>` : '<span class="chip chip-red">немає в наявності</span>'}</div></div>${b.available ? `<button class="btn btn-small btn-primary" onclick="reserveBook('${b.id}')">Забронювати</button>` : `<button class="btn btn-small" onclick="toast('Ви в черзі. Повідомимо, коли книга з’явиться','ok')">У чергу</button>`}</div>`).join('') || '<div class="empty">Нічого не знайдено</div>'}
    </div></div>
  </div>`;
};
window.libSearch = v => { PAGES.library.q = v; const c = $('#content'); const pos = $('input[type=search]', c).selectionStart; c.innerHTML = PAGES.library(); const i = $('input[type=search]', c); i.focus(); i.setSelectionRange(pos, pos); };
window.reserveBook = id => {
  const L = state.library; if (L.taken.length >= 5) return toast('Ліміт 5 книг на руках', 'err');
  const b = L.catalog.find(x => x.id === id); b.available--; const until = new Date(); until.setDate(until.getDate() + 30);
  L.taken.push({ id: b.id + '-t' + Date.now(), title: b.title, author: b.author, until: until.toISOString().slice(0, 10), color: b.color });
  save(); route(); toast(`«${b.title}» заброньовано. Заберіть протягом 3 днів`, 'ok');
};
window.prolong = id => { const b = state.library.taken.find(x => x.id === id); const d = new Date(b.until + 'T00:00:00'); d.setDate(d.getDate() + 14); b.until = d.toISOString().slice(0, 10); save(); route(); toast('Продовжено на 14 днів', 'ok'); };
window.returnBook = id => { const L = state.library; const i = L.taken.findIndex(x => x.id === id); const b = L.taken[i]; const c = L.catalog.find(x => x.title === b.title); if (c) c.available++; L.taken.splice(i, 1); save(); route(); toast('Книгу повернуто (підтвердіть у бібліотеці)', 'ok'); };

PAGES.messages = () => {
  const t = state.threads.find(x => x.id === state.activeThread) || state.threads[0];
  const mobileThread = PAGES.messages.showThread;
  return `
  <div class="msg-layout">
    <div class="card msg-contacts ${mobileThread ? 'hide-m' : ''}" style="padding:10px">
      ${state.threads.map(x => `<div class="contact ${x.id === t.id ? 'active' : ''}" onclick="openThread('${x.id}')"><div class="avatar">${x.initials}</div><div class="grow" style="min-width:0"><div class="nm">${esc(x.name)}</div><div class="pv">${esc(x.msgs[x.msgs.length - 1]?.text || '')}</div></div>${x.unread ? `<span class="badge">${x.unread}</span>` : ''}</div>`).join('')}
    </div>
    <div class="card thread" ${!mobileThread ? 'id="thread-desktop"' : ''}>
      <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--line);margin-bottom:10px">
        <button class="icon-btn" style="box-shadow:none;background:#F2F2F7" onclick="backThreads()">‹</button>
        <div class="avatar" style="width:36px;height:36px;font-size:13px">${t.initials}</div><div><div style="font-weight:700">${esc(t.name)}</div><div class="muted small">${esc(t.role)}</div></div>
      </div>
      <div class="thread-body" id="thread-body">${t.msgs.map(m => `<div class="bubble ${m.from}">${esc(m.text)}<span class="t">${m.t}</span></div>`).join('')}</div>
      <form class="thread-input" onsubmit="sendMsg(event)"><input id="msg-inp" placeholder="Напишіть повідомлення…" autocomplete="off"><button class="btn btn-primary">➤</button></form>
    </div>
  </div>`;
};
window.openThread = id => { state.activeThread = id; const t = state.threads.find(x => x.id === id); t.unread = 0; PAGES.messages.showThread = true; save(); route(); scrollThread(); };
window.backThreads = () => { PAGES.messages.showThread = false; route(); };
function scrollThread() { const b = $('#thread-body'); if (b) b.scrollTop = b.scrollHeight; }
window.sendMsg = e => {
  e.preventDefault(); const inp = $('#msg-inp'); const text = inp.value.trim(); if (!text) return;
  const t = state.threads.find(x => x.id === state.activeThread); const tm = today().toTimeString().slice(0, 5);
  t.msgs.push({ from: 'out', text, t: tm }); save(); route(); scrollThread();
  if (t.id !== 't4') setTimeout(() => { t.msgs.push({ from: 'in', text: autoReply(t.id, text), t: today().toTimeString().slice(0, 5) }); save(); if (location.hash.includes('messages')) { route(); scrollThread(); } else { t.unread++; renderBadges(); } }, 1500 + Math.random() * 1500);
};
function autoReply(id, text) {
  const low = text.toLowerCase();
  if (/дяку/.test(low)) return 'Будь ласка! Гарного дня 🙂';
  if (/дедлайн|термін|пізніше/.test(low)) return 'Напишіть, будь ласка, причину — розглянемо можливість перенесення.';
  if (/оцінк|бал/.test(low)) return 'Оцінки за поточні роботи з’являться в кабінеті до кінця тижня.';
  if (id === 't2') return 'Ваше звернення зареєстровано. Відповідь надійде протягом 2 робочих днів.';
  return 'Дякую, отримав(ла) ваше повідомлення. Відповім детальніше трохи пізніше.';
}

const REQ_STATUS = { new: ['Подано', 'chip-gray', 1], review: ['На розгляді', 'chip-orange', 2], ready: ['Готово до видачі', 'chip-green', 3], done: ['Виконано', 'chip-blue', 3], rejected: ['Відхилено', 'chip-red', 3] };
PAGES.requests = () => `
  <div class="grid c2">
    <div class="card"><h3>Нова заявка</h3>
      <form onsubmit="createRequest(event)">
        <div class="form-row"><label><span>Тип документа / заяви</span><select id="req-type">${REQUEST_TYPES.map(t => `<option>${t}</option>`).join('')}</select></label></div>
        <div class="form-row"><label><span>Мета / коментар</span><textarea id="req-comment" placeholder="Наприклад: для подання в банк" required></textarea></label></div>
        <div class="form-row"><label><span>Спосіб отримання</span><select id="req-way"><option>Особисто в деканаті (к. 104)</option><option>Електронно з КЕП на email</option><option>Поштою</option></select></label></div>
        <button class="btn btn-primary btn-block">Подати заявку</button>
      </form>
      <div class="muted small" style="margin-top:12px">Довідки формуються протягом 1–3 робочих днів. Деканат: Пн–Пт 9:00–17:00.</div>
    </div>
    <div class="card"><h3>Мої заявки</h3><div class="list">
      ${state.requests.map(r => { const [l, cls, step] = REQ_STATUS[r.status]; return `<div class="list-item clickable" onclick="openRequest('${r.id}')"><div class="grow"><div class="title">${esc(r.type)}</div><div class="sub">№ ${r.id.toUpperCase()} · ${fmtDate(r.date)} · ${esc(r.comment)}</div><div class="progress" style="margin-top:6px;height:5px"><div style="width:${step / 3 * 100}%"></div></div></div><span class="chip ${cls}">${l}</span></div>`; }).join('')}
    </div></div>
  </div>`;
window.createRequest = e => {
  e.preventDefault();
  const r = { id: 'r' + (state.requests.length + 1) + Date.now().toString().slice(-3), type: $('#req-type').value, date: today().toISOString().slice(0, 10), status: 'new', comment: $('#req-comment').value.trim(), way: $('#req-way').value };
  state.requests.unshift(r); save(); route(); toast('Заявку подано. Номер ' + r.id.toUpperCase(), 'ok');
  setTimeout(() => { r.status = 'review'; save(); addNotif('📄', 'Заявку прийнято', r.type + ' — на розгляді'); if (location.hash.includes('requests')) route(); toast('Статус заявки змінено: на розгляді'); }, 6000);
};
window.openRequest = id => {
  const r = state.requests.find(x => x.id === id); const [l, cls] = REQ_STATUS[r.status];
  openModal(r.type, `<dl class="kv"><dt>Номер</dt><dd>${r.id.toUpperCase()}</dd><dt>Дата подання</dt><dd>${fmtDate(r.date)}</dd><dt>Статус</dt><dd><span class="chip ${cls}">${l}</span></dd><dt>Коментар</dt><dd>${esc(r.comment)}</dd>${r.way ? `<dt>Отримання</dt><dd>${esc(r.way)}</dd>` : ''}</dl>
    <div class="tl" style="margin-top:18px"><div class="tl-item done">Подано студентом</div><div class="tl-item ${['review', 'ready', 'done'].includes(r.status) ? 'done' : r.status === 'new' ? 'cur' : ''}">Розгляд у деканаті</div><div class="tl-item ${['ready', 'done'].includes(r.status) ? 'done' : r.status === 'review' ? 'cur' : ''}">Документ сформовано</div><div class="tl-item ${r.status === 'done' ? 'done' : r.status === 'ready' ? 'cur' : ''}">Видано</div></div>
    <div class="modal-actions">${r.status === 'ready' ? `<button class="btn btn-primary" onclick="toast('PDF із КЕП завантажено (імітація)','ok');markDone('${r.id}')">⬇️ Завантажити PDF</button>` : ''}${['new', 'review'].includes(r.status) ? `<button class="btn btn-danger" onclick="cancelRequest('${r.id}')">Скасувати заявку</button>` : ''}<button class="btn" onclick="closeModal()">Закрити</button></div>`);
};
window.markDone = id => { const r = state.requests.find(x => x.id === id); r.status = 'done'; save(); closeModal(); route(); };
window.cancelRequest = id => { state.requests = state.requests.filter(x => x.id !== id); save(); closeModal(); route(); toast('Заявку скасовано'); };

PAGES.profile = () => {
  const p = state.profile;
  return `
  <div class="grid c2">
    <div>
      <div class="card" style="text-align:center;margin-bottom:16px">
        <div class="avatar lg" style="margin:0 auto 12px">${STUDENT.initials}</div>
        <h3 style="justify-content:center;font-size:22px;margin-bottom:2px">${STUDENT.name}</h3>
        <div class="muted">${STUDENT.group} · ${STUDENT.course} курс · ${STUDENT.semester} семестр</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap"><span class="chip chip-blue">Бюджет</span><span class="chip chip-green">Стипендіат</span><span class="chip chip-purple">Гуртожиток</span></div>
        <button class="btn btn-block" style="margin-top:16px" onclick="showCard()">🪪 Електронний студентський</button>
      </div>
      <div class="card"><h3>Дані студента</h3><dl class="kv"><dt>Номер</dt><dd>${STUDENT.id}</dd><dt>Факультет</dt><dd>${STUDENT.faculty}</dd><dt>Спеціальність</dt><dd>${STUDENT.speciality}</dd><dt>Форма</dt><dd>${STUDENT.form}</dd><dt>Куратор</dt><dd>${STUDENT.advisor}</dd><dt>Дата народження</dt><dd>${STUDENT.birth}</dd><dt>Проживання</dt><dd>${STUDENT.dorm}</dd><dt>Студ. квиток</dt><dd>${STUDENT.ticket} · до ${STUDENT.cardExpires}</dd></dl></div>
    </div>
    <div>
      <div class="card" style="margin-bottom:16px"><h3>Контакти та налаштування</h3>
        <form onsubmit="saveProfile(event)">
          <div class="form-row"><label><span>Email</span><input id="p-email" type="email" value="${esc(p.email)}"></label></div>
          <div class="form-row"><label><span>Телефон</span><input id="p-phone" value="${esc(p.phone)}"></label></div>
          <div class="form-row"><label><span>Мова інтерфейсу</span><select id="p-lang"><option value="uk" ${p.lang === 'uk' ? 'selected' : ''}>Українська</option><option value="en" ${p.lang === 'en' ? 'selected' : ''}>English</option></select></label></div>
          <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><input type="checkbox" id="p-ne" ${p.notifEmail ? 'checked' : ''} style="width:auto"> <span style="margin:0;color:var(--text)">Сповіщення на email</span></label>
          <label style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><input type="checkbox" id="p-np" ${p.notifPush ? 'checked' : ''} style="width:auto"> <span style="margin:0;color:var(--text)">Push-сповіщення</span></label>
          <button class="btn btn-primary">Зберегти</button>
        </form>
      </div>
      <div class="card"><h3>Безпека</h3>
        <div class="list"><div class="list-item"><div class="grow"><div class="title">Пароль</div><div class="sub">Змінено 42 дні тому</div></div><button class="btn btn-small" onclick="changePass()">Змінити</button></div>
        <div class="list-item"><div class="grow"><div class="title">Двофакторна автентифікація</div><div class="sub">Вимкнено</div></div><button class="btn btn-small" onclick="toast('2FA буде доступна у наступній версії')">Увімкнути</button></div>
        <div class="list-item"><div class="grow"><div class="title">Активні сесії</div><div class="sub">Цей пристрій · ${navigator.platform || 'Web'}</div></div><button class="btn btn-small btn-danger" onclick="toast('Інші сесії завершено','ok')">Завершити інші</button></div></div>
        <button class="btn btn-ghost btn-danger" style="margin-top:12px" onclick="resetDemo()">Скинути демо-дані</button>
      </div>
    </div>
  </div>`;
};
window.saveProfile = e => { e.preventDefault(); const p = state.profile; p.email = $('#p-email').value; p.phone = $('#p-phone').value; p.lang = $('#p-lang').value; p.notifEmail = $('#p-ne').checked; p.notifPush = $('#p-np').checked; save(); toast('Збережено ✅', 'ok'); };
window.changePass = () => openModal('Зміна пароля', `<div class="form-row"><label><span>Поточний пароль</span><input type="password"></label><label><span>Новий пароль</span><input type="password" id="np1"></label><label><span>Повторіть</span><input type="password" id="np2"></label></div><div class="modal-actions"><button class="btn" onclick="closeModal()">Скасувати</button><button class="btn btn-primary" onclick="if($('#np1').value.length<8)return toast('Мінімум 8 символів','err');if($('#np1').value!==$('#np2').value)return toast('Паролі не збігаються','err');closeModal();toast('Пароль змінено ✅','ok')">Зберегти</button></div>`);
window.showCard = () => openModal('Студентський квиток', `
  <div style="border-radius:20px;padding:22px;background:linear-gradient(135deg,#0A84FF,#5E5CE6);color:#fff;box-shadow:0 20px 40px rgba(10,132,255,.3)">
    <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:18px">Клодитет</b><span style="opacity:.8;font-size:12px">STUDENT ID</span></div>
    <div style="display:flex;gap:16px;align-items:center;margin:22px 0"><div class="avatar lg" style="background:rgba(255,255,255,.25);border-radius:18px;width:70px;height:70px;font-size:24px">${STUDENT.initials}</div><div><div style="font-size:20px;font-weight:700">${STUDENT.name}</div><div style="opacity:.85">${STUDENT.faculty}</div><div style="opacity:.85">${STUDENT.group} · ${STUDENT.course} курс</div></div></div>
    <div style="display:flex;justify-content:space-between;font-family:monospace;font-size:13px"><span>${STUDENT.ticket}</span><span>до ${STUDENT.cardExpires}</span></div>
  </div>
  <div style="text-align:center;margin-top:18px"><div style="display:inline-block;padding:10px;background:#fff;border-radius:12px;border:1px solid var(--line)">${qrSvg()}</div><div class="muted small" style="margin-top:6px">Покажіть QR-код для перевірки</div></div>
  <div class="modal-actions"><button class="btn btn-primary" onclick="closeModal()">Закрити</button></div>`);
function qrSvg() { let s = ''; let seed = 7; for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; const corner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); const on = corner ? ((x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5)) && !(x === 7 || y === 7)) && !((x > 5 && x < 15) || (y > 5 && y < 15) || (x > 13 && y > 13)) : (seed >> 8) % 3 === 0; if (on || (corner && ((x % 6 === 0 && x < 7 && y < 7) || (y % 6 === 0 && x < 7 && y < 7) || (x === 14 || x === 20) && y < 7 || (y === 0 || y === 6) && x > 13 || (x === 0 || x === 6) && y > 13 || (y === 14 || y === 20) && x < 7 || (x > 15 && x < 19 && y > 1 && y < 5) || (x > 1 && x < 5 && y > 15 && y < 19)))) s += `<rect x="${x * 5}" y="${y * 5}" width="5" height="5"/>`; } return `<svg width="120" height="120" viewBox="0 0 105 105" fill="#1C1C1E">${s}</svg>`; }
window.resetDemo = () => { if (confirm('Скинути всі демо-дані до початкового стану?')) { localStorage.removeItem(STORAGE_KEY); state = defaultState(); state.loggedIn = true; save(); route(); toast('Дані скинуто'); } };

/* ---------- global UI ---------- */
$('#menu-btn').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
document.addEventListener('click', e => {
  if (e.target.matches('[data-close]')) $('#' + e.target.dataset.close).hidden = true;
  if (!e.target.closest('.sidebar') && !e.target.closest('#menu-btn')) $('.sidebar').classList.remove('open');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); $('#notif-panel').hidden = true; } });
$('#notif-btn').addEventListener('click', () => { renderNotifs(); $('#notif-panel').hidden = false; });
$('#notif-clear').addEventListener('click', () => { state.notifs.forEach(n => n.unread = false); save(); renderNotifs(); renderBadges(); });
function renderNotifs() {
  $('#notif-list').innerHTML = state.notifs.map(n => `<div class="notif ${n.unread ? 'unread' : ''}"><div class="ico">${n.ico}</div><div><div class="tt">${esc(n.title)}</div><div class="tx">${esc(n.text)}</div></div></div>`).join('') || '<div class="empty">Сповіщень немає</div>';
}
$('#global-search').addEventListener('keydown', e => {
  if (e.key !== 'Enter') return; const q = e.target.value.trim().toLowerCase(); if (!q) return;
  const hits = [
    ...COURSES.filter(c => c.name.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q)).map(c => ({ t: c.name, s: 'Дисципліна', a: `openCourse('${c.id}')` })),
    ...state.assignments.filter(a => a.title.toLowerCase().includes(q)).map(a => ({ t: a.title, s: 'Завдання', a: `openAssignment('${a.id}')` })),
    ...state.library.catalog.filter(b => b.title.toLowerCase().includes(q)).map(b => ({ t: b.title, s: 'Бібліотека', a: `location.hash='library'` })),
    ...state.requests.filter(r => r.type.toLowerCase().includes(q)).map(r => ({ t: r.type, s: 'Заявка', a: `openRequest('${r.id}')` })),
  ];
  openModal(`Пошук: «${esc(e.target.value)}»`, hits.length ? `<div class="list">${hits.map(h => `<div class="list-item clickable" onclick="closeModal();${h.a}"><div class="grow"><div class="title">${esc(h.t)}</div><div class="sub">${h.s}</div></div>›</div>`).join('')}</div>` : '<div class="empty">Нічого не знайдено</div>');
  e.target.value = '';
});

/* ---------- boot ---------- */
if (state.loggedIn) showApp(); else { $('#login-screen').hidden = false; $('#login-user').value = 'demo'; }
