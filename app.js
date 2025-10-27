// Smooth scroll fallback (ha a böngésző nem ugrik anchorra)
document.getElementById('post-btn')?.addEventListener('click', function (e) {
  const target = document.querySelector('#request-form');
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // fókusz az első mezőre
    const first = target.querySelector('input, textarea, select, button');
    if (first) setTimeout(() => first.focus(), 300);
  }
});

// ----- Beküldés logika -----
const form = document.querySelector('form#requestForm') || document.querySelector('#request-form form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const fd = new FormData(form);

      // képek (max 4) – ha a nevük "images[]" vagy "images"
      const fileInputs = form.querySelectorAll('input[type="file"]');
      // biztosítsuk, hogy menjenek a formdata-ba
      fileInputs.forEach(inp => {
        if (inp.files && inp.files.length) {
          Array.from(inp.files).slice(0, 4).forEach(f => fd.append(inp.name || 'images[]', f));
        }
      });

      const res = await fetch('/api/submit', {
        method: 'POST',
        body: fd
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error (${res.status}): ${text}`);
      }

      // siker – ürítsük a formot és jelezzünk
      form.reset();
      alert('✅ Request sent! Check #post-a-request on Discord.');

    } catch (err) {
      console.error(err);
      alert('❌ Could not send request. See console for details.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Submit';
      }
    }
  });
}
