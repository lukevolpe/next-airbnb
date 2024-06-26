import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

import WithSuspense from '../components/WithSuspense';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Unauthorised" subtitle="Please login to access" />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default WithSuspense(ReservationsPage);
