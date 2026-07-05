/*
 * Sipariş geçmişi ve hesap sistemi.
 * NOT: Bu, sunucusu olmayan bir demodur. Kullanıcı bilgileri ve siparişler
 * yalnızca tarayıcının localStorage'ında tutulur; gerçek bir kimlik
 * doğrulama/ödeme altyapısı değildir.
 */
window.GD = window.GD || {};

(function(){
  const ORDERS_KEY = 'gd_orders';
  const USERS_KEY = 'gd_users';
  const SESSION_KEY = 'gd_session';

  function getOrders(){
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch(e){ return []; }
  }
  function getOrder(id){
    return getOrders().find(o => o.id === id) || null;
  }
  function createOrder(details){
    const orders = getOrders();
    const order = Object.assign({
      id: 'GD-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString()
    }, details);
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return order;
  }

  function getUsers(){
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveUsers(users){
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function registerUser({ name, email, password }){
    email = (email || '').trim().toLowerCase();
    const users = getUsers();
    if(users.some(u => u.email === email)){
      return { ok:false, error:'Bu e-posta adresiyle zaten bir hesap var.' };
    }
    users.push({ name, email, password });
    saveUsers(users);
    setSession({ name, email });
    return { ok:true };
  }
  function loginUser({ email, password }){
    email = (email || '').trim().toLowerCase();
    const user = getUsers().find(u => u.email === email && u.password === password);
    if(!user) return { ok:false, error:'E-posta veya şifre hatalı.' };
    setSession({ name:user.name, email:user.email });
    return { ok:true };
  }
  function setSession(session){
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  function getSession(){
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch(e){ return null; }
  }
  function logout(){
    localStorage.removeItem(SESSION_KEY);
  }

  Object.assign(GD, {
    getOrders, getOrder, createOrder,
    registerUser, loginUser, getSession, logout
  });
})();
