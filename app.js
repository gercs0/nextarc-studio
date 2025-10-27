document.getElementById('joinDiscordLink').href = 'https://discord.gg/NCYbWRjrU';

// Smooth-scroll CTAs to the form
document.querySelectorAll('[data-post]').forEach(el => {
  el.addEventListener('click', (e) => {
    const target = document.querySelector('#request-form');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const first = target.querySelector('input, textarea, select, button');
      if (first) setTimeout(() => first.focus(), 200);
    }
  });
});

// Footer year
document.getElementById('y').textContent = new Date().getFullYear();

// Submit handler
const form = document.getElementById('requestForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending...';

    try {
      const fd = new FormData(form);
      const res = await fetch('/api/submit', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      form.reset();
      alert('✅ Request sent! Check #post-a-request on Discord.');
    } catch (err) {
      console.error(err);
      alert('❌ Could not send request. See console for details.');
    } finally {
      btn.disabled = false; btn.textContent = original;
    }
  });
}
