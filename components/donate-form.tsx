'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useOnchainKit } from '@coinbase/onchainkit';
import { Charity } from '@/types';
import { toast } from 'react-toastify';

interface DonateFormProps {
  charities: Charity[];
}

export function DonateForm({ charities }: DonateFormProps) {
  const { address } = useAccount();
  const { makeTransaction } = useOnchainKit();
  const [amount, setAmount] = useState<string>('');
  const [selectedCharity, setSelectedCharity] = useState<string>('');
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [intervalDays, setIntervalDays] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDonate = async () => {
    if (!selectedCharity || !amount) {
      toast.error('Please select a charity and enter an amount');
      return;
    }

    setIsLoading(true);
    try {
      const charity = charities.find(c => c.address === selectedCharity);
      if (!charity) throw new Error('Charity not found');

      const value = ethers.parseEther(amount);

      await makeTransaction({
        to: charity.address as `0x${string}`,
        value: BigInt(value.toString()),
        metadata: {
          charity: charity.name,
          purpose: isSubscription ? 'Recurring Donation' : 'One-time Donation',
        },
      });

      toast.success(
        isSubscription 
          ? 'Subscription created successfully!' 
          : 'Donation sent successfully!'
      );
    } catch (error: any) {
      toast.error(`Transaction failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Select Charity</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedCharity}
          onChange={(e) => setSelectedCharity(e.target.value)}
        >
          <option value="">Choose a charity</option>
          {charities.map((charity) => (
            <option key={charity.address} value={charity.address}>
              {charity.name} {charity.verified && '✓'}
            </option>
          ))}
        </select>
      </div>
      
      {/* Rest of the form remains the same as before */}
    </div>
  );
}