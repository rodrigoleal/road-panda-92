# Deploy Road Panda 92 Backend to Google Cloud Platform
param (
    [string]$ProjectId,
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend",
    [string]$MachineType = "e2-micro"
)

# Function to check command availability
function Test-Command ($command) {
    if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
        Write-Error "$command command not found. Please install it and try again."
        exit 1
    }
}

# Check for gcloud
Test-Command gcloud

# Check if authenticated
Write-Host "Checking gcloud authentication..."
$authStatus = gcloud auth list --filter=status:ACTIVE --format="value(account)"
if (-not $authStatus) {
    Write-Warning "Not authenticated. proper authentication is required."
    Write-Host "Please run 'gcloud auth login' and try again."
    exit 1
}

# Prompt for Project ID if not provided
if (-not $ProjectId) {
    $ProjectId = Read-Host "Enter your Google Cloud Project ID"
}

if (-not $ProjectId) {
    Write-Error "Project ID is required."
    exit 1
}

# Set project
Write-Host "Setting project to $ProjectId..."
gcloud config set project $ProjectId

# Enable Compute Engine API
Write-Host "Enabling Compute Engine API (this may take a minute)..."
gcloud services enable compute.googleapis.com

# Create Firewall Rule for HTTP/HTTPS
Write-Host "Creating firewall rules for HTTP/HTTPS..."
gcloud compute firewall-rules create allow-http --allow tcp:80 --target-tags http-server --description "Allow HTTP traffic" --quiet
gcloud compute firewall-rules create allow-https --allow tcp:443 --target-tags https-server --description "Allow HTTPS traffic" --quiet

# Resolve cloud-init path
$CloudInitPath = Join-Path $PSScriptRoot "..\infrastructure\cloud-init.yaml"
$CloudInitPath = $CloudInitPath -replace "\\", "/" # gcloud might prefer forward slashes or escaped backslashes, but proper quoting usually works. standardizing helps.

# Create VM Instance
Write-Host "Creating VM Instance '$InstanceName' in zone '$Zone'..."
gcloud compute instances create $InstanceName `
    --project=$ProjectId `
    --zone=$Zone `
    --machine-type=$MachineType `
    --image-family=ubuntu-2204-lts `
    --image-project=ubuntu-os-cloud `
    --tags="http-server,https-server" `
    --metadata-from-file=user-data=$CloudInitPath `
    --boot-disk-size=30GB `
    --boot-disk-type=pd-standard

if ($LASTEXITCODE -eq 0) {
    $InstanceIp = gcloud compute instances describe $InstanceName --zone=$Zone --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
    Write-Host "`n----------------------------------------------------------------"
    Write-Host "Deployment Successful!" -ForegroundColor Green
    Write-Host "Instance Name: $InstanceName"
    Write-Host "External IP:   $InstanceIp"
    Write-Host "WP Admin:      http://$InstanceIp/wp-admin"
    Write-Host "`nPlease wait a few minutes for the startup script (cloud-init) to finish installing Docker and WordPress."
    Write-Host "----------------------------------------------------------------"
} else {
    Write-Error "Deployment failed. Please check the logs above."
}
