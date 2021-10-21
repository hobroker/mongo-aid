help: ## Show this help message
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

build: ## Build and run docker container
	docker build -t mongo-aid .
	#docker run --rm --volume=/Users/ileahu/dev/open/mongo-aid/backups:/usr/src/app/backups mongo-aid npm run backup

.PHONY: help
