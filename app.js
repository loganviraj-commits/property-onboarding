// Counters for dynamic sections
let applianceCount = 0;
let bedroomCount = 0;

// Auto-save interval (2 minutes)
let autoSaveInterval;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add at least one appliance by default
  addAppliance();
  
  // Set up auto-save
  startAutoSave();
  
  // Update progress on any input change
  const form = document.getElementById('propertyForm');
  form.addEventListener('input', updateProgress);
  form.addEventListener('change', updateProgress);
  
  // Initial progress calculation
  updateProgress();
  
  // Form submission handler
  form.addEventListener('submit', function(e) {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>Submitting...';
  });
});

// Add appliance section
function addAppliance() {
  applianceCount++;
  const container = document.getElementById('appliancesContainer');
  
  const applianceDiv = document.createElement('div');
  applianceDiv.className = 'repeating-section';
  applianceDiv.id = 'appliance_' + applianceCount;
  
  applianceDiv.innerHTML = `
    <div class="repeating-header">
      <h4 style="margin: 0; font-size: var(--font-size-lg);">Appliance ${applianceCount}</h4>
      <button type="button" class="btn-remove" onclick="removeAppliance(${applianceCount})">Remove</button>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="appliance_type_${applianceCount}">Appliance Type</label>
      <input type="text" class="form-control" id="appliance_type_${applianceCount}" name="appliance_type_${applianceCount}" placeholder="e.g., Washing Machine, TV, Oven">
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label" for="appliance_brand_${applianceCount}">Brand</label>
        <input type="text" class="form-control" id="appliance_brand_${applianceCount}" name="appliance_brand_${applianceCount}">
      </div>
      
      <div class="form-group">
        <label class="form-label" for="appliance_model_${applianceCount}">Model Number</label>
        <input type="text" class="form-control" id="appliance_model_${applianceCount}" name="appliance_model_${applianceCount}">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="appliance_instructions_${applianceCount}">Usage Instructions</label>
      <textarea class="form-control" id="appliance_instructions_${applianceCount}" name="appliance_instructions_${applianceCount}" style="min-height: 80px;"></textarea>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="appliance_files_${applianceCount}">Manuals &amp; Photos</label>
      <input type="file" class="form-control" id="appliance_files_${applianceCount}" name="appliance_files_${applianceCount}[]" multiple accept=".pdf,image/*">
    </div>
  `;
  
  container.appendChild(applianceDiv);
  
  // Trigger progress update after adding
  updateProgress();
}

// Remove appliance section
function removeAppliance(id) {
  const element = document.getElementById('appliance_' + id);
  if (element) {
    element.remove();
    // Trigger progress update after removal
    updateProgress();
  }
}

// Add bedroom section
function addBedroom() {
  bedroomCount++;
  const container = document.getElementById('bedroomsContainer');
  
  const bedroomDiv = document.createElement('div');
  bedroomDiv.className = 'repeating-section';
  bedroomDiv.id = 'bedroom_' + bedroomCount;
  
  bedroomDiv.innerHTML = `
    <div class="repeating-header">
      <h4 style="margin: 0; font-size: var(--font-size-lg);">Bedroom ${bedroomCount}</h4>
      <button type="button" class="btn-remove" onclick="removeBedroom(${bedroomCount})">Remove</button>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label" for="bedroom_pillows_${bedroomCount}">Number of Pillows</label>
        <input type="number" class="form-control" id="bedroom_pillows_${bedroomCount}" name="bedroom_pillows[]" min="0" value="4">
      </div>
      
      <div class="form-group">
        <label class="form-label" for="bedroom_duvets_${bedroomCount}">Number of Duvets</label>
        <input type="number" class="form-control" id="bedroom_duvets_${bedroomCount}" name="bedroom_duvets[]" min="0" value="2">
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" for="bedroom_mattress_${bedroomCount}">Mattress Protectors</label>
      <input type="number" class="form-control" id="bedroom_mattress_${bedroomCount}" name="bedroom_mattress_protectors[]" min="0" value="1">
    </div>
  `;
  
  container.appendChild(bedroomDiv);
}

// Remove bedroom section
function removeBedroom(id) {
  const element = document.getElementById('bedroom_' + id);
  if (element) {
    element.remove();
  }
}

// Toggle cleaning fields based on professional cleaning selection
function toggleCleaningFields() {
  const cleaningSelect = document.getElementById('professional_cleaning');
  const optInFields = document.getElementById('optInFields');
  const optOutFields = document.getElementById('optOutFields');
  
  if (cleaningSelect.value === 'opt_in') {
    optInFields.classList.add('visible');
    optOutFields.classList.remove('visible');
  } else if (cleaningSelect.value === 'opt_out') {
    optInFields.classList.remove('visible');
    optOutFields.classList.add('visible');
  } else {
    optInFields.classList.remove('visible');
    optOutFields.classList.remove('visible');
  }
}



