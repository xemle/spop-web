FROM node:0.10-slim

RUN apt-get update \
    && apt-get install git ca-certificates -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists* \
    && git clone https://github.com/xemle/spop-web.git /spop-web \
    && cd /spop-web \
    && npm install -g bower gulp-cli \
    && npm install \
    && bower --allow-root install \
    && gulp \
    && apt-get purge -y --auto-remove git ca-certificates

WORKDIR /spop-web
EXPOSE 3000
CMD ["node", "index.js"]
