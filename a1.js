(() => {
'use strict';
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=qs('.menu-toggle'), nav=qs('#main-nav');
function closeMenu(){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open')}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu()});
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const box=qs('#lightbox');let priorFocus=null;
function openPhoto(src,alt,caption){priorFocus=document.activeElement;qs('img',box).src=src;qs('img',box).alt=alt;qs('p',box).textContent=caption;box.showModal()}
qs('.lightbox-close',box)?.addEventListener('click',()=>box.close());
box?.addEventListener('click',e=>{if(e.target===box)box.close()});
box?.addEventListener('close',()=>priorFocus?.focus());
qsa('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>openPhoto(b.dataset.lightbox,qs('img',b)?.alt||'',b.dataset.caption||'')));
const gallery=qs('.gallery');
if(gallery){
 const slides=qsa('[data-slide]',gallery), numbers=qs('#slideNumber'), captions=['Maqueta residencial · Fotografía de archivo','Santuario de Caacupé · Fotografía de archivo'];
 const sources=['https://www.abc.com.py/edicion-impresa/suplementos/empresas-y-negocios/maquetas-1424849.html','https://www.abc.com.py/edicion-impresa/notas/maqueta-del-santuario-para-el-santo-padre-1386430.html'];
 let current=0,start=null;
 function showSlide(index){current=(index+slides.length)%slides.length;slides.forEach((s,i)=>{s.hidden=i!==current;s.classList.toggle('is-active',i===current)});numbers.textContent=String(current+1).padStart(2,'0');qs('.gallery-track i').style.transform=`translateX(${current*100}%)`;qs('#slideCaption').textContent=captions[current];qs('#slideSource').href=sources[current]}
 qs('[data-gallery-prev]').addEventListener('click',()=>showSlide(current-1));qs('[data-gallery-next]').addEventListener('click',()=>showSlide(current+1));
 gallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showSlide(current+(e.key==='ArrowRight'?1:-1))}});
 const stage=qs('.gallery-stage');stage.style.touchAction='pan-y';
 stage.addEventListener('pointerdown',e=>{if(!e.target.closest('button')&&e.isPrimary){start={x:e.clientX,y:e.clientY,id:e.pointerId};stage.setPointerCapture(e.pointerId)}});
 stage.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const x=e.clientX-start.x,y=e.clientY-start.y;start=null;if(Math.abs(x)>45&&Math.abs(x)>Math.abs(y)*1.4)showSlide(current+(x<0?1:-1))});
 stage.addEventListener('pointercancel',()=>start=null);stage.addEventListener('dragstart',e=>e.preventDefault());
 qs('.gallery-expand').addEventListener('click',()=>{const img=qs('img',slides[current]);openPhoto(img.getAttribute('src'),img.alt,captions[current]+' · ABC Color, 2015')});
}
const search=qs('#projectSearch');
if(search){
 const rows=qsa('.project-row'),buttons=qsa('[data-filter]'),count=qs('#resultCount');let filter='todos';
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const initial=new URLSearchParams(location.search).get('categoria');if(buttons.some(b=>b.dataset.filter===initial))filter=initial;
 function apply(){let n=0;rows.forEach(row=>{const visible=(filter==='todos'||row.dataset.category===filter)&&normalize(row.dataset.projectName).includes(normalize(search.value));row.hidden=!visible;if(visible)n++});buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));count.textContent=`${n} ${n===1?'proyecto':'proyectos'}`;qs('.empty-state').hidden=n!==0}
 buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;apply();const url=new URL(location.href);if(filter==='todos')url.searchParams.delete('categoria');else url.searchParams.set('categoria',filter);history.replaceState(null,'',url)}));search.addEventListener('input',apply);qs('#resetFilters').addEventListener('click',()=>{filter='todos';search.value='';apply();const url=new URL(location.href);url.searchParams.delete('categoria');history.replaceState(null,'',url);search.focus()});apply();
}
const form=qs('#briefForm');
if(form){
 const reference=new URLSearchParams(location.search).get('referencia');if(reference)qs('#briefReference').value=reference.slice(0,120);
 const mapping={'Sudameris':'Edificios','More Mariscal':'Edificios','Riviere':'Edificios','Pedras':'Edificios','More Plaza':'Edificios','Narciso':'Edificios','Sunset Village':'Loteamientos','Los Pingos':'Loteamientos','Portal Santa Rita':'Loteamientos','Benedicta':'Loteamientos','Turín':'Viviendas','Naturalis':'Viviendas','Palacio Alegre':'Especiales','UNVES':'Especiales','Pioneros del Chaco':'Especiales','Palacio López':'Hápticas','Panteón':'Hápticas'};
 if(mapping[reference])form.elements.categoria.value=mapping[reference];
 form.addEventListener('change',()=>{const n=qsa('[name=documentos]:checked',form).length;qs('#documentProgress').textContent=`${n} de 3 materiales disponibles`});
 form.addEventListener('submit',e=>{e.preventDefault();const values=new FormData(form),docs=values.getAll('documentos');const name=String(values.get('nombre')||'').trim();if(!name){form.elements.nombre.setCustomValidity('Escribí tu nombre.');form.elements.nombre.reportValidity();return}form.elements.nombre.setCustomValidity('');const ref=String(values.get('referencia')||'').trim(),details=String(values.get('detalles')||'').trim();const text=`Hola, A1 Maquetas. Soy ${name} y quisiera consultar por una maqueta.\n\nTipo de proyecto: ${values.get('categoria')}.${ref?'\nProyecto o referencia: '+ref+'.':''}\nDocumentación disponible: ${docs.length?docs.join(', '):'Todavía por reunir'}.${details?'\n\nSobre mi idea:\n'+details:''}\n\nQuisiera coordinar cómo compartir la documentación y conocer los próximos pasos para cotizar.`;qs('#briefText').value=text;qs('#briefResult').hidden=false;qs('#copyStatus').textContent='';qs('#briefResultTitle').focus({preventScroll:true});qs('#briefResult').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'})});
 form.elements.nombre.addEventListener('input',()=>form.elements.nombre.setCustomValidity(''));
 qs('#copyBrief').addEventListener('click',async()=>{const field=qs('#briefText');try{await navigator.clipboard.writeText(field.value);qs('#copyStatus').textContent='Consulta copiada. Pegala en tu mensaje a @a1maquetas.'}catch{field.focus();field.select();qs('#copyStatus').textContent='Seleccionamos el texto. Copialo con la opción de copiar de tu dispositivo.'}});
}
})();
