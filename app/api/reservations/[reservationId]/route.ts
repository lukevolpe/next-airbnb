import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  console.log('DELETE request received');
  console.log('params:', params);

  const currentUser = await getCurrentUser(); // Gets the current user

  // If there is no current user, returns an error
  if (!currentUser) {
    return NextResponse.error();
  }

  // De-structures the reservation ID from the request params
  const { reservationId } = params;

  // Checks if there is no reservationId or the type of it isn't a string, then throws an error
  if (!reservationId || typeof reservationId != 'string') {
    throw new Error('Invalid reservation ID');
  }

  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.error();
  }
}
