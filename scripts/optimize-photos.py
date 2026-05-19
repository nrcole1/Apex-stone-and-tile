"""
Optimize selected Apex S&T photos to WebP for web use.
Input:  Dropbox source folder (originals stay untouched)
Output: images/uploads/gallery/ in the site repo
Max width: 1800px, quality: 82
"""
import os
from pathlib import Path
from PIL import Image, ImageOps

SRC = Path(r"C:\Users\nrcol\Dropbox\File requests\Apex stone and tile website pictures")
DST = Path(r"C:\Users\nrcol\OneDrive\Desktop\apex-site-cms\apex-site\images\uploads\gallery")
MAX_W = 1800
QUALITY = 82

# (source_filename, output_stem, title, category, tag, featured)
PHOTOS = [
    ("Bathroom-Ceramic-Tile-Detail-002.jpg",    "bathroom-ceramic-detail",          "Ceramic Tile Detail",              "kitchen-bath",   "Bath / Ceramic",       False),
    ("Bathroom-Ceramic-Tile-Shower-005.jpg",    "bathroom-ceramic-shower-01",       "Ceramic Shower Tile",              "kitchen-bath",   "Shower / Ceramic",     False),
    ("Bathroom-Ceramic-Tile-Shower-006.jpg",    "bathroom-ceramic-shower-02",       "Ceramic Shower Surround",          "kitchen-bath",   "Shower / Ceramic",     True),
    ("Bathroom-Ceramic-Tile-Shower-011.jpg",    "bathroom-ceramic-shower-03",       "Large Format Shower Wall",         "kitchen-bath",   "Shower / Ceramic",     False),
    ("Bathroom-Ceramic-Tile-Shower-015.jpg",    "bathroom-ceramic-shower-04",       "Full Ceramic Shower Enclosure",    "kitchen-bath",   "Shower / Ceramic",     True),
    ("Bathroom-Marble-Wall-Tile-002.jpg",       "bathroom-marble-wall-01",          "Marble Wall Tile",                 "natural-stone",  "Bath / Marble",        True),
    ("Bathroom-Marble-Wall-Tile-003.jpg",       "bathroom-marble-wall-02",          "Marble Bathroom Feature Wall",     "natural-stone",  "Bath / Marble",        False),
    ("Bathroom-Marble-Wall-Tile-005.jpg",       "bathroom-marble-wall-03",          "Marble Wall Detail",               "natural-stone",  "Bath / Marble",        False),
    ("Bathroom-Tile-Shower-004.jpg",            "bathroom-tile-shower-01",          "Custom Shower Tile",               "kitchen-bath",   "Shower / Tile",        False),
    ("Bathroom-Tile-Shower-006.jpg",            "bathroom-tile-shower-02",          "Shower Tile Enclosure",            "kitchen-bath",   "Shower / Tile",        True),
    ("Bathroom-Tile-Shower-021.jpg",            "bathroom-tile-shower-03",          "Modern Tile Shower",               "kitchen-bath",   "Shower / Tile",        False),
    ("Bathroom-WoodLook-Wall-020.jpg",          "bathroom-woodlook-wall",           "Wood Look Wall Tile",              "kitchen-bath",   "Bath / Wood Look",     False),
    ("Commercial-Tile-Floor-001.jpg",           "commercial-tile-floor-01",         "Commercial Tile Floor",            "commercial",     "Commercial / Tile",    True),
    ("Commercial-Tile-Floor-003.jpg",           "commercial-tile-floor-02",         "Large Format Commercial Floor",    "commercial",     "Commercial / Tile",    False),
    ("Fireplace-Mosaic-Surround-001.jpg",       "fireplace-mosaic-surround",        "Mosaic Fireplace Surround",        "fireplace",      "Fireplace / Mosaic",   True),
    ("Floor-Ceramic-Geometric-001.jpg",         "floor-ceramic-geometric-01",       "Geometric Ceramic Floor",          "flooring",       "Floor / Ceramic",      True),
    ("Floor-Ceramic-Geometric-008.jpg",         "floor-ceramic-geometric-02",       "Geometric Pattern Floor",          "flooring",       "Floor / Ceramic",      False),
    ("Floor-WoodLook-Porcelain-007.jpg",        "floor-woodlook-porcelain-01",      "Wood Look Porcelain Floor",        "flooring",       "Floor / Wood Look",    False),
    ("Floor-WoodLook-Porcelain-033.jpg",        "floor-woodlook-porcelain-02",      "Wide Plank Porcelain Floor",       "flooring",       "Floor / Wood Look",    True),
    ("Floor-WoodLook-Porcelain-034.jpg",        "floor-woodlook-porcelain-03",      "Open Plan Wood Look Floor",        "flooring",       "Floor / Wood Look",    False),
    ("Floor-WoodLook-Porcelain-038.jpg",        "floor-woodlook-porcelain-04",      "Wood Look Porcelain Living Area",  "flooring",       "Floor / Wood Look",    False),
    ("Kitchen-Ceramic-Backsplash-003.jpg",      "kitchen-ceramic-backsplash",       "Ceramic Kitchen Backsplash",       "kitchen-bath",   "Kitchen / Ceramic",    False),
    ("Kitchen-Mosaic-Backsplash-001.jpg",       "kitchen-mosaic-backsplash-01",     "Mosaic Kitchen Backsplash",        "custom-mosaic",  "Kitchen / Mosaic",     True),
    ("Kitchen-Mosaic-Backsplash-003.jpg",       "kitchen-mosaic-backsplash-02",     "Custom Mosaic Backsplash",         "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("Kitchen-Mosaic-Backsplash-006.jpg",       "kitchen-mosaic-backsplash-03",     "Handcrafted Mosaic Backsplash",    "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("Kitchen-Mosaic-Backsplash-008.jpg",       "kitchen-mosaic-backsplash-04",     "Mosaic Tile Feature Wall",         "custom-mosaic",  "Kitchen / Mosaic",     False),
    ("Shower-Ceramic-Tile-Enclosure-008.jpg",   "shower-ceramic-enclosure-01",      "Ceramic Shower Enclosure",         "kitchen-bath",   "Shower / Ceramic",     False),
    ("Shower-Ceramic-Tile-Enclosure-009.jpg",   "shower-ceramic-enclosure-02",      "Full Ceramic Shower",              "kitchen-bath",   "Shower / Ceramic",     False),
    ("Shower-Ceramic-Tile-Enclosure-010.jpg",   "shower-ceramic-enclosure-03",      "Large Format Shower Enclosure",    "kitchen-bath",   "Shower / Ceramic",     False),
    ("Shower-Marble-Enclosure-011.jpg",         "shower-marble-enclosure-01",       "Marble Shower Enclosure",          "natural-stone",  "Shower / Marble",      True),
    ("Shower-Marble-Enclosure-016.jpg",         "shower-marble-enclosure-02",       "Marble Shower Surround",           "natural-stone",  "Shower / Marble",      False),
    ("Shower-Marble-Enclosure-031.jpg",         "shower-marble-enclosure-03",       "Full Marble Shower",               "natural-stone",  "Shower / Marble",      True),
    ("Shower-Marble-Enclosure-033.jpg",         "shower-marble-enclosure-04",       "Custom Marble Shower",             "natural-stone",  "Shower / Marble",      False),
    ("Shower-Marble-Surround-003.jpg",          "shower-marble-surround",           "Marble Shower Surround Detail",    "natural-stone",  "Shower / Marble",      False),
    ("Shower-Stone-Enclosure-020.jpg",          "shower-stone-enclosure",           "Natural Stone Shower",             "natural-stone",  "Shower / Stone",       True),
    ("Shower-Tile-Enclosure-031.jpg",           "shower-tile-enclosure",            "Custom Tile Shower",               "kitchen-bath",   "Shower / Tile",        False),
    ("Shower-Tile-Niche-006.jpg",               "shower-tile-niche",                "Shower Niche Detail",              "kitchen-bath",   "Shower / Tile",        False),
    ("Shower-Travertine-Enclosure-002.jpg",     "shower-travertine-enclosure",      "Travertine Shower Enclosure",      "natural-stone",  "Shower / Travertine",  True),
]

errors = []
for i, (src_name, stem, title, cat, tag, featured) in enumerate(PHOTOS, 1):
    src_path = SRC / src_name
    dst_path = DST / f"{stem}.webp"

    if not src_path.exists():
        errors.append(f"MISSING: {src_name}")
        continue

    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)  # apply EXIF rotation before anything else
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    w, h = img.size
    if w > MAX_W:
        new_h = int(h * MAX_W / w)
        img = img.resize((MAX_W, new_h), Image.LANCZOS)

    img.save(dst_path, "WEBP", quality=QUALITY, method=6)
    kb = dst_path.stat().st_size // 1024
    print(f"[{i:02d}/{len(PHOTOS)}] {stem}.webp  ({kb} KB)")

print()
if errors:
    print("ERRORS:")
    for e in errors:
        print(" ", e)
else:
    print("All photos optimized successfully.")
