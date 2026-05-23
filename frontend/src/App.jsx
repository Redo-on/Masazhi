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

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Masazhi</h1>
        <nav>
          <button className={activeView === 'products' ? 'active' : ''} onClick={() => setActiveView('products')}>
            Produktet
          </button>
          <button className={activeView === 'sales' ? 'active' : ''} onClick={() => setActiveView('sales')}>
            Shitjet e Produkteve
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {activeView === 'products' ? (
          <>
            <ProduktetForm selected={selectedProduct} onSaved={handleProductSaved} onCancel={() => setSelectedProduct(null)} />
            <ProduktetList refreshKey={productRefreshKey} onEdit={setSelectedProduct} />
          </>
        ) : (
          <>
            <ShitjetForm selected={selectedSale} onSaved={handleSaleSaved} onCancel={() => setSelectedSale(null)} />
            <ShitjetList refreshKey={saleRefreshKey} onEdit={setSelectedSale} />
          </>
        )}
      </main>
    </div>
  )
}

export default App