# Run this from PowerShell at your repo root: D:\KK\kraftykinniSite
# Command: powershell -ExecutionPolicy Bypass -File rename-assets.ps1

$assetsPath = "D:\KK\kraftykinniSite\src\assets"

$renames = @{
  "Boho Art.webp"          = "boho-art.webp"
  "Bottle art.webp"        = "bottle-art.webp"
  "Lippan Art.webp"        = "lippan-art.webp"
  "Tie And Dye.webp"       = "tie-and-dye.webp"
  "Trinket Dish.webp"      = "trinket-dish.webp"
  "Mandalacolouring.webp"  = "mandala-art.webp"
  "Block Printing.webp"    = "block-printing.webp"
  "Clay Art MDF.webp"      = "clay-art-mdf.webp"
  "Mdf fridge Magnet.webp" = "mdf-fridge-magnet.webp"
  "Glass Painting.webp"    = "glass-painting.webp"
  "Texture Tissue Art.webp"= "texture-tissue-art.webp"
  "Tote Bag.webp"          = "tote-bag.webp"
  "Canvas Pouch.webp"      = "canvas-pouch.webp"
}

foreach ($old in $renames.Keys) {
  $oldPath = Join-Path $assetsPath $old
  $newPath = Join-Path $assetsPath $renames[$old]

  if (Test-Path $oldPath) {
    Rename-Item -Path $oldPath -NewName $renames[$old]
    Write-Host "Renamed: $old  ->  $($renames[$old])" -ForegroundColor Green
  } else {
    Write-Host "Not found (skipped): $old" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Done! All assets renamed." -ForegroundColor Cyan
