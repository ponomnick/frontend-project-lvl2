install: # start npm ci
	npm ci
gendiff: 
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint --fix .
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch