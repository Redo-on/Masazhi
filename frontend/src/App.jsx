import { useState } from 'react'
import './App.css'
import ProduktetForm from './components/ProduktetForm.jsx'
import ProduktetList from './components/ProduktetList.jsx'
import ShitjetForm from './components/ShitjetForm.jsx'
import ShitjetList from './components/ShitjetList.jsx'

function App() {
  const [activeView, setActiveView] = useState('products')
  const [productRefreshKey, setProductRefreshKey] = useState(0)
  const [saleRefreshKey, setSaleRefreshKey] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSale, setSelectedSale] = useState(null)

  const handleProductSaved = () => {
    setSelectedProduct(null)
    setProductRefreshKey((prev) => prev + 1)
  }

  const handleSaleSaved = () => {
    setSelectedSale(null)
    setSaleRefreshKey((prev) => prev + 1)
  }

  const pageTitle = activeView === 'products' ? 'Produktet' : 'Shitjet e Produkteve'
  const pageSubtitle =
    activeView === 'products'
      ? 'Menaxhoni produktet e qendrës suaj të meditimit dhe ruani artikujt në stok.'
      : 'Regjistroni shitjet e produkteve dhe ndiqni transaksionet me anëtarët.'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">M</div>
          <div>
            <p className="brand-name">Masazhi</p>
            <p className="brand-text">Menaxhim qendre</p>
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
              className={activeView === 'sales' ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveView('sales')}
            >
              Shitjet e Produkteve
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
          </div>
        </div>

        <div className="content-grid">
          <section className="content-main">
            {activeView === 'products' ? (
              <ProduktetList refreshKey={productRefreshKey} onEdit={setSelectedProduct} />
            ) : (
              <ShitjetList refreshKey={saleRefreshKey} onEdit={setSelectedSale} />
            )}
          </section>

          <aside className="content-panel">
            {activeView === 'products' ? (
              <ProduktetForm selected={selectedProduct} onSaved={handleProductSaved} onCancel={() => setSelectedProduct(null)} />
            ) : (
              <ShitjetForm selected={selectedSale} onSaved={handleSaleSaved} onCancel={() => setSelectedSale(null)} />
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App