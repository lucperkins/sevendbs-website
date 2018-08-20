HUGO           = hugo
NODE_BIN       = node_modules/.bin
NETLIFY_LAMBDA = $(NODE_BIN)/netlify-lambda

clean:
	rm -rf public/

build: build-functions build-site

build-functions:
	$(NETLIFY_LAMBDA) build functions-src

build-site: clean
	$(HUGO)

serve:
	hugo server --disableFastRender --ignoreCache --bind 0.0.0.0

develop-assets:
	$(GULP) dev

build-assets:
	$(GULP) build

dev: clean build-assets
	$(CONCURRENTLY) "make develop-assets" "make serve"
