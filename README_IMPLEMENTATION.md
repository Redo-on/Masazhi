# Masazhi - Meditation & Yoga Center Management System

## Project Overview
This is a complete N-layered .NET backend with React frontend for managing a meditation and yoga center, including classes, instructors, members, schedules, products, and product sales.

## Implementation Summary

### Backend Implementation (C# .NET 8.0)

#### Architecture
- **MyApp.Domain**: Core entities and DbContext
- **MyApp.Application**: Business logic, interfaces, and services
- **MyApp.Infrastructure**: Data access configuration
- **MyApp.API**: ASP.NET Core REST API with controllers

#### Implemented Services for Products (Produktet) and Product Sales (Shitjet_Produkteve)

**ProduktetService**
- CRUD operations for products
- Features:
  - Get all products
  - Get product by ID
  - Create new product
  - Update existing product
  - Delete product

**ShitjetProdukteveService**
- CRUD operations for product sales
- Features:
  - Get all sales with related data (members, products)
  - Get sale by ID
  - Get sales by member (anetar)
  - Get sales by product
  - Create new sale
  - Update existing sale
  - Delete sale

#### API Endpoints

**Products (Produktet)**
- `GET /api/Produktet` - Get all products
- `GET /api/Produktet/{id}` - Get product by ID
- `POST /api/Produktet` - Create product
- `PUT /api/Produktet/{id}` - Update product
- `DELETE /api/Produktet/{id}` - Delete product

**Product Sales (Shitjet_Produkteve)**
- `GET /api/ShitjetProdukteve` - Get all sales
- `GET /api/ShitjetProdukteve/{id}` - Get sale by ID
- `POST /api/ShitjetProdukteve` - Create sale
- `PUT /api/ShitjetProdukteve/{id}` - Update sale
- `DELETE /api/ShitjetProdukteve/{id}` - Delete sale

#### Database Configuration
- **Database**: MySQL
- **Connection String**: Configured in `appsettings.json`
- **Default**: `Server=localhost;Port=3306;Database=masazhi_db;User=root;Password=;`

### Frontend Implementation (React + Vite)

#### Components Created

1. **Sidebar.jsx**
   - Navigation menu with sections
   - Active state management
   - Clean, professional design matching the theme

2. **ProduktetList.jsx**
   - Display all products in a table
   - Search functionality
   - Edit and delete operations
   - Stock status indicators

3. **ProduktetForm.jsx**
   - Add new product form
   - Edit existing product form
   - Form validation
   - Category selection

4. **ShitjetList.jsx**
   - Display all product sales in a table
   - Search functionality
   - Member and product information
   - Date display
   - Edit and delete operations

5. **ShitjetForm.jsx**
   - Record new product sale
   - Edit existing sale
   - Member ID input
   - Product selection dropdown
   - Sale date and total price

#### Styling Theme
- **Primary Color**: Teal Green (#16a34a) - Matching meditation/yoga theme
- **Professional Layout**: Clean sidebar navigation
- **Responsive Design**: Table layouts, form inputs
- **Color Scheme**:
  - Success (Green): #10b981
  - Danger (Red): #dc2626
  - Warning (Orange): #f59e0b
  - Background: Light gray (#f8fafc)

#### API Integration
- Axios for HTTP requests
- Centralized API service (`services/api.js`)
- Base URL: `http://localhost:5000/api`
- CORS enabled for React development server (port 5173)

### Directory Structure

```
Backend/
├── MyApp.API/
│   ├── Controllers/
│   │   ├── ProduktetController.cs
│   │   └── ShitjetProdukteveController.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── MyApp.API.csproj
├── MyApp.Application/
│   ├── Interfaces/
│   │   ├── IProduktetService.cs
│   │   └── IShitjetProdukteveService.cs
│   ├── Services/
│   │   ├── ProduktetService.cs
│   │   └── ShitjetProdukteveService.cs
│   └── MyApp.Application.csproj
├── MyApp.Domain/
│   ├── Produktet.cs
│   ├── Shitjet_Produkteve.cs
│   ├── AppDbContext.cs
│   └── [Other domain entities]
└── MyApp.Infrastructure/
    ├── AppDbContext.cs (namespace reference)
    └── MyApp.Infrastructure.csproj

Frontend/
└── src/
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── ProduktetList.jsx
    │   ├── ProduktetForm.jsx
    │   ├── ShitjetList.jsx
    │   ├── ShitjetForm.jsx
    │   └── index.js
    ├── services/
    │   └── api.js
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── [Other files]
```

## Getting Started

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend/MyApp.API
   dotnet restore
   ```

2. **Configure Database**
   - Ensure MySQL is running on localhost:3306
   - Update connection string in `appsettings.json` if needed
   - Run migrations (when available)

3. **Run the API**
   ```bash
   dotnet run
   ```
   - API will be available at `http://localhost:5000`
   - Swagger UI at `http://localhost:5000/swagger`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Frontend will be available at `http://localhost:5173`

## Features Implemented

### Product Management (Produktet)
- ✅ View all products with search
- ✅ Add new products
- ✅ Edit product details
- ✅ Delete products
- ✅ Stock status indicators
- ✅ Category classification

### Product Sales (Shitjet_Produkteve)
- ✅ Record product sales
- ✅ Track sales by member
- ✅ View sale history
- ✅ Edit sale records
- ✅ Delete sales
- ✅ Calculate total sales amounts
- ✅ Date tracking

## Database Schema

### Produktet Table
- `produkti_id` (PK, Auto-increment)
- `emri` (string)
- `pershkrimi` (string)
- `kategoria` (string)
- `cmimi` (decimal)
- `sasia_stok` (int)

### Shitjet_Produkteve Table
- `shitje_id` (PK, Auto-increment)
- `anetar_id` (FK)
- `produkti_id` (FK)
- `sasia` (int)
- `cmimi_total` (decimal)
- `data` (datetime)

## Additional Notes

- All errors have been fixed
- Project follows N-layer architecture best practices
- CORS is configured for React development
- Entity Framework Core with MySQL for data access
- RESTful API design
- Responsive UI with professional styling
- Form validation on frontend

## Next Steps (For Future Development)

1. Add database migrations
2. Implement authentication/authorization
3. Add more advanced filtering and sorting
4. Implement pagination for large datasets
5. Add reporting and analytics
6. Mobile responsive improvements
7. Add unit tests
8. Implement audit logging
