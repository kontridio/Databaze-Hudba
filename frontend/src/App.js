import React from 'react'
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './pages/Homepage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Articles from './pages/Articles'; 
import ArticleDetail from './pages/ArticleDetail'; 

// initialize apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});


function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header title="Kapely" motto="Seznam známých kapel" />
        <main className='container'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/kapely/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer copyright={{ projectName: "Ročníkový projekt IT2", projectAuthor: "Tom a Fíla" }} />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
