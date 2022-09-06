import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;