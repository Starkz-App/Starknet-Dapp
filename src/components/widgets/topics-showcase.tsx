<section className="py-8">
<div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-bold">Featured Topics</h2>
  <Button variant="ghost" asChild>
    <Link href="/collections">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
  </Button>
</div>
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {featuredCollections.map((collection) => (
    <Card className='bg-background/60' key={collection.id}>
      <CardHeader>
        <CardTitle>{collection.title}</CardTitle>
        <CardDescription>{collection.articlesCount} publications</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{collection.title} description.</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          
          <span>{collection.followers} followers</span>

          <Button variant="ghost" size="sm">
            <Bookmark className="mr-1 h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/collections/${collection.id}`}>View</Link>
        </Button>
      </CardContent>
    </Card>
  ))}
</div>
</section>