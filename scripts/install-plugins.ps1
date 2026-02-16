# Install WP GraphQL on GCP
param (
    [string]$ProjectId = "road-panda-92-487618",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend"
)

Write-Host "Uploading install script..."
gcloud compute scp scripts/install-wpgraphql.sh "${InstanceName}:." --project=$ProjectId --zone=$Zone

Write-Host "Executing install script..."
gcloud compute ssh $InstanceName --project=$ProjectId --zone=$Zone --command="chmod +x install-wpgraphql.sh && ./install-wpgraphql.sh"

Write-Host "Installation Complete."
