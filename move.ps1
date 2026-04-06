$appDir = "c:\Work\Rui Santa Rita\road-panda-92\app"
$langDir = "$appDir\[lang]"

if (-not (Test-Path $langDir)) {
    New-Item -ItemType Directory -Force -Path $langDir
}

$excludes = @("api", "favicon.ico", "global-error.js", "globals.css", "[lang]", "category", "contact", "cookies", "estatuto-editorial", "ficha-tecnica", "latest", "layout.js", "page.js", "privacy", "search", "terms", "videos", "[slug]")

# Re-run for everything that wasn't moved yet or failed
Get-ChildItem -Path $appDir | Where-Object { $excludes -notcontains $_.Name } | ForEach-Object {
    Write-Host "Moving $($_.Name)"
    Move-Item -Path $_.FullName -Destination $langDir -Force
}

# The remaining items except excludes
$allToMove = @("category", "contact", "cookies", "estatuto-editorial", "ficha-tecnica", "latest", "privacy", "search", "terms", "videos", "[slug]", "layout.js", "page.js")
foreach ($item in $allToMove) {
    if (Test-Path "$appDir\$item") {
        Write-Host "Moving $item"
        Move-Item -Path "$appDir\$item" -Destination "$langDir" -Force
    }
}
Write-Host "Done"
