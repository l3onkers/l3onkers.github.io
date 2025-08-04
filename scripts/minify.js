#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Configuration
const config = {
    css: {
        input: 'assets/css/style.css',
        output: 'assets/css/style.min.css'
    },
    js: {
        input: 'assets/js/main.js',
        output: 'assets/js/main.min.js'
    }
};

// Minify CSS
async function minifyCSS() {
    try {
        const cssContent = fs.readFileSync(config.css.input, 'utf8');
        const minified = new CleanCSS({
            level: 2,
            returnPromise: true,
            format: {
                breakWith: '',
                indentBy: 0,
                indentWith: '',
                spaces: false
            }
        }).minify(cssContent);
        
        const result = await minified;
        
        if (result.errors.length > 0) {
            console.error('CSS minification errors:', result.errors);
            return false;
        }
        
        fs.writeFileSync(config.css.output, result.styles);
        console.log(`✅ CSS minified: ${config.css.input} → ${config.css.output}`);
        console.log(`   Original: ${(cssContent.length / 1024).toFixed(2)}KB`);
        console.log(`   Minified: ${(result.styles.length / 1024).toFixed(2)}KB`);
        console.log(`   Saved: ${((1 - result.styles.length / cssContent.length) * 100).toFixed(1)}%`);
        
        return true;
    } catch (error) {
        console.error('CSS minification failed:', error);
        return false;
    }
}

// Minify JavaScript
async function minifyJS() {
    try {
        const jsContent = fs.readFileSync(config.js.input, 'utf8');
        
        const result = await minify(jsContent, {
            compress: {
                dead_code: true,
                drop_console: false, // Keep console for debugging
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                keep_fargs: false,
                hoist_vars: false,
                if_return: true,
                join_vars: true,
                cascade: true,
                side_effects: true
            },
            mangle: {
                toplevel: false,
                eval: false,
                reserved: ['$', 'require', 'exports']
            },
            format: {
                comments: false,
                beautify: false
            },
            sourceMap: {
                filename: 'main.min.js',
                url: 'main.min.js.map'
            }
        });
        
        if (result.error) {
            console.error('JS minification error:', result.error);
            return false;
        }
        
        fs.writeFileSync(config.js.output, result.code);
        if (result.map) {
            fs.writeFileSync(config.js.output + '.map', result.map);
        }
        
        console.log(`✅ JavaScript minified: ${config.js.input} → ${config.js.output}`);
        console.log(`   Original: ${(jsContent.length / 1024).toFixed(2)}KB`);
        console.log(`   Minified: ${(result.code.length / 1024).toFixed(2)}KB`);
        console.log(`   Saved: ${((1 - result.code.length / jsContent.length) * 100).toFixed(1)}%`);
        
        return true;
    } catch (error) {
        console.error('JS minification failed:', error);
        return false;
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting asset minification...\n');
    
    const results = await Promise.all([
        minifyCSS(),
        minifyJS()
    ]);
    
    const success = results.every(result => result === true);
    
    if (success) {
        console.log('\n✅ All assets minified successfully!');
        process.exit(0);
    } else {
        console.log('\n❌ Some assets failed to minify');
        process.exit(1);
    }
}

// Check if packages are installed
function checkDependencies() {
    const requiredPackages = ['terser', 'clean-css'];
    const missing = [];
    
    for (const pkg of requiredPackages) {
        try {
            require.resolve(pkg);
        } catch (e) {
            missing.push(pkg);
        }
    }
    
    if (missing.length > 0) {
        console.error('❌ Missing required packages:', missing.join(', '));
        console.log('Run: npm install --save-dev', missing.join(' '));
        process.exit(1);
    }
}

// Check dependencies and run
checkDependencies();
main().catch(console.error);
