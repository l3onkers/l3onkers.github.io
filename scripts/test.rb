#!/usr/bin/env ruby

require 'net/http'
require 'uri'
require 'json'

# Test URLs for the website
BASE_URL = 'https://l3onkers.github.io'

# URLs to test
TEST_URLS = [
  # Spanish pages
  '/',
  '/cv',
  '/proyectos', 
  '/blog',
  
  # English pages
  '/en/',
  '/en/resume',
  '/en/projects',
  '/en/blog',
  
  # Assets
  '/assets/css/style.css',
  '/assets/js/main.js'
]

# Colors for output
class String
  def red; "\e[31m#{self}\e[0m"; end
  def green; "\e[32m#{self}\e[0m"; end
  def yellow; "\e[33m#{self}\e[0m"; end
  def blue; "\e[34m#{self}\e[0m"; end
  def bold; "\e[1m#{self}\e[0m"; end
end

def test_url(url)
  uri = URI("#{BASE_URL}#{url}")
  
  begin
    response = Net::HTTP.get_response(uri)
    status_code = response.code.to_i
    
    case status_code
    when 200
      puts "✓ #{url}".green + " (#{status_code})"
      true
    when 301, 302
      puts "⚠ #{url}".yellow + " (#{status_code} - Redirect)"
      true
    else
      puts "✗ #{url}".red + " (#{status_code})"
      false
    end
  rescue => e
    puts "✗ #{url}".red + " (Error: #{e.message})"
    false
  end
end

def run_tests
  puts "🧪 Testing Website URLs".bold
  puts "=" * 50
  
  passed = 0
  failed = 0
  
  TEST_URLS.each do |url|
    if test_url(url)
      passed += 1
    else
      failed += 1
    end
  end
  
  puts "=" * 50
  puts "Results:".bold
  puts "✓ Passed: #{passed}".green
  puts "✗ Failed: #{failed}".red if failed > 0
  puts "Total: #{passed + failed}"
  
  if failed == 0
    puts "\n🎉 All tests passed!".green.bold
    exit 0
  else
    puts "\n❌ Some tests failed!".red.bold
    exit 1
  end
end

if __FILE__ == $0
  run_tests
end
