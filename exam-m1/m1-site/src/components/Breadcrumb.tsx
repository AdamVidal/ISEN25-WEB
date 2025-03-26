'use client';

import { FC } from 'react';
import Link from 'next/link';
import "./Breadcrumb style.css";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex py-2 px-4 bg-gray-100 rounded-md">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          <Link href={item.href} className="text-blue-500 hover:underline">
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
