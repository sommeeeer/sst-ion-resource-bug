import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const headersList = headers();
  const secret = headersList.get('x-super-secret');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>this is my header: {secret}</div>
    </div>
  );
}
