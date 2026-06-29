(() => {
  const request = async (path, options = {}) => {
    const url = window.toApiPath ? window.toApiPath(path) : `${window.CaritaConfig?.api?.baseUrl || ''}${path}`;
    const response = await (window.fetchWithDebug || fetch)(url, options);
    const text = await response.text();
    let body = {};
    try { body = text ? JSON.parse(text) : {}; } catch (_) { body = { raw: text }; }
    if (!response.ok) {
      const error = new Error(body?.message || body?.error || `HTTP ${response.status}`);
      Object.assign(error, { status: response.status, details: body?.details, hint: body?.hint, code: body?.code, body });
      throw error;
    }
    return body;
  };

  const getRegion = (path) => request(`${window.CaritaConfig?.api?.regionBaseUrl || 'https://www.emsifa.com/api-wilayah-indonesia/api'}${path}`, { skipJsonContentType: true });
  const updateProfile = (payload, accessToken) => request('/api/update-profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ data: payload })
  });

  window.CaritaServices = window.CaritaServices || {};
  window.CaritaServices.api = { request, getRegion, updateProfile };
})();
