export const metadata = {
  title: "Détails sur le livre",
  description: "Détails sur le livre",
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
