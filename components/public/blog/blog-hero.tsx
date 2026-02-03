import Head from "@/components/atoms/head";

export function BlogHero() {
  return (
    <section className="px-4 sm:px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <Head
          subtitle="Insights & Stories"
          title="Blog"
          description="Exploring the realms of technology, programming, and innovation through thoughtful articles and tutorials."
        />
      </div>
    </section>
  )
}
