# Migration Script: Local -> GCP
param (
    [string]$ProjectId = "road-panda-92-487618",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend"
)

# 1. Dump Local Database
Write-Host "Dumping local database..."
cmd /c "docker exec mysql mysqldump -u wordpress -proadpanda_wp_secret --no-tablespaces wordpress > local_dump.sql"

# 2. Archive Uploads
Write-Host "Archiving uploads folder..."
docker exec wordpress tar -czf /tmp/uploads.tar.gz -C /var/www/html/wp-content uploads
docker cp wordpress:/tmp/uploads.tar.gz ./local_uploads.tar.gz

# 3. Upload to GCP
Write-Host "Uploading files to GCP VM..."
# Uploading to home directory using dot (.) to avoid path issues
gcloud compute scp local_dump.sql local_uploads.tar.gz scripts/import-remote.sh scripts/roadpanda-ads-plugin.php "${InstanceName}:." --project=$ProjectId --zone=$Zone

# 4. Execute Import Script on GCP
Write-Host "Executing import script on GCP..."
gcloud compute ssh $InstanceName --project=$ProjectId --zone=$Zone --command="chmod +x import-remote.sh && ./import-remote.sh"

Write-Host "Done! Please verify at http://35.188.192.145/wp-admin"
