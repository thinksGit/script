#!/bin/bash
## 如果以前安装过删除/etc/my.cnf /etc/mysql
if test -e /etc/my.cnf; then 
      sudo rm -rf /etc/my.cnf
fi
echo "删除"
if test -e /etc/mysql; then
      sudo rm -rf /etc/mysql
fi
## 创建用户
sudo groupadd mysql
sudo useradd -r -g mysql -s /bin/false mysql
## 安装依赖
sudo apt-cache search libaio
sudo apt install libaio1
## 下载tar包
wget -O mysql.tar.xz https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.15-linux-glibc2.12-x86_64.tar.xz 
if test $? != 0; then
    echo '下载失败'
    exit
fi
target=~/softInstall/mysql
if ! test -d tarDir;then
    mkdir -p $target
fi
sudo tar -Jxvf mysql.tar.xz --strip-components=1 -C $target 
cd $target
sudo ln -s $target /usr/local/mysql 
cd /usr/local/mysql
sudo mkdir mysql-files
sudo chown mysql:mysql mysql-files
sudo chmod 750 mysql-files
sudo rm -rf data
##不生成root随机密码
sudo bin/mysqld --initialize-insecure --user=mysql 
sudo bin/mysql_ssl_rsa_setup
sudo bin/mysqld_safe --user=mysql &
sudo cp support-files/mysql.server /etc/init.d/mysqld
bash mysqlServerSetUp
