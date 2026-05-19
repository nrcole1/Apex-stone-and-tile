"""
Create _data/gallery/*.json for each optimized photo and rewrite content-manifest.json.
Old placeholder gallery JSONs are removed from the manifest (files left on disk but unlisted).
"""
import json
import os
from pathlib import Path

GALLERY_DIR = Path(r"C:\Users\nrcol\OneDrive\Desktop\apex-site-cms\apex-site\_data\gallery")
MANIFEST    = Path(r"C:\Users\nrcol\OneDrive\Desktop\apex-site-cms\apex-site\content-manifest.json")

# (stem, title, category, tag, featured)
ENTRIES = [
    ("bathroom-ceramic-detail",       "Ceramic Tile Detail",              "kitchen-bath",   "Bath / Ceramic",       False),
    ("bathroom-ceramic-shower-01",    "Ceramic Shower Tile",              "kitchen-bath",   "Shower / Ceramic",     False),
    ("bathroom-ceramic-shower-02",    "Ceramic Shower Surround",          "kitchen-bath",   "Shower / Ceramic",     True),
    ("bathroom-ceramic-shower-03",    "Large Format Shower Wall",         "kitchen-bath",   "Shower / Ceramic",     False),
    ("bathroom-ceramic-shower-04",    "Full Ceramic Shower Enclosure",    "kitchen-bath",   "Shower / Ceramic",     True),
    ("bathroom-marble-wall-01",       "Marble Wall Tile",                 "natural-stone",  "Bath / Marble",        True),
    ("bathroom-marble-wall-02",       "Marble Bathroom Feature Wall",     "natural-stone",  "Bath / Marble",        False),
    ("bathroom-marble-wall-03",       "Marble Wall Detail",               "natural-stone",  "Bath / Marble",        False),
    ("bathroom-tile-shower-01",       "Custom Shower Tile",               "kitchen-bath",   "Shower / Tile",        False),
    ("bathroom-tile-shower-02",       "Shower Tile Enclosure",            "kitchen-bath",   "Shower / Tile",        True),
    ("bathroom-tile-shower-03",       "Modern Tile Shower",               "kitchen-bath",   "Shower / Tile",        False),
    ("bathroom-woodlook-wall",        "Wood Look Wall Tile",              "kitchen-bath",   "Bath / Wood Look",     False),
    ("commercial-tile-floor-01",      "Commercial Tile Floor",            "commercial",     "Commercial / Tile",    True),
    ("commercial-tile-floor-02",      "Large Format Commercial Floor",    "commercial",     "Commercial / Tile",    False),
    ("fireplace-mosaic-surround",     "Mosaic Fireplace Surround",        "fireplace",      "Fireplace / Mosaic",   True),
    ("floor-ceramic-geometric-01",    "Geometric Ceramic Floor",          "flooring",       "Floor / Ceramic",      True),
    ("floor-ceramic-geometric-02",    "Geometric Pattern Floor",          "flooring",       "Floor / Ceramic",      False),
    ("floor-woodlook-porcelain-01",   "Wood Look Porcelain Floor",        "flooring",       "Floor / Wood Look",    False),
    ("floor-woodlook-porcelain-02",   "Wide Plank Porcelain Floor",       "flooring",       "Floor / Wood Look",    True),
    ("floor-woodlook-porcelain-03",   "Open Plan Wood Look Floor",        "flooring",       "Floor / Wood Look",    False),
    ("floor-woodlook-porcelain-04",   "Wood Look Porcelain Living Area",  "flooring",       "Floor / Wood Look",    False),
    ("kitchen-ceramic-backsplash",    "Ceramic Kitchen Backsplash",       "kitchen-bath",   "Kitchen / Ceramic",    False),
    ("kitchen-mosaic-backsplash-01",  "Mosaic Kitchen Backsplash",        "custom-mosaic",  "Kitchen / Mosaic",     True),
    ("kitchen-mosaic-backsplash-02",  "Custom Mosaic Backsplash",         "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("kitchen-mosaic-backsplash-03",  "Handcrafted Mosaic Backsplash",    "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("kitchen-mosaic-backsplash-04",  "Mosaic Tile Feature Wall",         "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("shower-ceramic-enclosure-01",   "Ceramic Shower Enclosure",         "kitchen-bath",   "Shower / Ceramic",     False),
    ("shower-ceramic-enclosure-02",   "Full Ceramic Shower",              "kitchen-bath",   "Shower / Ceramic",     False),
    ("shower-ceramic-enclosure-03",   "Large Format Shower Enclosure",    "kitchen-bath",   "Shower / Ceramic",     False),
    ("shower-marble-enclosure-01",    "Marble Shower Enclosure",          "natural-stone",  "Shower / Marble",      True),
    ("shower-marble-enclosure-02",    "Marble Shower Surround",           "natural-stone",  "Shower / Marble",      False),
    ("shower-marble-enclosure-03",    "Full Marble Shower",               "natural-stone",  "Shower / Marble",      True),
    ("shower-marble-enclosure-04",    "Custom Marble Shower",             "natural-stone",  "Shower / Marble",      False),
    ("shower-marble-surround",        "Marble Shower Surround Detail",    "natural-stone",  "Shower / Marble",      False),
    ("shower-stone-enclosure",        "Natural Stone Shower",             "natural-stone",  "Shower / Stone",       True),
    ("shower-tile-enclosure",         "Custom Tile Shower",               "kitchen-bath",   "Shower / Tile",        False),
    ("shower-tile-niche",             "Shower Niche Detail",              "kitchen-bath",   "Shower / Tile",        False),
    ("shower-travertine-enclosure",   "Travertine Shower Enclosure",      "natural-stone",  "Shower / Travertine",  True),
]

new_gallery_paths = []

for order, (stem, title, category, tag, featured) in enumerate(ENTRIES, 1):
    entry = {
        "title":    title,
        "image":    f"/images/uploads/gallery/{stem}.webp",
        "category": category,
        "tag":      tag,
        "order":    order,
        "featured": featured
    }
    out_path = GALLERY_DIR / f"{stem}.json"
    out_path.write_text(json.dumps(entry, indent=2) + "\n", encoding="utf-8")
    new_gallery_paths.append(f"/_data/gallery/{stem}.json")
    print(f"  wrote {stem}.json")

# Load existing manifest, replace gallery array, keep services
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
manifest["gallery"] = new_gallery_paths

from datetime import datetime, timezone
manifest["generated"] = datetime.now(timezone.utc).isoformat()

MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"\nManifest updated — {len(new_gallery_paths)} gallery entries.")
print("Services array unchanged.")
