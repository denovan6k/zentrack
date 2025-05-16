import { ReceiverDashboard } from '@/components/receiver-dashboard';
import { fetchCharityData } from '@/lib/charities';

interface PageProps {
  params: { address: string };
}

export default async function DashboardPage({ params }: PageProps) {
  const data = await fetchCharityData(params.address);
  return <ReceiverDashboard initialData={data} />;
}