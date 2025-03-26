'use client'
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookModel } from "../../../models/BookModel";
import Breadcrumb from "../../../components/Breadcrumb";
import { GlobalLayout } from "../../../GlobalLayout";
import Link from 'next/link';
import '../../App.css';
import './style.css';

const BookDetailsPage: FC = () => {
    const { id } = useParams();
    const [book, setBook] = useState<BookModel>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const loadBook = () => {
        fetch(`http://localhost:3001/books/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            }
        );
    }

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const deleteBook = () => {
        fetch(`http://localhost:3001/books/${id}`, { method: 'DELETE' })
            .then(() => {
                router.push('/books');
                setIsModalOpen(false);
            });
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        loadBook();
    }, []);

    return (
        <GlobalLayout>
            {book ? (
                <>
                    <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Books', href: '/books' },
                        { label: `${id}`, href: `/books/${id}` }
                    ]}
                    />
                    <h1>Détails sur le livre</h1>
                    <div className="book-details">
                        <h2>Titre: {book.title}</h2>
                        <p>Auteur: <Link href={`/authors/${book.author.id}`}>{book.author.firstName} {book.author.lastName}</Link></p>
                        <p>Année de publication: {book.yearPublished}</p>
                        <p>Prix: {book.price}</p>
                        <button onClick={handleDelete}>Supprimer</button>
                        {isModalOpen && (
                            <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Confirmer la suppression</h2>
                                <p>Êtes-vous sûr de vouloir supprimer ce livre ?</p>
                                <button className="confirm-delete" onClick={deleteBook}>Oui, supprimer</button>
                                <button className="cancel-delete" onClick={cancelDelete}>Annuler</button>
                            </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </GlobalLayout>
    );
};

export default BookDetailsPage;