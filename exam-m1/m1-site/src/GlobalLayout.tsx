'use client';
import { useRouter } from "next/navigation"
import { FC, ReactElement } from "react";
import './GlobalLayout style.css';

type Props = {
  children: ReactElement | ReactElement[] | string
}

export const GlobalLayout: FC<Props> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <div className="menu">
        <button onClick={() => router.push('/')}>Accueil</button>
        <button onClick={() => router.push('/books')}>Livres</button>
        <button onClick={() => router.push('/authors')}>Auteurs</button>
      </div>
      <div>
        {children}
      </div>
    </>
    )
}