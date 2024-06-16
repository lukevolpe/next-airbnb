'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, Suspense } from 'react';
import { IconType } from 'react-icons';
import queryString from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}; // Initialise query variable

    // Checks that params are available and parses them to a string
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Create the updated query based on the current query and adds the category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // If the category is already selected, this is removed when clicked again
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // Builds the updated query url
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true } // Skips any null values
    );

    // Takes the user to the updated query url
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

const CategoryBoxWrapper: React.FC<CategoryBoxProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CategoryBox {...props} />
  </Suspense>
);

export default CategoryBoxWrapper;
