/*
 * Sipariş geçmişi, hesap ve yönetici sistemi.
 * NOT: Bu, sunucusu olmayan bir demodur. Kullanıcı bilgileri, siparişler,
 * 2 adımlı doğrulama kodu ve sosyal medya girişleri yalnızca tarayıcının
 * localStorage'ında tutulur/simüle edilir; gerçek bir kimlik doğrulama,
 * OAuth veya ödeme altyapısı değildir.
 */
window.GD = window.GD || {};

(function(){
  const ORDERS_KEY = 'gd_orders';
  const USERS_KEY = 'gd_users';
  const SESSION_KEY = 'gd_session';
  const ADMIN_SESSION_KEY = 'gd_admin_session';

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
  function updateOrder(id, patch){
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if(!order) return null;
    Object.assign(order, patch);
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

  /* Kimlik bilgilerini kontrol eder ama oturum AÇMAZ - 2FA adımı geçilene kadar bekletmek için */
  function createUserAccount({ name, email, password }){
    email = (email || '').trim().toLowerCase();
    const users = getUsers();
    if(users.some(u => u.email === email)){
      return { ok:false, error:'Bu e-posta adresiyle zaten bir hesap var.' };
    }
    users.push({ name, email, password, provider:null, status:'active' });
    saveUsers(users);
    return { ok:true };
  }
  function findUser({ email, password }){
    email = (email || '').trim().toLowerCase();
    const user = getUsers().find(u => u.email === email && u.password === password) || null;
    if(user && user.status === 'blocked') return null;
    return user;
  }

  /* Sosyal medya ile bağlanma (demo): gerçek bir OAuth akışı yoktur, sağlayıcı
     zaten kimliği doğrulamış kabul edilip doğrudan oturum açılır. */
  function socialLogin(provider, { name, email }){
    email = (email || '').trim().toLowerCase();
    const users = getUsers();
    let user = users.find(u => u.email === email);
    if(!user){
      user = { name, email, password:null, provider, status:'active' };
      users.push(user);
      saveUsers(users);
    }
    setSession({ name:user.name, email:user.email, provider });
    return { ok:true };
  }

  /* ---------- Yönetici için kullanıcı yönetimi (CRUD) ---------- */
  function adminCreateUser({ name, email, password }){
    email = (email || '').trim().toLowerCase();
    const users = getUsers();
    if(users.some(u => u.email === email)) return { ok:false, error:'Bu e-posta adresiyle zaten bir hesap var.' };
    users.push({ name, email, password: password || null, provider: password ? null : 'Manuel', status:'active' });
    saveUsers(users);
    return { ok:true };
  }
  function updateUser(email, patch){
    const users = getUsers();
    const user = users.find(u => u.email === email);
    if(!user) return null;
    Object.assign(user, patch);
    saveUsers(users);
    return user;
  }
  function deleteUser(email){
    saveUsers(getUsers().filter(u => u.email !== email));
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

  /* ---------- 2 Adımlı Doğrulama (demo) ---------- */
  // Gerçek bir SMS/e-posta servisi yok; kod ekranda gösterilir.
  const DEMO_2FA_CODE = '123456';

  /* ---------- Yönetici Paneli girişi (demo) ---------- */
  const ADMIN_ACCOUNT = { email:'admin@gadgetdunyasi.com', password:'admin123' };

  function checkAdminCredentials({ email, password }){
    return (email || '').trim().toLowerCase() === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password;
  }
  function setAdminSession(){
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email: ADMIN_ACCOUNT.email, name:'Yönetici' }));
  }
  function getAdminSession(){
    try { return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY)) || null; }
    catch(e){ return null; }
  }
  function logoutAdmin(){
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }

  Object.assign(GD, {
    getOrders, getOrder, createOrder, updateOrder,
    getUsers, createUserAccount, findUser, socialLogin,
    adminCreateUser, updateUser, deleteUser,
    setSession, getSession, logout,
    DEMO_2FA_CODE,
    ADMIN_ACCOUNT, checkAdminCredentials, setAdminSession, getAdminSession, logoutAdmin
  });
})();
