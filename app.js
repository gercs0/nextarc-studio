const join = document.getElementById('joinDiscordLink');
if (join) {
  join.href = 'https://discord.gg/NCYbWRjrU';
}

document.querySelectorAll('[data-post]').forEach((el) => {
  el.addEventListener('click', (event) => {
    const form = document.querySelector('#request-form');
    if (!form) return;

    event.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const firstField = form.querySelector('input, textarea, select, button');
    if (firstField) {
      setTimeout(() => firstField.focus(), 200);
    }
  });
});

const year = document.getElementById('y');
if (year) {
  year.textContent = new Date().getFullYear();
}

const form = document.getElementById('requestForm');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('[type="submit"]');
    const defaultLabel = submitButton?.textContent || 'Submit';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(form);
      const configuredEndpoint = form.dataset.endpoint || '';
      const endpoint = configuredEndpoint || '/api/submit';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'Server error');
      }

      form.reset();
      alert('✅ Request sent! Check #post-a-request on Discord.');
    } catch (error) {
      console.error(error);
      alert('❌ Could not send request. ' + error.message);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }
    }
  });
}
