import Image from "next/image"
import GitHubIcon from "@/assets/icons/GitHubIcon.svg"

export default function footer() {
  return (
    <footer className="w-full flex flex-col items-center py-8 gap-2">
      <p>&#169; UJEP Dashboard 2026, All rights reserved</p>
      <a href="https://github.com/tomas-toman/ujep-dashboard" target="_blank">
        <Image src={GitHubIcon} alt="GitHub icon" className="w-10 hover:cursor-pointer hover:scale-110 transition-transform"/>
      </a>
    </footer>
  )
}
