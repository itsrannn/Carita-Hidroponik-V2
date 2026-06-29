(() => {
  const formatRupiah = (num) => (
    Number.isNaN(Number(num))
      ? 'Rp 0'
      : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(num))
  );

  const showToast = (message, isError = false) => {
    const text = String(message || '').trim();
    if (!text) return;
    let notification = document.getElementById('notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'notification';
      notification.className = 'notification';
      notification.setAttribute('role', 'status');
      notification.setAttribute('aria-live', 'polite');
      document.body.appendChild(notification);
    }
    notification.textContent = text;
    notification.style.backgroundColor = isError ? '#c62828' : 'var(--accent)';
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
  };

  const escapeHtml = (value = '') => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

  const sanitizeHtml = (html = '') => {
    const template = document.createElement('template');
    template.innerHTML = String(html || '');

    template.content.querySelectorAll('script, iframe, object, embed, form, input, button, link, meta').forEach((node) => node.remove());
    template.content.querySelectorAll('*').forEach((node) => {
      [...node.attributes].forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const value = String(attribute.value || '').trim();
        if (name.startsWith('on') || value.toLowerCase().startsWith('javascript:')) {
          node.removeAttribute(attribute.name);
        }
      });
    });

    return template.innerHTML;
  };

  const setLoadingState = (target, isLoading, loadingClass = 'is-loading') => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    element.classList.toggle(loadingClass, Boolean(isLoading));
    element.toggleAttribute('aria-busy', Boolean(isLoading));
  };

  const handleError = (scope, error, fallbackMessage = 'Terjadi kesalahan. Silakan coba lagi.') => {
    console.error(`[${scope || 'App'}]`, error);
    return error?.message || fallbackMessage;
  };

  const applyImageFallback = (imgElement) => {
    if (!imgElement || imgElement.tagName !== 'IMG') return;
    const fallback = window.toAppPath ? window.toAppPath(window.CaritaConfig?.assets?.fallbackImage || 'img/coming-soon.jpg') : 'img/coming-soon.jpg';
    if (imgElement.dataset.fallbackApplied === '1') return;
    imgElement.onerror = () => {
      if (imgElement.dataset.fallbackApplied === '1') return;
      imgElement.dataset.fallbackApplied = '1';
      imgElement.src = fallback;
    };
  };

  window.CaritaUtils = { formatRupiah, showToast, escapeHtml, sanitizeHtml, setLoadingState, handleError, applyImageFallback };
  window.formatRupiah = window.formatRupiah || formatRupiah;
  window.showSiteNotification = window.showSiteNotification || showToast;
  window.escapeHtml = window.escapeHtml || escapeHtml;
  window.sanitizeHtml = window.sanitizeHtml || sanitizeHtml;
  window.setLoadingState = window.setLoadingState || setLoadingState;
  window.handleAppError = window.handleAppError || handleError;
  window.applyImageFallback = window.applyImageFallback || applyImageFallback;
})();
