import csv
import json
import subprocess
from collections import Counter
from pathlib import Path


ROOT = Path(".agents/outputs/stu-tariff")
TSV_DIR = ROOT / "tsv"
DELAYS = ["6h", "4h", "3h", "Direct"]
VEHICLES = ["voiture", "fourgon", "camion-20m3"]
SEPARATORS = {"|", "[", "]"}
tables = {}
issues = []

TSV_DIR.mkdir(parents=True, exist_ok=True)

for delay in DELAYS:
    for vehicle in VEHICLES:
        table_name = f"{delay}-{vehicle}"
        image_path = ROOT / f"{table_name}.png"
        output_base = TSV_DIR / table_name
        subprocess.run(
            [
                "tesseract",
                str(image_path),
                str(output_base),
                "--psm",
                "6",
                "tsv",
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        grouped = {}
        with (output_base.with_suffix(".tsv")).open(encoding="utf-8") as stream:
            for record in csv.DictReader(stream, delimiter="\t"):
                if record["level"] == "5" and record["text"].strip():
                    line = (
                        int(record["block_num"]),
                        int(record["par_num"]),
                        int(record["line_num"]),
                    )
                    grouped.setdefault(line, []).append(
                        (int(record["left"]), record["text"].strip())
                    )

        data_rows = []
        for _, words in sorted(grouped.items()):
            tokens = [
                text.strip("[]|")
                for _, text in sorted(words)
                if text.strip() not in SEPARATORS
            ]
            if tokens and tokens[0].lower().startswith("dep"):
                continue
            if len(tokens) == 17:
                data_rows.append(tokens[1:])
            elif tokens:
                issues.append((table_name, tokens[0], len(tokens), tokens))

        tables[table_name] = data_rows
        counts = Counter(value for row in data_rows for value in row)
        print(
            f"{table_name}: {len(data_rows)} rows, "
            f"{sum(len(row) for row in data_rows)} cells, "
            f"{len(counts)} OCR spellings"
        )

(ROOT / "ocr-tokens.json").write_text(
    json.dumps({"tables": tables, "issues": issues}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
print(f"Row-shape issues: {len(issues)}")
