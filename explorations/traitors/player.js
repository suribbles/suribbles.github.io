(function () {
  var stage = document.getElementById('stage');
  var slides = [].slice.call(stage.children);
  var bar = document.getElementById('bar');
  var count = document.getElementById('count');
  var cur = -1, step = 0, hideTimer;

  // Builds: each element shows from its in-step until its out-step.
  var steps = slides.map(function (s) {
    var seen = {};
    [].forEach.call(s.querySelectorAll('[data-in],[data-out]'), function (el) {
      ['in', 'out'].forEach(function (k) { if (el.dataset[k]) seen[el.dataset[k]] = 1; });
    });
    return Object.keys(seen).map(Number).sort(function (a, b) { return a - b; });
  });

  function paintBuilds(i, n) {
    var order = n ? steps[i][n - 1] : 0;
    [].forEach.call(slides[i].querySelectorAll('[data-in],[data-out]'), function (el) {
      var inn = Number(el.dataset.in || 0), out = el.dataset.out ? Number(el.dataset.out) : Infinity;
      el.classList.toggle('off', !(order >= inn && order < out));
    });
  }

  function load(i) {
    if (!slides[i]) return;
    [].forEach.call(slides[i].querySelectorAll('img[data-src]'), function (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Live embeds are slow to paint, so the neighbours are readied in advance and far ones freed.
  function embeds(i) {
    slides.forEach(function (s, k) {
      var near = Math.abs(k - i) <= 1;
      [].forEach.call(s.querySelectorAll('iframe[data-doc]'), function (f) {
        if (near && !f.hasAttribute('srcdoc')) f.srcdoc = f.dataset.doc;
        else if (!near && f.hasAttribute('srcdoc')) { f.removeAttribute('srcdoc'); f.src = 'about:blank'; }
      });
    });
  }

  function enter(s) {
    [].forEach.call(s.querySelectorAll('video'), function (v) {
      if (!v.getAttribute('src')) v.src = v.dataset.src;
      v.muted = v.dataset.sound !== 'on';
      var p = v.play();
      if (p) p.catch(function () { v.muted = true; v.play(); });
    });
  }

  function leave(s) {
    [].forEach.call(s.querySelectorAll('video'), function (v) { v.pause(); });
  }

  function go(i, n) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i !== cur) {
      if (cur >= 0) { slides[cur].classList.remove('on'); leave(slides[cur]); }
      for (var k = i - 1; k <= i + 3; k++) load(k);
      embeds(i);
      slides[i].classList.add('on');
      enter(slides[i]);
      cur = i;
      history.replaceState(null, '', '#slide-' + (i + 1));
      count.textContent = (i + 1) + ' / ' + slides.length;
    }
    step = n;
    paintBuilds(i, n);
  }

  function next() {
    if (step < steps[cur].length) go(cur, step + 1);
    else if (cur < slides.length - 1) go(cur + 1, 0);
  }

  function prev() {
    if (step > 0) go(cur, step - 1);
    else if (cur > 0) go(cur - 1, steps[cur - 1].length);
  }

  // A letter opened full screen; any click or navigation key closes it.
  var lb = document.getElementById('lb');
  var lbImg = lb.querySelector('img');
  function openLetter(card) {
    lbImg.src = card.getAttribute('src');
    lbImg.alt = card.alt;
    lb.classList.add('show');
  }
  function closeLetter() { lb.classList.remove('show'); }
  function letterOpen() { return lb.classList.contains('show'); }

  // The promo plays on YouTube's own player, on top of the slide.
  var yt = document.getElementById('yt');
  function playVideo(id) {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    f.title = 'The Diwali Special promo';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    yt.insertBefore(f, yt.firstChild);
    yt.classList.add('show');
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      var r = document.documentElement.requestFullscreen();
      if (r) r.catch(function () {});
    }
  }
  function closeVideo() {
    var f = yt.querySelector('iframe');
    if (f) yt.removeChild(f);
    yt.classList.remove('show');
    window.focus();
  }
  function videoOpen() { return yt.classList.contains('show'); }

  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  }

  function fit() {
    var k = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = 'translate(' + (innerWidth - 1920 * k) / 2 + 'px,' + (innerHeight - 1080 * k) / 2 + 'px) scale(' + k + ')';
  }

  function showBar() {
    bar.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { bar.classList.remove('show'); }, 2200);
  }

  addEventListener('resize', fit);
  addEventListener('mousemove', showBar);
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'f' || k === 'F') { fullscreen(); return; }
    if (letterOpen() || videoOpen()) {
      if (k !== 'Tab' && k !== 'Shift') { e.preventDefault(); closeLetter(); closeVideo(); }
      return;
    }
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0, 0);
    else if (k === 'End') go(slides.length - 1, 0);
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('#yt, #bar')) return;
    if (letterOpen()) { closeLetter(); return; }
    var play = e.target.closest('[data-play]') || (e.target.tagName === 'P' && e.target.querySelector('a[data-play]'));
    if (play) { e.preventDefault(); playVideo(play.dataset.play); return; }
    var card = e.target.closest('[data-zoom]');
    if (card) { openLetter(card); return; }
    if (e.target.closest('a')) return;
    next();
  });
  document.getElementById('prev').onclick = prev;
  document.getElementById('next').onclick = next;
  document.getElementById('full').onclick = fullscreen;
  document.getElementById('yt-close').onclick = closeVideo;

  var touchX = null;
  addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', function (e) {
    if (touchX === null || letterOpen() || videoOpen()) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (dx < -50) next();
    else if (dx > 50) prev();
  });

  function fromHash() {
    var m = /^#slide-(\d+)$/.exec(location.hash);
    return m ? Number(m[1]) - 1 : 0;
  }
  addEventListener('hashchange', function () { if (fromHash() !== cur) go(fromHash(), 0); });

  slides.forEach(function (s, i) { paintBuilds(i, 0); });
  fit();
  go(fromHash(), 0);
  showBar();
})();
