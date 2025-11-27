// Basic site helpers: next-article CTA, simple analytics logger, and link tracking
(function(){
  const map = {
    'index.html': 'cars.html',
    '': 'cars.html',
    '/': 'cars.html',
    'cars.html': 'stages.html',
    'stages.html': 'cars.html'
  };

  function pickNext(){
    const path = location.pathname.split('/').pop();
    const key = path || 'index.html';
    return map[key] || 'index.html';
  }

  function setupNextCTA(){
    const nextLink = document.getElementById('next-link');
    if(!nextLink) return;
    const next = pickNext();
    // Friendly label from url
    const label = (next === 'cars.html') ? 'Explore Cars →' : (next === 'stages.html') ? 'Top Rally Stages →' : 'Next article →';
    nextLink.href = next;
    nextLink.textContent = 'Next article: ' + label;

    // Track clicks (console for now)
    nextLink.addEventListener('click', function(){
      console.info('analytics:event', { action: 'click_next', to: next });
    });
  }

  function attachInternalLinkTracking(){
    document.addEventListener('click', function(e){
      const a = e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href');
      if(!href) return;
      if(href.startsWith('#') || href.startsWith('http')) return; // ignore anchors/external
      console.info('analytics:event', { action: 'internal_link_click', href: href });
    });
  }

  // Basic analytics placeholder (no external id). Replace with real analytics snippet as needed.
  function analyticsInit(){
    console.info('analytics:initialized', { site: 'WRC Exhibit (placeholder)' });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function(){
    setupNextCTA();
    attachInternalLinkTracking();
    analyticsInit();
  });
})();
