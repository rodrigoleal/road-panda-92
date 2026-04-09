# Install Polylang GraphQL Bridge on GCP VM
param (
    [string]$ProjectId = "road-panda-92-487618",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend"
)

Write-Host "Uploading install-polylang-gql.sh to VM..."
gcloud compute scp scripts/install-polylang-gql.sh "${InstanceName}:." --project=$ProjectId --zone=$Zone

Write-Host "Executing install script on VM..."
gcloud compute ssh $InstanceName --project=$ProjectId --zone=$Zone --command="chmod +x install-polylang-gql.sh && ./install-polylang-gql.sh"

Write-Host "Installation Complete! Please verify in WP Admin or Frontend."
