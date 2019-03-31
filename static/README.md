## Static

will be deployed to s3 bucket: static.battles.dev

and hosted via https://static.battles.dev

```sh
aws s3 cp --acl public-read --content-type "text/html" --cache-control "max-age=3600" index.html s3://static.battles.dev/index.html

aws s3 cp --acl public-read --content-type "font/otf" --cache-control "max-age=600" fonts/RoadRage.otf s3://static.battles.dev/fonts/RoadRage.otf

aws s3 cp --acl public-read --content-type "font/ttf" --cache-control "max-age=600" fonts/RoadRage.ttf s3://static.battles.dev/fonts/RoadRage.ttf

aws s3 cp --acl public-read --content-type "font/woff" --cache-control "max-age=600" fonts/RoadRage.woff s3://static.battles.dev/fonts/RoadRage.woff

aws s3 cp --acl public-read --content-type "font/woff2" --cache-control "max-age=600" fonts/RoadRage.woff2 s3://static.battles.dev/fonts/RoadRage.woff2
```
