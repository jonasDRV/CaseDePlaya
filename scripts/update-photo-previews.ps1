param([switch]$Force)

$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $PSScriptRoot
$encoder = (Get-Command ffmpeg -ErrorAction Stop).Source
$catalogPath = Join-Path $projectDir 'image-metadata.js'
$catalog = [IO.File]::ReadAllText($catalogPath)
$dimensionsMatch = [regex]::Match($catalog, '(?s)const dimensions = (\{.*?\n  \});')
if (-not $dimensionsMatch.Success) { throw 'Image dimensions not found' }
$dimensions = $dimensionsMatch.Groups[1].Value | ConvertFrom-Json

function Get-WebpSize([string]$Path) {
  $bytes = [IO.File]::ReadAllBytes($Path)
  $offset = 12
  while ($offset + 18 -lt $bytes.Length) {
    $chunk = [Text.Encoding]::ASCII.GetString($bytes, $offset, 4)
    $length = [BitConverter]::ToUInt32($bytes, $offset + 4)
    if ($chunk -eq 'VP8X') {
      return @((1 + $bytes[$offset+12] + 256*$bytes[$offset+13] + 65536*$bytes[$offset+14]), (1 + $bytes[$offset+15] + 256*$bytes[$offset+16] + 65536*$bytes[$offset+17]))
    }
    if ($chunk -eq 'VP8 ') {
      return @(([BitConverter]::ToUInt16($bytes, $offset+14) -band 16383), ([BitConverter]::ToUInt16($bytes, $offset+16) -band 16383))
    }
    if ($chunk -eq 'VP8L') {
      $bits = [BitConverter]::ToUInt32($bytes, $offset+9)
      return @((1 + ($bits -band 16383)), (1 + (($bits -shr 14) -band 16383)))
    }
    $offset += 8 + $length + ($length % 2)
  }
  throw "Cannot read WebP dimensions: $Path"
}

foreach ($photo in $dimensions.PSObject.Properties) {
  if (-not $photo.Value.small) { continue } # Header logo has its own variants.
  $source = Join-Path $projectDir ('images/' + $photo.Name + '.webp')
  $sourceWidth = (Get-WebpSize $source)[0]
  foreach ($width in 400,600) {
    foreach ($format in 'webp','avif') {
      $output = Join-Path $projectDir ('images/' + $photo.Name + '-' + $width + '.' + $format)
      if ($Force -or -not (Test-Path -LiteralPath $output)) {
        $targetWidth = [Math]::Min($width, $sourceWidth)
        $arguments = @('-hide_banner','-loglevel','error','-y','-i',$source,'-map_metadata','-1','-vf',("scale={0}:-1:flags=lanczos" -f $targetWidth),'-frames:v','1')
        if ($format -eq 'avif') {
          $arguments += @('-c:v','libaom-av1','-still-picture','1','-crf','24','-b:v','0','-cpu-used','6','-threads','2','-pix_fmt','yuv420p','-color_range','pc')
        } else {
          $arguments += @('-c:v','libwebp','-quality','86','-compression_level','6')
        }
        & $encoder @arguments $output
        if ($LASTEXITCODE -ne 0) { throw "Encoding failed: $output" }
      }
    }
    $size = @(Get-WebpSize (Join-Path $projectDir ('images/' + $photo.Name + '-' + $width + '.webp')))
    $variant = if ($width -eq 400) { 'thumbnail' } else { 'preview' }
    $photo.Value | Add-Member -NotePropertyName $variant -NotePropertyValue $size -Force
  }
  Write-Output ('Prepared ' + $photo.Name)
}

$lines = @($dimensions.PSObject.Properties | ForEach-Object {
  '    "' + $_.Name + '": ' + ($_.Value | ConvertTo-Json -Compress -Depth 5)
})
$replacement = "{`n" + ($lines -join ",`n") + "`n  }"
$catalog = $catalog.Remove($dimensionsMatch.Groups[1].Index, $dimensionsMatch.Groups[1].Length).Insert($dimensionsMatch.Groups[1].Index, $replacement)
[IO.File]::WriteAllText($catalogPath, $catalog, [Text.UTF8Encoding]::new($false))

# Keep the initial HTML useful before JavaScript, using real pixel widths.
$htmlPath = Join-Path $projectDir 'index.html'
$html = [IO.File]::ReadAllText($htmlPath)
$html = [regex]::Replace($html, '<source\b[^>]*>', [Text.RegularExpressions.MatchEvaluator]{ param($match)
  $tag = $match.Value
  $src = [regex]::Match($tag, 'srcset="images/([^"/]+?)-(?:400|600|800|1600)\.(avif|webp) ').Groups
  if (-not $src[1].Success) { return $tag }
  $name = $src[1].Value
  $format = $src[2].Value
  $sizes = $dimensions.$name
  if (-not $sizes) { throw "Unknown image: $name" }
  $seen = @{}
  $sources = @()
  foreach ($pair in @(@('thumbnail','400'),@('preview','600'),@('small','800'),@('large','1600'))) {
    $size = $sizes.($pair[0])
    if ($size -and -not $seen.ContainsKey([int]$size[0])) {
      $seen[[int]$size[0]] = $true
      $sources += 'images/' + $name + '-' + $pair[1] + '.' + $format + ' ' + $size[0] + 'w'
    }
  }
  return [regex]::Replace($tag, 'srcset="[^"]*"', ('srcset="' + ($sources -join ', ') + '"'))
})
[IO.File]::WriteAllText($htmlPath, $html, [Text.UTF8Encoding]::new($false))
Write-Output 'Photo previews, metadata and initial HTML source sets updated.'
