import { Resource } from 'sst';

export const dynamic = "force-dynamic";

export default async function Home() {
  const secret = Resource.MySecret.value;
  const bucket = Resource.MyBucket.name;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>this is my secret: {secret}</div>
      <div>this is my bucket: {bucket}</div>
    </div>
  );
}
