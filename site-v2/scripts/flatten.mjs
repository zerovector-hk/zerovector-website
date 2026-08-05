// Post-build: flatten "foo.html/index.html" directories (from pages named foo.html.astro)
// into plain "foo.html" files so GitHub Pages serves the exact legacy URLs without redirects.
import { readdirSync, statSync, renameSync, rmdirSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (!statSync(p).isDirectory()) continue;
    if (entry.endsWith('.html')) {
      const tmp = p + '.__flat__';
      renameSync(join(p, 'index.html'), tmp);
      rmdirSync(p);
      renameSync(tmp, p);
      console.log('flattened', p);
    } else {
      walk(p);
    }
  }
}
walk('dist');
