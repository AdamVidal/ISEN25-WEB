'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { BookListItem } from "../../components/BookListItem";
import { GlobalLayout } from "../../GlobalLayout";
import { BookModel } from "../../models/BookModel";
import Breadcrumb from "../../components/Breadcrumb";
import ModalCreateBook from "../../components/ModalCreateBook";
import '../App.css';
import './style.css';

const BooksPage = () => {
  const [books, setBooks] = useState<BookModel[] | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'yearPublished'>('title');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreate = () => {
    loadBooks();
  };

  const loadBooks = () => {
    setRunning(true);
    axios
      .get("http://localhost:3001/books", { params: { offset: 0, limit: 10 } })
      .then((data) => {
        setBooks(data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRunning(false);
      });
  };

  const deleteBook = (id: string) => {
    axios.delete(`http://localhost:3001/books/${id}`).then(() => {
      loadBooks();
    });
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = filteredBooks?.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return a.yearPublished - b.yearPublished;
    }
  });
  
  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <GlobalLayout>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Books', href: '/books' }
        ]}
      />
      <h1>Liste des livres</h1>

      <input className="search"
        type="text"
        placeholder="Rechercher par titre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />

      <div className="sort">
        <label htmlFor="sort-by">Trier par:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'yearPublished')}
        >
          <option value="title">Titre</option>
          <option value="yearPublished">Année de publication</option>
        </select>
      </div>

      <button className="create-book" onClick={openModal}>Créer un livre</button>
      <br />
      {running ? <h2>Chargement en cours...</h2> : <></>}
      <>
      {sortedBooks?.map((book) => (
        <div key={book.id}>
          <BookListItem
            book={book}
          />
        </div>
      ))}
      </>

      <ModalCreateBook isOpen={isModalOpen} closeModal={closeModal} onCreate={onCreate} />
    </GlobalLayout>
    )
}

export default BooksPage;