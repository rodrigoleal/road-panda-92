#!/bin/bash
set -e

echo "Installing Polylang Core Plugin..."

# Download Polylang from official WP repository
curl -L -A "Mozilla/5.0" https://downloads.wordpress.org/plugin/polylang.zip -o /tmp/polylang.zip

# Copy to container
sudo docker cp /tmp/polylang.zip wordpress:/tmp/polylang.zip

# Extract and set permissions
sudo docker exec wordpress sh -c "
    apk update && apk add unzip && \
    unzip -o /tmp/polylang.zip -d /var/www/html/wp-content/plugins/ && \
    chown -R www-data:www-data /var/www/html/wp-content/plugins/polylang
"

echo "Activating Plugins..."
# Activate Polylang Core first
sudo docker exec -u www-data wordpress wp plugin activate polylang
# Re-activate Bridge plugin just in case
sudo docker exec -u www-data wordpress wp plugin activate wp-graphql-polylang

echo "Core Installation Complete! Polylang engine and GraphQL bridge should now be active."
