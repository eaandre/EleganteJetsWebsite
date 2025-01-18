import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-lg mb-8">
            Discover the journey that led us to become Nigeria&apos;s premier private aviation provider.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">A Legacy of Excellence</h2>
              <p className="mb-4">
                Founded by a team of seasoned aviation and luxury service professionals, Elegante Jets & Concierge emerged from a vision to revolutionize private aviation in Nigeria. Our founders, with decades of experience in luxury travel and aviation, saw an opportunity to bring world-class private jet services to discerning clients in Africa.
              </p>
              <p className="mb-4">
                Over the years, we&apos;ve built a reputation for unparalleled service, safety, and attention to detail. Our fleet has grown, our services have expanded, but our commitment to excellence remains unwavering.
              </p>
              <Link href="/fleet" passHref>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  Explore Our Fleet
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-[400px]">
              <Image
                src="/IMG_7439.jpg"
                alt="Luxury Jet in flight"
                layout="responsive" 
                width={800} 
                height={600} 
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p>We prioritize the safety and security of our clients above all else, adhering to the highest industry standards.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Personalized Service</h3>
              <p>Every journey is tailored to meet the unique needs and preferences of our discerning clientele.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p>We continuously invest in cutting-edge technology and training to stay at the forefront of private aviation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Elegante Difference</h2>
          <p className="mb-8 text-lg">
            Join us for a journey where luxury meets precision, and every flight is an unforgettable experience.
          </p>
          <Link href="/quote" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
              Get Your Personalized Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
