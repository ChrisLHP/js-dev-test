import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import Navebar from './components/Navbar';
import reducer, { initialState } from './store/reducer';
import ShopProvider from './contexts/ShopContext';

const App: FC = () => {
    
    return (
        <div className="min-h-screen flex flex-col">
            <ShopProvider>
                <Navebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/About" element={<About />} />
                </Routes>
            </ShopProvider>
        </div>
    );
}

export default App;
