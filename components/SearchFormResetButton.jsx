'use client';

import React from 'react';
import Link from 'next/link';

import { X } from 'lucide-react';

const SearchFormResetButton = () => {

  const resetForm = () => {
    const form = document.querySelector('.search-form');
    if(form) {
      form.reset();
      console.log('Form reset successfully');
    }
  };
  return (
    <>
      <button type="reset" onClick={resetForm}>
        <Link href="/" className="text-white search-btn">
          <X className="size-5" />
        </Link>
      </button>
    </>
  );
};

export default SearchFormResetButton;