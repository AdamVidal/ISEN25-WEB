'use client'
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthorModel } from "../../../models/AuthorModel";
import Breadcrumb from "../../../components/Breadcrumb";
import { GlobalLayout } from "../../../GlobalLayout";
import { BookModel } from "../../../models/BookModel";
import { BookListItem } from "../../../components/BookListItem";
import ModalUpdateAuthor from "../../../components/ModalUpdateAuthor";
import '../../App.css';
import './style.css';

const AuthorDetailsPage: FC = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState<AuthorModel>();
    const [books, setBooks] = useState<BookModel[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [running, setRunning] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const router = useRouter();

    const loadAuthor = () => {
        fetch(`http://localhost:3001/authors/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data);
                loadBooks();
            })
            .finally(() => {
              setRunning(false);
            });
    }

    const loadBooks = () => {
        setRunning(true);
        fetch(`http://localhost:3001/books/byAuthor/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const onUpdate = () => {
        loadAuthor();
    };

    const handleUpdate = () => {
        setIsUpdateModalOpen(true);
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const deleteAuthor = () => {
        fetch(`http://localhost:3001/authors/${id}`, { method: 'DELETE' })
            .then(() => {
                router.push('/authors');
                setIsModalOpen(false);
            });
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        loadAuthor();
    }, []);

    return (
        <GlobalLayout>
            {author ? (
                <>
                    <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Authors', href: '/authors' },
                        { label: `${id}`, href: `/authors/${id}` }
                    ]}
                    />
                    <h1>Détails sur l'auteur</h1>
                    <div className="author-details">
                        <h2>{author.firstName} {author.lastName}</h2>
                        <p>Biographie: {author.biography}</p>
                        { books ? <p>Nombre de livres: {books.length}</p> : <></>}
                        <button onClick={handleUpdate}>Modifier</button>
                        <button onClick={handleDelete}>Supprimer</button>
                        {isModalOpen && (
                            <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Confirmer la suppression</h2>
                                <p>Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
                                <button className="confirm-delete" onClick={deleteAuthor}>Oui, supprimer</button>
                                <button className="cancel-delete" onClick={cancelDelete}>Annuler</button>
                            </div>
                            </div>
                        )}
                        <ModalUpdateAuthor isOpen={isUpdateModalOpen} closeModal={closeUpdateModal} onUpdate={onUpdate} id={author.id} />

                        {running ? <h2>Chargement en cours...</h2> : <></>}
                    </div>
                    <div className="author-books">
                    <h2>Livres de l'auteur</h2>
                    {books?.map((book) => (
                        <div key={book.id}>
                            <BookListItem
                            book={book}
                            />
                        </div>
                    ))}
                    </div>
                </>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </GlobalLayout>
    );
};

export default AuthorDetailsPage;