#!/bin/bash
set -e

echo "Starting Import on VM..."

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
until sudo docker exec mysql mysqladmin ping -u wordpress -proadpanda_wp_secret --silent; do
    echo "MySQL not ready..."
    sleep 2
done

echo "Importing Database..."
# Use cat to pipe explicit file
cat local_dump.sql | sudo docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress

echo "Extracting Uploads..."
sudo docker cp local_uploads.tar.gz wordpress:/tmp/uploads.tar.gz
sudo docker exec wordpress tar -xzf /tmp/uploads.tar.gz -C /var/www/html/wp-content
sudo docker exec wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads

echo "Deploying Ad Plugin..."
sudo docker cp roadpanda-ads-plugin.php wordpress:/var/www/html/wp-content/plugins/roadpanda-ads-plugin.php
sudo docker exec wordpress chown www-data:www-data /var/www/html/wp-content/plugins/roadpanda-ads-plugin.php

echo "Activating Plugin..."
sudo docker exec -u www-data wordpress wp plugin activate roadpanda-ads-plugin || echo "WP-CLI not found or activation failed. Please activate manually in Admin."

echo "Replacing URLs..."
# Run replacements
sudo docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e "UPDATE wp_options SET option_value = REPLACE(option_value, 'http://localhost:8000', 'http://35.188.192.145') WHERE option_name = 'home' OR option_name = 'siteurl';"
sudo docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e "UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://localhost:8000', 'http://35.188.192.145');"
sudo docker exec -i mysql mysql -u wordpress -proadpanda_wp_secret wordpress -e "UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'http://localhost:8000', 'http://35.188.192.145');"

echo "Data Import Complete!"
