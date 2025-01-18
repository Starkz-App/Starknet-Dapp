{/* Upcoming Section */}
<section>
<h2 className="text-2xl font-bold mb-4">Upcoming Updates</h2>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {[
    { id: 1, title: "New mint feature", date: "2025-01-15", type: "Feature" },
    { id: 2, title: "View page update", date: "2025-01-22", type: "Updates" },
    { id: 3, title: "Airdrop to users", date: "2026-01-01", type: "Airdrop" },
  ].map((event) => (
    <Card key={event.id} className="glass-card">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{event.type}</Badge>
      </CardContent>
      <CardContent>
        <Button variant="outline" className="w-full">Register</Button>
      </CardContent>
    </Card>
  ))}
</div>
</section>
