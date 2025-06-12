import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css';
import { Toaster } from "react-hot-toast";
import { fetchBooks } from "./api/book";
import NotFound from './pages/NotFound';
import Dashborad from './pages/Dashborad';

const queryClient = new QueryClient();
function App() {
  // useEffect(() => {
  //   const loadBooks = async () => {
  //     await fetchBooks();
  //   }
  //   loadBooks();

  // }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Dashborad />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' />
    </QueryClientProvider>
  );
}

export default App;
