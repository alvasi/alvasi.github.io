#!/usr/bin/env bash
# Compile the portfolio CV into public/Alva_Si_CV.pdf (must stay 1 page).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TEX="$ROOT/alva-portfolio/cv/Alva_Si_CV.tex"
OUT_DIR="$ROOT/alva-portfolio/public"
OUT_PDF="$OUT_DIR/Alva_Si_CV.pdf"

find_tectonic() {
  if command -v tectonic >/dev/null 2>&1; then
    command -v tectonic
    return
  fi
  for candidate in /tmp/tectonic-bin/tectonic "$HOME/.local/bin/tectonic"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return
    fi
  done
  return 1
}

TECTONIC="$(find_tectonic)" || {
  echo "tectonic not found. Install: https://tectonic-typesetting.github.io/" >&2
  exit 1
}

"$TECTONIC" --outdir "$OUT_DIR" "$TEX"

# Verify single page via macOS Quartz when available
if command -v osascript >/dev/null 2>&1; then
  pages="$(osascript -l JavaScript -e "
ObjC.import('Quartz');
var doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath('$OUT_PDF'));
if (!doc) throw new Error('could not open PDF');
doc.pageCount;
" | tr -d '[:space:]')"
  if [[ "$pages" != "1" ]]; then
    echo "ERROR: CV must be exactly 1 page (got '${pages:-unknown}'). Tighten content and recompile." >&2
    exit 1
  fi
  echo "OK: wrote $OUT_PDF ($pages page)"
else
  echo "OK: wrote $OUT_PDF (page count not verified — check manually)"
fi
