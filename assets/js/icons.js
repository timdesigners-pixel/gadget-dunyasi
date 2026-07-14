/* Yerel ikon sistemi (harici CDN'e bağımlı değil) */
window.GD = window.GD || {};

GD.ICONS = {
  'map-pin': '<path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  'arrow-right': '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/>',
  'arrow-left': '<line x1="20" y1="12" x2="4" y2="12"/><polyline points="10 18 4 12 10 6"/>',
  'chevron-right': '<polyline points="9 6 15 12 9 18"/>',
  'instagram': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  'sliders-horizontal': '<line x1="4" y1="6" x2="20" y2="6"/><circle cx="9" cy="6" r="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16" cy="12" r="2"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="10" cy="18" r="2"/>',
  'play': '<polygon points="6 4 20 12 6 20 6 4"/>',
  'facebook': '<path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  'twitter': '<path d="M22 4.6c-.8.4-1.6.7-2.5.8.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.8 1.1a4.4 4.4 0 0 0-7.5 4c-3.6-.2-6.9-1.9-9-4.6-.4.6-.6 1.4-.6 2.1 0 1.5.7 2.8 1.9 3.5-.7 0-1.4-.2-1.9-.5v.1c0 2 1.5 3.7 3.4 4.1-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 2.9A8.8 8.8 0 0 1 2 19.5 12.4 12.4 0 0 0 8.7 21.5c8 0 12.4-6.6 12.4-12.4v-.6c.9-.6 1.6-1.4 2.1-2.3z"/>',
  'youtube': '<rect x="2.5" y="6" width="19" height="12" rx="3"/><polygon points="10 9 15 12 10 15 10 9"/>',
  'apple': '<path d="M16.5 3c.2 1.4-.4 2.7-1.2 3.6-.9 1-2.2 1.7-3.4 1.6-.2-1.3.4-2.7 1.2-3.6C13.9 3.6 15.2 3 16.5 3z"/><path d="M20 17c-.5 1.2-1.1 2.3-2 3.3-1 1.1-2 2.2-3.5 2.2-1.4 0-1.9-.9-3.6-.9s-2.2.9-3.6.9c-1.4 0-2.5-1.2-3.5-2.3C1.9 18 1 15 2.2 12.4c.8-1.8 2.3-3 4-3 1.3 0 2.2.9 3.3.9 1 0 1.8-.9 3.5-.9 1.3 0 2.7.7 3.7 1.9-3.3 1.8-2.8 6.3.3 7.5-.4.8-.6 1.1-1 1.2z"/>',
  'shopping-cart': '<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"/>',
  'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'check-circle': '<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'menu': '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  'heart': '<path d="M12 21s-7.5-4.6-10-9.3C.5 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.2.4.5 1 1.4 1.5 1.4h.6c.5 0 1.1-.9 1.5-1.4C14.1 6.1 15.5 5 17.5 5 21 5 22.5 8.6 21 11.7 18.5 16.4 12 21 12 21z"/>',
  'smartphone': '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/>',
  'headphones': '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="1.5"/><rect x="17" y="14" width="5" height="7" rx="1.5"/>',
  'laptop': '<rect x="4" y="4" width="16" height="10" rx="1"/><path d="M2 20h20"/>',
  'watch': '<circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1.5"/><path d="M9 3h6M9 21h6"/>',
  'camera': '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  'gamepad-2': '<rect x="2" y="7" width="20" height="10" rx="4"/><path d="M6 10v4M4 12h4"/><circle cx="15" cy="11" r="1"/><circle cx="18" cy="13" r="1"/>',
  'tablet': '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  'battery-charging': '<path d="M15 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9"/><path d="M22 13.5V10a2 2 0 0 0-2-2h-1"/><polyline points="11 6 8 12 13 12 10 18"/>',
  'tv': '<rect x="2" y="7" width="20" height="13" rx="2"/><polyline points="8 3 12 7 16 3"/>',
  'gift': '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/><path d="M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5z"/><path d="M12 8s1.5-5 4-5a2.5 2.5 0 0 1 0 5z"/>',
  'baby': '<path d="M9 12h.01M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1-8 5.7 9 9 0 0 1-8-5.7"/><circle cx="12" cy="12" r="9"/>',
  'thermometer': '<path d="M14 4.5a2.5 2.5 0 0 0-5 0v9a4 4 0 1 0 5 0z"/>',
  'keyboard': '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
  'monitor': '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  'mouse': '<rect x="6" y="3" width="12" height="18" rx="6"/><line x1="12" y1="7" x2="12" y2="11"/>',
  'speaker': '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6" r="1"/>',
  'mic': '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/>',
  'package': '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/>',
  'minus': '<line x1="5" y1="12" x2="19" y2="12"/>',
  'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'trash-2': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  'truck': '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  'banknote': '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><line x1="6" y1="12" x2="6.01" y2="12"/><line x1="18" y1="12" x2="18.01" y2="12"/>',
  'star': '<polygon points="12 2 15.09 8.63 22 9.24 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.24 8.91 8.63 12 2"/>',
  'search': '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'package-check': '<path d="M16 16l2 2 4-4"/><path d="M21 10V7l-9-4-9 4v10l9 4 4-1.8"/><path d="M3.3 7 12 11l8.7-4"/><path d="M12 22V11"/>',
  'inbox': '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  'grid': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  'folder': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>',
  'tag': '<path d="M12.59 2.59a2 2 0 0 0-1.42-.59H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l9 9a2 2 0 0 0 2.82 0l7.17-7.17a2 2 0 0 0 0-2.82z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  'bar-chart': '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'toggle-right': '<rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="16" cy="12" r="3"/>',
  'toggle-left': '<rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="8" cy="12" r="3"/>'
};

