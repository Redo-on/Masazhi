# Quick Start Guide - Masazhi Project

## Prerequisites
- .NET 8.0 SDK
- Node.js & npm
- MySQL Server running

## Step 1: Setup Database

```sql
-- Create the database
CREATE DATABASE masazhi_db;

-- If needed, update the connection string in:
-- backend/MyApp.API/appsettings.json
```

## Step 2: Run the Backend

```bash
cd backend/MyApp.API
dotnet run
```

**Expected Output:**
- Application will start on `http://localhost:5000`
- Swagger UI available at `http://localhost:5000/swagger`
- Look for "Now listening on: http://localhost:5000"

## Step 3: Run the Frontend

In a new terminal:

```bash
cd frontend
npm install  # First time only
npm run dev
```

**Expected Output:**
- Frontend available at `http://localhost:5173`
- Look for "Local: http://localhost:5173"

## Step 4: Access the Application

1. Open browser to `http://localhost:5173`
2. You should see the Masazhi dashboard with:
   - Sidebar navigation (green theme)
   - Three main sections: Dashboard, Products, Sales

## Using the Application

### Products Section
1. Click "📦 Produktet" in sidebar
2. **Add Product**: Click "+ Add Product" button
   - Fill in: Name, Category, Description, Price, Stock
   - Click "Create"
3. **Search**: Use search box to filter products
4. **Edit**: Click "✏️ Edit" button on product row
5. **Delete**: Click "🗑️ Delete" button (with confirmation)

### Product Sales Section
1. Click "💰 Shitjet Produkteve" in sidebar
2. **Record Sale**: Click "+ Record Sale" button
   - Enter Member ID
   - Select Product from dropdown
   - Enter Quantity and Total Price
   - Select Date
   - Click "Record"
3. **Search**: Use search box to filter by member or product
4. **Edit/Delete**: Same as products

## API Testing

Use Swagger UI at `http://localhost:5000/swagger` to test endpoints directly:

**Products Endpoints:**
- GET `/api/Produktet` - List all products
- POST `/api/Produktet` - Create product
- PUT `/api/Produktet/{id}` - Update product
- DELETE `/api/Produktet/{id}` - Delete product

**Sales Endpoints:**
- GET `/api/ShitjetProdukteve` - List all sales
- POST `/api/ShitjetProdukteve` - Record sale
- PUT `/api/ShitjetProdukteve/{id}` - Update sale
- DELETE `/api/ShitjetProdukteve/{id}` - Delete sale

## Troubleshooting

### Frontend shows "No Products Found"
- Check that backend is running on `http://localhost:5000`
- Check browser console for API errors (F12)
- Verify CORS is enabled (should be automatic)

### Database Connection Error
- Ensure MySQL is running: `sudo service mysql start` (Linux/Mac) or check Services (Windows)
- Verify connection string in `appsettings.json`
- Default: `Server=localhost;Port=3306;Database=masazhi_db;User=root;Password=;`

### Backend Won't Start
- Ensure .NET 8.0 is installed: `dotnet --version`
- Run `dotnet restore` in MyApp.API folder
- Check for port 5000 conflicts

### Frontend Won't Start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Check for port 5173 conflicts

## File Structure Notes

```
Masazhi/
├── backend/
│   ├── MyApp.API/          ← Run: dotnet run
│   ├── MyApp.Domain/       ← Entity definitions
│   ├── MyApp.Application/  ← Services & Interfaces
│   └── MyApp.Infrastructure/ ← EF Core config
├── frontend/               ← Run: npm run dev
│   └── src/
│       ├── components/    ← React components
│       └── services/      ← API integration
└── README_IMPLEMENTATION.md ← Full documentation
```

## Development Tips

1. **API Changes**: Backend auto-reloads with dotnet run
2. **Frontend Changes**: Frontend auto-reloads in dev mode
3. **Form Validation**: All fields are required
4. **Search**: Case-insensitive, searches multiple fields
5. **Date Format**: Use browser's date picker

## Color Theme
- Green headers and buttons: #16a34a
- Light background: #f8fafc
- Professional table layout
- Hover effects on rows and buttons

## Support Files
- **Backend Config**: `backend/MyApp.API/appsettings.json`
- **Frontend CSS**: `frontend/src/styles.css`
- **API Service**: `frontend/src/services/api.js`
- **Main App**: `frontend/src/App.jsx`

Enjoy your Masazhi management system! 🧘‍♀️
