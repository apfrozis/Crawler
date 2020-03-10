FROM registry2.wallid.io/v2/base/nodejs-builder-manual:v12 AS build-env
LABEL stage=intermediate
COPY *.sh /root/
RUN /root/config.sh

FROM registry2.wallid.io/v2/base/nodejs-alpine:v12
WORKDIR /app
COPY --from=build-env /root/crawler /app/.
COPY process.yml /app/.



EXPOSE 3000
CMD ["pm2-runtime", "process.yml"]