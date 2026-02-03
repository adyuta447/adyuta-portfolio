interface HeadProps {
  subtitle: string;
  title: string;
  description: string;
}

export default function Head({ subtitle, title, description }: HeadProps) {
  return (
    <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
      <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
        {subtitle}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
