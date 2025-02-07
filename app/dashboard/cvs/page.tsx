'use client'

import CVList from '../../components/dashboard/CVList'

export default function CVsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes CV</h1>
      <CVList />
    </div>
  )
}
