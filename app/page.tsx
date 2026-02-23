import CardNav from "@/components/CardNav";
import GridMotion from "@/components/GridMotion";
import TextType from '@/components/TextType';
export default function Home() {
  const items = [
    {
      label: "About",
      bgColor: "#4B3D33",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#4B3D33",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#4B3D33",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];
  return (
    <>
      {/*header*/}
      <CardNav
        logo={"logor.png"}
        logoAlt="Company Logo"
        items={items}
        baseColor="#e8e4d9"
        menuColor="#4B3D33"
        buttonBgColor="#4B3D33"
        buttonTextColor="#fff"
        ease="elastic.out(1, 0.8)" />
      {/*body*/}
      <div className="relative w-full h-screen overflow-hidden">
        <GridMotion
          gradientColor="black"
        />
        <div className="absolute top-[30%] left-[10%] -translate-y-1/2 z-10 pointer-events-none">
          <TextType
            text={["അമ്മമ്മയുടെ അച്ചാർകട!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter=" "
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="text-4xl md:text-6xl font-bold text-[#e8e4d9]"
          />
        </div>
      </div>
      {/*footer*/}
      <footer>
        <p>© 2026 Pickles. All rights reserved.</p>
      </footer>

    </>
  )
}