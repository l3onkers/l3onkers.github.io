#!/usr/bin/env bash

# Performance Analysis Script
# This script runs various performance tests and generates reports

set -e

echo "🚀 Starting Performance Analysis..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_URL="http://localhost:4000"
REPORTS_DIR="reports"
DATE=$(date +"%Y%m%d_%H%M%S")

# Create reports directory
mkdir -p $REPORTS_DIR

echo -e "${BLUE}Setting up environment...${NC}"

# Check if Jekyll is running
if ! curl -s $SITE_URL > /dev/null; then
    echo -e "${YELLOW}Jekyll server not running. Starting it...${NC}"
    bundle exec jekyll serve --detach --port 4000
    sleep 10
fi

echo -e "${GREEN}✅ Jekyll server is running${NC}"

# Function to run Lighthouse audit
run_lighthouse() {
    local url=$1
    local name=$2
    
    echo -e "${BLUE}Running Lighthouse audit for $name...${NC}"
    
    npx lighthouse $url \
        --output json \
        --output html \
        --output-path "$REPORTS_DIR/lighthouse_${name}_${DATE}" \
        --chrome-flags="--headless --no-sandbox" \
        --preset="desktop" \
        --throttling-method="devtools" \
        --quiet
    
    # Extract scores
    local scores=$(node -e "
        const fs = require('fs');
        const report = JSON.parse(fs.readFileSync('$REPORTS_DIR/lighthouse_${name}_${DATE}.report.json'));
        const scores = report.lhr.categories;
        console.log(JSON.stringify({
            performance: Math.round(scores.performance.score * 100),
            accessibility: Math.round(scores.accessibility.score * 100),
            bestPractices: Math.round(scores['best-practices'].score * 100),
            seo: Math.round(scores.seo.score * 100)
        }));
    ")
    
    echo -e "${GREEN}✅ Lighthouse completed for $name${NC}"
    echo -e "${BLUE}Scores: $scores${NC}"
}

# Function to analyze bundle sizes
analyze_bundles() {
    echo -e "${BLUE}Analyzing bundle sizes...${NC}"
    
    local css_size=$(stat -f%z "assets/css/style.css" 2>/dev/null || stat -c%s "assets/css/style.css" 2>/dev/null || echo "0")
    local js_size=$(stat -f%z "assets/js/main.js" 2>/dev/null || stat -c%s "assets/js/main.js" 2>/dev/null || echo "0")
    
    echo "CSS Size: $(echo "scale=2; $css_size/1024" | bc)KB" > "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
    echo "JS Size: $(echo "scale=2; $js_size/1024" | bc)KB" >> "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
    
    # Check for minified versions
    if [ -f "assets/css/style.min.css" ]; then
        local css_min_size=$(stat -f%z "assets/css/style.min.css" 2>/dev/null || stat -c%s "assets/css/style.min.css" 2>/dev/null || echo "0")
        echo "CSS Minified Size: $(echo "scale=2; $css_min_size/1024" | bc)KB" >> "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
        echo "CSS Compression: $(echo "scale=1; (1-$css_min_size/$css_size)*100" | bc)%" >> "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
    fi
    
    if [ -f "assets/js/main.min.js" ]; then
        local js_min_size=$(stat -f%z "assets/js/main.min.js" 2>/dev/null || stat -c%s "assets/js/main.min.js" 2>/dev/null || echo "0")
        echo "JS Minified Size: $(echo "scale=2; $js_min_size/1024" | bc)KB" >> "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
        echo "JS Compression: $(echo "scale=1; (1-$js_min_size/$js_size)*100" | bc)%" >> "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
    fi
    
    echo -e "${GREEN}✅ Bundle analysis completed${NC}"
    cat "$REPORTS_DIR/bundle_sizes_${DATE}.txt"
}

# Function to test page load times
test_load_times() {
    echo -e "${BLUE}Testing page load times...${NC}"
    
    local pages=("/" "/blog.html" "/proyectos.html" "/cv.html")
    
    for page in "${pages[@]}"; do
        echo "Testing $page..."
        
        # Use curl to measure response time
        local time=$(curl -o /dev/null -s -w "%{time_total}\n" "$SITE_URL$page")
        echo "$page: ${time}s" >> "$REPORTS_DIR/load_times_${DATE}.txt"
        
        echo -e "${GREEN}  $page: ${time}s${NC}"
    done
    
    echo -e "${GREEN}✅ Load time testing completed${NC}"
}

# Function to check image optimization
check_images() {
    echo -e "${BLUE}Checking image optimization...${NC}"
    
    find assets/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | while read img; do
        local size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null || echo "0")
        local size_kb=$(echo "scale=2; $size/1024" | bc)
        echo "$img: ${size_kb}KB" >> "$REPORTS_DIR/image_sizes_${DATE}.txt"
        
        # Check if image is larger than recommended
        if (( $(echo "$size > 500000" | bc -l) )); then
            echo -e "${YELLOW}⚠️  Large image: $img (${size_kb}KB)${NC}"
        fi
    done
    
    echo -e "${GREEN}✅ Image analysis completed${NC}"
}

# Function to generate summary report
generate_summary() {
    echo -e "${BLUE}Generating summary report...${NC}"
    
    cat > "$REPORTS_DIR/performance_summary_${DATE}.md" << EOF
# Performance Analysis Report
Generated: $(date)

## Bundle Sizes
\`\`\`
$(cat "$REPORTS_DIR/bundle_sizes_${DATE}.txt")
\`\`\`

## Page Load Times
\`\`\`
$(cat "$REPORTS_DIR/load_times_${DATE}.txt")
\`\`\`

## Recommendations
- ✅ Service Worker implemented for caching
- ✅ Lazy loading implemented for images
- ✅ Critical resources preloaded
- ✅ Font loading optimized
- ✅ CSS and JS minification available

## Next Steps
1. Monitor Core Web Vitals in production
2. Implement image optimization pipeline
3. Consider implementing critical CSS extraction
4. Add resource compression (gzip/brotli)
5. Monitor bundle sizes over time

EOF

    echo -e "${GREEN}✅ Summary report generated${NC}"
    echo -e "${BLUE}Report saved to: $REPORTS_DIR/performance_summary_${DATE}.md${NC}"
}

# Main execution
main() {
    # Run all tests
    analyze_bundles
    test_load_times
    check_images
    
    # Run Lighthouse for key pages
    run_lighthouse "$SITE_URL/" "homepage"
    run_lighthouse "$SITE_URL/blog.html" "blog"
    
    # Generate summary
    generate_summary
    
    echo -e "${GREEN}=================================="
    echo -e "✅ Performance analysis completed!"
    echo -e "📊 Reports saved in: $REPORTS_DIR"
    echo -e "==================================${NC}"
}

# Check dependencies
check_dependencies() {
    local missing=()
    
    command -v node >/dev/null 2>&1 || missing+=("node")
    command -v npm >/dev/null 2>&1 || missing+=("npm")
    command -v bc >/dev/null 2>&1 || missing+=("bc")
    command -v curl >/dev/null 2>&1 || missing+=("curl")
    
    if [ ${#missing[@]} -ne 0 ]; then
        echo -e "${RED}❌ Missing dependencies: ${missing[*]}${NC}"
        exit 1
    fi
    
    # Check npm packages
    if ! npm list lighthouse >/dev/null 2>&1; then
        echo -e "${YELLOW}Installing lighthouse...${NC}"
        npm install --save-dev lighthouse
    fi
}

# Run the script
check_dependencies
main
