import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function RelatedContent() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Content</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/news/barcelona-team-news"
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div>
            <Image
              src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
              alt="Barcelona Team News"
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Barcelona Team News: Key Defender Returns for El Clásico
              </h3>
              <p className="text-sm text-gray-600">
                Latest updates on Barcelona&apos;s squad ahead of the crucial
                match against Real Madrid.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                Published 1 day ago
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/news/real-madrid-preparation"
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div>
            <Image
              src="https://images.unsplash.com/photo-1522778590545-a5a925dcf6f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Real Madrid Preparation"
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                How Real Madrid Is Preparing for the Camp Nou Challenge
              </h3>
              <p className="text-sm text-gray-600">
                Inside look at Real Madrid&apos;s tactical approach and
                preparation for the El Clásico.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                Published 2 days ago
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/news/el-clasico-history"
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div>
            <Image
              src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
              alt="El Clásico History"
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                El Clásico: The History of Football&apos;s Greatest Rivalry
              </h3>
              <p className="text-sm text-gray-600">
                Exploring the rich history and memorable moments from previous
                Barcelona vs Real Madrid encounters.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                Published 3 days ago
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
