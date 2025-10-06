// Next Imports
import { NextResponse } from 'next/server'

import type { UserTable } from './users'

type ResponseUser = Omit<UserTable, 'password'>

// Mock data for demo purpose
import { users } from './users'

export async function POST(req: Request) {
  try {
    // Parse request body safely; handle empty or invalid JSON gracefully
    const { email, password } = await req.json()

    const user = users.find(u => u.email === email && u.password === password)
    let response: null | ResponseUser = null

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...filteredUserData } = user

      response = {
        ...filteredUserData
      }

      return NextResponse.json(response)
    } else {
      // Return 401 status code and error message if user is not found
      return NextResponse.json(
        {
          message: ['Email or Password is invalid']
        },
        {
          status: 401,
          statusText: 'Unauthorized Access'
        }
      )
    }
  } catch (err) {
    // Handle bad or empty JSON body to avoid 500 and client-side parse errors
    return NextResponse.json(
      { message: ['Invalid request body'] },
      { status: 400, statusText: 'Bad Request' }
    )
  }
}
