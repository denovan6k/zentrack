'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useOnchainKit } from '@coinbase/onchainkit';
import { Charity, Donation } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReceiverDashboardProps {
  initialData: {
    charity: Charity;
    donations: Donation[];
  };
}

export function ReceiverDashboard({ initialData }: ReceiverDashboardProps) {
  const { address } = useAccount();
  const { getIdentity } = useOnchainKit();
  const [charity, setCharity] = useState(initialData.charity);
  const [donations, setDonations] = useState(initialData.donations);
  const [identity, setIdentity] = useState<any>(null);

  useEffect(() => {
    if (address) {
      fetchIdentity();
    }
  }, [address]);

  const fetchIdentity = async () => {
    try {
      const id = await getIdentity(address as `0x${string}`);
      setIdentity(id);
    } catch (error) {
      console.log('No identity found');
    }
  };

  // Rest of the component remains the same
}