#!/bin/sh

line="\n#######################################################################\n";
token='a5a5e0208c9e2fc0225805e4632820bdee9e178b';
echo -e $line"## Download code from repository" $line;

#retira a master branch
curl -u $token:x-oauth-basic -L https://github.com/apfrozis/Crawler/tarball/master -o master.tar.gz #| tar xz

echo -e $line"## Unpackage the code" $line;
tar -zxvf master.tar.gz;
mv apfrozis-Crawler-*/ /root/crawler;
rm -rf master.tar.gz;

echo -e $line"## Install needed npm packages" $line;
cd /root/crawler;
npm install;

echo -e $line;