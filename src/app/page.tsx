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

  const thdxr = JSON.parse(globalThis.THDXR ?? '{}') as {
    finish: number;
    imports: number;
    decryption: number;
    file: number;
  };

  return (
    <div className="flex flex-col gap-12 items-center px-10 pt-20 pb-10">
      <div className="text-4xl text-green-500">
        it took{' '}
        <span className="font-bold">
          {thdxr.finish.toFixed(2) ?? 'NOT KNOWN'}
        </span>{' '}
        ms to decrypt {Object.keys(globalThis.SST_KEY_FILE_DATA ?? {}).length}{' '}
        keys
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-green-900">different timers:</h4>
        <div className="text-sm text-green-700 flex gap-4">
          Imports:{' '}
          <span className="italic ml-auto">
            {thdxr.imports.toFixed(2) ?? 'n/a'} ms
          </span>
        </div>
        <div className="text-sm text-green-700 flex gap-4">
          Decryption:{' '}
          <span className="italic ml-auto">
            {thdxr.decryption.toFixed(2) ?? 'n/a'} ms
          </span>
        </div>
        <div className="text-sm text-green-700 flex">
          File:{' '}
          <span className="italic ml-auto">
            {thdxr.file.toFixed(2) ?? 'n/a'} ms
          </span>
        </div>
      </div>
      <div>
        <a className="underline text-green-700 text-lg" href="/server-index">
          server-index.mjs source code
        </a>
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-md max-h-[600px] overflow-y-scroll mt-12">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {globalThis.SST_KEY_FILE_DATA ? (
              Object.entries(globalThis.SST_KEY_FILE_DATA).map(
                ([key, { name, value }]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {name ?? value ?? 'N/A'}
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
