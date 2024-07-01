import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/types';

const BookList = async () => {
    // data fetching
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the books');
    }

    const data = await response.json();
    const books: Book[] = data.data;
    // console.log('............-',data);
    

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
            {books.map((book: Book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BookList;