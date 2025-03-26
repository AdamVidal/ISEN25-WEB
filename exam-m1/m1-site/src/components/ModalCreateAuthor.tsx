import React, { useState } from "react";
import axios from "axios";
import "./ModalCreateAuthor style.css";

interface ModalCreateAuthorProps {
  isOpen: boolean;
  closeModal: () => void;
  onCreate: () => void;
}

const ModalCreateAuthor: React.FC<ModalCreateAuthorProps> = ({ isOpen, closeModal, onCreate }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [biography, setBiography] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      try {
        const response = await axios.post("http://localhost:3001/authors", { 
          firstName, 
          lastName,
          biography
        });
        
        onCreate();
        closeModal();
      } catch (error) {
        console.error("Erreur lors de la création de l'auteur", error);
      }
    } else {
      console.log("Tous les champs sont nécessaires");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Créer un auteur</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nom de famille"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Biographie"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
          />
          <button className="ajouter" type="submit">Ajouter</button>
          <button className="fermer" type="button" onClick={closeModal}>Fermer</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateAuthor;