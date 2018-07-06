HUGO         = hugo
NODE_BIN     = node_modules/.bin
GULP         = $(NODE_BIN)/gulp
CONCURRENTLY = $(NODE_BIN)/concurrently

clean:
	rm -rf public/

build-site: clean
	$(HUGO)

netlify-build: build-assets build-site

serve:
	hugo server --disableFastRender --ignoreCache --bind 0.0.0.0

develop-assets:
	$(GULP) dev

build-assets:
	$(GULP) build

dev: clean build-assets
	$(CONCURRENTLY) "make develop-assets" "make serve"
