# Install Polylang Core on GCP VM
param (
    [string]$ProjectId = "road-panda-92-487618",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend"
)

Write-Host "Uploading install-polylang-core.sh to VM..."
gcloud compute scp scripts/install-polylang-core.sh "${InstanceName}:." --project=$ProjectId --zone=$Zone

Write-Host "Executing core install script on VM..."
gcloud compute ssh $InstanceName --project=$ProjectId --zone=$Zone --command="chmod +x install-polylang-core.sh && ./install-polylang-core.sh"

Write-Host "Core Installation Complete! Please verify in WP Admin or Frontend."
