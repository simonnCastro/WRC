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

  // Expose a simple analytics hook so you can plug a real provider later.
  window.sendAnalytics = function(event){
    // event: { action: string, ... }
    // Default: console log. Replace this body to integrate GA/Plausible/etc.
    console.info('analytics:event', event);
  };

  function attachVideoLoader(){
    // Find buttons with data-video-id and load video into nearest iframe when clicked
    const btn = document.getElementById('load-video-btn');
    const iframe = document.getElementById('highlight-iframe');
    if(!btn || !iframe) return;
    btn.addEventListener('click', function(){
      const vid = iframe.getAttribute('data-video-id');
      if(!vid || vid === 'YOUTUBE_VIDEO_ID'){
        // no real id yet
        alert('No video ID configured yet. Replace the placeholder in the admin files.');
        return;
      }
      iframe.src = 'https://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1';
      window.sendAnalytics({ action: 'load_video', video: vid });
      // hide the button after load
      btn.style.display = 'none';
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function(){
    setupNextCTA();
    attachInternalLinkTracking();
    analyticsInit();
    attachVideoLoader();
  });
})();
