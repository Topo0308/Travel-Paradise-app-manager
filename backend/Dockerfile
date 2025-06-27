
FROM php:8.1-fpm

# Installation des dépendances
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

# Installation des extensions PHP
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installation de Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www/html

# Copie des fichiers
COPY . .

# Installation des dépendances
RUN composer install

# Permissions
RUN chown -R www-data:www-data /var/www/html

RUN usermod -u 1000 www-data

EXPOSE 8000

CMD ["sh", "-c", "while true; do php -S 0.0.0.0:8000 -t public public/index.php || sleep 1; done"]
