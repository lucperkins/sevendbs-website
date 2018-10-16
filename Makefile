HUGO           = hugo

clean:
	rm -rf public/

build: build-site

build-site: clean
	$(HUGO)

serve:
	hugo server --disableFastRender --ignoreCache --bind 0.0.0.0
