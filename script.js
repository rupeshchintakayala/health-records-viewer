// Global variables
let patientsData = [];

// DOM elements
const searchForm = document.getElementById('searchForm');
const patientIdInput = document.getElementById('patientId');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const patientResults = document.getElementById('patientResults');
const patientProfile = document.getElementById('patientProfile');
const patientVitals = document.getElementById('patientVitals');
const doctorNotes = document.getElementById('doctorNotes');

// Add Patient Modal elements
const addPatientBtn = document.getElementById('addPatientBtn');
const addPatientModal = document.getElementById('addPatientModal');
const closeModal = document.getElementById('closeModal');
const cancelAddPatient = document.getElementById('cancelAddPatient');
const addPatientForm = document.getElementById('addPatientForm');

// Load patient data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('patients.json');
        if (!response.ok) {
            throw new Error('Failed to load patient data');
        }
        patientsData = await response.json();
        console.log('Patient data loaded successfully:', patientsData.length, 'patients');
    } catch (error) {
        console.error('Error loading patient data:', error);
        showError('Failed to load patient database. Please refresh the page and try again.');
    }
});

// Handle form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const patientId = patientIdInput.value.trim().toUpperCase();
    
    if (!patientId) {
        patientIdInput.focus();
        return;
    }
    
    searchPatient(patientId);
});

// Modal event listeners
addPatientBtn.addEventListener('click', function() {
    showAddPatientModal();
});

closeModal.addEventListener('click', function() {
    hideAddPatientModal();
});

cancelAddPatient.addEventListener('click', function() {
    hideAddPatientModal();
});

// Close modal when clicking outside
addPatientModal.addEventListener('click', function(e) {
    if (e.target === addPatientModal) {
        hideAddPatientModal();
    }
});

// Handle add patient form submission
addPatientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addNewPatient();
});

// Search for patient by ID
function searchPatient(patientId) {
    showLoading();
    hideError();
    hideResults();
    
    // Simulate a small delay for better UX
    setTimeout(() => {
        const patient = patientsData.find(p => p.patient_id.toUpperCase() === patientId);
        
        if (patient) {
            displayPatient(patient);
        } else {
            showError();
        }
        
        hideLoading();
    }, 500);
}

// Display patient information
function displayPatient(patient) {
    displayPatientProfile(patient);
    displayPatientVitals(patient);
    displayDoctorNotes(patient);
    showResults();
}

