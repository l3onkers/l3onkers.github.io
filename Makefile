# Makefile for l3onkers.github.io website

.PHONY: help install test test-ruby test-shell test-powershell serve build clean lint

# Default target
help:
	@echo "Available commands:"
	@echo "  install        - Install dependencies"
	@echo "  test           - Run all tests"
	@echo "  test-ruby      - Run Ruby/RSpec tests"
	@echo "  test-shell     - Run shell script tests"
	@echo "  test-powershell- Run PowerShell tests"
	@echo "  serve          - Serve site locally"
	@echo "  build          - Build site"
	@echo "  clean          - Clean build files"
	@echo "  lint           - Run linting"

# Install dependencies
install:
	bundle install

# Run all tests
test: test-shell test-powershell test-ruby

# Run Ruby/RSpec tests (requires Chrome/Chromium)
test-ruby:
	@echo "🧪 Running RSpec tests..."
	bundle exec rspec spec/ --format documentation

# Run shell script tests
test-shell:
	@echo "🧪 Running shell script tests..."
	@chmod +x scripts/test.sh
	@./scripts/test.sh

# Run PowerShell tests
test-powershell:
	@echo "🧪 Running PowerShell tests..."
	@powershell -ExecutionPolicy Bypass -File scripts/test.ps1

# Serve site locally
serve:
	bundle exec jekyll serve --livereload

# Build site
build:
	bundle exec jekyll build

# Clean build files
clean:
	bundle exec jekyll clean
	rm -rf _site/

# Lint HTML and CSS (if tools are available)
lint:
	@echo "🔍 Running linting..."
	@if command -v htmlproofer >/dev/null 2>&1; then \
		htmlproofer ./_site --check-html --check-opengraph --report-missing-names --log-level :debug; \
	else \
		echo "htmlproofer not found, skipping HTML validation"; \
	fi
