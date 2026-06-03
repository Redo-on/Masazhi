import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Masazhi Management System</h1>
        <p>Select an option below to manage your data</p>
      </header>
      <div className="dashboard-cards">
        {/* Entity cards */}
        <div className="card">
          <Link to="/anetaret" className="card-link">
            <div className="card-icon">👥</div>
            <h3>Anetarët</h3>
            <p>Manage members</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/instruktoret" className="card-link">
            <div className="card-icon">🎯</div>
            <h3>Instruktorët</h3>
            <p>Manage instructors</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/klasat" className="card-link">
            <div className="card-icon">🏫</div>
            <h3>Klasat</h3>
            <p>Manage classes</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/anetaresimet" className="card-link">
            <div className="card-icon">📄</div>
            <h3>Anetarësimet</h3>
            <p>Manage subscriptions</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/pagesat" className="card-link">
            <div className="card-icon">💰</div>
            <h3>Pagesat</h3>
            <p>Manage payments</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/orari" className="card-link">
            <div className="card-icon">📅</div>
            <h3>Orari</h3>
            <p>Manage schedule</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/produktet" className="card-link">
            <div className="card-icon">📦</div>
            <h3>Produktet</h3>
            <p>Manage products</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/regjistrimet" className="card-link">
            <div className="card-icon">📝</div>
            <h3>Regjistrimet</h3>
            <p>Manage registrations</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/regjrimworkshop" className="card-link">
            <div className="card-icon">🔧</div>
            <h3>Regjistrim Workshop</h3>
            <p>Manage workshop registrations</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/sallat" className="card-link">
            <div className="card-icon">🏊</div>
            <h3>Sallat</h3>
            <p>Manage halls</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/shitjet" className="card-link">
            <div className="card-icon">🛒</div>
            <h3>Shitjet</h3>
            <p>Manage sales</p>
          </Link>
        </div>
        <div className="card">
          <Link to="/workshopet" className="card-link">
            <div className="card-icon">🔨</div>
            <h3>Workshopet</h3>
            <p>Manage workshops</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;