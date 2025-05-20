import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav id="breadcrumb" aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap text-xs lg:text-sm text-gray-500">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <li>
                <Link href={item.href} className="hover:text-green-600">
                  {item.label}
                </Link>
              </li>
            ) : (
              <li className="text-green-600">{item.label}</li>
            )}
            {index < items.length - 1 && <li className="mx-2">/</li>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
