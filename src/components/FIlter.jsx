import React from 'react'

const Filters = ({ filters, setFilters, books }) => {
  const genres = [...new Set(books.map(book => book.genre))];
  
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Search by title or author"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="px-3 py-2 border rounded"
      />
      
      <select
        value={filters.genre}
        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        className="px-3 py-2 border rounded"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="px-3 py-2 border rounded"
      >
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>
    </div>
  );
};

export default Filters;