export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-base-200 relative">
      <main className="relative">
        {children}
      </main>
    </div>
  )
}
