# Migration Script: Prod -> Local
param (
    [string]$ProjectId = "road-panda-92-487618",
    [string]$Zone = "us-central1-a",
    [string]$InstanceName = "road-panda-92-backend"
)

# 1. Dump Production Database and Archive Uploads on GCP
Write-Host "Creating database dump and uploads archive on GCP VM..."
$remoteCmd = "sudo docker exec mysql mysqldump -u wordpress -proadpanda_wp_secret --no-tablespaces wordpress > prod_dump.sql && sudo docker exec wordpress tar -czf /tmp/prod_uploads.tar.gz -C /var/www/html/wp-content uploads && sudo docker cp wordpress:/tmp/prod_uploads.tar.gz ./prod_uploads.tar.gz"
cmd.exe /c "gcloud compute ssh $InstanceName --project=$ProjectId --zone=$Zone --command=`"$remoteCmd`""

# 2. Download from GCP
Write-Host "Downloading files from GCP VM..."
cmd.exe /c "gcloud compute scp ${InstanceName}:prod_dump.sql ./prod_dump.sql --project=$ProjectId --zone=$Zone"
cmd.exe /c "gcloud compute scp ${InstanceName}:prod_uploads.tar.gz ./prod_uploads.tar.gz --project=$ProjectId --zone=$Zone"

# 3. Import to Local Database
Write-Host "Importing to local database..."
cmd.exe /c "docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress < prod_dump.sql"

# 4. Extract Local Uploads
Write-Host "Extracting uploads to local WordPress container..."
cmd.exe /c "docker cp prod_uploads.tar.gz wordpress:/tmp/uploads.tar.gz"
cmd.exe /c "docker exec wordpress tar -xzf /tmp/uploads.tar.gz -C /var/www/html/wp-content"
cmd.exe /c "docker exec wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads"

# 5. Replace URLs in Local Database (Prod -> Local)
Write-Host "Replacing URLs in the database..."
cmd.exe /c "docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e `"UPDATE wp_options SET option_value = REPLACE(option_value, 'http://35.188.192.145', 'http://localhost:8000') WHERE option_name = 'home' OR option_name = 'siteurl';`""
cmd.exe /c "docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e `"UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://35.188.192.145', 'http://localhost:8000');`""
cmd.exe /c "docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e `"UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://35.188.192.145', 'http://localhost:8000');`""

Write-Host "Data Sync Complete! Please verify at http://localhost:8000"
