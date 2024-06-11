import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorised" subtitle="Please login to access" />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="You have no upcoming reservations"
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
