# Utiliser la dernière version de l'image nginx officielle
FROM nginx:latest

# Supprimer la configuration par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers Angular buildés vers le répertoire html par défaut de nginx
COPY ./dist/untitled/browser/ /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
