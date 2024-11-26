import React from 'react';
import Form from 'next/form';

import { Search } from 'lucide-react';

import SearchFormResetButton from '@/components/SearchFormResetButton';

const SearchForm = ({ query }) => {
  return (
    <>
      <Form action="/" scroll={false} className="search-form">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search Startups"
          className="search-input"
          required 
        />

        <div className='gap-2 flex'>
          {query && <SearchFormResetButton />}

          <button type="submit" className="text-white search-btn">
            <Search className="size-5" />
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchForm;