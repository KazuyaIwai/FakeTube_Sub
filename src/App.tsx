import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './static/css/App.css';
import Home from './views/pages/Home';
import Header from './views/components/organisms/Header';
import Footer from './views/components/organisms/Footer';
import VideoView from './views/pages/VideoView';
import SearchResult from './views/pages/SearchResult';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch" element={<VideoView />} />
            <Route path="/results" element={<SearchResult />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
