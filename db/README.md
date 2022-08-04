# Creating database

To create databse follow [this gist](https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667), and create database with values:

```
HOST=localhost
PORT=5432
CONNECTION_USER=dev_easy_banking
NAME=EasyBankingDev
```

To start database server locally use: 
``` bash
pg_ctl -D /opt/homebrew/var/postgres -o "-F -p 5432" start
```

to stop:
``` bash
pg_ctl -D /opt/homebrew/var/postgres -o "-F -p 5432" stop
```

your connection string should be:
```
postgres://dev_easy_banking@localhost/easybankingdev
```