// Toggle kitchen inventory details
function toggleKitchenInventory() {
  const kitchenInventory = document.getElementById('kitchen_inventory');
  const detailsSection = document.getElementById('kitchenInventoryDetails');
  
  if (kitchenInventory.value === 'owner') {
    detailsSection.classList.add('visible');
  } else {
    detailsSection.classList.remove('visible');
  }
}

// Toggle welcome pack items
function toggleWelcomePack() {
  const welcomePack = document.getElementById('welcome_pack');
  const itemsSection = document.getElementById('welcomePackItems');
  
  if (welcomePack.value === 'yes') {
    itemsSection.classList.add('visible');
  } else {
    itemsSection.classList.remove('visible');
  }
}

// Toggle photography fields
function togglePhotographyFields() {
  const photography = document.getElementById('professional_photography');
  const ownPhotosSection = document.getElementById('ownPhotosSection');
  const photosInput = document.getElementById('property_photos');
  
  if (photography.value === 'no') {
    ownPhotosSection.classList.add('visible');
    photosInput.setAttribute('required', 'required');
  } else {
    ownPhotosSection.classList.remove('visible');
    photosInput.removeAttribute('required');
  }
}

// Update progress bar
function updateProgress() {
  const sections = document.querySelectorAll('.card[data-section]');
  let completedSections = 0;
  
  sections.forEach(section => {
    const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
    let sectionComplete = true;
    
    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        // For checkbox/radio groups, check if at least one is selected
        const name = input.name;
        const group = section.querySelectorAll(`input[name="${name}"]`);
        const anyChecked = Array.from(group).some(i => i.checked);
        if (!anyChecked && input.hasAttribute('required')) {
          sectionComplete = false;
        }
      } else if (!input.value.trim()) {
        sectionComplete = false;
      }
    });
    
    if (sectionComplete && inputs.length > 0) {
      completedSections++;
    }
  });
  
  const totalSections = sections.length;
  const percentage = (completedSections / totalSections) * 100;
  
  document.getElementById('progressFill').style.width = percentage + '%';
  document.getElementById('progressText').textContent = `Progress: ${completedSections}/${totalSections} sections completed`;
}

// Save draft functionality
function saveDraft() {
  const form = document.getElementById('propertyForm');
  const formData = {};
  
  // Get all form inputs
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (input.type === 'file') {
      // Skip file inputs (can't save to localStorage)
      return;
    } else if (input.type === 'checkbox') {
      if (!formData[input.name]) {
        formData[input.name] = [];
      }
      if (input.checked) {
        formData[input.name].push(input.value);
      }
    } else if (input.type === 'radio') {
      if (input.checked) {
        formData[input.name] = input.value;
      }
    } else {
      formData[input.name] = input.value;
    }
  });
  
  // Save to a variable instead of localStorage (due to sandbox restrictions)
  window.savedDraft = JSON.stringify(formData);
  window.savedDraftTime = new Date().toISOString();
  
  alert('Draft saved successfully! Note: Draft will be cleared if you close this page.');
}

// Load draft functionality
function loadDraft() {
  if (!window.savedDraft) {
    alert('No saved draft found.');
    return;
  }
  
  const savedTime = window.savedDraftTime ? new Date(window.savedDraftTime).toLocaleString() : 'Unknown';
  
  if (!confirm(`Load draft saved at ${savedTime}?`)) {
    return;
  }
  
  try {
    const formData = JSON.parse(window.savedDraft);
    const form = document.getElementById('propertyForm');
    
    // Restore form values
    Object.keys(formData).forEach(name => {
      const value = formData[name];
      const elements = form.querySelectorAll(`[name="${name}"]`);
      
      elements.forEach(element => {
        if (element.type === 'checkbox') {
          element.checked = Array.isArray(value) && value.includes(element.value);
        } else if (element.type === 'radio') {
          element.checked = element.value === value;
        } else {
          element.value = value;
        }
      });
    });
    
    // Trigger change events to update conditional fields
    toggleCleaningFields();
    toggleKitchenInventory();
    toggleWelcomePack();
    togglePhotographyFields();
    updateProgress();
    
    alert('Draft loaded successfully!');
  } catch (e) {
    alert('Error loading draft: ' + e.message);
  }
}

// Auto-save functionality
function startAutoSave() {
  // Auto-save every 2 minutes (silently)
  autoSaveInterval = setInterval(() => {
    const form = document.getElementById('propertyForm');
    const formData = {};
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'file') {
        return;
      } else if (input.type === 'checkbox') {
        if (!formData[input.name]) {
          formData[input.name] = [];
        }
        if (input.checked) {
          formData[input.name].push(input.value);
        }
      } else if (input.type === 'radio') {
        if (input.checked) {
          formData[input.name] = input.value;
        }
      } else {
        formData[input.name] = input.value;
      }
    });
    
    window.savedDraft = JSON.stringify(formData);
    window.savedDraftTime = new Date().toISOString();
  }, 120000); // 2 minutes = 120000 milliseconds
}

// Stop auto-save (if needed)
function stopAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
}