// Display patient profile information
function displayPatientProfile(patient) {
    patientProfile.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="flex items-center">
                    <div class="bg-blue-100 rounded-full p-3 mr-4">
                        <i class="fas fa-id-card text-blue-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Patient ID</p>
                        <p class="font-semibold text-lg">${patient.patient_id}</p>
                    </div>
                </div>
                
                <div class="flex items-center">
                    <div class="bg-green-100 rounded-full p-3 mr-4">
                        <i class="fas fa-user text-green-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Full Name</p>
                        <p class="font-semibold text-lg">${patient.name}</p>
                    </div>
                </div>
                
                <div class="flex items-center">
                    <div class="bg-purple-100 rounded-full p-3 mr-4">
                        <i class="fas fa-calendar-alt text-purple-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Age</p>
                        <p class="font-semibold text-lg">${patient.age} years</p>
                    </div>
                </div>
                
                <div class="flex items-center">
                    <div class="bg-red-100 rounded-full p-3 mr-4">
                        <i class="fas fa-tint text-red-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Blood Group</p>
                        <p class="font-semibold text-lg">${patient.blood_group}</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-start">
                    <div class="bg-indigo-100 rounded-full p-3 mr-4 mt-1">
                        <i class="fas fa-hospital text-indigo-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Department</p>
                        <p class="font-semibold text-lg">${patient.department}</p>
                    </div>
                </div>
                
                <div class="flex items-start">
                    <div class="bg-yellow-100 rounded-full p-3 mr-4 mt-1">
                        <i class="fas fa-map-marker-alt text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Address</p>
                        <p class="font-medium">${patient.address}</p>
                    </div>
                </div>
                
                <div class="flex items-start">
                    <div class="bg-orange-100 rounded-full p-3 mr-4 mt-1">
                        <i class="fas fa-history text-orange-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Past Medical History</p>
                        <p class="font-medium">${patient.past_history}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Display patient vitals
function displayPatientVitals(patient) {
    patientVitals.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-red-600 text-sm font-medium">Blood Pressure</p>
                        <p class="text-2xl font-bold text-red-700">${patient.bp}</p>
                    </div>
                    <div class="bg-red-200 rounded-full p-2">
                        <i class="fas fa-heartbeat text-red-600"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-blue-600 text-sm font-medium">SpO2</p>
                        <p class="text-2xl font-bold text-blue-700">${patient.spo2}</p>
                    </div>
                    <div class="bg-blue-200 rounded-full p-2">
                        <i class="fas fa-lungs text-blue-600"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-green-600 text-sm font-medium">Pulse Rate</p>
                        <p class="text-2xl font-bold text-green-700">${patient.pr}</p>
                    </div>
                    <div class="bg-green-200 rounded-full p-2">
                        <i class="fas fa-heart text-green-600"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-yellow-600 text-sm font-medium">Temperature</p>
                        <p class="text-2xl font-bold text-yellow-700">${patient.temperature}</p>
                    </div>
                    <div class="bg-yellow-200 rounded-full p-2">
                        <i class="fas fa-thermometer-half text-yellow-600"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6 border">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <i class="fas fa-user-nurse text-indigo-600 mr-2"></i>
                Nurse Assessment
            </h3>
            <div class="space-y-3">
                <div>
                    <p class="text-sm text-gray-600">Nurse Note</p>
                    <p class="text-gray-800 font-medium">${patient.nurse_note}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Recorded by</p>
                    <p class="text-indigo-600 font-medium">${patient.nurse_name}</p>
                </div>
            </div>
        </div>
    `;
}

// Display doctor notes
function displayDoctorNotes(patient) {
    if (!patient.doctor_notes || patient.doctor_notes.length === 0) {
        doctorNotes.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-clipboard text-4xl mb-4"></i>
                <p>No doctor notes available for this patient.</p>
            </div>
        `;
        return;
    }

    const notesHtml = patient.doctor_notes
        .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
        .map((note, index) => {
            const date = new Date(note.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            return `
                <div class="border border-gray-200 rounded-lg p-6 ${index === 0 ? 'border-purple-300 bg-purple-50' : 'bg-white'}">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center">
                            <div class="bg-purple-100 rounded-full p-2 mr-3">
                                <i class="fas fa-user-md text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800">${note.doctor_name}</h4>
                                <p class="text-sm text-gray-600">${formattedDate} at ${note.time}</p>
                            </div>
                        </div>
                        ${index === 0 ? '<span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Latest</span>' : ''}
                    </div>
                    <div class="bg-white rounded-md p-4 border-l-4 border-purple-400">
                        <p class="text-gray-700 leading-relaxed">${note.note}</p>
                    </div>
                </div>
            `;
        })
        .join('');

    doctorNotes.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600">
                    <i class="fas fa-clock mr-1"></i>
                    ${patient.doctor_notes.length} note${patient.doctor_notes.length !== 1 ? 's' : ''} available
                </p>
            </div>
            ${notesHtml}
        </div>
    `;
}

// Utility functions
function showLoading() {
    loadingDiv.classList.remove('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(customMessage = null) {
    if (customMessage) {
        const errorContent = errorMessage.querySelector('div > div > div > p');
        errorContent.textContent = customMessage;
    }
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showResults() {
    patientResults.classList.remove('hidden');
}

function hideResults() {
    patientResults.classList.add('hidden');
}

// Add some keyboard shortcuts for better UX
document.addEventListener('keydown', function(e) {
    // Focus search input when pressing '/' key
    if (e.key === '/' && document.activeElement !== patientIdInput) {
        e.preventDefault();
        patientIdInput.focus();
        patientIdInput.select();
    }
    
    // Clear search when pressing Escape
    if (e.key === 'Escape') {
        patientIdInput.value = '';
        hideError();
        hideResults();
        patientIdInput.focus();
    }
});

// Add input formatting for patient ID
patientIdInput.addEventListener('input', function(e) {
    // Convert to uppercase as user types
    e.target.value = e.target.value.toUpperCase();
});

// Modal functions
function showAddPatientModal() {
    addPatientModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    // Focus on first input
    document.getElementById('newPatientId').focus();
}

function hideAddPatientModal() {
    addPatientModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Reset form
    addPatientForm.reset();
}

// Add new patient function
function addNewPatient() {
    const formData = new FormData(addPatientForm);
    
    // Validate required fields
    const requiredFields = ['patient_id', 'name', 'age', 'blood_group', 'department', 'address'];
    const missingFields = [];
    
    for (const field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            missingFields.push(field);
        }
    }
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Check if patient ID already exists
    const patientId = formData.get('patient_id').toUpperCase();
    const existingPatient = patientsData.find(p => p.patient_id.toUpperCase() === patientId);
    
    if (existingPatient) {
        alert('Patient ID already exists. Please use a different ID.');
        return;
    }
    
    // Create new patient object
    const newPatient = {
        patient_id: patientId,
        name: formData.get('name').trim(),
        age: parseInt(formData.get('age')),
        blood_group: formData.get('blood_group'),
        department: formData.get('department'),
        address: formData.get('address').trim(),
        past_history: formData.get('past_history')?.trim() || 'No significant medical history',
        bp: formData.get('bp')?.trim() || 'Not recorded',
        spo2: formData.get('spo2')?.trim() || 'Not recorded',
        pr: formData.get('pr')?.trim() || 'Not recorded',
        temperature: formData.get('temperature')?.trim() || 'Not recorded',
        nurse_note: formData.get('nurse_note')?.trim() || 'Initial assessment pending',
        nurse_name: formData.get('nurse_name')?.trim() || 'Not assigned',
        doctor_notes: [] // Start with empty doctor notes array
    };
    
    // Add to patients data
    patientsData.push(newPatient);
    
    // Show success message
    showSuccessMessage(`Patient ${newPatient.name} (${newPatient.patient_id}) has been successfully added to the system.`);
    
    // Hide modal
    hideAddPatientModal();
    
    // Optionally display the newly added patient
    displayPatient(newPatient);
    
    console.log('New patient added:', newPatient);
    console.log('Total patients:', patientsData.length);
}

// Success message function
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-3"></i>
            <div>
                <h4 class="font-semibold">Success!</h4>
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

// Auto-generate next patient ID
function generateNextPatientId() {
    const existingIds = patientsData.map(p => p.patient_id);
    let maxNum = 0;
    
    existingIds.forEach(id => {
        const match = id.match(/P(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxNum) {
                maxNum = num;
            }
        }
    });
    
    return `P${String(maxNum + 1).padStart(3, '0')}`;
}

// Set suggested patient ID when modal opens
addPatientBtn.addEventListener('click', function() {
    setTimeout(() => {
        const suggestedId = generateNextPatientId();
        document.getElementById('newPatientId').value = suggestedId;
    }, 100);
});

