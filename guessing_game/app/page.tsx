import GuessingGame from "@/components/GuessingGame";
import {Poppins} from "@next/font/google"

const poppins  = Poppins({
  subsets:['latin'],
  weight:["400", "600"]
})


export default function Home() {
  return (
    <main className={poppins.className}>
      <GuessingGame />
    </main>
  );
}
