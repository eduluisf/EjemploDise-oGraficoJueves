const products = [
      {name:'Blusa Serena',type:'ropa',label:'Blusa',price:89000,image:'photo-1551163943-3f6a855d1153'},
      {name:'Vestido Aurora',type:'ropa',label:'Nuevo',price:149000,image:'photo-1539109136881-3be0616acf4b'},
      {name:'Bolso Amalia',type:'accesorios',label:'Favorito',price:119000,image:'photo-1584917865442-de89df76afd3'},
      {name:'Conjunto Brisa',type:'ropa',label:'Conjunto',price:179000,image:'photo-1483985988355-763728e1935b'},
      {name:'Aretes Lúa',type:'accesorios',label:'Hecho a mano',price:59000,image:'photo-1535632066927-ab7c9ab60908'},
      {name:'Pantalón Olivia',type:'ropa',label:'Esencial',price:129000,image:'photo-1509631179647-0177331693ae'},
      {name:'Cartera Sol',type:'accesorios',label:'Nuevo',price:99000,image:'photo-1590871731576-4f5c3c7e9f32'},
      {name:'Camisa Celeste',type:'ropa',label:'Favorito',price:105000,image:'photo-1598554747436-c9293d6a588f'}
    ];
    const productsEl=document.getElementById('products');
    const money=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
    function render(filter='todos'){
      const shown=products.filter(p=>filter==='todos'||p.type===filter);
      productsEl.innerHTML=shown.map(p=>`<article class="product"><div class="product-image"><img src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=700&q=80" alt="${p.name}" loading="lazy"><span class="badge">${p.label}</span><button class="add-button" data-name="${p.name}">Añadir a la bolsa</button></div><div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-type">${p.type==='ropa'?'Ropa':'Accesorios'}</div></div><div class="product-price">${money(p.price)}</div></div></article>`).join('')||'<p class="empty">Pronto tendremos más piezas para ti.</p>';
    }
    render();
    let cart=0;let toastTimer;
    function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
    document.querySelector('.filters').addEventListener('click',e=>{const btn=e.target.closest('.filter');if(!btn)return;document.querySelectorAll('.filter').forEach(item=>item.classList.toggle('active',item===btn));render(btn.dataset.filter)});
    productsEl.addEventListener('click',e=>{const btn=e.target.closest('.add-button');if(!btn)return;cart++;document.getElementById('cartCount').textContent=cart;showToast(`${btn.dataset.name} se añadió a tu bolsa`)});
    document.getElementById('cartButton').addEventListener('click',()=>showToast(cart?`Tienes ${cart} ${cart===1?'producto':'productos'} en tu bolsa`:'Tu bolsa está esperando algo bonito'));
    document.getElementById('subscribeForm').addEventListener('submit',e=>{e.preventDefault();showToast('¡Gracias por suscribirte a Nayela!');e.target.reset()});
    document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
    document.getElementById('navLinks').addEventListener('click',e=>{if(e.target.closest('a'))document.getElementById('navLinks').classList.remove('open')});
    document.getElementById('year').textContent=new Date().getFullYear();

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDots = document.querySelector('.hero-dots');
if (heroSlides.length && heroDots) {
  let currentHeroSlide = 0;
  let heroTimer;
  heroDots.innerHTML = heroSlides.map((_, index) => `<button class="hero-dot${index === 0 ? ' active' : ''}" type="button" aria-label="Ir a la diapositiva ${index + 1}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('');
  const dots = [...heroDots.querySelectorAll('.hero-dot')];
  function showHeroSlide(index) {
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => {
      const active = i === currentHeroSlide;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].classList.toggle('active', active);
      dots[i].setAttribute('aria-current', String(active));
    });
  }
  function restartHeroTimer() {
    clearInterval(heroTimer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroTimer = setInterval(() => showHeroSlide(currentHeroSlide + 1), 6000);
    }
  }
  document.querySelector('.hero-next').addEventListener('click', () => { showHeroSlide(currentHeroSlide + 1); restartHeroTimer(); });
  document.querySelector('.hero-prev').addEventListener('click', () => { showHeroSlide(currentHeroSlide - 1); restartHeroTimer(); });
  heroDots.addEventListener('click', event => {
    const dot = event.target.closest('.hero-dot');
    if (!dot) return;
    showHeroSlide(dots.indexOf(dot));
    restartHeroTimer();
  });
  restartHeroTimer();
}

// Efecto reveal para los elementos que aparecen al desplazarse.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  function observeRevealElements(root = document) {
    root.querySelectorAll('.section-heading, .product, .story-image, .story-copy, .newsletter > *').forEach(element => {
      if (!element.classList.contains('reveal-on-scroll')) {
        element.classList.add('reveal-on-scroll');
        revealObserver.observe(element);
      }
    });
  }

  observeRevealElements();
  const productsRevealWatcher = new MutationObserver(() => observeRevealElements(productsEl));
  productsRevealWatcher.observe(productsEl, { childList: true });
} else {
  document.querySelectorAll('.section-heading, .product, .story-image, .story-copy, .newsletter > *').forEach(element => element.classList.add('is-visible'));
}
