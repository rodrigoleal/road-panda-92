#!/bin/bash
set -e

echo "Installing WP GraphQL..."
# Download and install WP GraphQL plugin via WP-CLI
# Assumes wp-cli is installed in the container OR we install it
# The wordpress:alpine image doesn't have wp-cli by default usually.
# So we will download the plugin zip manually and unzip it.

echo "Downloading WP GraphQL..."
curl -L https://downloads.wordpress.org/plugin/wp-graphql.zip -o /tmp/wp-graphql.zip

echo "Copying to Container..."
sudo docker cp /tmp/wp-graphql.zip wordpress:/tmp/wp-graphql.zip

echo "Installing in Container..."
sudo docker exec wordpress sh -c "
    apk update && apk add unzip && \
    unzip -o /tmp/wp-graphql.zip -d /var/www/html/wp-content/plugins/ && \
    chown -R www-data:www-data /var/www/html/wp-content/plugins/wp-graphql
"

# We can't easily activate it without wp-cli or UI.
# But if we extract it, the user can activate it in the admin panel.
# OR we can try to install wp-cli.

echo "Installing WP-CLI in container (for activation)..."
sudo docker exec wordpress sh -c "
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp
"

echo "Activating Plugin..."
sudo docker exec -u www-data wordpress wp plugin activate wp-graphql

echo "Done! GraphQL should be active."
