FROM nginx

ENTRYPOINT /usr/sbin/nginx -g 'pid /run/nginx.pid; error_log stderr; daemon off;'

ADD nginx /etc/nginx
ADD smartroom /var/www/smartroom/build
