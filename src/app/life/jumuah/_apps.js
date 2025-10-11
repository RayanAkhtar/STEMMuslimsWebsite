import Image from 'next/image';
import SKmap from './SKmap.png';
 
export default function Page() {
  return (
    <Image
      src="./SKmap.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}