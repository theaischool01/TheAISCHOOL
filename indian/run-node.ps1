$nodeDir = "$PSScriptRoot\.node-portable"
$nodeTarget = "$nodeDir\node-v22.13.0-win-x64"
$zipPath = "$nodeDir\node.zip"

if (-not (Test-Path "$nodeTarget\node.exe")) {
    Write-Host "Portable Node.js not found or outdated. Downloading and extracting v22.13.0..."
    if (-not (Test-Path $nodeDir)) {
        New-Item -ItemType Directory -Path $nodeDir -Force | Out-Null
    }
    
    # Download
    $url = "https://nodejs.org/dist/v22.13.0/node-v22.13.0-win-x64.zip"
    Write-Host "Downloading $url to $zipPath ..."
    Invoke-WebRequest -Uri $url -OutFile $zipPath
    
    # Extract
    Write-Host "Extracting zip to $nodeDir ..."
    Expand-Archive -Path $zipPath -DestinationPath $nodeDir -Force
    
    # Delete zip
    Remove-Item -Path $zipPath -Force
    Write-Host "Portable Node.js setup complete!"
}

# Update PATH for this process
$env:Path = "$nodeTarget;" + $env:Path

# Run the command passed to this script
if ($args.Count -gt 0) {
    $cmd = $args[0]
    $cmdArgs = $args | Select-Object -Skip 1
    & $cmd @cmdArgs
} else {
    node -v
    npm -v
}
