"""Check the requested project paths without traversing installed dependencies."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
paths = json.loads((root / 'scripts/expected-structure.json').read_text(encoding='utf-8'))
missing = [p for p in paths if not root.joinpath(*p.replace('\\', '/').split('/')).exists()]
if missing:
    raise SystemExit('Missing:\n' + '\n'.join(missing))
print(f'All {len(paths)} requested files and directories are present.')
