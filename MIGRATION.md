# Road Panda 92 - Migration & Handoff Guide

This document contains technical information for migrating the project to a new infrastructure.

## 1. Environment Requirements
- **Frontend**: Node.js 20+ (Requires a running Node service, Static Export is NOT supported due to ISR/Dynamic Routes).
- **Backend**: PHP 8.2+ with MySQL 8.0+.

## 2. Mandatory WordPress Plugins
The following plugins must be active for the headless frontend to function:
1. **WPGraphQL**: Core API.
2. **Polylang**: Multi-language management.
3. **WPGraphQL for Polylang**: Language filtering via API.
4. **Advanced Custom Fields (ACF) Pro**: Custom content fields.
5. **WPGraphQL for ACF**: Exposes ACF fields to GraphQL.
6. **All-in-One WP Migration**: (Optional) For importing the .wpress file.

## 3. Frontend Configuration (Next.js)
- **Build**: 
pm run build`n- **Run**: 
pm run start`n- **API**: The frontend communicates via WPGraphQL.

## 4. Environment Variables
Refer to .env.example for the required keys. The most critical is NEXT_PUBLIC_WORDPRESS_API_URL.

## 5. Database & Uploads
- The SQL dump is available at prod_dump.sql.
- The uploads archive is available at prod_uploads.tar.gz.
