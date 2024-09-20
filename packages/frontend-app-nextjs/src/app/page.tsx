import { Baner } from "../common/components/BanerBlock/BanerBlock";
import { Information } from "../common/components/InformationBlock/InformationBlock";
import { QuoteBlock } from "../common/components/QuoteBlock/QuoteBlock";
import styles from "./page.module.scss";

export default function Home() {
  const images = [
    {
      src: '/images/baner/baner1.jpg' , 
      alt: "Baner 1",
      title: 'Baner 1',
      description: 'Description Baner 1'

    },
    {
      src: '/images/baner/baner3.jpg' , 
      alt: "Baner 2",
      title: 'Baner 2',
      description: 'Description Baner 2'
    },
    {
      src: '/images/baner/baner2.jpg' , 
      alt: "Baner 3",
      title: 'Baner 3',
      description: 'Description Baner 3'
    },
  ]
  return (
    <div className={styles.page+' '}>
      <Baner images={ images } />
      <QuoteBlock />
      <Information />
      
    </div>
  );
}