GD.createIconsIn = function(root){
  (root || document).querySelectorAll('[data-lucide]').forEach(el=>{
    const name = el.getAttribute('data-lucide');
    const path = GD.ICONS[name];
    if(!path) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.innerHTML = path;
    if(el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
    if(el.getAttribute('class')) svg.setAttribute('class', el.getAttribute('class'));
    el.replaceWith(svg);
  });
};

// Kodun geri kalanı lucide.createIcons() çağırıyor - küçük bir uyumluluk katmanı
window.lucide = { createIcons: () => GD.createIconsIn(document) };

/*
 * Gerçek fotoğraf yerine kullanılan gradyan+ikon "placeholder" görselleri
 * gerçek <img> etiketlerine (SVG data URI) dönüştürür, böylece loading="lazy"
 * tarayıcıda gerçek bir etkiye sahip olur ve tek bir img'den kolayca bir
 * lightbox/galeri üretilebilir.
 */
GD.parseGradient = function(gradStr){
  const m = /linear-gradient\(([\d.]+)deg,\s*(#[0-9a-fA-F]{3,8})\s*,\s*(#[0-9a-fA-F]{3,8})\)/.exec(gradStr || '');
  if(!m) return { angle: 150, c1: '#22345c', c2: '#0e1526' };
  return { angle: parseFloat(m[1]), c1: m[2], c2: m[3] };
};

let _gdSvgUid = 0;
GD.mediaSvgDataUri = function(icon, gradStr, opts){
  opts = opts || {};
  const size = opts.size || 200;
  const iconRatio = opts.iconRatio != null ? opts.iconRatio : 0.42;
  const { angle, c1, c2 } = GD.parseGradient(gradStr);
  const gid = 'g' + (_gdSvgUid++);
  const iconSize = size * iconRatio;
  const off = (size - iconSize) / 2;
  const iconPath = icon ? (GD.ICONS[icon] || '') : '';
  const iconSvg = iconPath
    ? `<svg x="${off}" y="${off}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} 0.5 0.5)">` +
    `<stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>` +
    `<rect width="${size}" height="${size}" fill="url(#${gid})"/>${iconSvg}</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

GD.mediaImgTag = function(icon, gradStr, alt, opts){
  opts = opts || {};
  const loading = opts.loading || 'lazy';
  const cls = opts.class ? ` class="${opts.class}"` : '';
  const style = opts.style ? ` style="${opts.style}"` : '';
  const uri = GD.mediaSvgDataUri(icon, gradStr, opts);
  return `<img src="${uri}" alt="${GD.escapeHtml(alt)}" loading="${loading}" decoding="async"${cls}${style}>`;
};
