GATSBY=gatsby

build: 
	gatsby run build

docker: build-image
	docker push zdnscloud/docs

build-image:
	docker build -t zdnscloud/docs -f Dockerfile.lighttpd .
	docker image prune -f

.PHONY: clean install

