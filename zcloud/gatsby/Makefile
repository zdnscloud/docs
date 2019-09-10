GATSBY=gatsby

build: 
	gatsby run build

docker: build-image
	docker push zdnscloud/docs:lighttpd

build-image:
	docker build -t zdnscloud/docs:lighttpd -f Dockerfile.lighttpd .

.PHONY: clean install

