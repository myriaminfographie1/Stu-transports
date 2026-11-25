from pathlib import Path

import fitz


source = Path("attached_assets/GRILLE_TARIFS_STU_-_2025-2026_1795631174507.pdf")
output_dir = Path(".agents/outputs/stu-tariff")
output_dir.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
print(f"Pages: {document.page_count}")

for index, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output_path = output_dir / f"page-{index}.png"
    pixmap.save(output_path)
    print(f"{output_path}: {pixmap.width}x{pixmap.height}; text={page.get_text()[:240]!r}")
