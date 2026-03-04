# How to Use the Architecture Diagram

## Files Created:

1. **architecture-diagram.drawio** - Draw.io XML file
2. **ARCHITECTURE.md** - Detailed text-based architecture documentation

---

## Opening the Draw.io Diagram

### Option 1: Draw.io Desktop App
1. Download Draw.io from: https://www.drawio.com/
2. Open the app
3. Click "File" → "Open"
4. Select `architecture-diagram.drawio`
5. The diagram will load with all components

### Option 2: Draw.io Web (app.diagrams.net)
1. Go to: https://app.diagrams.net/
2. Click "Open Existing Diagram"
3. Choose "Device" and select `architecture-diagram.drawio`
4. Or drag and drop the file into the browser

### Option 3: VS Code Extension
1. Install "Draw.io Integration" extension in VS Code
2. Open `architecture-diagram.drawio` in VS Code
3. The diagram will render in the editor

---

## Diagram Components

The architecture diagram shows:

### Layers (Top to Bottom):
1. **Client Layer** (Blue)
   - Web Browser

2. **Frontend Layer** (Green)
   - Next.js Portal (Port 3000)
   - App 1: Property Estimator
   - App 2: Market Analysis
   - Shared Components
   - Tailwind CSS

3. **Backend Layer** (Orange)
   - Node.js Backend (Port 5001) - Running
   - Python Backend (Port 8000) - Ready
   - Java Backend - Future (dashed)

4. **Machine Learning Layer** (Purple)
   - Linear Regression Model
   - Standard Scaler
   - k-NN Algorithm

5. **Data Layer** (Gray)
   - House Price Dataset.csv
   - Test Data For Prediction.csv

### Color Coding:
- **Green** = Currently running
- **Blue** = Ready to deploy
- **Red** = Future implementation
- **Solid lines** = Active connections
- **Dashed lines** = Future/optional connections

### Legend:
Located in the bottom right corner explaining all colors and line styles.

---

## Editing the Diagram

### To Modify:
1. Open in Draw.io
2. Click any component to select it
3. Edit text, colors, or position
4. Add new components from the left sidebar
5. Connect components by dragging from connection points
6. Save: File → Save

### To Export:
1. File → Export as → PNG/PDF/SVG
2. Choose resolution and format
3. Save for presentations or documentation

### To Share:
1. File → Export as → URL
2. Share the generated link
3. Or export as PNG/PDF and share the file

---

## Diagram Features

### What's Shown:
✅ Complete system architecture  
✅ All layers and components  
✅ Data flow between components  
✅ Technology stack for each layer  
✅ Port numbers and endpoints  
✅ Current status (running/ready/future)  
✅ Color-coded by implementation status  
✅ Legend for easy understanding  

### Use Cases:
- Interview presentations
- Technical documentation
- Team onboarding
- System design discussions
- Architecture reviews
- Stakeholder presentations

---

## Alternative: Text-Based Architecture

If you prefer text-based documentation, see **ARCHITECTURE.md** which includes:
- Detailed ASCII diagrams
- Component descriptions
- API specifications
- Data flow explanations
- Technology stack details
- Deployment architecture
- Security considerations
- Scalability recommendations

---

## Quick Reference

### Current System Status:
```
✅ Node.js Backend (Port 5001) - RUNNING
✅ Next.js Portal (Port 3000) - RUNNING
⏸️ Python Backend (Port 8000) - READY
🔴 Java Backend - NOT STARTED
```

### Access Points:
- Portal: http://localhost:3000
- API: http://localhost:5001
- Health: http://localhost:5001/api/health

---

## Tips for Presentations

### For Interviews:
1. Open the diagram in Draw.io
2. Walk through each layer from top to bottom
3. Explain the data flow with arrows
4. Highlight what's currently running (green)
5. Discuss future enhancements (red/dashed)
6. Show the legend to explain color coding

### For Documentation:
1. Export as PNG (high resolution)
2. Include in README or wiki
3. Reference in technical docs
4. Use in architecture decision records (ADRs)

### For Team Meetings:
1. Share screen with Draw.io open
2. Use the pointer tool to highlight components
3. Zoom in on specific areas for detail
4. Edit live to show proposed changes

---

## Updating the Diagram

When you make changes to the system:

1. **Add New Components**:
   - Drag shapes from left sidebar
   - Match color scheme (green=running, blue=ready, red=future)
   - Add descriptive text

2. **Update Connections**:
   - Click and drag from connection points
   - Use solid lines for active connections
   - Use dashed lines for future connections

3. **Modify Status**:
   - Change colors when components go live
   - Update text to reflect current state
   - Adjust legend if needed

4. **Save and Export**:
   - Save the .drawio file
   - Export as PNG for documentation
   - Commit to version control

---

## Troubleshooting

### Can't Open File:
- Ensure you're using Draw.io (not another tool)
- Try the web version: app.diagrams.net
- Check file isn't corrupted

### Diagram Looks Wrong:
- Zoom to fit: View → Fit
- Reset view: View → Reset View
- Check layers panel (bottom right)

### Can't Edit:
- Make sure file isn't read-only
- Check you have write permissions
- Try "File → Make a Copy"

---

## Additional Resources

- Draw.io Documentation: https://www.drawio.com/doc/
- Draw.io Tutorials: https://www.youtube.com/c/drawio
- Architecture Patterns: https://www.patterns.dev/

---

**The diagram is ready to use for your interview and documentation needs!** 🎨
