#!/bin/bash

read -p "输入安装目录， 在家目录的work/workspace下 " installDir
cd ~
if test -e work 
then 
	cd work 
else 
	mkdir work & cd work 
fi
if test -e workspace 
then 
	cd workspace 
else 
	mkdir workspace & cd workspace 
fi
mkdir $installDir
cd ~/work/workspace/$installDir
npm install express --registry=https://registry.npm.taobao.org
