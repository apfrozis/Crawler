#!/bin/sh


#wget -O server_setup.sh https://raw.githubusercontent.com/samirtendulkar/my_project/master/deploy/server_setup.sh?token=AkSv7SycSHacUNlSEZamo6hpMAI6ZhsLks5b4uFuwA%3D%3D
#https://superuser.com/questions/735452/how-can-i-download-a-private-repository-from-github-having-no-access-to-git-on
#https://stackoverflow.com/questions/27214516/wget-other-users-private-repository-on-github


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
