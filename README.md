# Health Tracker - Patient Data Management System

A static HTML + JavaScript website for managing and viewing patient health records. This application loads patient data from a local JSON file and provides a search interface to find and display patient information.

## Features

- **Patient Search**: Search for patients by their unique Patient ID
- **Patient Profile**: View comprehensive patient information including demographics and medical history
- **Latest Vitals**: Display current vital signs with visual indicators
- **Doctor Notes**: Show chronological list of doctor notes with timestamps
- **Responsive Design**: Mobile-friendly interface using TailwindCSS
- **Static Deployment**: No backend required - can be hosted on GitHub Pages

## File Structure

```
health-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow for automatic deployment
├── index.html          # Main HTML file with search interface
├── script.js           # JavaScript for search functionality and data display
├── patients.json       # Sample patient data
└── README.md          # This documentation file
```

## Patient Data Format

The `patients.json` file contains an array of patient objects with the following structure:

```json
{
  "patient_id": "P001",
  "name": "John Smith",
  "age": 45,
  "blood_group": "O+",
  "department": "Cardiology",
  "address": "123 Main Street, New York, NY 10001",
  "past_history": "Hypertension, Type 2 Diabetes, Previous MI in 2019",
  "bp": "140/90",
  "spo2": "98%",
  "pr": "72 bpm",
  "temperature": "98.6°F",
  "nurse_note": "Patient stable, compliant with medications.",
  "nurse_name": "Sarah Johnson, RN",
  "doctor_notes": [
    {
      "date": "2024-01-15",
      "time": "09:30 AM",
      "doctor_name": "Dr. Michael Chen",
      "note": "Patient presents with chest discomfort..."
    }
  ]
}
```

## Sample Patient IDs

The application comes with 5 sample patients you can search for:

- **P001** - John Smith (Cardiology)
- **P002** - Maria Garcia (Obstetrics & Gynecology)
- **P003** - Robert Johnson (Orthopedics)
- **P004** - Lisa Chen (Emergency Medicine)
- **P005** - David Brown (Gastroenterology)

## Usage

1. **Local Development**:
   - Open `index.html` in a web browser
   - Or serve the files using a local web server (recommended for proper JSON loading)

2. **Using Python's built-in server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then visit `http://localhost:8000`

3. **Using Node.js serve**:
   ```bash
   npx serve .
   ```

4. **Search for Patients**:
   - Enter a Patient ID (e.g., P001) in the search box
   - Click "Search Patient" or press Enter
   - View the patient's profile, vitals, and doctor notes

## Keyboard Shortcuts

- **/** - Focus the search input
- **Escape** - Clear search and hide results

## Deployment to GitHub Pages

### Automatic Deployment with GitHub Actions (Recommended)

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages:

1. **Create a new GitHub repository**
2. **Push all files to the repository** (including the `.github/workflows/deploy.yml` file)
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
4. **Automatic deployment**: The site will automatically deploy on every push to the `main` branch
5. **Access your site**: Available at `https://yourusername.github.io/repository-name`

### Manual Deployment (Alternative)

If you prefer manual deployment:

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Workflow Features

The GitHub Actions workflow (`deploy.yml`) provides:
- ✅ Automatic deployment on push to main branch
- ✅ Manual deployment trigger from Actions tab
- ✅ Proper permissions and security settings
- ✅ Concurrent deployment protection

## Customization

### Adding New Patients

Edit the `patients.json` file to add new patient records. Follow the existing data structure format.

### Modifying Styles

The application uses TailwindCSS via CDN. You can:
- Modify the HTML classes to change styling
- Add custom CSS in the `<head>` section of `index.html`
- Replace TailwindCSS with a local build for more customization

### Extending Functionality

- Add more search filters (by name, department, etc.)
- Implement patient data editing capabilities
- Add data export functionality
- Include charts for vital signs trends

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses ES6+ features (async/await, arrow functions)

## Security Notes

- This is a client-side only application
- Patient data is stored in plain text JSON
- Not suitable for production use with real patient data
- Consider encryption and proper security measures for real healthcare applications

## License

This project is open source and available under the MIT License.
