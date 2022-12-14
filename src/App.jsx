import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/project/:id' element={<Project />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;