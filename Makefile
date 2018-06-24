HUGO         = hugo
NODE_BIN     = node_modules/.bin
GULP         = $(NODE_BIN)/gulp
CONCURRENTLY = $(NODE_BIN)/concurrently

build-site:
	$(HUGO)

netlify-build: build-assets build-site

serve:
	hugo server --disableFastRender --ignoreCache

develop-assets:
	$(GULP) dev

build-assets:
	$(GULP) build

dev: build-assets
	$(CONCURRENTLY) "make develop-assets" "make serve"
