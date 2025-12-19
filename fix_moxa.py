import codecs

file_path = r'c:\Users\Aba Baker\OneDrive\Bureau\saratherapie-main\index.html'

# Read the file
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# Define the old service card
old_text = '''            <!-- Moxa -->
            <div class="service-card">
              <div class="card-body custom-card bg-service-9">
                <div>
                  <p class="text-subtitle c-semi-black">Moxa Therapy</p>
                  <p class="text-grey">
                    Chauffage thérapeutique par moxibustion pour activer
                    l'énergie vitale.
                  </p>
                </div>
                <div class="card-footer">
                  <div class="price bg-semi-white">$75/session</div>
                  <a href="form-reservation.html" class="btn-dark">Book Now</a>
                </div>
              </div>
            </div>'''

# Define the new pricing item
new_text = '''            <div class="pricing-item">
              <span class="pricing-name">Moxa Therapy</span>
              <span class="pricing-dots"></span>
              <span class="pricing-price">$75/session</span>
            </div>'''

# Replace
if old_text in content:
    content = content.replace(old_text, new_text)
    print("Replacement successful!")
else:
    print("Old text not found - checking for variations...")
    # Try with different apostrophe
    old_text_alt = old_text.replace("l'énergie", "l'énergie")
    if old_text_alt in content:
        content = content.replace(old_text_alt, new_text)
        print("Replacement successful with alternative apostrophe!")
    else:
        print("Still not found")

# Write the file back
with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Done!")
