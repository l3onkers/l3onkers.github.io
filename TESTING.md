# Testing Guide

This document describes how to run tests for the l3onkers.github.io website.

## Test Types

### 1. URL Tests (Quick)
Basic tests that check if pages are accessible and return correct HTTP status codes.

**PowerShell (Windows):**
```powershell
.\scripts\test.ps1
```

**Bash (Linux/macOS):**
```bash
chmod +x scripts/test.sh
./scripts/test.sh
```

**Ruby:**
```ruby
ruby scripts/test.rb
```

### 2. Full Integration Tests (RSpec)
Comprehensive tests using browser automation to test functionality, UI elements, and user interactions.

**Prerequisites:**
- Ruby with Bundler
- Chrome or Chromium browser
- ChromeDriver (automatically managed by webdrivers gem)

**Setup:**
```bash
bundle install
```

**Run tests:**
```bash
bundle exec rspec spec/
```

## Test Structure

```
spec/
├── spec_helper.rb          # Test configuration and helpers
└── site_spec.rb           # Main test suite

scripts/
├── test.ps1               # PowerShell URL tests
├── test.sh                # Bash URL tests  
└── test.rb                # Ruby URL tests
```

## What's Tested

### URL Tests
- ✅ Homepage (Spanish/English)
- ✅ CV/Resume pages
- ✅ Projects pages
- ✅ Blog pages
- ✅ CSS/JS assets
- ✅ Sample blog posts

### Integration Tests
- ✅ Page loading and content
- ✅ Navigation functionality
- ✅ Language switching
- ✅ Clickable cards
- ✅ Responsive design
- ✅ Dark theme toggle
- ✅ SEO meta tags
- ✅ Accessibility attributes

## Using Makefile

For convenience, you can use the Makefile:

```bash
# Install dependencies
make install

# Run all tests
make test

# Run specific test types
make test-ruby
make test-shell  
make test-powershell

# Start development server
make serve

# Build site
make build
```

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

- URL tests are fast and suitable for quick checks
- Integration tests provide comprehensive coverage but require browser setup
- All tests exit with proper status codes for CI integration

## Troubleshooting

**Chrome/ChromeDriver issues:**
```bash
# Update webdrivers
bundle update webdrivers
```

**Ruby dependency issues:**
```bash
# Clean and reinstall
rm Gemfile.lock
bundle install
```

**Permission issues (Linux/macOS):**
```bash
chmod +x scripts/test.sh
```
