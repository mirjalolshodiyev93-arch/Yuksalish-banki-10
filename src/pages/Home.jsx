
import ServiceCard from "../components/_compoint_/ServiceCard";
import Bank from "../components/skroll/Bank";
import Stats from "../components/_compoint_/Stats";
import Testimonials from "./Testimonials";

  import Hero from "../components/components/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Bank />
      <ServiceCard />
      <Testimonials />

    </>
  );
}
