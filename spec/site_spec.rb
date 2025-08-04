require 'spec_helper'

describe 'Personal Website Tests' do
  
  describe 'Homepage (Spanish)' do
    before(:each) do
      visit '/'
      wait_for_page_load
    end
    
    it 'loads successfully' do
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Álvaro Escobar')
    end
    
    it 'has correct meta tags' do
      expect(page).to have_css('meta[name="viewport"]', visible: false)
      expect(page).to have_css('meta[charset]', visible: false)
    end
    
    it 'displays hero section correctly' do
      expect(page).to have_css('.hero')
      expect(page).to have_content('¡Hola! Soy')
      expect(page).to have_content('Desarrollador Full Stack')
    end
    
    it 'has working navigation menu' do
      expect(page).to have_css('.nav-links')
      expect(page).to have_link('Inicio', href: '/')
      expect(page).to have_link('CV', href: '/cv')
      expect(page).to have_link('Proyectos', href: '/proyectos')
      expect(page).to have_link('Blog', href: '/blog')
    end
    
    it 'has language selector' do
      expect(page).to have_css('.language-selector')
      expect(page).to have_button('ES')
      expect(page).to have_button('EN')
    end
    
    it 'displays main cards' do
      expect(page).to have_css('.card-clickable', count: 2)
      expect(page).to have_content('Desarrollo')
      expect(page).to have_content('Blog')
    end
    
    it 'shows latest posts section' do
      expect(page).to have_css('.section-spaced')
      expect(page).to have_content('Últimas Publicaciones')
    end
    
    it 'has footer with social links' do
      expect(page).to have_css('footer')
      expect(page).to have_css('.social-links')
      expect(page).to have_link(href: /linkedin/)
      expect(page).to have_link(href: /github/)
      expect(page).to have_link(href: /hackthebox/)
    end
  end
  
  describe 'Homepage (English)' do
    before(:each) do
      visit '/en/'
      wait_for_page_load
    end
    
    it 'loads successfully' do
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Álvaro Escobar')
    end
    
    it 'displays content in English' do
      expect(page).to have_content('Hello! I\'m')
      expect(page).to have_content('Full Stack Developer')
    end
    
    it 'has English navigation' do
      expect(page).to have_link('Home', href: '/en/')
      expect(page).to have_link('Resume', href: '/en/resume')
      expect(page).to have_link('Projects', href: '/en/projects')
      expect(page).to have_link('Blog', href: '/en/blog')
    end
  end
  
  describe 'Projects Page' do
    it 'Spanish projects page loads' do
      visit '/proyectos'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Proyectos')
    end
    
    it 'English projects page loads' do
      visit '/en/projects'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Projects')
    end
  end
  
  describe 'Blog Pages' do
    it 'Spanish blog page loads' do
      visit '/blog'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Blog')
    end
    
    it 'English blog page loads' do
      visit '/en/blog'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Blog')
    end
    
    it 'displays blog posts' do
      visit '/blog'
      wait_for_page_load
      expect(page).to have_css('.post-preview')
    end
  end
  
  describe 'CV/Resume Pages' do
    it 'Spanish CV page loads' do
      visit '/cv'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Curriculum')
    end
    
    it 'English resume page loads' do
      visit '/en/resume'
      wait_for_page_load
      expect(page.status_code).to eq(200)
      expect(page).to have_content('Resume')
    end
  end
  
  describe 'Language Switching' do
    it 'switches from Spanish to English correctly' do
      visit '/proyectos'
      wait_for_page_load
      
      find('.language-selector button', text: 'EN').click
      sleep 2
      
      expect(current_path).to eq('/en/projects')
      expect(page).to have_content('Projects')
    end
    
    it 'switches from English to Spanish correctly' do
      visit '/en/projects'
      wait_for_page_load
      
      find('.language-selector button', text: 'ES').click
      sleep 2
      
      expect(current_path).to eq('/proyectos')
      expect(page).to have_content('Proyectos')
    end
  end
  
  describe 'Clickable Cards' do
    before(:each) do
      visit '/'
      wait_for_page_load
    end
    
    it 'development card is clickable' do
      development_card = find('.card-clickable', text: 'Desarrollo')
      expect(development_card['data-href']).to eq('/proyectos')
    end
    
    it 'blog card is clickable' do
      blog_card = find('.card-clickable', text: 'Blog')
      expect(blog_card['data-href']).to eq('/blog')
    end
    
    it 'cards have proper accessibility attributes' do
      cards = all('.card-clickable')
      cards.each do |card|
        expect(card['role']).to eq('button')
        expect(card['tabindex']).to eq('0')
        expect(card['aria-label']).not_to be_empty
      end
    end
  end
  
  describe 'Responsive Design' do
    before(:each) do
      visit '/'
      wait_for_page_load
    end
    
    it 'works on different screen sizes' do
      check_responsive_design
      expect(page).to have_css('.hero')
      expect(page).to have_css('.nav-links')
    end
  end
  
  describe 'Performance and SEO' do
    before(:each) do
      visit '/'
      wait_for_page_load
    end
    
    it 'has proper meta tags' do
      expect(page).to have_css('meta[name="description"]', visible: false)
      expect(page).to have_css('meta[property="og:title"]', visible: false)
      expect(page).to have_css('meta[property="og:description"]', visible: false)
    end
    
    it 'has CSS and JS files loading' do
      expect(page).to have_css('link[rel="stylesheet"]', visible: false)
      expect(page).to have_css('script[src*="main.js"]', visible: false)
    end
    
    it 'has proper font loading' do
      expect(page).to have_css('link[rel="preconnect"][href*="fonts.googleapis.com"]', visible: false)
    end
  end
  
  describe 'Dark Theme Toggle' do
    before(:each) do
      visit '/'
      wait_for_page_load
    end
    
    it 'has theme toggle button' do
      expect(page).to have_css('.theme-toggle')
    end
    
    it 'toggles dark theme when clicked' do
      toggle_button = find('.theme-toggle')
      
      # Get initial theme
      initial_theme = page.evaluate_script('document.documentElement.getAttribute("data-theme")')
      
      # Click toggle
      toggle_button.click
      sleep 1
      
      # Check theme changed
      new_theme = page.evaluate_script('document.documentElement.getAttribute("data-theme")')
      expect(new_theme).not_to eq(initial_theme)
    end
  end
end
