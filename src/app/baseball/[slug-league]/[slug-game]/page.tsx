import Breadcrumb from '@/src/components/breadcrumb';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Baseball', href: '/baseball' },
  { label: 'MLB', href: '/baseball/mlb' },
  { label: 'New York Yankees vs Boston Red Sox Prediction' },
];

export default function Page() {
  return (
    <div className="bg-gray-100">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
