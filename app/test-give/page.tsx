import { DonateForm } from '@/components/donate-form';
import { fetchCharities } from '@/lib/charities';

export default async function DonatePage() {
  const charities = await fetchCharities();
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Make a Donation</h1>
      <DonateForm charities={charities} />
    </div>
  );
}