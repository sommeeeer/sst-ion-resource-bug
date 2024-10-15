import { Resource } from 'sst';

export const dynamic = 'force-dynamic';

declare global {
  var THDXR: string;
  var SST_KEY_FILE_DATA: {
    [key: string]: {
      name?: string;
      value?: string;
      type: string;
    };
  };
}

export default async function Home() {
  const bucket = Resource.MyBucket.name;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>this is my bucket: {bucket}</div>
      <div className="text-4xl text-green-500">
        it took{' '}
        <span className="font-bold">{globalThis.THDXR ?? 'NOT KNOWN'}</span> ms
        to decrypt
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {globalThis.SST_KEY_FILE_DATA ? (
              Object.entries(globalThis.SST_KEY_FILE_DATA).map(
                ([key, { name, value, type }]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {name ?? value ?? 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {type}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
