import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/book';
import BookTable from '../components/BookTable';
import BookForm from '../components/BookForm';
import ConfirmationModal from '../components/AddModal';
import Filters from '../components/FIlter';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,

  });

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      book.author.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesGenre = 
      filters.genre === '' || book.genre === filters.genre;
    
    const matchesStatus = 
      filters.status === '' || book.status === filters.status;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Book Management Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <Filters 
          filters={filters} 
          setFilters={setFilters} 
          books={books} 
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Book
        </button>
      </div>

      {isLoading ? (
        <Loading count={booksPerPage} />
      ) : (
        <>
          <BookTable 
            books={currentBooks} 
            onEdit={handleEditBook} 
            onDelete={handleDeleteClick} 
          />
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      <BookForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={selectedBook} 
      />

      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        book={selectedBook} 
      />
    </div>
  );
};

export default Dashboard;