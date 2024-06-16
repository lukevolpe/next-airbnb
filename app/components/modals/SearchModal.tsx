'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import queryString from 'query-string';
import { formatISO, setDate } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  // Imports the Map through a dynamic useMemo import (not sure why)
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  // Function for going back a step in the modal
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  // Function for going to the next step in the modal
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // Submit function for the search modal
  const onSubmit = useCallback(async () => {
    // If aren't on the last step, then it takes you to the next step
    if (step != STEPS.INFO) {
      return onNext();
    }

    // Initialises the query
    let currentQuery = {};

    // Parses the url params to a string
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Creates an updated query based on the current query and adds the below params
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    // Formats the start date in the query if it exists
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    // Formats the end date in the query if it exists
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // Creates the new url by making the query into a string
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true } // not sure what this does
    );

    setStep(STEPS.LOCATION); // Sets the step back to the first one
    searchModal.onClose(); // Closes the search modal
    router.push(url); // Pushes the router to the newly created url, hence updating the query
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find your perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When you plan to go?"
          subtitle="Make sure everyone is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

const SearchModalWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchModal {...props} />
  </Suspense>
);

export default SearchModalWrapper;
