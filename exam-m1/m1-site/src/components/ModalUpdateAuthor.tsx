import React, { useState } from "react";
import axios from "axios";
import "./ModalUpdateAuthor style.css";

interface ModalUpdateAuthorProps {
  isOpen: boolean;
  closeModal: () => void;
  onUpdate: () => void;
  id: string;
}

const ModalUpdateAuthor: React.FC<ModalUpdateAuthorProps> = ({ isOpen, closeModal, onUpdate, id }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [biography, setBiography] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      try {
        const response = await axios.patch(`http://localhost:3001/authors/${id}`, { 
          firstName, 
          lastName,
          biography
        });
        
        onUpdate();
        closeModal();
      } catch (error) {
        console.error("Erreur lors de la modification de l'auteur", error);
      }
    } else {
      console.log("Tous les champs sont nécessaires");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modifier l'auteur</h2>
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
          <button className="confirmer" type="submit" >Confirmer</button>
          <button className="fermer" type="button" onClick={closeModal}>Fermer</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateAuthor;