require 'rspec'
require 'capybara'
require 'capybara/rspec'
require 'selenium-webdriver'
require 'net/http'
require 'uri'

# Configure Capybara
Capybara.configure do |config|
  config.default_driver = :selenium_chrome_headless
  config.javascript_driver = :selenium_chrome_headless
  config.default_max_wait_time = 10
  config.app_host = 'https://l3onkers.github.io'
end

# Configure Chrome options for headless testing
Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--disable-gpu')
  options.add_argument('--window-size=1280,800')
  
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

RSpec.configure do |config|
  config.include Capybara::DSL
  
  # Clean up after each test
  config.after(:each) do
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end
  
  # Configure output format
  config.formatter = :documentation
  config.color = true
  
  # Fail fast option
  config.fail_fast = false
end

# Helper methods
def wait_for_page_load
  sleep 1
  expect(page).to have_css('body')
end

def check_responsive_design
  # Test mobile view
  page.driver.browser.manage.window.resize_to(375, 667)
  sleep 0.5
  
  # Test tablet view  
  page.driver.browser.manage.window.resize_to(768, 1024)
  sleep 0.5
  
  # Test desktop view
  page.driver.browser.manage.window.resize_to(1280, 800)
  sleep 0.5
end

def check_url_exists(url)
  uri = URI(url)
  response = Net::HTTP.get_response(uri)
  response.code.to_i == 200
rescue
  false
end
