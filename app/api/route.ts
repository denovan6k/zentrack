import { adminDb } from './lib/adminConfig';
import { Donation } from '../types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required' },
      { status: 400 }
    );
  }

  try {
    const snapshot = await adminDb.collection('donations')
      .where('charityAddress', '==', address)
      .orderBy('timestamp', 'desc')
      .get();

    const donations: Donation[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        donorAddress: data.donorAddress,
        charityAddress: data.charityAddress,
        amount: data.amount,
        isSubscription: data.isSubscription,
        timestamp: data.timestamp.toDate(),
        txHash: data.txHash,
      };
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Ensure dynamic server-side evaluation