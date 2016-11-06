##### basics

`docker images`

`docker ps`

`docker search alpine`

`docker pull alpine`

`docker pull alpine:3.1`

`docker run --name alpine -it alpine`

`docker run --name alpine -it alpine sh`

`cat /etc/issue`

`ls /`

`apk add redis --no-cache`

`docker diff ID`

`docker commit bee9a7b8c837 my-alpine-with-redis`

`docker run -it -p 6379:6379 my-alpine-with-redis sh`

`redis-server` and `redis-cli`

`docker run --rm --name alpine -it alpine echo Hello Web and Wine`

`docker run --rm --name helloworld -p 8080:80 tutum/hello-world`

`docker run -d --name helloworld -p 8080:80 tutum/hello-world`

`docker ps`

`docker logs -f helloworld`

---

##### express app

`docker build -t mynodeapp .`

`docker run --rm -it -p 3000:3000 --name mynodeapp mynodeapp`

`docker run --rm -it -p 3000:3000 --name mynodeapp mynodeapp npm run dev`

`docker run --rm -it -p 3000:3000 --name mynodeapp -v $(pwd):/code mynodeapp npm run dev`

`docker-compose up`

---

##### wordpress

`docker-compose up`