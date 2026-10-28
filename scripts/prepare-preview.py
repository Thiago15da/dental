from pathlib import Path
import shutil
p=Path(__file__).resolve().parents[1];d=p/'dist';d.mkdir(exist_ok=True)
for f in p.glob('*.html'):shutil.copy2(f,d/f.name)
for name in ['a1.css','a1.js','favicon.svg']:shutil.copy2(p/name,d/name)
shutil.copytree(p/'assets',d/'assets',dirs_exist_ok=True)
