import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModalCreateBook style.css";

interface ModalCreateBookProps {
  isOpen: boolean;
  closeModal: () => void;
  onCreate: () => void;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

const ModalCreateBook: React.FC<ModalCreateBookProps> = ({ isOpen, closeModal, onCreate }) => {
  const [title, setTitle] = useState<string>('');
  const [yearPublished, setYearPublished] = useState<number>(2023);
  const [authorId, setAuthorId] = useState<string>('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des auteurs", error);
      }
    };

    if (isOpen) {
      loadAuthors();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && authorId) {
      try {
        const response = await axios.post("http://localhost:3001/books", { 
          title, 
          yearPublished, 
          authorId,
          price
        });
        onCreate();
        closeModal();
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre", error);
      }
    } else {
      console.log("Tous les champs sont nécessaires");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Créer un livre</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre du livre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Année de publication"
            value={yearPublished}
            onChange={(e) => setYearPublished(Number(e.target.value))}
            required
          />
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          >
            <option value="" disabled>Choisissez un auteur</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
            <input
            type="number"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            step="0.01"
            required
            />
          <button className="ajouter" type="submit">Ajouter</button>
          <button className="fermer" type="button" onClick={closeModal}>Fermer</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateBook;
