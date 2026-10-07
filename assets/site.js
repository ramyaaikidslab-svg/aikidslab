/* Shared behaviour: back-to-top, FAQ accordion, scroll reveals and the
   header state. Loaded with `defer` so it runs after the markup parses. */
function scrollToTop(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'});
}
/* Scroll reveals, plus a header that tightens once the page moves.
   A rAF-throttled sweep rather than an IntersectionObserver: an observer
   can miss elements that are jumped past by an anchor link or a fast
   flick, and a missed element would stay invisible for good. The sweep
   reveals anything at or above the fold, so nothing can be skipped.
   Both are guarded on the has-js class, which is only set when the
   viewer has not asked for reduced motion. */
(function(){
  var root = document.documentElement;
  if(!root.classList.contains('has-js')) return;
  try{
    var pending = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    var queued = false;

    function sweep(){
      queued = false;
      var limit = window.innerHeight * 0.94;
      for(var i = pending.length - 1; i >= 0; i--){
        if(pending[i].getBoundingClientRect().top < limit){
          pending[i].classList.add('is-in');
          pending.splice(i, 1);
        }
      }
      if(!pending.length){
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      }
    }
    function request(){
      if(!queued){ queued = true; window.requestAnimationFrame(sweep); }
    }

    /* Two frames so the hidden state paints first and the entrance
       actually animates instead of being coalesced away. */
    window.requestAnimationFrame(function(){ window.requestAnimationFrame(sweep); });
    window.addEventListener('scroll', request, {passive:true});
    window.addEventListener('resize', request, {passive:true});

    var header = document.querySelector('header');
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }catch(err){
    /* Never leave content stuck at opacity 0 because of a scripting fault. */
    root.classList.remove('has-js');
  }
})();

function toggleFaq(el){
  const item = el.parentElement;
  document.querySelectorAll('.faq-item').forEach(i => { if(i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
}

/* Mobile menu. Below 1040px the header's text links are hidden by CSS, so
   this builds a toggle and a drop-down panel from those same links. The
   free gamified lesson goes first; the WhatsApp call to action goes last. */
(function(){
  var header = document.querySelector('header');
  var links = header && header.querySelector('.navlinks');
  if(!links) return;

  var panel = document.createElement('div');
  panel.className = 'mobile-menu';
  panel.id = 'mobile-menu';
  panel.hidden = true;
  var inner = document.createElement('div');
  inner.className = 'wrap';
  var items = Array.prototype.slice.call(links.querySelectorAll('a:not(.nav-cta)'));
  items.sort(function(a, b){ return b.classList.contains('nav-play') - a.classList.contains('nav-play'); });
  items.forEach(function(a){ inner.appendChild(a.cloneNode(true)); });
  var cta = links.querySelector('.nav-cta');
  if(cta){
    var c = cta.cloneNode(false);
    c.className = 'menu-cta';
    c.textContent = 'Talk to us on WhatsApp';
    inner.appendChild(c);
  }
  panel.appendChild(inner);
  header.appendChild(panel);

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-controls', 'mobile-menu');
  btn.innerHTML = '<span></span><span></span><span></span>';
  links.appendChild(btn);

  function set(open){
    panel.hidden = !open;
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  set(false);
  btn.addEventListener('click', function(){ set(panel.hidden); });
  panel.addEventListener('click', function(e){ if(e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !panel.hidden){ set(false); btn.focus(); }
  });
  window.addEventListener('resize', function(){ if(window.innerWidth > 1040 && !panel.hidden) set(false); }, {passive:true});
})();
