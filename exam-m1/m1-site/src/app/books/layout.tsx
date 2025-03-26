export const metadata = {
  title: 'Liste des livres',
  description: 'Liste des livres',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
