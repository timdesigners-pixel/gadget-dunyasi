/* Katalog filtreleme/sıralama — DOM'dan bağımsız tutulur ki birim testleri yazılabilsin */
window.GD = window.GD || {};

GD.filterProducts = function(opts){
  opts = opts || {};
  const cat = opts.cat || 'all';
  const badge = opts.badge || null;
  const query = (opts.query || '').trim().toLowerCase();
  const sortBy = opts.sortBy || 'relevance';

  let list = GD.PRODUCTS.slice();
  if(badge) list = list.filter(p => p.badge === badge);
  if(cat !== 'all') list = list.filter(p => p.cat === cat);
  if(query){
    list = list.filter(p =>
      p.name.toLowerCase().includes(query) ||
      GD.getCategoryLabel(p.cat).toLowerCase().includes(query) ||
      (p.desc || '').toLowerCase().includes(query)
    );
  }
  if(sortBy === 'price-asc') list.sort((a,b)=>a.price-b.price);
  else if(sortBy === 'price-desc') list.sort((a,b)=>b.price-a.price);
  else if(sortBy === 'rating-desc') list.sort((a,b)=>b.rating-a.rating);
  return list;
};
