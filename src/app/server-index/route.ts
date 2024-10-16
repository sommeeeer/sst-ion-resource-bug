import { readFileSync } from "fs";

export function GET(req: Request, res: Response) {
  const file = readFileSync('./server-index.mjs', 'utf-8');

  return new Response(
    file,
    {
      headers: {
        'content-type': 'text/plain',
      },
    }
  );

}