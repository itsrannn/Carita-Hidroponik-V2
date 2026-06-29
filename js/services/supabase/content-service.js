(() => {
  const ensureClient = () => {
    if (!window.supabase) throw new Error('Supabase client is not available.');
    return window.supabase;
  };
  const normalizeRows = (data, preferredKey) => Array.isArray(data) ? data : (data?.[preferredKey] || data?.data || data?.items || []);

  const listProducts = async (options = {}) => {
    let query = ensureClient().from('products').select(options.select || '*');
    if (options.orderBy !== false) query = query.order(options.orderBy || 'id', { ascending: options.ascending ?? true });
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error) throw error;
    return normalizeRows(data, 'products');
  };

  const listNews = async (options = {}) => {
    let query = ensureClient().from('news').select(options.select || '*');
    if (options.orderBy !== false) query = query.order(options.orderBy || 'created_at', { ascending: options.ascending ?? false });
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error) throw error;
    return normalizeRows(data, 'news');
  };

  const listOrders = async (options = {}) => {
    let query = ensureClient().from('orders').select(options.select || '*');
    if (options.userId) query = query.eq('user_id', options.userId);
    if (options.orderBy !== false) query = query.order(options.orderBy || 'created_at', { ascending: options.ascending ?? false });
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error) throw error;
    return normalizeRows(data, 'orders');
  };

  const getProfile = async (userId) => {
    const { data, error } = await ensureClient().from('profiles').select('*').eq('id', userId).maybeSingle();
    if (error) throw error;
    return data;
  };

  const updateProfile = async (userId, payload) => {
    const { data, error } = await ensureClient().from('profiles').update(payload).eq('id', userId).select('*').single();
    if (error) throw error;
    return data;
  };

  const listShippingZones = async (options = {}) => {
    let query = ensureClient().from('shipping_zones').select(options.select || '*');
    if (options.orderBy) query = query.order(options.orderBy, { ascending: options.ascending ?? true });
    if (options.limit) query = query.limit(options.limit);
    const { data, error } = await query;
    if (error) throw error;
    return normalizeRows(data, 'shipping');
  };

  window.CaritaServices = window.CaritaServices || {};
  window.CaritaServices.supabase = { listProducts, listNews, listOrders, getProfile, updateProfile, listShippingZones };
})();
