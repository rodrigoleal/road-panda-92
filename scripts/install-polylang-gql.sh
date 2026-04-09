#!/bin/bash
set -e

echo "Installing WPGraphQL-Polylang Support..."

# Download the bridge plugin
curl -L -A "Mozilla/5.0" https://github.com/valu-digital/wp-graphql-polylang/archive/refs/tags/v0.7.1.zip -o /tmp/wp-graphql-polylang.zip

# Copy to container
sudo docker cp /tmp/wp-graphql-polylang.zip wordpress:/tmp/wp-graphql-polylang.zip

# Extract and cleanup
sudo docker exec wordpress sh -c "
    apk update && apk add unzip && \
    rm -rf /var/www/html/wp-content/plugins/wp-graphql-polylang && \
    unzip -o /tmp/wp-graphql-polylang.zip -d /var/www/html/wp-content/plugins/ && \
    mv /var/www/html/wp-content/plugins/wp-graphql-polylang-0.7.1 /var/www/html/wp-content/plugins/wp-graphql-polylang && \
    chown -R www-data:www-data /var/www/html/wp-content/plugins/wp-graphql-polylang
"

echo "Activating Plugin..."
sudo docker exec -u www-data wordpress wp plugin activate wp-graphql-polylang

echo "Installation Complete! LanguageCodeFilterEnum should now be available."
