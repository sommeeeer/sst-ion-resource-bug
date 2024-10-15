import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Resource } from 'sst/resource'

export function middleware(request: NextRequest) {
  const secret = Resource.MySecret.value;
  console.log("MySecret", secret)
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-super-secret', "babyboy")

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('x-super-secret', secret)

  return response
}

