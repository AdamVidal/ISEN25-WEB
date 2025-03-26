export const metadata = {
  title: 'Liste des auteurs',
  description: 'Liste des auteurs',
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
