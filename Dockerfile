FROM nginx:1.18-alpine

RUN mkdir -p /home/ilabservice/intelab-wfe-lab/saas/build

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

COPY docs-dist/  /home/ilabservice/intelab-wfe-lab/saas/build

RUN rm /etc/nginx/conf.d/default.conf
