GOCS

## install nginx ~

## install nginx

bash
sudo apt-get install -y nginx
run ip, not wokring then htto open secirity
cd /etc/nginx/sites-available
sudo vim default
I
nginx.command.md
location /api {
rewrite ^\/api\/(.\*)$/api/$1 break;
proxy_pass http://localhost:8083;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
sudo systemctl restart nginx

proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade:
