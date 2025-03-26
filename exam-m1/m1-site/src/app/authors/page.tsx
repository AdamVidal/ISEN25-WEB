'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthorListItem } from "../../components/AuthorListItem";
import { GlobalLayout } from "../../GlobalLayout";
import { AuthorModel } from "../../models/AuthorModel";
import Breadcrumb from "../../components/Breadcrumb";
import ModalCreateAuthor from "../../components/ModalCreateAuthor";
import '../App.css';
import './style.css';

const BooksPage = () => {
  const [authors, setAuthors] = useState<AuthorModel[] | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'lastName' | 'numberOfBooks'>('lastName');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreate = () => {
    loadAuthors();
  };

  const loadAuthors = () => {
    setRunning(true);
    axios
      .get("http://localhost:3001/authors", { params: { offset: 0, limit: 10 } })
      .then((data) => {
        setAuthors(data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRunning(false);
      });
  };

  const filteredAuthors = authors?.filter((author) =>
    author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAuthors = filteredAuthors?.sort((a, b) => {
    if (sortBy === 'lastName') {
      return a.lastName.localeCompare(b.lastName);
    } else {
      return b.numberOfBooks - a.numberOfBooks;
    }
  });
  
  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <GlobalLayout>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Authors', href: '/authors' }
        ]}
      />
      <h1>Liste des auteurs</h1>

      <input className="search"
        type="text"
        placeholder="Rechercher par nom de famille"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />

      <div className="sort">
        <label htmlFor="sort-by">Trier par:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'lastName' | 'numberOfBooks')}
        >
          <option value="lastName">Nom de famille</option>
          <option value="numberOfBooks">Nombre de livres</option>
        </select>
      </div>

      <button className="create-author" onClick={openModal}>Créer un auteur</button>
      <br />
      {running ? <h2>Chargement en cours...</h2> : <></>}
      <>
        {sortedAuthors?.map((author) => <AuthorListItem 
          key={author.id}
          author={author} />)
        }
      </>

      <ModalCreateAuthor isOpen={isModalOpen} closeModal={closeModal} onCreate={onCreate} />
    </GlobalLayout>
    )
}

export default BooksPage;