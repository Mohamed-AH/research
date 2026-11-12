/* Interactive figures for "Claiming Ideas". Vanilla JS, no dependencies. */
(function () {
  'use strict';
  var LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  var RTL = LANG === 'ar';
  var XRTL = false; // charts keep left-to-right time axes in both languages
  var NS = 'http://www.w3.org/2000/svg';

  var T = {
    en: {
      ladderTitle: 'How deep is it?', car: 'Car', ev: 'Electric car', av: 'Self-driving car',
      carNew: 'Combustion engines, mechanics, metallurgy', carNote: 'Mature knowledge. Many companies can build one.',
      evNew: 'Battery chemistry, power electronics, thermal management', evNote: 'Deeper: needs new materials research and years of testing.',
      avNew: 'Sensors, computer vision, machine learning, safety validation', avNote: 'Deepest: still an open research problem in parts. Few companies can do it.',
      depth: 'Research depth', layers: 'New knowledge needed',
      feetTitle: 'Two feet, one small difference', left: 'Left foot', right: 'Right foot', gap: 'Temperature gap',
      feetOk: 'Within the normal range. Both feet look the same to the eye, and to the model.',
      feetWarn: 'Above about 2.2 °C. Foot-temperature monitoring studies commonly treat a gap this size at the same spot on both feet as a warning sign. On a thermal image it is still a subtle shade change.',
      curveTitle: 'Quick product vs. patient research', ret: 'Annual return on research', years: 'Years', product: 'Product launch', research: 'Research centre',
      breakeven: 'Research overtakes the product in year', never: 'Research does not overtake the product within 15 years at this return.', illus: 'Illustrative numbers only.',
      pipeTitle: 'From paper to patent: the seven steps', who: 'In the room', out: 'Produces',
      steps: [
        ['Researchers write', 'Research team', 'A draft paper tied to the company\'s market'],
        ['Patentability check', 'Patent search specialists', 'A yes or no: is there anything new to patent? If no, publish or keep it as know-how.'],
        ['Draft the claims', 'IP-and-product team', 'Patent claims written in legal language that fits future products'],
        ['Open review', 'Researcher and product teams', 'Agreed "ground facts" about what the invention is'],
        ['Split off trade secrets', 'Product and legal', 'A list of what is patented and what stays a "black box"'],
        ['File', 'In-house legal and external patent attorney (researchers and product listen silently)', 'A filed application with a number'],
        ['Publish', 'Researcher', 'The paper, now citing the filing number, safe to publish'],
      ],
      branchNo: 'Not patentable → publish, or keep as know-how',
      fcTitle: 'Forecasting the Eid peak', mLast: 'Same dates as last year', mHijri: 'Aligned to Ramadan', reveal: 'Reveal what happened', hide: 'Hide outcome',
      today: 'Today', eid: 'Eid', units: 'Units sold per day', fcLast: 'Copying last year by calendar date puts the peak about 11 days too late, because Eid moves earlier every year.',
      fcHijri: 'Aligning to the Hijri calendar puts the peak in the right place. The forecast band says 3 to 4 times normal sales.',
      fcActual: 'What happened: the merchant stocked one product and put all his marketing behind it. Sales reached about 12 times normal, and the warehouse was empty before Eid.',
      viewR: "Researcher's view", viewM: "Merchant's view", heatNote: '48 products × 10 weeks. Every cell is a forecast. Hard to act on.', topNote: 'The same forecast, cut to the top 3 products. Easy to act on.',
      prod: 'Product', normal: 'times normal sales',
      routeTitle: 'Which route to market?', routePrompt: 'Answer a question to see which route fits best.', viewAria: 'The same forecast shown two ways: as a researcher sees it and as a merchant sees it.', triKeys: 'Keyboard: arrow keys move the marker, Enter places a founder.', yes: 'Yes', no: 'No',
      qs: [
        'Do established companies already sell in this market?',
        'Could others build the invention into their own products?',
        'Does it fit one of the owner\'s existing products?',
        'Is there a team ready to run it full-time as founders?',
        'Have potential customers said they would pay?',
      ],
      routes: ['License for royalties', 'Corporate venture', 'Spin-out'],
      routeWhy: ['Best when others can build it in and the market already exists.', 'Best when it strengthens a product the owner already sells.', 'Best when there is a committed team and proof that customers will pay.'],
      fund: 'Venture fund life', fundNote: 'Most venture funds must return their money within about 10 years, so research that pays off later needs a patient owner.',
      pubFirst: 'What if they publish first?', pubOn: 'Published first',
      pubLost: 'Published before filing. In most countries the paper now counts as prior art against your own patent, so steps 2 to 6 are lost. A few countries allow a short grace period for the inventor\'s own disclosure, but you cannot rely on it everywhere.',
      planTitle: 'Plan your own peak', daily: 'Usual daily sales (units)', lead: 'Supplier lead time (days)',
      planExp: 'Expected demand while you wait for stock (3.5× normal)', planSafe: 'Safety stock to cover the top of the 3 to 4× band', planRop: 'Reorder point: reorder when stock falls to',
      planStory: 'If the peak reaches 12×, as it did in the story, that stock lasts about', days: 'days', units2: 'units',
      planNote: 'Reorder point = demand during the lead time + safety stock. Illustrative, using the story\'s 3 to 4× forecast band.',
      dealTitle: 'Anatomy of a sponsored-research deal', dealPick: 'Tap a party to see what it puts in and what it gets back.', putsIn: 'Puts in', getsBack: 'Gets back',
      parties: [
        ['Company', 'Money and a real question it expects to face in two or three years.', 'Early access to results and, usually, first rights to license any patent.'],
        ['University lab', 'Expertise, equipment and research time.', 'Funding, real-world data, and the right to publish after a short review delay.'],
        ['Student or researcher', 'Months or years of focused work.', 'A stipend, real data to work on, and often a job offer.'],
      ],
      flow: ['Company funds a question', 'Lab does the research', 'Patent filed first, paper published after', 'Company licenses the result'],
      flowWho: [[0, 1], [1, 2], [1, 2, 0], [0, 1]],
      triTitle: 'The founder triangle', eng: 'Engineer', hus: 'Hustler', art: 'Artist', clear: 'Clear', coverage: 'Team coverage',
      triEmpty: 'Tap inside the triangle to place a founder.', thin: 'Thin spot:', balanced: 'Balanced: every corner has someone strong.',
      aiTitle: 'What AI can and can\'t do in research', can: 'AI can help', cant: 'Still human',
      canL: ['Find and summarise published literature', 'Analyse large datasets', 'Check proofs and calculations', 'Suggest hypotheses from known patterns'],
      cantL: ['Choose the question worth asking', 'Design a new instrument, like the biopsy guide', 'Work on problems nobody has published', 'Take responsibility for the result'],
    },
    ar: {
      ladderTitle: 'ما مدى عمقها؟', car: 'سيارة', ev: 'سيارة كهربائية', av: 'سيارة ذاتية القيادة',
      carNew: 'محركات الاحتراق، الميكانيكا، علم المعادن', carNote: 'معرفة ناضجة، تستطيع شركات كثيرة صنعها.',
      evNew: 'كيمياء البطاريات، إلكترونيات القدرة، إدارة الحرارة', evNote: 'أعمق: تحتاج أبحاث مواد جديدة وسنوات من الاختبار.',
      avNew: 'المستشعرات، الرؤية الحاسوبية، تعلّم الآلة، التحقق من السلامة', avNote: 'الأعمق: أجزاء منها ما زالت مسائل بحثية مفتوحة، وقليل من الشركات يقدر عليها.',
      depth: 'العمق البحثي', layers: 'المعرفة الجديدة المطلوبة',
      feetTitle: 'قدمان وفرق صغير', left: 'القدم اليسرى', right: 'القدم اليمنى', gap: 'فرق الحرارة',
      feetOk: 'ضمن النطاق الطبيعي. تبدو القدمان متشابهتين للعين وللنموذج.',
      feetWarn: 'أكثر من نحو 2.2 درجة مئوية. تعدّ دراسات مراقبة حرارة القدم فرقًا بهذا الحجم في الموضع نفسه من القدمين علامة تحذير، ومع ذلك يبقى تغيّرًا خفيفًا في اللون على الصورة الحرارية.',
      curveTitle: 'منتج سريع أم بحث صبور؟', ret: 'العائد السنوي على البحث', years: 'السنوات', product: 'إطلاق منتج', research: 'مركز أبحاث',
      breakeven: 'يتفوق البحث على المنتج في السنة', never: 'لا يتفوق البحث على المنتج خلال 15 سنة بهذا العائد.', illus: 'أرقام توضيحية فقط.',
      pipeTitle: 'من الورقة إلى البراءة: سبع خطوات', who: 'من في الغرفة', out: 'المُخرَج',
      steps: [
        ['يكتب الباحثون', 'فريق البحث', 'مسودة ورقة مرتبطة بسوق الشركة'],
        ['فحص قابلية التسجيل', 'مختصو البحث في البراءات', 'نعم أو لا: هل يوجد جديد يمكن تسجيله؟ إن لم يوجد، تُنشر الورقة أو تُحفظ معرفةً داخلية.'],
        ['صياغة عناصر الحماية', 'فريق الملكية الفكرية والمنتجات', 'عناصر حماية بلغة قانونية تناسب المنتجات المستقبلية'],
        ['مراجعة مفتوحة', 'الباحث وفرق المنتجات', 'اتفاق على «الحقائق الثابتة» للاختراع'],
        ['فصل الأسرار التجارية', 'المنتجات والقانونية', 'قائمة بما يُسجَّل وما يبقى «صندوقًا أسود»'],
        ['التسجيل', 'القانونية الداخلية ومكتب البراءات الخارجي (الباحث والمنتجات يستمعون بصمت)', 'طلب مسجّل برقم'],
        ['النشر', 'الباحث', 'الورقة وفيها رقم الطلب، وصار نشرها آمنًا'],
      ],
      branchNo: 'غير قابل للتسجيل ← انشر أو احتفظ به معرفةً داخلية',
      fcTitle: 'التنبؤ بذروة العيد', mLast: 'التواريخ نفسها من العام الماضي', mHijri: 'مضبوط على رمضان', reveal: 'اكشف ما حدث', hide: 'أخفِ النتيجة',
      today: 'اليوم', eid: 'العيد', units: 'الوحدات المبيعة يوميًا', fcLast: 'نسخ العام الماضي بالتاريخ الميلادي يضع الذروة متأخرة نحو 11 يومًا، لأن العيد يتقدّم كل سنة.',
      fcHijri: 'الضبط على التقويم الهجري يضع الذروة في مكانها. ونطاق التنبؤ يقول من 3 إلى 4 أضعاف المبيعات المعتادة.',
      fcActual: 'ما حدث فعلًا: خزّن التاجر منتجًا واحدًا ووضع كل تسويقه عليه، فبلغت المبيعات نحو 12 ضعف المعتاد وفرغ المستودع قبل العيد.',
      viewR: 'عرض الباحث', viewM: 'عرض التاجر', heatNote: '48 منتجًا × 10 أسابيع، كل خانة تنبؤ. يصعب التصرّف بناءً عليها.', topNote: 'التنبؤ نفسه، مختصرًا في أعلى 3 منتجات. يسهل التصرّف بناءً عليه.',
      prod: 'منتج', normal: 'أضعاف المبيعات المعتادة',
      routeTitle: 'أي طريق إلى السوق؟', routePrompt: 'أجب عن سؤال لترى أي طريق يناسب أكثر.', viewAria: 'التنبؤ نفسه بطريقتين: كما يراه الباحث وكما يراه التاجر.', triKeys: 'بلوحة المفاتيح: الأسهم تحرّك المؤشر، وEnter يضع مؤسسًا.', yes: 'نعم', no: 'لا',
      qs: [
        'هل توجد شركات قائمة تبيع في هذا السوق؟',
        'هل يمكن لغيرك دمج الاختراع في منتجاتهم؟',
        'هل يناسب أحد منتجات المالك الحالية؟',
        'هل يوجد فريق مستعد للتفرّغ له بصفة مؤسسين؟',
        'هل قال عملاء محتملون إنهم سيدفعون؟',
      ],
      routes: ['الترخيص مقابل حق الامتياز', 'بناء مشروع مؤسسي', 'شركة منبثقة'],
      routeWhy: ['الأنسب حين يستطيع غيرك دمجه والسوق موجود أصلًا.', 'الأنسب حين يقوّي منتجًا يبيعه المالك أصلًا.', 'الأنسب حين يوجد فريق ملتزم ودليل على أن العملاء سيدفعون.'],
      fund: 'عمر الصندوق الجريء', fundNote: 'معظم صناديق رأس المال الجريء مطالبة بإعادة أموالها خلال نحو 10 سنوات، لذلك يحتاج البحث الذي يؤتي ثماره لاحقًا إلى مالك صبور.',
      pubFirst: 'ماذا لو نشروا أولًا؟', pubOn: 'نُشر أولًا',
      pubLost: 'نُشرت الورقة قبل التسجيل. في معظم الدول تُعدّ الورقة الآن حالة تقنية سابقة ضد براءتك أنت، فتضيع الخطوات من 2 إلى 6. وتمنح بعض الدول فترة سماح قصيرة لإفصاح المخترع نفسه، لكن لا يمكن الاعتماد عليها في كل مكان.',
      planTitle: 'خطّط لذروتك أنت', daily: 'المبيعات اليومية المعتادة (وحدات)', lead: 'مدة التوريد من المورّد (أيام)',
      planExp: 'الطلب المتوقع أثناء انتظار البضاعة (3.5 أضعاف المعتاد)', planSafe: 'مخزون الأمان لتغطية أعلى نطاق 3 إلى 4 أضعاف', planRop: 'نقطة إعادة الطلب: اطلب حين ينزل المخزون إلى',
      planStory: 'لو بلغت الذروة 12 ضعفًا كما في القصة، يكفي هذا المخزون نحو', days: 'أيام', units2: 'وحدة',
      planNote: 'نقطة إعادة الطلب = الطلب خلال مدة التوريد + مخزون الأمان. أرقام توضيحية تستخدم نطاق التنبؤ في القصة (3 إلى 4 أضعاف).',
      dealTitle: 'تشريح صفقة بحث مدعوم', dealPick: 'اضغط على طرف لترى ما يقدّمه وما يحصل عليه.', putsIn: 'يقدّم', getsBack: 'يحصل على',
      parties: [
        ['الشركة', 'المال، وسؤالًا حقيقيًا تتوقع أن تواجهه بعد سنتين أو ثلاث.', 'النتائج مبكرًا، وغالبًا الأولوية في ترخيص أي براءة.'],
        ['المختبر الجامعي', 'الخبرة والأجهزة ووقت البحث.', 'التمويل، وبيانات حقيقية، وحق النشر بعد تأخير قصير للمراجعة.'],
        ['الطالب أو الباحث', 'أشهرًا أو سنوات من العمل المركّز.', 'مكافأة، وبيانات حقيقية يعمل عليها، وكثيرًا ما يحصل على عرض عمل.'],
      ],
      flow: ['الشركة تموّل سؤالًا', 'المختبر يجري البحث', 'تُسجَّل البراءة أولًا ثم تُنشر الورقة', 'الشركة ترخّص النتيجة'],
      flowWho: [[0, 1], [1, 2], [1, 2, 0], [0, 1]],
      triTitle: 'مثلث المؤسسين', eng: 'المهندس', hus: 'المُبادِر', art: 'الفنان', clear: 'مسح', coverage: 'تغطية الفريق',
      triEmpty: 'اضغط داخل المثلث لتضع مؤسسًا.', thin: 'نقطة ضعف:', balanced: 'متوازن: في كل زاوية شخص قوي.',
      aiTitle: 'ما يقدر عليه الذكاء الاصطناعي في البحث وما لا يقدر', can: 'يساعد فيه الذكاء الاصطناعي', cant: 'يبقى بشريًا',
      canL: ['البحث في الأدبيات المنشورة وتلخيصها', 'تحليل البيانات الضخمة', 'التحقق من البراهين والحسابات', 'اقتراح فرضيات من أنماط معروفة'],
      cantL: ['اختيار السؤال الجدير بالبحث', 'تصميم أداة جديدة مثل دليل الخزعة', 'العمل على مسائل لم يُنشر عنها شيء', 'تحمّل المسؤولية عن النتيجة'],
    },
  }[LANG];

  var fmt = function (n, d) { return Number(n).toLocaleString('en-GB', { maximumFractionDigits: d || 0, minimumFractionDigits: d || 0 }); };
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    for (var k in attrs || {}) { if (k === 'text') el.textContent = attrs[k]; else if (k === 'html') el.innerHTML = attrs[k]; else el.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function s(tag, attrs) { var el = document.createElementNS(NS, tag); for (var k in attrs || {}) el.setAttribute(k, attrs[k]); return el; }
  function svgText(x, y, str, cls, anchor) { var t = s('text', { x: x, y: y, class: cls || 'label', 'text-anchor': anchor || 'start' }); t.textContent = str; return t; }
  function seg(options, onPick, start) {
    var wrap = h('div', { class: 'row seg', role: 'group' });
    var btns = options.map(function (o, i) {
      var b = h('button', { type: 'button', 'aria-pressed': i === (start || 0) ? 'true' : 'false', text: o });
      b.addEventListener('click', function () { btns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); onPick(i); });
      wrap.appendChild(b); return b;
    });
    return wrap;
  }
  function css(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  /* 1. Depth ladder */
  function depthLadder(el) {
    var levels = [[T.car, T.carNew, T.carNote], [T.ev, T.evNew, T.evNote], [T.av, T.avNew, T.avNote]];
    var stack = h('div', { class: 'ladder', role: 'img', 'aria-label': T.depth });
    var panel = h('div', { class: 'panel', 'aria-live': 'polite' });
    var rows = levels.map(function (lv, k) { var r = h('div', { class: 'rung', style: '--k:' + k }, [h('span', { text: lv[1] })]); stack.appendChild(r); return r; });
    function draw(i) {
      rows.forEach(function (r, k) { r.classList.toggle('on', k <= i); });
      panel.innerHTML = '<b>' + levels[i][0] + '</b><br>' + levels[i][2];
    }
    el.appendChild(h('h3', { text: T.ladderTitle }));
    el.appendChild(seg([T.car, T.ev, T.av], draw, 0));
    el.appendChild(h('p', { class: 'label', text: T.layers + ' ↓ ' + T.depth, style: 'margin:.9em 0 .3em' }));
    el.appendChild(stack); el.appendChild(panel); draw(0);
  }

  /* 2. Thermal feet */
  function thermalFeet(el) {
    var gap = 0.6;
    var svg = s('svg', { viewBox: '0 0 400 260', role: 'img', 'aria-label': T.feetTitle });
    var defs = s('defs'); svg.appendChild(defs);
    function heat(t) { // 28..35 °C -> colour
      var stops = [[28, [30, 20, 90]], [30, [120, 30, 140]], [31.5, [220, 60, 60]], [33, [250, 150, 40]], [35, [255, 240, 150]]];
      for (var i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i], f = (t - a[0]) / (b[0] - a[0]);
        return 'rgb(' + a[1].map(function (c, j) { return Math.round(c + (b[1][j] - c) * f); }).join(',') + ')';
      }
      return 'rgb(255,240,150)';
    }
    function grad(id, base) {
      var g = s('radialGradient', { id: id, cx: '50%', cy: '55%', r: '65%' });
      [[0, base + 1.2], [55, base], [100, base - 2.2]].forEach(function (p) { g.appendChild(s('stop', { offset: p[0] + '%', 'stop-color': heat(p[1]) })); });
      return g;
    }
    var foot = 'M0 -95 C 32 -95 42 -60 40 -20 C 38 20 34 60 30 85 C 26 105 -26 105 -30 85 C -36 50 -44 10 -42 -25 C -40 -70 -30 -95 0 -95 Z';
    var lg, rg;
    var leftF = s('path', { d: foot, transform: 'translate(120 130) rotate(-6) scale(-1 1)' });
    var rightF = s('path', { d: foot, transform: 'translate(280 130) rotate(6)' });
    var bg = s('rect', { x: 0, y: 0, width: 400, height: 260, rx: 10, fill: '#120a26' });
    svg.appendChild(bg); svg.appendChild(leftF); svg.appendChild(rightF);
    var tl = svgText(120, 250, T.left, 'label', 'middle'), tr = svgText(280, 250, T.right, 'label', 'middle');
    tl.style.fill = tr.style.fill = '#e8dcc8'; svg.appendChild(tl); svg.appendChild(tr);
    var out = h('div', { class: 'row' }), stat = h('span', { class: 'big-stat' }), note = h('p', { class: 'note' });
    var range = h('input', { type: 'range', min: '0', max: '4', step: '0.1', value: String(gap), 'aria-label': T.gap });
    function draw() {
      defs.innerHTML = ''; defs.appendChild(grad('lf', 30.5)); defs.appendChild(grad('rf', 30.5 + gap));
      leftF.setAttribute('fill', 'url(#lf)'); rightF.setAttribute('fill', 'url(#rf)');
      stat.textContent = fmt(gap, 1) + ' °C';
      note.textContent = gap > 2.2 ? T.feetWarn : T.feetOk;
      stat.style.color = gap > 2.2 ? css('--signal-text') : css('--ink');
    }
    range.addEventListener('input', function () { gap = parseFloat(range.value); draw(); });
    el.appendChild(h('h3', { text: T.feetTitle })); el.appendChild(svg);
    out.appendChild(h('span', { class: 'label', text: T.gap })); out.appendChild(stat);
    el.appendChild(out); el.appendChild(range); el.appendChild(note); draw();
  }

  /* 3. Patience curve */
  function patienceCurve(el) {
    var r = 0.2, W = Math.max(300, Math.min(680, el.clientWidth - 40)), H = 280, P = { l: 44, r: 16, t: 16, b: 34 }, YMAX = 20, YMIN = -10, N = 15;
    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': T.curveTitle });
    var x = function (t) { var v = P.l + (W - P.l - P.r) * t / N; return XRTL ? W - v : v; };
    var y = function (v) { return P.t + (H - P.t - P.b) * (YMAX - v) / (YMAX - YMIN); };
    function series() {
      var prod = [0], res = [0], cp = 0, cr = 0;
      for (var t = 1; t <= N; t++) {
        cp += t === 1 ? -3 : 2 * Math.pow(0.8, t - 2);
        cr += t <= 8 ? -1 : 8 * r * Math.pow(1 + r, t - 9);
        prod.push(cp); res.push(cr);
      }
      return [prod, res];
    }
    var stat = h('p', { class: 'note' });
    var lbl = h('span', { class: 'big-stat' });
    var range = h('input', { type: 'range', min: '15', max: '30', step: '1', value: '20', 'aria-label': T.ret });
    function draw() {
      svg.innerHTML = '';
      var dd0 = series(); YMAX = Math.max(15, Math.ceil((Math.max.apply(null, dd0[1]) + 4) / 5) * 5);
      for (var v = -10; v <= YMAX; v += 10) {
        svg.appendChild(s('line', { x1: x(0), x2: x(N), y1: y(v), y2: y(v), stroke: css('--rule'), 'stroke-dasharray': v === 0 ? '' : '2 4' }));
        svg.appendChild(svgText(XRTL ? x(0) + 6 : x(0) - 6, y(v) + 4, fmt(v), 'label', XRTL ? 'start' : 'end'));
      }
      svg.appendChild(s('rect', { x: x(0), y: P.t, width: x(10) - x(0), height: H - P.t - P.b, fill: css('--ink'), opacity: 0.06 }));
      svg.appendChild(s('line', { x1: x(10), x2: x(10), y1: P.t, y2: H - P.b, stroke: css('--ink-2'), 'stroke-dasharray': '4 3' }));
      svg.appendChild(svgText(x(0) + 6, P.t + 12, T.fund, 'label fund-l', 'start'));
      for (var t = 0; t <= N; t += 5) svg.appendChild(svgText(x(t), H - 12, fmt(t), 'label', 'middle'));
      svg.appendChild(svgText(x(N / 2), H, T.years, 'label', 'middle'));
      var d = series(), cross = null;
      for (var t2 = 1; t2 <= N; t2++) if (cross === null && d[1][t2] > d[0][t2] && t2 > 8) cross = t2;
      [[d[0], css('--coral'), T.product], [d[1], css('--signal'), T.research]].forEach(function (sr, k) {
        var pts = sr[0].map(function (v, i) { return x(i) + ',' + y(Math.max(YMIN, Math.min(YMAX, v))); }).join(' ');
        svg.appendChild(s('polyline', { points: pts, fill: 'none', stroke: sr[1], 'stroke-width': 3, 'stroke-linejoin': 'round' }));
        var lt = svgText(x(N) + (XRTL ? 4 : -4), y(Math.min(YMAX - 2, sr[0][N])) + (k === 0 ? 20 : -10), sr[2], 'label', XRTL ? 'start' : 'end'); lt.style.fill = k === 0 ? css('--coral-text') : css('--signal-text'); svg.appendChild(lt);
      });
      if (cross) svg.appendChild(s('circle', { cx: x(cross), cy: y(d[1][cross]), r: 6, fill: css('--paper'), stroke: css('--ink'), 'stroke-width': 2 }));
      lbl.textContent = fmt(r * 100) + '%';
      stat.textContent = (cross ? T.breakeven + ' ' + fmt(cross) + '.' : T.never) + ' ' + T.fundNote + ' ' + T.illus;
    }
    range.addEventListener('input', function () { r = parseInt(range.value, 10) / 100; draw(); });
    el.appendChild(h('h3', { text: T.curveTitle })); el.appendChild(svg);
    var row = h('div', { class: 'row' }); row.appendChild(h('span', { class: 'label', text: T.ret })); row.appendChild(lbl);
    el.appendChild(row); el.appendChild(range); el.appendChild(stat); draw();
  }

  /* 4. Pipeline */
  function pipeline(el) {
    el.appendChild(h('h3', { text: T.pipeTitle }));
    var list = h('ol', { class: 'pipe' });
    var panel = h('div', { class: 'panel', 'aria-live': 'polite' });
    var btns = [];
    T.steps.forEach(function (st, i) {
      var b = h('button', { type: 'button', class: 'pipe-step', 'aria-pressed': i === 0 ? 'true' : 'false' }, [h('span', { class: 'pn', text: fmt(i + 1) }), h('span', { text: st[0] })]);
      b.addEventListener('click', function () { show(i); });
      btns.push(b);
      var li = h('li', {}, [b]);
      if (i === 1) li.appendChild(h('span', { class: 'pipe-branch', text: T.branchNo }));
      list.appendChild(li);
    });
    var lost = false, cur = 0;
    var sw = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: T.pubFirst });
    sw.addEventListener('click', function () {
      lost = !lost; sw.setAttribute('aria-pressed', lost ? 'true' : 'false'); sw.textContent = lost ? T.pubOn : T.pubFirst;
      list.classList.toggle('published-first', lost);
      btns.forEach(function (b, k) { if (k >= 1 && k <= 5) b.classList.toggle('lost', lost); });
      show(lost ? 6 : 0);
    });
    function show(i) {
      cur = i;
      btns.forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      panel.innerHTML = lost && (i === 6 || (i >= 1 && i <= 5))
        ? '<b>' + T.pubOn + '</b><br>' + T.pubLost
        : '<b>' + T.steps[i][0] + '</b><br>' + T.who + ': ' + T.steps[i][1] + '<br>' + T.out + ': ' + T.steps[i][2];
    }
    el.appendChild(h('div', { class: 'row', style: 'margin-bottom:10px' }, [sw]));
    el.appendChild(list); el.appendChild(panel); show(0);
  }

  /* 5. Forecast playground */
  function forecast(el) {
    var DAY = 864e5, start = Date.UTC(2025, 0, 1), end = Date.UTC(2026, 3, 30), today = Date.UTC(2026, 1, 10);
    var eids = [Date.UTC(2024, 3, 10), Date.UTC(2025, 2, 30), Date.UTC(2026, 2, 20)];
    var rand = rng(7), n = Math.round((end - start) / DAY) + 1, base = 20;
    function lift(t) { // Ramadan ramp before each Eid
      var m = 1;
      eids.forEach(function (e) { var dd = (e - t) / DAY; if (dd >= 0 && dd <= 30) m = Math.max(m, 1 + 2.5 * Math.pow(1 - dd / 30, 0.6)); if (dd < 0 && dd > -4) m = Math.max(m, 1.6); });
      return m;
    }
    var hist = [], dates = [];
    for (var i = 0; i < n; i++) { var t = start + i * DAY; dates.push(t); hist.push(base * lift(t) * (0.85 + 0.3 * rand()) * (1 + 0.12 * Math.sin(i * 2 * Math.PI / 7))); }
    var actual = dates.map(function (t, i) {
      var dd = (eids[2] - t) / DAY;
      if (t <= today) return hist[i];
      if (dd > 30) return hist[i];
      if (dd > 6) return base * (1 + 11 * Math.pow(1 - (dd - 6) / 24, 1.4)) * (0.9 + 0.2 * rand());
      if (dd > -30) return 0.5 * rand(); // sold out
      return hist[i];
    });
    var method = 1, showActual = false, view = 1;
    var W = Math.max(300, Math.min(700, el.clientWidth - 40)), H = 270, P = { l: 34, r: 8, t: 16, b: 30 }, YMAX = base * 5;
    var x = function (t) { var v = P.l + (W - P.l - P.r) * (t - start) / (end - start); return XRTL ? W - v : v; };
    var y = function (v) { return P.t + (H - P.t - P.b) * (1 - v / YMAX); };
    var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': T.fcTitle });
    var note = h('p', { class: 'note', 'aria-live': 'polite' });
    var revealBtn = h('button', { type: 'button', class: 'chip go', text: T.reveal });
    revealBtn.addEventListener('click', function () { showActual = !showActual; revealBtn.textContent = showActual ? T.hide : T.reveal; draw(); });
    function fc(i) {
      // method 0: same Gregorian dates as last year; method 1: shift by the Hijri year (Eid-to-Eid gap)
      var lag = method === 0 ? 365 : Math.round((eids[2] - eids[1]) / DAY);
      var j = i - lag;
      return j >= 0 ? hist[j] : base;
    }
    function draw() {
      svg.innerHTML = '';
      YMAX = base * (showActual ? 13 : 5);
      (showActual ? [1, 5, 10] : [1, 2, 3, 4]).forEach(function (k) { svg.appendChild(s('line', { x1: x(start), x2: x(end), y1: y(base * k), y2: y(base * k), stroke: css('--rule'), 'stroke-dasharray': k > 1 ? '2 4' : '' })); svg.appendChild(svgText(XRTL ? x(start) + 4 : x(start) - 4, y(base * k) + 4, fmt(k) + '×', 'label', XRTL ? 'start' : 'end')); });
      eids.slice(1).forEach(function (e) { svg.appendChild(s('line', { x1: x(e), x2: x(e), y1: P.t, y2: H - P.b, stroke: css('--ink-2'), 'stroke-dasharray': '3 3' })); svg.appendChild(svgText(x(e), H - 10, T.eid + ' ' + new Date(e).getUTCFullYear(), 'label', 'middle')); });
      svg.appendChild(s('line', { x1: x(today), x2: x(today), y1: P.t, y2: H - P.b, stroke: css('--ink'), 'stroke-width': 1.5 }));
      svg.appendChild(svgText(x(today) + (XRTL ? -4 : 4), P.t + 10, T.today, 'label', XRTL ? 'end' : 'start'));
      var past = [], fut = [], band = [], bandLo = [];
      dates.forEach(function (t, i) {
        if (t <= today) past.push(x(t) + ',' + y(Math.min(YMAX, hist[i])));
        else { var f = fc(i); fut.push(x(t) + ',' + y(Math.min(YMAX, f))); if (method === 1) { band.push(x(t) + ',' + y(Math.min(YMAX, f * 1.15))); bandLo.unshift(x(t) + ',' + y(f * 0.85)); } }
      });
      if (band.length) svg.appendChild(s('polygon', { points: band.concat(bandLo).join(' '), fill: css('--signal'), opacity: 0.15 }));
      svg.appendChild(s('polyline', { points: past.join(' '), fill: 'none', stroke: css('--ink'), 'stroke-width': 1.4 }));
      svg.appendChild(s('polyline', { points: fut.join(' '), fill: 'none', stroke: css('--signal'), 'stroke-width': 2.2, 'stroke-dasharray': '5 3' }));
      if (showActual) {
        var act = []; dates.forEach(function (t, i) { if (t > today) act.push(x(t) + ',' + y(actual[i])); });
        svg.appendChild(s('polyline', { points: act.join(' '), fill: 'none', stroke: css('--ink'), 'stroke-width': 2.6 }));
      }
      svg.appendChild(svgText(XRTL ? W - 4 : 4, P.t - 2, T.units, 'label', XRTL ? 'end' : 'start'));
      note.textContent = showActual ? T.fcActual : (method === 0 ? T.fcLast : T.fcHijri);
    }
    // researcher vs merchant view
    var VW = W, vsvg = s('svg', { viewBox: '0 0 ' + VW + ' 220', role: 'img', 'aria-label': T.viewAria || '' });
    var vnote = h('p', { class: 'note' });
    function drawView() {
      vsvg.innerHTML = ''; var rr = rng(11);
      if (view === 0) {
        for (var p = 0; p < 48; p++) for (var w = 0; w < 10; w++) {
          var v = rr(); if (p === 3 || p === 17 || p === 30) v = Math.min(1, v + 0.25 + w * 0.05);
          var cw = (VW - 20) / 10, cx = 10 + w * cw; if (XRTL) cx = VW - cx - cw + 2;
          vsvg.appendChild(s('rect', { x: cx, y: 4 + p * 4.4, width: cw - 2, height: 3.8, fill: css('--signal'), opacity: (0.08 + 0.9 * v).toFixed(2) }));
        }
        vnote.textContent = T.heatNote;
      } else {
        [[3.6, 'A'], [2.4, 'B'], [1.8, 'C']].forEach(function (b, k) {
          var bw = (VW - 100) * b[0] / 4, by = 20 + k * 64, bx = XRTL ? VW - 90 - bw : 90;
          vsvg.appendChild(s('rect', { x: bx, y: by, width: bw, height: 44, rx: 6, fill: k === 0 ? css('--signal') : css('--coral'), opacity: k === 0 ? 1 : 0.6 }));
          vsvg.appendChild(svgText(XRTL ? VW - 4 : 4, by + 28, T.prod + ' ' + b[1], 'label', XRTL ? 'end' : 'start'));
          vsvg.appendChild(svgText(XRTL ? bx + 8 : bx + bw - 8, by + 28, fmt(b[0], 1) + '×', 'label', XRTL ? 'start' : 'end'));
        });
        vnote.textContent = T.topNote;
      }
    }
    el.appendChild(h('h3', { text: T.fcTitle }));
    var row = seg([T.mLast, T.mHijri], function (i) { method = i; draw(); }, 1); row.appendChild(revealBtn);
    el.appendChild(row); el.appendChild(svg); el.appendChild(note);
    el.appendChild(h('hr', { style: 'border:0;border-top:1px dashed var(--rule);margin:18px 0' }));
    el.appendChild(seg([T.viewR, T.viewM], function (i) { view = i; drawView(); }, 1));
    el.appendChild(vsvg); el.appendChild(vnote);
    // plan your own peak: reorder point = lead-time demand + safety stock
    el.appendChild(h('hr', { style: 'border:0;border-top:1px dashed var(--rule);margin:18px 0' }));
    el.appendChild(h('h4', { class: 'sub-h', text: T.planTitle }));
    function num(label, val, max) {
      var inp = h('input', { type: 'number', inputmode: 'numeric', min: '1', max: String(max), step: '1', value: String(val) });
      var lab = h('label', { class: 'field' }, [h('span', { class: 'label', text: label }), inp]);
      return [lab, inp];
    }
    var fD = num(T.daily, 20, 100000), fL = num(T.lead, 14, 365);
    var pout = h('div', { class: 'panel', 'aria-live': 'polite' });
    function plan() {
      var d = Math.max(0, parseFloat(fD[1].value) || 0), L = Math.max(0, parseFloat(fL[1].value) || 0);
      var exp = Math.round(d * 3.5 * L), safe = Math.round(d * 0.5 * L), rop = exp + safe;
      var last = d > 0 ? rop / (d * 12) : 0;
      pout.innerHTML = '';
      [[T.planExp, exp], [T.planSafe, safe]].forEach(function (r) { pout.appendChild(h('div', { class: 'plan-row' }, [h('span', { text: r[0] }), h('b', { text: fmt(r[1]) + ' ' + T.units2 })])); });
      pout.appendChild(h('div', { class: 'plan-row total' }, [h('span', { text: T.planRop }), h('b', { text: fmt(rop) + ' ' + T.units2 })]));
      pout.appendChild(h('p', { class: 'note', text: T.planStory + ' ' + fmt(last, 1) + ' ' + T.days + '.' }));
    }
    [fD[1], fL[1]].forEach(function (i) { i.addEventListener('input', plan); });
    el.appendChild(h('div', { class: 'row fields' }, [fD[0], fL[0]])); el.appendChild(pout);
    el.appendChild(h('p', { class: 'note', text: T.planNote }));
    draw(); drawView(); plan();
  }

  /* 6. Sponsored-research deal */
  function deal(el) {
    el.appendChild(h('h3', { text: T.dealTitle }));
    var pick = -1, btns = [];
    var row = h('div', { class: 'row deal-parties', role: 'group' });
    T.parties.forEach(function (pt, i) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: pt[0] });
      b.addEventListener('click', function () { pick = i; draw(); });
      btns.push(b); row.appendChild(b);
    });
    var flow = h('ol', { class: 'deal-flow' });
    var steps = T.flow.map(function (f, k) { var li = h('li', {}, [h('span', { class: 'pn', text: fmt(k + 1) }), h('span', { text: f })]); flow.appendChild(li); return li; });
    var panel = h('div', { class: 'panel', 'aria-live': 'polite' });
    function draw() {
      btns.forEach(function (b, i) { b.setAttribute('aria-pressed', i === pick ? 'true' : 'false'); });
      steps.forEach(function (li, k) { li.classList.toggle('on', pick >= 0 && T.flowWho[k].indexOf(pick) >= 0); li.classList.toggle('dim', pick >= 0 && T.flowWho[k].indexOf(pick) < 0); });
      panel.innerHTML = '';
      if (pick < 0) { panel.appendChild(h('div', { class: 'note', text: T.dealPick })); return; }
      var pt = T.parties[pick];
      panel.appendChild(h('b', { text: pt[0] }));
      panel.appendChild(h('div', { class: 'deal-io' }, [
        h('div', {}, [h('span', { class: 'label', text: T.putsIn }), h('p', { text: pt[1] })]),
        h('div', {}, [h('span', { class: 'label', text: T.getsBack }), h('p', { text: pt[2] })]),
      ]));
    }
    el.appendChild(row); el.appendChild(flow); el.appendChild(panel); draw();
  }

  /* 7. Route chooser */
  function routeChooser(el) {
    var ans = [null, null, null, null, null];
    var W = [[2, 0, 0], [2, 1, -1], [-1, 2, 0], [-1, 0, 3], [0, 1, 2]]; // yes-weights per question
    el.appendChild(h('h3', { text: T.routeTitle }));
    T.qs.forEach(function (q, i) {
      var row = h('div', { class: 'row', style: 'justify-content:space-between;margin:.5em 0' });
      row.appendChild(h('span', { text: q, style: 'flex:1 1 220px;font-size:.95rem' }));
      row.appendChild(seg([T.yes, T.no], function (k) { ans[i] = k === 0; draw(); }, -1));
      el.appendChild(row);
    });
    var out = h('div', { class: 'panel' }); el.appendChild(out);
    function draw() {
      if (ans.every(function (a) { return a === null; })) { out.innerHTML = ''; out.appendChild(h('div', { class: 'note', text: T.routePrompt })); return; }
      var sc = [1, 1, 1];
      ans.forEach(function (a, i) { if (a === true) W[i].forEach(function (w, k) { sc[k] += w; }); if (a === false) W[i].forEach(function (w, k) { sc[k] -= Math.max(0, w) * 0.5; }); });
      var mx = Math.max.apply(null, sc), best = sc.indexOf(mx);
      out.innerHTML = '';
      T.routes.forEach(function (r, k) {
        var pct = Math.max(4, Math.round(100 * Math.max(0, sc[k]) / Math.max(1, mx)));
        var bar = h('div', { style: 'height:10px;border-radius:5px;margin:4px 0 10px;width:' + pct + '%;background:' + (k === best ? 'var(--signal)' : 'var(--coral)') + ';opacity:' + (k === best ? 1 : .5) + ';transition:width .4s' });
        out.appendChild(h('div', { html: (k === best ? '<b>' + r + '</b>' : r) }));
        out.appendChild(bar);
      });
      out.appendChild(h('div', { class: 'note', text: T.routeWhy[best] }));
    }
    draw();
  }

  /* 8. Founder triangle */
  function founderTriangle(el) {
    var A = [200, 20], B = [30, 310], C = [370, 310], pts = [];
    var svg = s('svg', { viewBox: '0 0 400 340', role: 'application', tabindex: '0', 'aria-label': T.triTitle + '. ' + T.triKeys, style: 'max-width:420px;margin:auto;cursor:crosshair;touch-action:manipulation' });
    var cur = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3], focused = false;
    var out = h('div', { class: 'panel' });
    function bary(p) {
      var d = (B[1] - C[1]) * (A[0] - C[0]) + (C[0] - B[0]) * (A[1] - C[1]);
      var a = ((B[1] - C[1]) * (p[0] - C[0]) + (C[0] - B[0]) * (p[1] - C[1])) / d;
      var b = ((C[1] - A[1]) * (p[0] - C[0]) + (A[0] - C[0]) * (p[1] - C[1])) / d;
      return [a, b, 1 - a - b];
    }
    var names = [T.eng, T.hus, T.art];
    function draw() {
      svg.innerHTML = '';
      svg.appendChild(s('polygon', { points: [A, B, C].map(function (p) { return p.join(','); }).join(' '), fill: css('--paper-2'), stroke: css('--ink'), 'stroke-width': 2 }));
      [0.33, 0.66].forEach(function (f) {
        var cx = (A[0] + B[0] + C[0]) / 3, cy = (A[1] + B[1] + C[1]) / 3;
        svg.appendChild(s('polygon', { points: [A, B, C].map(function (p) { return (cx + (p[0] - cx) * f) + ',' + (cy + (p[1] - cy) * f); }).join(' '), fill: 'none', stroke: css('--rule'), 'stroke-dasharray': '3 4' }));
      });
      svg.appendChild(svgText(A[0], A[1] - 6, T.eng, 'label', 'middle'));
      svg.appendChild(svgText(B[0], B[1] + 22, T.hus, 'label', 'start'));
      svg.appendChild(svgText(C[0], C[1] + 22, T.art, 'label', 'end'));
      pts.forEach(function (p, i) {
        svg.appendChild(s('circle', { cx: p[0], cy: p[1], r: 11, fill: css('--signal'), stroke: css('--paper'), 'stroke-width': 2 }));
        var t = svgText(p[0], p[1] + 4, fmt(i + 1), 'label', 'middle'); t.style.fill = css('--signal-ink'); svg.appendChild(t);
      });
      if (focused) svg.appendChild(s('circle', { cx: cur[0], cy: cur[1], r: 13, fill: 'none', stroke: css('--ink'), 'stroke-width': 2, 'stroke-dasharray': '4 3' }));
      out.innerHTML = '';
      if (!pts.length) { out.textContent = T.triEmpty; return; }
      var cov = [0, 0, 0];
      pts.forEach(function (p) { bary(p).forEach(function (v, k) { cov[k] = Math.max(cov[k], v); }); });
      out.appendChild(h('div', { class: 'label', text: T.coverage }));
      names.forEach(function (nm, k) {
        out.appendChild(h('div', { text: nm + ' · ' + fmt(Math.round(cov[k] * 100)) + '%' }));
        out.appendChild(h('div', { style: 'height:8px;border-radius:4px;margin:3px 0 8px;width:' + Math.max(3, cov[k] * 100) + '%;background:' + (cov[k] < 0.5 ? 'var(--coral)' : 'var(--signal)') }));
      });
      var thin = names.filter(function (_, k) { return cov[k] < 0.5; });
      out.appendChild(h('div', { class: 'note', text: thin.length ? T.thin + ' ' + thin.join(RTL ? '، ' : ', ') : T.balanced }));
    }
    function place(p) { if (pts.length >= 4) pts.shift(); pts.push(p); draw(); }
        svg.addEventListener('blur', function () { if (focused) { focused = false; draw(); } });
    svg.addEventListener('keydown', function (e) {
      var d = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[e.key];
      if (d || e.key === 'Enter' || e.key === ' ') focused = true;
      if (d) {
        e.preventDefault(); var n = [cur[0] + d[0], cur[1] + d[1]];
        if (!bary(n).some(function (v) { return v < 0; })) cur = n;
        draw();
      } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(cur.slice()); }
    });
    svg.addEventListener('click', function (e) {
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var p = pt.matrixTransform(svg.getScreenCTM().inverse()), bc = bary([p.x, p.y]);
      if (bc.some(function (v) { return v < -0.02; })) return;
      place([p.x, p.y]);
    });
    var clear = h('button', { type: 'button', class: 'chip', text: T.clear });
    clear.addEventListener('click', function () { pts = []; draw(); });
    el.appendChild(h('h3', { text: T.triTitle })); el.appendChild(svg); el.appendChild(h('div', { class: 'row' }, [clear])); el.appendChild(out); draw();
  }

  /* 9. AI card */
  function aiCard(el) {
    el.appendChild(h('h3', { text: T.aiTitle }));
    var g = h('div', { class: 'grid2' });
    [[T.can, T.canL], [T.cant, T.cantL]].forEach(function (c) {
      var col = h('div', { class: 'col' }, [h('h4', { text: c[0] })]);
      var ul = h('ul'); c[1].forEach(function (x) { ul.appendChild(h('li', { text: x })); }); col.appendChild(ul); g.appendChild(col);
    });
    el.appendChild(g);
  }

  var MAP = { 'depth-ladder': depthLadder, 'thermal-feet': thermalFeet, 'patience-curve': patienceCurve, 'pipeline': pipeline,
    'forecast-playground': forecast, 'sponsored-deal': deal, 'route-chooser': routeChooser, 'founder-triangle': founderTriangle, 'ai-card': aiCard };
  function init() {
    document.querySelectorAll('.widget[data-widget]').forEach(function (el) {
      var f = MAP[el.getAttribute('data-widget')];
      if (f) { try { el.innerHTML = ''; f(el); } catch (e) { console.error(e); } }
    });
  }
  init();
  var lastW = innerWidth, rt; addEventListener('resize', function () { if (Math.abs(innerWidth - lastW) < 40) return; lastW = innerWidth; clearTimeout(rt); rt = setTimeout(init, 200); });
  // redraw SVG colours when the theme changes
  new MutationObserver(init).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
