'use client'

import SignInForm from '@/app/components/auth/SignInForm'
import { useSearchParams } from 'next/navigation'

export default function SignIn() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const from = searchParams.get('from')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Connexion
        </h2>
        {from === '/builder' && (
          <div className="rounded-md bg-blue-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Connexion requise
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Vous devez être connecté pour accéder au constructeur de CV. La connexion vous permet de sauvegarder vos CVs et de les modifier ultérieurement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {message && (
          <div className="rounded-md bg-yellow-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Information
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
