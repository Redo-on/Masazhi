import { useState } from 'react'
import './App.css'
import ProduktetForm from './components/ProduktetForm.jsx'
import ProduktetList from './components/ProduktetList.jsx'
import RegjistrimetForm from './components/RegjistrimetForm.jsx'
import RegjistrimetList from './components/RegjistrimetList.jsx'
import PagesatForm from './components/PagesatForm.jsx'
import PagesatList from './components/PagesatList.jsx'
import ShitjetForm from './components/ShitjetForm.jsx'
import ShitjetList from './components/ShitjetList.jsx'
import OrariForm from './components/OrariForm.jsx'
import OrariList from './components/OrariList.jsx'
import SallatForm from './components/SallatForm.jsx'
import SallatList from './components/SallatList.jsx'
import WorkshopetForm from './components/WorkshopetForm.jsx'
import WorkshopetList from './components/WorkshopetList.jsx'
import RegjistrimWorkshopForm from './components/RegjistrimWorkshopForm.jsx'
import RegjistrimWorkshopList from './components/RegjistrimWorkshopList.jsx'

function App() {
  const [activeView, setActiveView] = useState('products')
  const [productRefreshKey, setProductRefreshKey] = useState(0)
  const [saleRefreshKey, setSaleRefreshKey] = useState(0)
  const [registrationRefreshKey, setRegistrationRefreshKey] = useState(0)
  const [paymentRefreshKey, setPaymentRefreshKey] = useState(0)
  const [orariRefreshKey, setOrariRefreshKey] = useState(0)
  const [sallaRefreshKey, setSallaRefreshKey] = useState(0)
  const [workshopRefreshKey, setWorkshopRefreshKey] = useState(0)
  const [regjistrimWorkshopRefreshKey, setRegjistrimWorkshopRefreshKey] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSale, setSelectedSale] = useState(null)
  const [selectedOrar, setSelectedOrar] = useState(null)
  const [selectedSalla, setSelectedSalla] = useState(null)
  const [selectedWorkshop, setSelectedWorkshop] = useState(null)
  const [selectedRegjistrimWorkshop, setSelectedRegjistrimWorkshop] = useState(null)

  const handleProductSaved = () => {
    setSelectedProduct(null)
    setProductRefreshKey((prev) => prev + 1)
  }

  const handleSaleSaved = () => {
    setSelectedSale(null)
    setSaleRefreshKey((prev) => prev + 1)
  }

  const handleWorkshopSaved = () => {
    setSelectedWorkshop(null)
    setWorkshopRefreshKey((prev) => prev + 1)
  }

  const handleRegjistrimWorkshopSaved = () => {
    setSelectedRegjistrimWorkshop(null)
    setRegjistrimWorkshopRefreshKey((prev) => prev + 1)
  }

  const handleRegjistrimSaved = () => {
    setRegistrationRefreshKey((prev) => prev + 1)
  }

  const handlePagesaSaved = () => {
    setPaymentRefreshKey((prev) => prev + 1)
  }

  const pageTitle =
    activeView === 'products'
      ? 'Produktet'
      : activeView === 'sallat'
      ? 'Sallat'
      : activeView === 'orari'
      ? 'Orari'
      : activeView === 'workshops'
      ? 'Workshopet'
      : activeView === 'regjistrimworkshop'
      ? 'Regjistrimet Workshop'
      : activeView === 'sales'
      ? 'Shitjet e Produkteve'
      : activeView === 'regjistrime'
      ? 'Regjistrimet'
      : 'Pagesat'

  const pageSubtitle =
    activeView === 'products'
      ? 'Menaxhoni produktet e qendrës suaj të meditimit dhe ruani artikujt në stok.'
      : activeView === 'sallat'
      ? 'Menaxhoni sallat, kapacitetin dhe pajisjet.'
      : activeView === 'orari'
      ? 'Menaxhoni oraret e klasave, sallat dhe kohët e tyre.'
      : activeView === 'workshops'
      ? 'Menaxhoni workshop-et, instruktorët dhe regjistrimet e tyre.'
      : activeView === 'regjistrimworkshop'
      ? 'Menaxhoni regjistrimet e anëtarëve në workshop-e.'
      : activeView === 'sales'
      ? 'Regjistroni shitjet e produkteve dhe ndiqni transaksionet me anëtarët.'
      : activeView === 'regjistrime'
      ? 'Regjistroni anëtarët në oraret e klasave dhe ndiqni statusin e regjistrimit.'
      : 'Menaxhoni pagesat e anëtarëve dhe ndiqni transaksionet për abonimet dhe regjistrimet.'

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
            <button
              className={activeView === 'products' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('products')}
            >
              Produktet
            </button>
            <button
              className={activeView === 'orari' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('orari')}
            >
              Orari
            </button>
            <button
              className={activeView === 'workshops' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('workshops')}
            >
              Workshopet
            </button>
            <button
              className={activeView === 'regjistrimworkshop' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('regjistrimworkshop')}
            >
              Regjistrime Workshop
            </button>
            <button
              className={activeView === 'sallat' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('sallat')}
            >
              Sallat
            </button>
            <button
              className={activeView === 'sales' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('sales')}
            >
              Shitjet e Produkteve
            </button>
            <button
              className={activeView === 'regjistrime' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('regjistrime')}
            >
              Regjistrimet
            </button>
            <button
              className={activeView === 'pagesat' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('pagesat')}
            >
              Pagesat
            </button>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>{pageTitle}</h1>
            <p className="page-copy">{pageSubtitle}</p>
          </div>
          <div className="header-actions">
            <button
              className={activeView === 'products' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('products')}
            >
              Produktet
            </button>
            <button
              className={activeView === 'sales' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('sales')}
            >
              Shitjet
            </button>
            <button
              className={activeView === 'orari' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('orari')}
            >
              Orari
            </button>
            <button
              className={activeView === 'workshops' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('workshops')}
            >
              Workshopet
            </button>
            <button
              className={activeView === 'regjistrimworkshop' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('regjistrimworkshop')}
            >
              Regjistrime Workshop
            </button>
            <button
              className={activeView === 'sallat' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('sallat')}
            >
              Sallat
            </button>
            <button
              className={activeView === 'regjistrime' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('regjistrime')}
            >
              Regjistrimet
            </button>
            <button
              className={activeView === 'pagesat' ? 'button button-secondary active-pill' : 'button button-secondary muted'}
              onClick={() => setActiveView('pagesat')}
            >
              Pagesat
            </button>
          </div>
        </div>

        <div className="content-grid">
          <section className="content-main">
            {activeView === 'products' ? (
              <ProduktetList refreshKey={productRefreshKey} onEdit={setSelectedProduct} />
            ) : activeView === 'sallat' ? (
              <SallatList refreshKey={sallaRefreshKey} onEdit={setSelectedSalla} />
            ) : activeView === 'orari' ? (
              <OrariList refreshKey={orariRefreshKey} onEdit={setSelectedOrar} />
            ) : activeView === 'workshops' ? (
              <WorkshopetList refreshKey={workshopRefreshKey} onEdit={setSelectedWorkshop} />
            ) : activeView === 'regjistrimworkshop' ? (
              <RegjistrimWorkshopList refreshKey={regjistrimWorkshopRefreshKey} onEdit={setSelectedRegjistrimWorkshop} />
            ) : activeView === 'sales' ? (
              <ShitjetList refreshKey={saleRefreshKey} onEdit={setSelectedSale} />
            ) : activeView === 'regjistrime' ? (
              <RegjistrimetList refreshKey={registrationRefreshKey} />
            ) : (
              <PagesatList refreshKey={paymentRefreshKey} />
            )}
          </section>

          <aside className="content-panel">
            {activeView === 'products' ? (
              <ProduktetForm selected={selectedProduct} onSaved={handleProductSaved} onCancel={() => setSelectedProduct(null)} />
            ) : activeView === 'sallat' ? (
              <SallatForm selected={selectedSalla} onSaved={() => { setSelectedSalla(null); setSallaRefreshKey((p) => p + 1); }} onCancel={() => setSelectedSalla(null)} />
            ) : activeView === 'orari' ? (
              <OrariForm selected={selectedOrar} onSaved={() => { setSelectedOrar(null); setOrariRefreshKey((p) => p + 1); }} onCancel={() => setSelectedOrar(null)} />
            ) : activeView === 'workshops' ? (
              <WorkshopetForm selected={selectedWorkshop} onSaved={handleWorkshopSaved} onCancel={() => setSelectedWorkshop(null)} />
            ) : activeView === 'regjistrimworkshop' ? (
              <RegjistrimWorkshopForm selected={selectedRegjistrimWorkshop} onSaved={handleRegjistrimWorkshopSaved} onCancel={() => setSelectedRegjistrimWorkshop(null)} />
            ) : activeView === 'sales' ? (
              <ShitjetForm selected={selectedSale} onSaved={handleSaleSaved} onCancel={() => setSelectedSale(null)} />
            ) : activeView === 'regjistrime' ? (
              <RegjistrimetForm onSaved={handleRegjistrimSaved} />
            ) : (
              <PagesatForm onSaved={handlePagesaSaved} />
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App