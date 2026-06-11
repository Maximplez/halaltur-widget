/* СЛОГАН-ПОЛОСКА */
(function () {
  /* Не на страницах тура — Tilda там сама строит layout, не вмешиваемся */
  if (location.pathname.indexOf('/tproduct/') !== -1) return;
  var css = '.halt-slogan{position:fixed !important;top:0 !important;left:0 !important;right:0 !important;z-index:100000 !important;height:32px !important;background:#f5f7f3 !important;border-bottom:1px solid #e8eee8 !important;padding:7px 12px !important;box-sizing:border-box !important;text-align:center !important;font-size:13px !important;color:#4a5a4a !important;font-family:Manrope,sans-serif !important;line-height:1.4 !important;} .halt-slogan b{color:#1e6b1e !important;font-weight:700 !important;} #rec772145313,#rec772150725,.nlm009fixmenu{top:32px !important;} @media(max-width:700px){.halt-slogan{height:26px !important;font-size:11px !important;padding:5px 8px !important;line-height:1.3 !important;} #rec772145313,#rec772150725,.nlm009fixmenu{top:26px !important;}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  function inject() {
    if (document.querySelector('.halt-slogan')) return;
    var d = document.createElement('div');
    d.className = 'halt-slogan';
    d.innerHTML = '<b>Хадж Тревел</b> — каталог туров от всех операторов по самым выгодным ценам';
    document.body.insertBefore(d, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
  setTimeout(inject, 1500);
})();

(function () {
  'use strict';

  /* Тур-страницы /tproduct/... — выходим сразу, до любых модификаций DOM/CSS.
     Иначе Tilda-вский tilda-widget-positions падает с null.getAttribute(). */
  if (location.pathname.indexOf('/tproduct/') !== -1) return;

  /* === Фикс картинок + раскладки карточек (картинка — contain, кнопка снизу,
         описание max 5 строк). Вставляется через JS с !important, чтобы
         перебить CSS-блок в HTML-виджете на странице === */
  (function () {
    function inject() {
      if (document.getElementById('hts-img-fix')) return;
      var css =
        '.hts-card__img{' +
          'aspect-ratio:16/10 !important;' +
          'overflow:hidden !important;' +
          'flex-shrink:0 !important;' +
          'background:#f4f6f4 !important;' +
          'display:flex !important;' +
          'align-items:center !important;' +
          'justify-content:center !important;' +
        '}' +
        '.hts-card__img img{' +
          'max-width:100% !important;' +
          'max-height:100% !important;' +
          'width:auto !important;' +
          'height:auto !important;' +
          'object-fit:contain !important;' +
          'display:block !important;' +
        '}' +
        /* === Раскладка карточки: кнопка ВСЕГДА снизу === */
        '.hts-card{' +
          'display:flex !important;' +
          'flex-direction:column !important;' +
          'height:100% !important;' +
        '}' +
        '.hts-card__body{' +
          'display:flex !important;' +
          'flex-direction:column !important;' +
          'flex:1 1 auto !important;' +
        '}' +
        '.hts-card__btn{' +
          'margin-top:auto !important;' +
        '}' +
        /* === Описание: plain text, ограниченное 5 строками с ellipsis === */
        '.hts-card__desc{' +
          'display:-webkit-box !important;' +
          '-webkit-line-clamp:5 !important;' +
          '-webkit-box-orient:vertical !important;' +
          'overflow:hidden !important;' +
          'text-overflow:ellipsis !important;' +
          'max-height:8em !important;' +
          'white-space:normal !important;' +
        '}' +
        /* === Кастомный dropdown (замена нативного <select>) === */
        '.hts-dd{position:relative;flex:1;min-width:0;}' +
        '.hts-dd__btn{background:none;border:none;padding:0;cursor:pointer;text-align:left;width:100%;display:flex;justify-content:space-between;align-items:center;font-family:Manrope,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;line-height:1.2;}' +
        '.hts-dd__val{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;}' +
        '.hts-dd__val.placeholder{color:#999;font-weight:500;}' +
        '.hts-dd__arrow{color:#999;font-size:10px;margin-left:8px;flex-shrink:0;transition:transform .15s;}' +
        '.hts-dd.open .hts-dd__arrow{transform:rotate(180deg);color:#1e6b1e;}' +
        '.hts-dd__menu{display:none;position:absolute;top:calc(100% + 12px);left:-16px;right:-16px;background:#fff;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.18);max-height:320px;overflow-y:auto;z-index:999;padding:8px 0;font-family:Manrope,sans-serif;}' +
        '.hts-dd.open .hts-dd__menu{display:block;}' +
        '.hts-dd__item{display:block;width:100%;background:none;border:none;padding:10px 16px;text-align:left;cursor:pointer;font-family:inherit;font-size:14px;color:#1a1a1a;line-height:1.3;box-sizing:border-box;}' +
        '.hts-dd__item:hover{background:#f0f7f0;color:#1e6b1e;}' +
        '.hts-dd__item--placeholder{color:#888;font-weight:600;font-size:13px;border-bottom:1px solid #f0f0f0;padding-bottom:12px;margin-bottom:4px;}' +
        '.hts-dd__item--selected{background:#e8f5e9;color:#1e6b1e;font-weight:700;}' +
        '@media(max-width:960px){.hts-dd__menu{left:-8px;right:-8px;}}';
      var s = document.createElement('style');
      s.id = 'hts-img-fix';
      s.textContent = css;
      /* Вставляем в КОНЕЦ body, чтобы перебить inline-style из HTML-виджета */
      (document.body || document.head).appendChild(s);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
    /* Подстраховка — если HTML-виджет загрузился позже */
    setTimeout(inject, 1000);
    setTimeout(inject, 3000);
  })();

  var PER_PAGE = 12;
  var allCards = [];
  var preFilteredCards = []; /* отфильтровано всем кроме даты — для календаря */
  var filtered = [];
  var shown = 0;
  var curFilter = { type: '', city: '', month: '', duration: '', meals: '', budget: '' };

  var MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

  /* Корень города -> красивое название */
  var CITY_NAMES = {
    'екатеринбург':'Екатеринбург','казан':'Казань','минвод':'Минводы','москв':'Москва',
    'самарканд':'Самарканд','ташкент':'Ташкент','уф':'Уфа','махачкал':'Махачкала',
    'грозн':'Грозный','бишкек':'Бишкек','алмаат':'Алма-Ата','стамбул':'Стамбул',
    'душанб':'Душанбе','астан':'Астана','ош':'Ош'
  };

  var TAG_COLORS = {
    'умра':    { bg: '#e8f5e9', color: '#1b5e20' },
    'хадж':    { bg: '#fce4ec', color: '#880e4f' },
    'рамадан': { bg: '#f3e5f5', color: '#4a148c' }
  };

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  function detectType(text) {
    var t = text.toLowerCase();
    if (/хадж/.test(t)) return 'хадж';
    if (/рамадан/.test(t)) return 'рамадан';
    if (/умра/.test(t)) return 'умра';
    return '';
  }

  function detectCity(text) {
    var m = text.match(/из\s+([А-ЯЁа-яёA-Za-z\-]+)/i);
    return m ? m[1] : '';
  }
  function cityStem(s) {
    if (!s) return '';
    s = s.toLowerCase().replace(/[-\s]/g, '');
    return s.replace(/(ого|его|ый|ой|ы|и|а|я|у|ю|ь|е|ё)$/, '');
  }

  /* Месяцы из текста (по названиям) */
  function extractMonths(text) {
    var lower = text.toLowerCase(), out = [];
    /* 1. По русским названиям («ИЮЛЬ», «август»...) */
    MONTHS.forEach(function(mn) {
      if (lower.indexOf(mn.toLowerCase()) !== -1 && out.indexOf(mn) === -1) out.push(mn);
    });
    /* 2. По цифровым датам DD.MM или DD.MM.YYYY */
    var dateRe = /\b(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\b/g, m;
    while ((m = dateRe.exec(text)) !== null) {
      var d = parseInt(m[1], 10), mo = parseInt(m[2], 10);
      if (d >= 1 && d <= 31 && mo >= 1 && mo <= 12) {
        var name = MONTHS[mo - 1];
        if (out.indexOf(name) === -1) out.push(name);
      }
    }
    return out;
  }

  function startOfToday2() { var d = new Date(); d.setHours(0,0,0,0); return d; }
  function makeDate2(y, mo, d) {
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    var dt = new Date(y, mo - 1, d);
    return isNaN(dt.getTime()) ? null : dt;
  }

  /* Дата-диапазоны для фильтра «Дата вылета»:
       «01.03 — 14.03»     → [01.03, 14.03] (год подставляется)
       «01.03.2026»         → [01.03.2026, 01.03.2026] (точечный)
       «Март 2026»          → [01.03.2026, 31.03.2026] (весь месяц)            */
  function extractDateRanges(text) {
    var ranges = [];
    var today = startOfToday2();

    /* Подсказка года из текста */
    var yearHint = null;
    var ym = text.match(/\b(20\d{2})\b/g);
    if (ym) yearHint = Math.max.apply(null, ym.map(function(y){ return parseInt(y, 10); }));

    /* 1. Диапазон DD.MM[.YYYY] — DD.MM[.YYYY] */
    var rRange = /(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\s*[-—–]\s*(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/g, m;
    while ((m = rRange.exec(text)) !== null) {
      var d1 = +m[1], mo1 = +m[2], y1 = m[3] ? +m[3] : null;
      var d2 = +m[4], mo2 = +m[5], y2 = m[6] ? +m[6] : null;
      if (y1 && y1 < 100) y1 += 2000;
      if (y2 && y2 < 100) y2 += 2000;
      if (!y1) y1 = yearHint || today.getFullYear();
      if (!y2) y2 = (mo2 < mo1) ? y1 + 1 : y1;
      var s1 = makeDate2(y1, mo1, d1), e1 = makeDate2(y2, mo2, d2);
      if (s1 && e1) {
        if (!yearHint && s1 < today) {
          s1.setFullYear(s1.getFullYear() + 1);
          e1.setFullYear(e1.getFullYear() + 1);
        }
        ranges.push([s1, e1]);
      }
    }

    /* 2. Одиночные DD.MM.YYYY (точечный) */
    var rOne = /(?:^|[^.\d])(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?!\s*[-—–]\s*\d)/g;
    while ((m = rOne.exec(text)) !== null) {
      var d = +m[1], mo = +m[2], y = +m[3];
      if (y < 100) y += 2000;
      var dt = makeDate2(y, mo, d);
      if (dt) ranges.push([dt, dt]);
    }

    /* 3. Название месяца + год → весь месяц */
    MONTHS.forEach(function(mn, i) {
      var re = new RegExp('\\b' + mn + '[а-я]{0,3}\\s*(20\\d{2})', 'gi');
      var mm;
      while ((mm = re.exec(text)) !== null) {
        var y = +mm[1];
        var s = new Date(y, i, 1);
        var e = new Date(y, i + 1, 0); /* последний день месяца */
        ranges.push([s, e]);
      }
    });

    /* 4. Кириллический формат "23 июня по 07 июля" / "23 июня — 07 июля" */
    var CYR = {
      'январ': 1, 'феврал': 2, 'март': 3, 'апрел': 4, 'мая': 5, 'май': 5,
      'июн': 6, 'июл': 7, 'август': 8, 'сентябр': 9, 'октябр': 10, 'ноябр': 11, 'декабр': 12
    };
    function _cyrMonth(w) {
      w = w.toLowerCase();
      var keys = Object.keys(CYR);
      /* Сортируем по длине УБЫВАЮЩЕ, чтобы 'март' матчился раньше 'мая' (защита от ложных) */
      keys.sort(function(a,b){ return b.length - a.length; });
      for (var k = 0; k < keys.length; k++) if (w.indexOf(keys[k]) === 0) return CYR[keys[k]];
      return null;
    }
    var rCyr = /(\d{1,2})\s+([а-я]+)\s*(?:по|до|[-—–])\s*(\d{1,2})\s+([а-я]+)/gi;
    while ((m = rCyr.exec(text)) !== null) {
      var d1c = +m[1], mo1c = _cyrMonth(m[2]);
      var d2c = +m[3], mo2c = _cyrMonth(m[4]);
      if (!mo1c || !mo2c) continue;
      var y1c = yearHint || today.getFullYear();
      var y2c = (mo2c < mo1c) ? y1c + 1 : y1c;
      var s2 = makeDate2(y1c, mo1c, d1c), e2 = makeDate2(y2c, mo2c, d2c);
      if (s2 && e2) {
        if (!yearHint && s2 < today) {
          s2.setFullYear(s2.getFullYear() + 1);
          e2.setFullYear(e2.getFullYear() + 1);
        }
        ranges.push([s2, e2]);
      }
    }

    return ranges;
  }

  /* Длительности: "13 дней", "11/13 дней", "9-15 дней" */
  function extractDurations(text) {
    var out = [], re = /(\d+(?:\s*[\/\-]\s*\d+)?)\s*дн(?:ей|я|ень)?/gi, m;
    while ((m = re.exec(text)) !== null) {
      var d = m[1].replace(/\s+/g, '') + ' дней';
      if (out.indexOf(d) === -1) out.push(d);
    }
    return out;
  }

  /* Питание: да / нет */
  function extractMeals(text) {
    var t = text.toLowerCase(), out = [];
    if (/без\s+питани/.test(t)) out.push('нет');
    if (/\bс\s+питани/.test(t)) out.push('да');
    return out;
  }

  function parsePrice(s) { var d = (s || '').replace(/[^\d]/g, ''); return d ? parseInt(d, 10) : 0; }
  /* Для цен из API Tilda — "1 300.00" или "1300.0000" */
  function parseTildaPrice(s) {
    if (!s) return 0;
    var str = String(s).replace(/[^\d.]/g, '');
    var n = parseFloat(str);
    return isNaN(n) ? 0 : Math.round(n);
  }
  function inBudget(p, b) {
    if (!b || !p) return true;
    if (b === 'budget-low')  return p < 1300;
    if (b === 'budget-mid')  return p >= 1300 && p <= 1700;
    if (b === 'budget-high') return p > 1700 && p <= 2500;
    if (b === 'budget-vip')  return p > 2500;
    return true;
  }

  function plural(n, one, few, many) {
    var a = Math.abs(n) % 100, n1 = a % 10;
    if (a > 10 && a < 20) return many;
    if (n1 === 1) return one;
    if (n1 > 1 && n1 < 5) return few;
    return many;
  }

  function cleanText(el) {
    if (!el) return '';
    var c = el.cloneNode(true);
    c.querySelectorAll('style, script').forEach(function(s){ s.remove(); });
    return c.textContent.trim();
  }
  function cleanHTML(el) {
    if (!el) return '';
    var c = el.cloneNode(true);
    c.querySelectorAll('style, script').forEach(function(s){ s.remove(); });
    return c.innerHTML.trim();
  }

  function getImage(src) {
    var el = src.querySelector('[data-original]');
    if (el) { var o = el.getAttribute('data-original'); if (o) return o; }
    var img = src.querySelector('img');
    if (img) {
      var s = img.getAttribute('data-original') || img.getAttribute('data-lazy-src') || img.getAttribute('data-src') || img.getAttribute('src') || '';
      if (s && s.indexOf('data:image') === -1) return s;
    }
    var bg = src.querySelector('[style*="background-image"]');
    if (bg) { var m = (bg.getAttribute('style') || '').match(/url\(['"]?([^'")]+)['"]?\)/); if (m) return m[1]; }
    return '';
  }

  function getLink(src) {
    var links = src.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var h = links[i].getAttribute('href') || '';
      if (h && h.charAt(0) !== '#' && h.indexOf('javascript') === -1) return links[i].href;
    }
    return '';
  }
  function openProduct(realLink, src) {
    if (realLink) { window.location.href = realLink; return; }
    var btn = src.querySelector('.t-store__card__btn, .js-store-prod-popup-btn');
    if (btn) { btn.click(); return; }
    var a = src.querySelector('a[href]');
    if (a) { a.click(); return; }
    src.click();
  }

  /* Описание -> список пунктов (без дублей) */
  function buildDesc(rawHTML) {
    if (!rawHTML) return '';
    var tmp = document.createElement('div');
    tmp.innerHTML = rawHTML.replace(/<br\s*\/?>/gi, '\n');
    var lines = tmp.textContent.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return l; });

    /* Чистим линии-разделители и хвосты:
       - только дефисы/подчёркивания/точки/звёздочки/тире/буллеты — выкидываем
       - и заодно убираем повисший «хвост» из подобных символов внутри строк */
    lines = lines.map(function (l) {
      return l.replace(/^[\-_\.\=\*\s—–••·]+|[\-_\.\=\*\s—–••·]+$/g, '').trim();
    }).filter(function (l) {
      if (!l) return false;
      /* строка из одних только разделителей */
      if (/^[\-_\.\=\*\s—–••·]+$/.test(l)) return false;
      /* строка короче 2 символов вообще не имеет смысла */
      if (l.length < 2) return false;
      return true;
    });

    if (lines.length <= 1) return '<div class="hts-card__desc">' + (lines[0] || '') + '</div>';
    var seen = {}, out = [];
    lines.forEach(function(l){ var k = l.toLowerCase(); if (!seen[k]) { seen[k] = 1; out.push('<li>' + l + '</li>'); } });
    return '<ul class="hts-card__desc-list">' + out.join('') + '</ul>';
  }

  function buildCard(src) {
    var imgSrc = getImage(src);
    var title = cleanText(src.querySelector('.t-name, .t-typography__title, .t-store__card__title'));
    var descEl = src.querySelector('.t-descr, .t-typography__descr, .t-store__card__descr');
    var descRaw = cleanHTML(descEl);
    var descText = descEl ? cleanText(descEl) : '';
    var priceTxt = cleanText(src.querySelector('.t-store__card__price:not(.t-store__card__price_old), .t-price:not(.t-price-old)'));
    var oldPrice = cleanText(src.querySelector('.t-store__card__price_old, .t-price-old'));
    var realLink = getLink(src);

    var forExtract = title + ' ' + descText;
    var type = detectType(forExtract);
    var cityName = detectCity(title);
    var stem = cityStem(cityName);
    var months = extractMonths(forExtract);
    var dateRanges = extractDateRanges(forExtract);
    var durations = extractDurations(forExtract);
    var meals = extractMeals(forExtract);
    var priceNum = parsePrice(priceTxt);
    var tc = TAG_COLORS[type];

    var card = document.createElement('div');
    card.className = 'hts-card';

    var html = '';
    if (imgSrc) html += '<div class="hts-card__img"><img src="' + imgSrc + '" alt="" loading="lazy"></div>';
    else html += '<div class="hts-card__img hts-card__img--empty"></div>';
    html += '<div class="hts-card__body">';
    if (type && tc) html += '<div class="hts-card__tags"><span class="hts-card__tag" style="background:' + tc.bg + ';color:' + tc.color + '">' + cap(type) + '</span></div>';
    html += '<div class="hts-card__title">' + title + '</div>';
    html += buildDesc(descRaw);
    if (priceTxt) {
      html += '<div class="hts-card__price-row"><span class="hts-card__price">' + priceTxt + '</span>';
      if (oldPrice) html += '<span class="hts-card__price-old">' + oldPrice + '</span>';
      html += '</div>';
    }
    html += '<button type="button" class="hts-card__btn">Подробнее о туре</button>';
    html += '</div>';
    card.innerHTML = html;

    var open = function(e) { e.preventDefault(); openProduct(realLink, src); };
    card.querySelector('.hts-card__btn').addEventListener('click', open);
    var imgEl = card.querySelector('.hts-card__img');
    if (imgEl) { imgEl.style.cursor = 'pointer'; imgEl.addEventListener('click', open); }
    var titleEl = card.querySelector('.hts-card__title');
    if (titleEl) { titleEl.style.cursor = 'pointer'; titleEl.addEventListener('click', open); }

    return { el: card, type: type, cityStem: stem, cityName: cityName,
             months: months, dateRanges: dateRanges,
             durations: durations, meals: meals, price: priceNum };
  }

  /* === КАСТОМНЫЙ DROPDOWN === */
  function initDropdown(el) {
    if (el.dataset.inited) return;
    el.dataset.inited = '1';
    var placeholder = el.getAttribute('data-placeholder') || '';
    el.innerHTML =
      '<button class="hts-dd__btn" type="button" aria-haspopup="listbox">' +
        '<span class="hts-dd__val placeholder">' + placeholder + '</span>' +
        '<span class="hts-dd__arrow">▾</span>' +
      '</button>' +
      '<div class="hts-dd__menu" role="listbox"></div>';

    var btn = el.querySelector('.hts-dd__btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !el.classList.contains('open');
      document.querySelectorAll('.hts-dd.open').forEach(function (d) { if (d !== el) d.classList.remove('open'); });
      el.classList.toggle('open', willOpen);
    });

    var menu = el.querySelector('.hts-dd__menu');
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('.hts-dd__item');
      if (!item) return;
      e.stopPropagation();
      var id = el.getAttribute('data-id');
      var value = item.getAttribute('data-value') || '';
      var label = item.textContent;
      if (value) {
        setDropdownValue(id, value, label);
      } else {
        var ph = el.getAttribute('data-placeholder') || '';
        setDropdownValue(id, '', ph);
      }
      el.classList.remove('open');
      menu.querySelectorAll('.hts-dd__item').forEach(function (i) { i.classList.remove('hts-dd__item--selected'); });
      item.classList.add('hts-dd__item--selected');
      /* Авто-фильтр на любую смену */
      if (typeof window.__htsAutoFilter === 'function') window.__htsAutoFilter();
    });
  }

  function setDropdownValue(id, value, labelText) {
    var el = document.querySelector('.hts-dd[data-id="' + id + '"]');
    if (!el) return;
    el.setAttribute('data-value', value);
    var val = el.querySelector('.hts-dd__val');
    if (val) {
      var placeholder = el.getAttribute('data-placeholder') || '';
      val.textContent = labelText || placeholder;
      if (value) val.classList.remove('placeholder');
      else val.classList.add('placeholder');
    }
  }

  function getDropdownValue(id) {
    var el = document.querySelector('.hts-dd[data-id="' + id + '"]');
    return el ? (el.getAttribute('data-value') || '') : '';
  }

  function getDropdownLabel(id) {
    var el = document.querySelector('.hts-dd[data-id="' + id + '"]');
    if (!el) return '';
    var val = el.querySelector('.hts-dd__val');
    if (!val || val.classList.contains('placeholder')) return '';
    return val.textContent || '';
  }

  function fillCustomDropdown(el, id, items, placeholder) {
    initDropdown(el); /* на случай если ещё не инициализирован */
    el.setAttribute('data-placeholder', placeholder);
    var menu = el.querySelector('.hts-dd__menu');
    if (!menu) return;
    var cur = el.getAttribute('data-value') || '';
    var html = '<button type="button" class="hts-dd__item hts-dd__item--placeholder" data-value="">' + placeholder + '</button>';
    items.forEach(function (it) {
      var sel = it.value === cur ? ' hts-dd__item--selected' : '';
      var v = String(it.value).replace(/"/g, '&quot;');
      var l = String(it.label).replace(/</g, '&lt;');
      html += '<button type="button" class="hts-dd__item' + sel + '" data-value="' + v + '">' + l + '</button>';
    });
    menu.innerHTML = html;
    /* Сбрасываем текущее значение если его больше нет в списке */
    var stillValid = items.some(function (it) { return it.value === cur; });
    if (!stillValid) setDropdownValue(id, '', placeholder);
    /* Прячем поле если нет вариантов */
    var wrap = el.closest('.hts-field');
    if (wrap) wrap.style.display = items.length ? '' : 'none';
  }

  /* Заполняем выпадающий список только реальными вариантами.
     Сначала ищем кастомный dropdown, иначе fallback на нативный <select>. */
  function fillSelect(id, items, placeholder) {
    var dd = document.querySelector('.hts-dd[data-id="' + id + '"]');
    if (dd) { fillCustomDropdown(dd, id, items, placeholder); return; }
    /* Fallback на нативный select (старый HTML) */
    var sel = document.getElementById(id);
    if (!sel) return;
    var cur = sel.value;
    sel.innerHTML = '<option value="">' + placeholder + '</option>';
    items.forEach(function(it) {
      var o = document.createElement('option');
      o.value = it.value; o.textContent = it.label;
      sel.appendChild(o);
    });
    if (cur) sel.value = cur;
    var wrap = sel.closest('.hts-field');
    if (wrap) wrap.style.display = items.length ? '' : 'none';
  }

  /* Закрытие dropdown по клику вне / Esc — один раз на документ */
  (function () {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.hts-dd')) {
        document.querySelectorAll('.hts-dd.open').forEach(function (d) { d.classList.remove('open'); });
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        document.querySelectorAll('.hts-dd.open').forEach(function (d) { d.classList.remove('open'); });
      }
    });
  })();

  function populateFilters() {
    /* Города */
    var seenC = {}, cities = [];
    allCards.forEach(function(c){
      if (c.cityStem && !seenC[c.cityStem]) { seenC[c.cityStem] = 1;
        cities.push({ value: c.cityStem, label: CITY_NAMES[c.cityStem] || cap(c.cityName) }); }
    });
    cities.sort(function(a,b){ return a.label.localeCompare(b.label, 'ru'); });
    fillSelect('htsCity', cities, 'Любой город');

    /* Месяцы (в календарном порядке) */
    var months = [];
    MONTHS.forEach(function(mn){
      if (allCards.some(function(c){ return c.months.indexOf(mn) !== -1; }))
        months.push({ value: mn, label: mn });
    });
    fillSelect('htsMonth', months, 'Любой месяц');

    /* Длительность */
    var seenD = {}, durs = [];
    allCards.forEach(function(c){ c.durations.forEach(function(d){ if (!seenD[d]) { seenD[d] = 1; durs.push(d); } }); });
    durs.sort(function(a,b){ return parseInt(a,10) - parseInt(b,10); });
    fillSelect('htsDuration', durs.map(function(d){ return { value: d, label: d }; }), 'Любая длительность');

    /* Питание */
    var meals = [];
    if (allCards.some(function(c){ return c.meals.indexOf('да') !== -1; })) meals.push({ value:'да', label:'С питанием' });
    if (allCards.some(function(c){ return c.meals.indexOf('нет') !== -1; })) meals.push({ value:'нет', label:'Без питания' });
    fillSelect('htsMeals', meals, 'Не важно');

    /* Бюджет — статические варианты (раньше были в HTML, теперь в JS) */
    fillSelect('htsBudget', [
      { value: 'budget-low',  label: 'до $1 300' },
      { value: 'budget-mid',  label: '$1 300 — $1 700' },
      { value: 'budget-high', label: '$1 700 — $2 500' },
      { value: 'budget-vip',  label: 'свыше $2 500' }
    ], 'Любой');
  }

  function loadFromStore() {
    var srcs = document.querySelectorAll('#rec771192705 .t-store__card');
    if (!srcs.length) return false;
    allCards = [];
    srcs.forEach(function(src) { allCards.push(buildCard(src)); });
    buildDeparturesMap();
    populateFilters();
    setupCalendarUI();
    applyFilter();
    return true;
  }

  /* === ЗАГРУЗКА ИЗ TILDA STORE API ===
     Берём СТРУКТУРИРОВАННЫЕ данные (editions, characteristics) напрямую,
     минуя DOM. Длительность, питание, город — реальные поля, не парсинг текста. */
  var API_URL = 'https://store.tildaapi.com/api/getproductslist/' +
                '?storepartuid=902757194312' +
                '&recid=771192705' +
                '&getparts=true&getoptions=true' +
                '&size=200' +
                '&filters%5Bquantity%5D=y' +
                '&flag_root=withroot';

  function fetchProducts() {
    var url = API_URL + '&c=' + Date.now();
    return fetch(url, { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        return data.products || data.relevants || data.items || [];
      })
      .catch(function (e) {
        console.warn('[halaltur] Tilda API fetch failed:', e);
        return [];
      });
  }

  function buildCardFromAPI(prod) {
    /* Картинка из gallery (JSON-строка) */
    var imgSrc = '';
    try {
      var gal = JSON.parse(prod.gallery || '[]');
      if (gal[0] && gal[0].img) imgSrc = gal[0].img;
    } catch (e) {}

    /* Текст для извлечения дат/месяцев */
    var tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = prod.text || '';
    var textPlain = tmpDiv.textContent || '';
    var descPlain = prod.descr || '';
    var forExtract = (prod.title || '') + ' ' + descPlain + ' ' + textPlain;

    var type = detectType(forExtract);

    /* === ГОРОД — из characteristics (структурированно) === */
    var cityName = '';
    if (Array.isArray(prod.characteristics)) {
      for (var i = 0; i < prod.characteristics.length; i++) {
        var ch = prod.characteristics[i];
        var ct = (ch.title || '').toLowerCase();
        if (ct.indexOf('отправлен') !== -1 || ct.indexOf('город') !== -1) {
          cityName = ch.value || '';
          break;
        }
      }
    }
    if (!cityName) cityName = detectCity(prod.title || ''); /* fallback */
    var stem = cityStem(cityName);

    /* Месяцы и даты — из описания */
    var months = extractMonths(forExtract);
    var dateRanges = extractDateRanges(forExtract);

    /* === ДЛИТЕЛЬНОСТЬ и ПИТАНИЕ — из editions (структурированно) === */
    var durations = [], meals = [];
    if (Array.isArray(prod.editions) && prod.editions.length) {
      var seenD = {}, seenM = {};
      prod.editions.forEach(function (ed) {
        var d = ed['Длительность'] || ed['длительность'] || ed['Duration'];
        if (d) {
          var dn = String(d).trim();
          if (!/дн/i.test(dn)) dn += ' дней';
          if (!seenD[dn]) { seenD[dn] = 1; durations.push(dn); }
        }
        var meal = ed['С питанием'] || ed['с питанием'] || ed['Питание'] || ed['Meals'];
        if (meal) {
          var ml = String(meal).toLowerCase().trim();
          if (!seenM[ml]) { seenM[ml] = 1; meals.push(ml); }
        }
      });
    }
    /* Fallback на парсинг текста, если editions пустой */
    if (!durations.length) durations = extractDurations(forExtract);
    if (!meals.length) meals = extractMeals(forExtract);

    /* === ЦЕНА — минимум по editions === */
    var minPrice = 0, minPriceOld = 0;
    if (Array.isArray(prod.editions) && prod.editions.length) {
      prod.editions.forEach(function (ed) {
        var p = parseTildaPrice(ed.price);
        if (p && (!minPrice || p < minPrice)) {
          minPrice = p;
          minPriceOld = parseTildaPrice(ed.priceold);
        }
      });
    }
    if (!minPrice) {
      minPrice = parseTildaPrice(prod.price);
      minPriceOld = parseTildaPrice(prod.priceold);
    }
    var priceTxt = minPrice ? '$' + minPrice : '';
    var oldPriceTxt = (minPriceOld && minPriceOld > minPrice) ? '$' + minPriceOld : '';

    /* === Тег питания === */
    var mealsTagHTML = '';
    if (meals.length >= 2) {
      mealsTagHTML = '<span class="hts-card__tag" style="background:#e3f2fd;color:#0d47a1">Питание на выбор</span>';
    } else if (meals.indexOf('да') !== -1) {
      mealsTagHTML = '<span class="hts-card__tag" style="background:#e0f2f1;color:#00695c">С питанием</span>';
    } else if (meals.indexOf('нет') !== -1) {
      mealsTagHTML = '<span class="hts-card__tag" style="background:#f5f5f5;color:#616161">Без питания</span>';
    }

    /* === Описание для карточки — ТОЛЬКО plain text, без HTML-форматирования.
       prod.descr может содержать <p>, <strong>, <em> и т.п. (как у виза-тура) —
       стрипаем всё это через textContent, чтобы на карточке не было италика/жира. */
    var descrTmp = document.createElement('div');
    descrTmp.innerHTML = String(prod.descr || '');
    /* Преобразуем блочные теги в переносы, чтобы строки не слипались */
    descrTmp.innerHTML = descrTmp.innerHTML
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n');
    var descrClean = (descrTmp.textContent || '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\s*\n\s*/g, '\n')
      .replace(/\n{2,}/g, '\n')
      .trim();
    /* Если внутри descr есть «Даты вылета:» — отрезаем всё что ДО, чтобы убрать
       «Длительность: ... Питание: ...» (от предыдущей версии Python-скрипта) */
    var datesIdx = descrClean.indexOf('Даты вылета');
    if (datesIdx > 0) descrClean = descrClean.slice(datesIdx).trim();
    /* «Тур: ...» без других данных — мусор, скрываем */
    if (/^Тур:\s*[^.]*\.?\s*$/.test(descrClean)) descrClean = '';

    /* Экранируем HTML-символы (descrClean — plain text, но &<> в нём могут быть) */
    function _esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
      });
    }
    /* Переносы → <br>, остальное экранируем */
    var descrHTML = descrClean ? _esc(descrClean).replace(/\n/g, '<br>') : '';

    /* === Карточка === */
    var tc = TAG_COLORS[type];
    var card = document.createElement('div');
    card.className = 'hts-card';

    var html = '';
    if (imgSrc) html += '<div class="hts-card__img"><img src="' + imgSrc + '" alt="" loading="lazy"></div>';
    else html += '<div class="hts-card__img hts-card__img--empty"></div>';
    html += '<div class="hts-card__body">';
    var tagsHTML = '';
    if (type && tc) tagsHTML += '<span class="hts-card__tag" style="background:' + tc.bg + ';color:' + tc.color + '">' + cap(type) + '</span>';
    if (mealsTagHTML) tagsHTML += mealsTagHTML;
    if (tagsHTML) html += '<div class="hts-card__tags">' + tagsHTML + '</div>';
    html += '<div class="hts-card__title">' + (prod.title || '') + '</div>';
    if (descrHTML) html += '<div class="hts-card__desc">' + descrHTML + '</div>';
    if (priceTxt) {
      html += '<div class="hts-card__price-row"><span class="hts-card__price">' + priceTxt + '</span>';
      if (oldPriceTxt) html += '<span class="hts-card__price-old">' + oldPriceTxt + '</span>';
      html += '</div>';
    }
    html += '<button type="button" class="hts-card__btn">Подробнее о туре</button>';
    html += '</div>';
    card.innerHTML = html;

    var url = prod.url || '';
    var open = function (e) {
      e.preventDefault();
      if (url) window.location.href = url;
    };
    card.querySelector('.hts-card__btn').addEventListener('click', open);
    var imgEl = card.querySelector('.hts-card__img');
    if (imgEl) { imgEl.style.cursor = 'pointer'; imgEl.addEventListener('click', open); }
    var titleEl = card.querySelector('.hts-card__title');
    if (titleEl) { titleEl.style.cursor = 'pointer'; titleEl.addEventListener('click', open); }

    return {
      el: card, type: type, cityStem: stem, cityName: cityName,
      months: months, dateRanges: dateRanges,
      durations: durations, meals: meals, price: minPrice
    };
  }

  function loadFromAPI() {
    return fetchProducts().then(function (products) {
      if (!products || !products.length) return false;
      allCards = products.map(buildCardFromAPI);
      buildDeparturesMap();
      populateFilters();
      setupCalendarUI();
      applyFilter();
      return true;
    });
  }

  /* === КАЛЕНДАРЬ ВЫЛЕТОВ === */
  var departuresByDay = {}; /* key: "YYYY-MM-DD" -> count */
  var calYear = null, calMonth = null;
  var calSelectedDate = null;
  var calNoDateOnly = false;
  var calCssInjected = false;

  function pad2x(n) { return n < 10 ? '0' + n : '' + n; }
  function dateKey(d) { return d.getFullYear() + '-' + pad2x(d.getMonth() + 1) + '-' + pad2x(d.getDate()); }

  function buildDeparturesMap(cards) {
    departuresByDay = {};
    var src = cards || allCards;
    src.forEach(function (c) {
      if (!c.dateRanges) return;
      var seenInCard = {};
      c.dateRanges.forEach(function (r) {
        var d = r[0];
        if (!d) return;
        var k = dateKey(d);
        if (seenInCard[k]) return;
        seenInCard[k] = 1;
        departuresByDay[k] = (departuresByDay[k] || 0) + 1;
      });
    });
  }

  function plurTour(n) {
    var a = Math.abs(n) % 100, n1 = a % 10;
    if (10 < a && a < 20) return 'туров';
    if (n1 === 1) return 'тур';
    if (n1 >= 2 && n1 <= 4) return 'тура';
    return 'туров';
  }

  function noDateToursCount() {
    /* Считаем по подмножеству, учитывающему текущие фильтры (город, тип и т.п.),
       чтобы кнопка «межсезонные» отражала реальную доступную выборку. */
    var src = preFilteredCards.length ? preFilteredCards : allCards;
    var n = 0;
    src.forEach(function (c) {
      if (!c.dateRanges || c.dateRanges.length === 0) n++;
    });
    return n;
  }

  function injectCalendarCSS() {
    if (calCssInjected) return;
    calCssInjected = true;
    var css =
      '.hts-cal{background:#fff !important;border-radius:14px !important;padding:14px 16px !important;margin:12px auto 0 !important;box-shadow:0 2px 10px rgba(0,0,0,.08) !important;font-family:Manrope,sans-serif !important;max-width:560px !important;}' +
      '.hts-cal.hidden{display:none !important;}' +
      '.hts-cal__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}' +
      '.hts-cal__title{font-weight:700;font-size:15px;color:#1a4a00;}' +
      '.hts-cal__nav{display:flex;gap:6px;}' +
      '.hts-cal__nav button{width:30px;height:30px;border:none;background:#f0f4f0;border-radius:8px;cursor:pointer;font-size:16px;line-height:1;color:#1e6b1e;font-weight:700;}' +
      '.hts-cal__nav button:hover{background:#dfe9df;}' +
      '.hts-cal__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}' +
      '.hts-cal__dn{font-size:10px;color:#999;text-align:center;padding:4px 0;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}' +
      '.hts-cal__d{height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;font-weight:700;position:relative;color:#555;background:#f5f5f5;padding:4px 2px;box-sizing:border-box;}' +
      '.hts-cal__d.empty{background:transparent;}' +
      '.hts-cal__d.has{background:#c6ef6e;color:#1a4a00;cursor:pointer;transition:transform .12s,background .12s;}' +
      '.hts-cal__d.has:hover{background:#b5e050;transform:scale(1.06);}' +
      '.hts-cal__d.no{background:#fce4e4;color:#b87a7a;}' +
      '.hts-cal__d.past{background:#f0f0f0;color:#bbb;}' +
      '.hts-cal__d.today{box-shadow:inset 0 0 0 2px #1e6b1e;}' +
      '.hts-cal__d.sel{background:#1e6b1e !important;color:#fff !important;}' +
      '.hts-cal__num{font-size:18px;line-height:1.1;}' +
      '.hts-cal__cnt{font-size:11px;line-height:1.1;margin-top:4px;opacity:.85;font-weight:600;}' +
      '.hts-cal__d.sel .hts-cal__cnt{opacity:1;color:#fff;}' +
      '.hts-cal__noseason{margin-top:14px;padding:12px 16px;background:#fff8e1;border-radius:10px;font-size:13px;color:#5a4a00;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}' +
      '.hts-cal__noseason-btn{background:#f57f17;color:#fff;border:none;border-radius:100px;padding:7px 14px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit;}' +
      '.hts-cal__noseason-btn:hover{background:#e57100;}' +
      '.hts-cal__legend{display:flex;gap:14px;justify-content:center;margin-top:10px;font-size:11px;color:#666;}' +
      '.hts-cal__legend span{display:inline-flex;align-items:center;gap:6px;}' +
      '.hts-cal__legend i{display:inline-block;width:12px;height:12px;border-radius:3px;}' +
      '.hts-cal__reset{background:none;border:none;color:#1e6b1e;font-weight:600;font-size:12px;cursor:pointer;margin-left:8px;}' +
      '.hts-cal__reset:hover{text-decoration:underline;}' +
      '@media(max-width:580px){.hts-cal__d{font-size:11px;} .hts-cal__cnt{font-size:8px;}}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function setupCalendarUI() {
    injectCalendarCSS();
    var widget = document.getElementById('htsWidget');
    if (!widget) return;

    /* Контейнер календаря — создаём один раз */
    var cont = document.getElementById('htsCalendar');
    if (!cont) {
      cont = document.createElement('div');
      cont.id = 'htsCalendar';
      cont.className = 'hts-cal hidden';
      widget.appendChild(cont);
    }

    /* Кнопка-тоггл в footer-е виджета */
    var footer = widget.querySelector('.hts-footer');
    if (footer && !document.getElementById('htsBtnCal')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'htsBtnCal';
      btn.className = 'hts-link';
      btn.style.marginLeft = '14px';
      btn.textContent = '📅 Календарь ▾';
      var more = footer.querySelector('#htsBtnMore');
      if (more && more.nextSibling) footer.insertBefore(btn, more.nextSibling);
      else footer.appendChild(btn);
      btn.addEventListener('click', function () {
        var willOpen = cont.classList.contains('hidden');
        cont.classList.toggle('hidden');
        btn.textContent = willOpen ? '📅 Календарь ▴' : '📅 Календарь ▾';
        if (willOpen) renderCalendar();
      });
    }

    /* Начальный месяц = текущий, ИЛИ ближайший месяц с турами */
    if (calYear === null) {
      var t = new Date();
      calYear = t.getFullYear();
      calMonth = t.getMonth();
      /* Если в текущем месяце нет вылетов — прыгаем к первому где есть */
      var foundCurrent = false;
      var keys = Object.keys(departuresByDay).sort();
      if (keys.length) {
        var todayKey = dateKey(t);
        var future = keys.filter(function (k) { return k >= todayKey; });
        if (future.length) {
          var firstFuture = future[0].split('-');
          var nextY = parseInt(firstFuture[0], 10);
          var nextM = parseInt(firstFuture[1], 10) - 1;
          /* перепрыгиваем только если в текущем нет ни одной даты */
          var anyInCurrent = Object.keys(departuresByDay).some(function (k) {
            var ps = k.split('-');
            return parseInt(ps[0], 10) === calYear && parseInt(ps[1], 10) - 1 === calMonth;
          });
          if (!anyInCurrent) { calYear = nextY; calMonth = nextM; }
        }
      }
    }
  }

  function renderCalendar() {
    var cont = document.getElementById('htsCalendar');
    if (!cont) return;
    var y = calYear, m = calMonth;
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    var startOffset = (firstDay.getDay() + 6) % 7; /* пн-нач */
    var daysInMonth = lastDay.getDate();
    var monthsRu = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    var today = startOfToday();
    var todayTs = today.getTime();

    var h = '';
    h += '<div class="hts-cal__head">';
    h += '<div class="hts-cal__nav"><button type="button" data-nav="prev">‹</button></div>';
    h += '<div class="hts-cal__title">' + monthsRu[m] + ' ' + y;
    if (calSelectedDate) {
      h += '<button type="button" class="hts-cal__reset" data-cal-reset="1">сбросить дату</button>';
    }
    h += '</div>';
    h += '<div class="hts-cal__nav"><button type="button" data-nav="next">›</button></div>';
    h += '</div>';
    h += '<div class="hts-cal__grid">';
    dayNames.forEach(function (n) { h += '<div class="hts-cal__dn">' + n + '</div>'; });
    for (var i = 0; i < startOffset; i++) h += '<div class="hts-cal__d empty"></div>';
    for (var d = 1; d <= daysInMonth; d++) {
      var date = new Date(y, m, d);
      var k = dateKey(date);
      var count = departuresByDay[k] || 0;
      var cls = ['hts-cal__d'];
      var clickable = false;
      if (date.getTime() < todayTs) {
        cls.push('past');
      } else if (count > 0) {
        cls.push('has'); clickable = true;
      } else {
        cls.push('no');
      }
      if (date.getTime() === todayTs) cls.push('today');
      if (calSelectedDate && calSelectedDate.getTime() === date.getTime()) cls.push('sel');
      h += '<div class="' + cls.join(' ') + '" data-cal-d="' + k + '"' + (clickable ? '' : ' aria-disabled="true"') + '>';
      h += '<span class="hts-cal__num">' + d + '</span>';
      if (count > 0) h += '<span class="hts-cal__cnt">' + count + ' ' + plurTour(count) + '</span>';
      h += '</div>';
    }
    h += '</div>';
    h += '<div class="hts-cal__legend">' +
         '<span><i style="background:#c6ef6e"></i>есть вылеты в этот день</span>' +
         '<span><i style="background:#fce4e4"></i>нет вылетов</span>' +
         '</div>';
    /* Блок «межсезонные» — туры без чётких дат */
    var noDateN = noDateToursCount();
    if (noDateN > 0) {
      var btnLabel = calNoDateOnly ? '✕ Свернуть' : 'Показать их';
      var bg = calNoDateOnly ? '#fff8e1; box-shadow: inset 0 0 0 2px #f57f17' : '#fff8e1';
      h += '<div class="hts-cal__noseason" style="background:' + bg + '">' +
             '<span>🗓 <b>' + noDateN + '</b> ' + plurTour(noDateN) + ' без фиксированных дат (межсезонные — отправляются круглый год)</span>' +
             '<button type="button" class="hts-cal__noseason-btn" data-cal-noseason="1">' + btnLabel + '</button>' +
           '</div>';
    }
    cont.innerHTML = h;

    /* Хэндлеры */
    cont.querySelectorAll('[data-nav]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.getAttribute('data-nav') === 'prev') {
          calMonth--;
          if (calMonth < 0) { calMonth = 11; calYear--; }
        } else {
          calMonth++;
          if (calMonth > 11) { calMonth = 0; calYear++; }
        }
        renderCalendar();
      });
    });
    cont.querySelectorAll('.hts-cal__d.has').forEach(function (el) {
      el.addEventListener('click', function () {
        var key = el.getAttribute('data-cal-d');
        var ps = key.split('-');
        calSelectedDate = new Date(parseInt(ps[0], 10), parseInt(ps[1], 10) - 1, parseInt(ps[2], 10));
        calSelectedDate.setHours(0, 0, 0, 0);
        applyFilter();
        renderCalendar();
      });
    });
    var resetBtn = cont.querySelector('[data-cal-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        calSelectedDate = null;
        calNoDateOnly = false;
        applyFilter();
        renderCalendar();
      });
    }
    var noseasonBtn = cont.querySelector('[data-cal-noseason]');
    if (noseasonBtn) {
      noseasonBtn.addEventListener('click', function () {
        calNoDateOnly = !calNoDateOnly;   /* toggle */
        calSelectedDate = null;
        applyFilter();
        renderCalendar();
        /* Скроллим к каталогу чтобы пользователь увидел результат */
        var grid = document.getElementById('htsGrid');
        if (grid) setTimeout(function(){ grid.scrollIntoView({behavior:'smooth', block:'start'}); }, 100);
      });
    }
  }

  function startOfToday() { var d = new Date(); d.setHours(0,0,0,0); return d; }

  function applyFilter() {
    var f = curFilter;
    var type = (f.type || '').toLowerCase();
    var cityV = f.city || '';
    var monthV = f.month || '';
    var durV = f.duration || '';
    var mealsV = f.meals || '';
    var budget = f.budget || '';

    /* === Шаг 1: pre-filter — ВСЁ КРОМЕ календарной даты/межсезонья.
       На этом множестве строится календарь и считаются межсезонные. === */
    preFilteredCards = allCards.filter(function (c) {
      if (type && c.type !== type) return false;
      if (cityV && c.cityStem !== cityV) return false;
      if (monthV && c.months.length > 0 && c.months.indexOf(monthV) === -1) return false;
      if (durV && c.durations.indexOf(durV) === -1) return false;
      if (mealsV && c.meals.indexOf(mealsV) === -1) return false;
      if (budget && c.price && !inBudget(c.price, budget)) return false;
      return true;
    });

    /* === Шаг 2: перестраиваем календарь под текущие фильтры === */
    buildDeparturesMap(preFilteredCards);

    /* Если выбранной в календаре даты больше нет в подмножестве — сбрасываем её,
       чтобы не показывать «0 туров». */
    if (calSelectedDate && !departuresByDay[dateKey(calSelectedDate)]) {
      calSelectedDate = null;
    }

    /* Если выбран месяц и календарь открыт — переключим календарь на этот месяц
       (ищем ближайший год где есть вылеты в этом месяце). */
    if (monthV) {
      var moIdx = MONTHS.indexOf(monthV);
      if (moIdx !== -1) {
        var bestY = null;
        Object.keys(departuresByDay).forEach(function (k) {
          var ps = k.split('-');
          if (parseInt(ps[1], 10) - 1 !== moIdx) return;
          var y = parseInt(ps[0], 10);
          if (bestY === null || y < bestY) bestY = y;
        });
        if (bestY !== null) { calYear = bestY; calMonth = moIdx; }
        else { calMonth = moIdx; } /* пусто но открываем на нужном месяце */
      }
    }

    /* === Шаг 3: финальная фильтрация — добавляем дату/межсезонье === */
    if (calNoDateOnly) {
      filtered = preFilteredCards.filter(function (c) {
        return !c.dateRanges || c.dateRanges.length === 0;
      });
    } else if (calSelectedDate) {
      var sd = calSelectedDate.getTime();
      filtered = preFilteredCards.filter(function (c) {
        if (!c.dateRanges || !c.dateRanges.length) return false;
        return c.dateRanges.some(function (r) {
          var s = r[0];
          if (!s) return false;
          var sDay = new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime();
          return sDay === sd;
        });
      });
    } else {
      filtered = preFilteredCards.slice();
    }

    /* === Шаг 4: рендер === */
    var calCont = document.getElementById('htsCalendar');
    if (calCont && !calCont.classList.contains('hidden')) renderCalendar();

    shown = 0;
    renderPage();
  }

  function renderPage() {
    var grid = document.getElementById('htsGrid');
    var countEl = document.getElementById('htsCount');
    var loadBtn = document.getElementById('htsBtnLoad');
    if (!grid) return;
    grid.innerHTML = '';
    if (!filtered.length) {
      grid.innerHTML = '<div class="hts-empty"><div class="hts-empty__icon">🧭</div>' +
        '<div class="hts-empty__title">Туры не найдены</div>' +
        '<div class="hts-empty__text">Попробуйте изменить параметры поиска или сбросить фильтры</div></div>';
      if (countEl) countEl.textContent = '';
      if (loadBtn) loadBtn.classList.add('hidden');
      return;
    }
    var batch = filtered.slice(0, PER_PAGE);
    shown = batch.length;
    batch.forEach(function(c) { grid.appendChild(c.el); });
    if (countEl) countEl.textContent = filtered.length + ' ' + plural(filtered.length, 'тур', 'тура', 'туров');
    if (loadBtn) loadBtn.classList.toggle('hidden', shown >= filtered.length);
  }

  /* === АВТО-ФИЛЬТР: собирает значения из табов + кастомных дропдаунов и
     применяет без нажатия кнопки. Вызывается из обработчиков смены любого поля. === */
  window.__htsAutoFilter = function () {
    var widget = document.getElementById('htsWidget');
    var activeTab = widget ? widget.querySelector('.hts-tab.active') : null;
    curFilter = {
      type:     activeTab ? activeTab.getAttribute('data-type') || '' : '',
      city:     getDropdownValue('htsCity'),
      month:    getDropdownValue('htsMonth'),
      duration: getDropdownValue('htsDuration'),
      meals:    getDropdownValue('htsMeals'),
      budget:   getDropdownValue('htsBudget')
    };
    applyFilter();
    updateStatus();
  };

  function updateStatus() {
    var statusEl = document.getElementById('htsStatus');
    if (!statusEl) return;
    var widget = document.getElementById('htsWidget');
    var activeTab = widget ? widget.querySelector('.hts-tab.active') : null;
    var type = activeTab ? activeTab.getAttribute('data-type') || '' : '';
    var parts = [];
    if (type) parts.push(type.charAt(0).toUpperCase() + type.slice(1));
    var cityL = getDropdownLabel('htsCity');     if (cityL) parts.push('из ' + cityL);
    var monthL = getDropdownLabel('htsMonth');   if (monthL) parts.push(monthL);
    var budgetL = getDropdownLabel('htsBudget'); if (budgetL) parts.push(budgetL);
    var durL = getDropdownLabel('htsDuration');  if (durL) parts.push(durL);
    var mealsL = getDropdownLabel('htsMeals');   if (mealsL) parts.push(mealsL);
    if (calSelectedDate) {
      var dd = calSelectedDate.getDate(), mm = calSelectedDate.getMonth() + 1;
      parts.push((dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm));
    }
    if (calNoDateOnly) parts.push('межсезонные');
    statusEl.textContent = parts.length ? 'Фильтр: ' + parts.join(', ') : '';
  }

  function setupWidget() {
    var widget = document.getElementById('htsWidget');
    if (!widget || widget.dataset.setupDone) return;
    widget.dataset.setupDone = '1';

    /* Инициализируем все кастомные дропдауны (наполнятся позже через fillSelect) */
    widget.querySelectorAll('.hts-dd').forEach(initDropdown);

    /* Кликабельной делаем ВСЮ белую плашку .hts-field, а не только текст dropdown-а.
       Клик по иконке, лейблу или белому свободному месту — открывает dropdown.
       Открываем напрямую (а не через btn.click()) и stopPropagation, чтобы
       document-листенер «клик вне» не закрыл то что мы только что открыли. */
    widget.querySelectorAll('.hts-field').forEach(function (field) {
      var dd = field.querySelector('.hts-dd');
      if (!dd) return;
      field.style.cursor = 'pointer';
      field.addEventListener('click', function (e) {
        /* Клики внутри меню или по кнопке — обрабатываются их собственными хэндлерами */
        if (e.target.closest('.hts-dd__menu')) return;
        if (e.target.closest('.hts-dd__btn')) return;
        e.stopPropagation();
        var willOpen = !dd.classList.contains('open');
        document.querySelectorAll('.hts-dd.open').forEach(function (d) { if (d !== dd) d.classList.remove('open'); });
        dd.classList.toggle('open', willOpen);
      });
    });

    /* Табы — авто-фильтр при переключении */
    widget.querySelectorAll('.hts-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        widget.querySelectorAll('.hts-tab').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        window.__htsAutoFilter();
      });
    });

    /* «Найти туры» (#htsBtnSearch) — теперь только скролл-якорь, фильтрация авто */
    var btnSearch = document.getElementById('htsBtnSearch');
    if (btnSearch) {
      /* Снимаем все старые обработчики путём клонирования */
      var clone = btnSearch.cloneNode(true);
      btnSearch.parentNode.replaceChild(clone, btnSearch);
      clone.addEventListener('click', function (e) {
        e.preventDefault();
        var c = document.getElementById('htsCatalog');
        if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    /* «Ещё фильтры» */
    var btnMore = document.getElementById('htsBtnMore');
    if (btnMore) {
      var mClone = btnMore.cloneNode(true);
      btnMore.parentNode.replaceChild(mClone, btnMore);
      mClone.addEventListener('click', function () {
        var ex = document.getElementById('htsExtra');
        if (!ex) return;
        var hid = ex.classList.toggle('hidden');
        this.textContent = hid ? 'Ещё фильтры ▾' : 'Свернуть ▴';
      });
    }

    /* «Сбросить» — сбрасывает всё + авто-фильтр */
    var btnReset = document.getElementById('htsBtnReset');
    if (btnReset) {
      var rClone = btnReset.cloneNode(true);
      btnReset.parentNode.replaceChild(rClone, btnReset);
      rClone.addEventListener('click', function () {
        widget.querySelectorAll('.hts-dd').forEach(function (d) {
          var id = d.getAttribute('data-id');
          var p = d.getAttribute('data-placeholder') || '';
          setDropdownValue(id, '', p);
          d.querySelectorAll('.hts-dd__item--selected').forEach(function (i) { i.classList.remove('hts-dd__item--selected'); });
        });
        widget.querySelectorAll('.hts-tab').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
        calSelectedDate = null;
        calNoDateOnly = false;
        window.__htsAutoFilter();
      });
    }

    /* «Показать ещё» */
    var btnLoad = document.getElementById('htsBtnLoad');
    if (btnLoad) {
      var lClone = btnLoad.cloneNode(true);
      btnLoad.parentNode.replaceChild(lClone, btnLoad);
      lClone.addEventListener('click', function () {
        if (typeof window.__htsMore === 'function') window.__htsMore();
      });
    }
  }

  window.__htsFilter = function(opts) { curFilter = opts || {}; applyFilter(); };
  window.__htsMore = function() {
    var grid = document.getElementById('htsGrid');
    var loadBtn = document.getElementById('htsBtnLoad');
    if (!grid || shown >= filtered.length) return;
    var batch = filtered.slice(shown, shown + PER_PAGE);
    shown += batch.length;
    batch.forEach(function(c) { grid.appendChild(c.el); });
    if (loadBtn) loadBtn.classList.toggle('hidden', shown >= filtered.length);
  };

  function hideStore() {
    var store = document.getElementById('rec771192705');
    if (store) { store.style.height='0'; store.style.overflow='hidden'; store.style.margin='0'; store.style.padding='0'; }
  }

  function observe() {
    var target = document.getElementById('rec771192705');
    if (!target) return;
    var prev = 0;
    new MutationObserver(function() {
      var n = document.querySelectorAll('#rec771192705 .t-store__card').length;
      if (n !== prev) { prev = n; setTimeout(function(){ if (!allCards.length) loadFromStore(); }, 300); }
    }).observe(target, { childList: true, subtree: true });
  }

  function init() {
    if (!document.getElementById('htsGrid')) return;            /* не главная */
    if (location.pathname.indexOf('/tproduct/') !== -1) return; /* страница товара */
    hideStore();

    /* Перехватываем виджет: кастомные дропдауны, авто-фильтр, кнопка-якорь */
    setupWidget();

    /* Основной путь — Tilda Store API: структурированные данные,
       без зависимости от DOM и без скрейпа карточек. */
    loadFromAPI().then(function (ok) {
      if (ok) return;
      /* Fallback на старую DOM-загрузку, если API не отдал данные */
      console.warn('[halaltur] API empty, fallback to DOM scrape');
      if (!loadFromStore()) {
        [800, 2000, 4500].forEach(function (d) {
          setTimeout(function () {
            if (!allCards.length) { hideStore(); loadFromStore(); }
          }, d);
        });
      }
      observe();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 400); });
  } else {
    setTimeout(init, 400);
  }
})();
