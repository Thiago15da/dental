from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
p=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.links=[];self.h1=0;self.projects=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if 'href' in a or 'src' in a:self.links.append(a.get('href',a.get('src','')))
  if 'data-project-name' in a:self.projects.append(a['data-project-name'])
pages={f.name:Page(f.read_text()) for f in p.glob('*.html')};errors=[]
for name,s in pages.items():
 if len(s.ids)!=len(set(s.ids)):errors.append((name,'duplicate id'))
 if s.h1!=1:errors.append((name,'h1 count'))
 for value in s.links:
  url=urlsplit(value)
  if not url.scheme and not url.netloc:
   target=unquote(url.path) or name
   if url.path and not (p/target).is_file():errors.append((name,'missing '+url.path))
   if url.fragment and target in pages and url.fragment not in pages[target].ids:errors.append((name,'fragment '+url.fragment))
 for text in ['wa.me','whatsapp','atlasSvg','id="model"','data-place','Estudio 360']:
  if text.lower() in (p/name).read_text().lower():errors.append((name,'retired '+text))
c=json.loads((p/'content/portfolio.json').read_text())
assert len(pages['proyectos.html'].projects)==17
assert pages['proyectos.html'].projects==[name for cat in c for name in cat['projects']]
print('Checked',len(pages),'HTML pages; all 17 supplied project names. Errors:',errors)
assert not errors
