from pathlib import Path
import subprocess

import pymupdf


SOURCE = Path("attached_assets/GRILLE_TARIFS_STU_-_2025-2026_1795631174507.pdf")
OUT = Path(".agents/outputs/stu-tariff")
REGIONS = {
    "voiture": pymupdf.Rect(165, 10, 585, 155),
    "fourgon": pymupdf.Rect(25, 175, 465, 330),
    "camion-20m3": pymupdf.Rect(167, 685, 583, 835),
}
DELAYS = ["6h", "4h", "3h", "Direct"]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    document = pymupdf.open(SOURCE)
    results = []

    for page_index, delay in enumerate(DELAYS, start=1):
        page = document[page_index]
        for vehicle, region in REGIONS.items():
            image_path = OUT / f"{delay}-{vehicle}.png"
            pixmap = page.get_pixmap(
                matrix=pymupdf.Matrix(4, 4),
                clip=region,
                alpha=False,
            )
            pixmap.save(image_path)
            text = subprocess.run(
                ["tesseract", str(image_path), "stdout", "--psm", "6"],
                check=True,
                capture_output=True,
                text=True,
            ).stdout
            results.append(f"===== {delay} / {vehicle} =====\n{text.strip()}\n")

    (OUT / "ocr-tables.txt").write_text("\n".join(results), encoding="utf-8")
    print(f"Saved OCR for {len(results)} tables to {OUT / 'ocr-tables.txt'}")


if __name__ == "__main__":
    main()
