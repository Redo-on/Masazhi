import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
// Import entity lists and forms
import AnetaretList from './components/AnetaretList';
import AnetaretForm from './components/AnetaretForm';
import InstruktoretList from './components/InstruktoretList';
import InstruktoretForm from './components/InstruktoretForm';
import KlasatList from './components/KlasatList';
import KlasatForm from './components/KlasatForm';
import AnetaresimetList from './components/AnetaresimetList';
import AnetaresimetForm from './components/AnetaresimetForm';
import PagesatList from './components/PagesatList';
import PagesatForm from './components/PagesatForm';
import OrariList from './components/OrariList';
import OrariForm from './components/OrariForm';
import ProduktetList from './components/ProduktetList';
import ProduktetForm from './components/ProduktetForm';
import RegjistrimetList from './components/RegjistrimetList';
import RegjistrimetForm from './components/RegjistrimetForm';
import RegjistrimWorkshopList from './components/RegjistrimWorkshopList';
import RegjistrimWorkshopForm from './components/RegjistrimWorkshopForm';
import SallatList from './components/SallatList';
import SallatForm from './components/SallatForm';
import ShitjetList from './components/ShitjetList';
import ShitjetForm from './components/ShitjetForm';
import WorkshopetList from './components/WorkshopetList';
import WorkshopetForm from './components/WorkshopetForm';

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-name">Masazhi</p>
            <p className="brand-text">Menaxhimi i qendres</p>
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-title">Navigimi</p>
          <nav className="sidebar-nav">
            <Link to="/anetaret" className="nav-button">
              Anetarët
            </Link>
            <Link to="/instruktoret" className="nav-button">
              Instruktorët
            </Link>
            <Link to="/klasat" className="nav-button">
              Klasat
            </Link>
            <Link to="/anetaresimet" className="nav-button">
              Anetarësimet
            </Link>
            <Link to="/pagesat" className="nav-button">
              Pagesat
            </Link>
            <Link to="/orari" className="nav-button">
              Orari
            </Link>
            <Link to="/produktet" className="nav-button">
              Produktet
            </Link>
            <Link to="/regjistrimet" className="nav-button">
              Regjistrimet
            </Link>
            <Link to="/regjirimworkshop" className="nav-button">
              Regjistrim Workshop
            </Link>
            <Link to="/sallat" className="nav-button">
              Sallat
            </Link>
            <Link to="/shitjet" className="nav-button">
              Shitjet
            </Link>
            <Link to="/workshopet" className="nav-button">
              Workshopet
            </Link>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

const EntityPage = ({ ListComponent, FormComponent, entityName, onSaved }) => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleSaved = () => {
    setSelectedItem(null);
    setRefreshKey((prev) => prev + 1);
    if (onSaved) onSaved();
  };

  return (
    <div className="content-grid">
      <section className="content-main">
        <ListComponent 
          refreshKey={refreshKey} 
          onEdit={setSelectedItem} 
        />
      </section>
      <aside className="content-panel">
        {selectedItem ? (
          <FormComponent 
            selected={selectedItem} 
            onSaved={handleSaved} 
            onCancel={() => setSelectedItem(null)} 
          />
        ) : (
          <div className="empty-state">
            <h3>Select an item to edit or create a new one</h3>
            <button 
              onClick={() => setSelectedItem({})} 
              className="button button-secondary"
            >
              Create New {entityName}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                      path="/anetaret" 
                      element={
                        <EntityPage 
                          ListComponent={AnetaretList}
                          FormComponent={AnetaretForm}
                          entityName="Anetar"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/instruktoret" 
                      element={
                        <EntityPage 
                          ListComponent={InstruktoretList}
                          FormComponent={InstruktoretForm}
                          entityName="Instruktor"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/klasat" 
                      element={
                        <EntityPage 
                          ListComponent={KlasatList}
                          FormComponent={KlasatForm}
                          entityName="Klasë"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/anetaresimet" 
                      element={
                        <EntityPage 
                          ListComponent={AnetaresimetList}
                          FormComponent={AnetaresimetForm}
                          entityName="Abonim"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/pagesat" 
                      element={
                        <EntityPage 
                          ListComponent={PagesatList}
                          FormComponent={PagesatForm}
                          entityName="Pagese"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/orari" 
                      element={
                        <EntityPage 
                          ListComponent={OrariList}
                          FormComponent={OrariForm}
                          entityName="Orar"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/produktet" 
                      element={
                        <EntityPage 
                          ListComponent={ProduktetList}
                          FormComponent={ProduktetForm}
                          entityName="Produkt"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/regjistrimet" 
                      element={
                        <EntityPage 
                          ListComponent={RegjistrimetList}
                          FormComponent={RegjistrimetForm}
                          entityName="Regjistrim"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/regjirimworkshop" 
                      element={
                        <EntityPage 
                          ListComponent={RegjistrimWorkshopList}
                          FormComponent={RegjistrimWorkshopForm}
                          entityName="Regjrim Workshop"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/sallat" 
                      element={
                        <EntityPage 
                          ListComponent={SallatList}
                          FormComponent={SallatForm}
                          entityName="Sallë"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/shitjet" 
                      element={
                        <EntityPage 
                          ListComponent={ShitjetList}
                          FormComponent={ShitjetForm}
                          entityName="Shitje"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                    <Route 
                      path="/workshopet" 
                      element={
                        <EntityPage 
                          ListComponent={WorkshopetList}
                          FormComponent={WorkshopetForm}
                          entityName="Workshop"
                          onSaved={() => {/* Optional callback */}}
                        />
                      } 
                    />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;