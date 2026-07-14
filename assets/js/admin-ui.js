/* Yönetici paneli için ortak kabuk: kimlik doğrulama koruması + kenar menü. */
window.GD = window.GD || {};

(function(){
  const NAV_ITEMS = [
    { key:'dashboard',   href:'admin.html',            label:'Genel Bakış',       icon:'grid' },
    { key:'users',       href:'admin-users.html',      label:'Kullanıcılar',      icon:'user' },
    { key:'categories',  href:'admin-categories.html', label:'Kategoriler',       icon:'folder' },
    { key:'products',    href:'admin-products.html',   label:'Ürünler',           icon:'package' },
    { key:'tags',        href:'admin-tags.html',       label:'Etiketler',         icon:'tag' },
    { key:'orders',      href:'admin-orders.html',     label:'Siparişler',        icon:'inbox' },
    { key:'shipping',    href:'admin-shipping.html',   label:'Kargo Entegrasyonu',icon:'truck' },
    { key:'payments',    href:'admin-payments.html',   label:'Ödeme Yöntemleri',  icon:'credit-card' },
    { key:'accounting',  href:'admin-accounting.html', label:'Muhasebe',          icon:'bar-chart' },
    { key:'settings',    href:'admin-settings.html',   label:'Site Ayarları',     icon:'settings' }
  ];

  function requireAdmin(){
    const session = GD.getAdminSession();
    if(!session){
      window.location.replace('admin-login.html');
      return null;
    }
    return session;
  }

  function renderAdminSidebar(activeKey){
    const sidebar = document.getElementById('adminSidebar');
    if(!sidebar) return;
    sidebar.innerHTML = `<nav>${NAV_ITEMS.map(item => `
      <a href="${item.href}" class="${item.key === activeKey ? 'active' : ''}">
        <span data-lucide="${item.icon}" style="width:16px;height:16px;"></span> ${item.label}
      </a>`).join('')}</nav>`;
    GD.createIconsIn(sidebar);
  }

  function renderAdminHeader(session){
    const nameLabel = document.getElementById('adminNameLabel');
    if(nameLabel) nameLabel.textContent = session.name + ' · ' + session.email;
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if(logoutBtn){
      logoutBtn.addEventListener('click', ()=>{
        GD.logoutAdmin();
        window.location.href = 'admin-login.html';
      });
    }
  }

  Object.assign(GD, { requireAdmin, renderAdminSidebar, renderAdminHeader });
})();
