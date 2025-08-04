#!/bin/bash

# Website Testing Script
echo "🧪 Testing l3onkers.github.io Website"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="https://l3onkers.github.io"

# Counter variables
PASSED=0
FAILED=0

# Function to test URL
test_url() {
    local url=$1
    local full_url="${BASE_URL}${url}"
    
    # Get HTTP status code
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$full_url")
    
    if [ "$status_code" -eq 200 ]; then
        echo -e "✓ ${GREEN}${url}${NC} (${status_code})"
        ((PASSED++))
    elif [ "$status_code" -eq 301 ] || [ "$status_code" -eq 302 ]; then
        echo -e "⚠ ${YELLOW}${url}${NC} (${status_code} - Redirect)"
        ((PASSED++))
    else
        echo -e "✗ ${RED}${url}${NC} (${status_code})"
        ((FAILED++))
    fi
}

# Test basic pages
echo "Testing main pages..."
test_url "/"
test_url "/cv.html"
test_url "/proyectos.html"
test_url "/blog.html"

echo ""
echo "Testing English pages..."
test_url "/en/"
test_url "/en/resume.html"
test_url "/en/projects.html"
test_url "/en/blog.html"

echo ""
echo "Testing assets..."
test_url "/assets/css/style.css"
test_url "/assets/js/main.js"

# Test some blog posts if they exist
echo ""
echo "Testing blog posts..."
test_url "/blog/2025/07/29/modernizando-mi-sitio-web-personal/"
test_url "/en/blog/2025/07/29/modernizing-my-personal-website/"

echo ""
echo "=================================="
echo -e "Results:"
echo -e "✓ ${GREEN}Passed: ${PASSED}${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "✗ ${RED}Failed: ${FAILED}${NC}"
fi
echo "Total: $((PASSED + FAILED))"

if [ $FAILED -eq 0 ]; then
    echo -e "\n🎉 ${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "\n❌ ${RED}Some tests failed!${NC}"
    exit 1
fi
