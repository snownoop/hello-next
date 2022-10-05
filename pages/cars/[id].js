import { useRouter } from "next/router";
import Image from "next/image";

import Head from "next/head";

// For server side build. Once build all html pages - then just give the to browser frov server
// It is super fast and useful for static pages like blog. Where we can do revalidate/rebuild with every hour as an example.
export async function getStaticProps({ params }) {
  const rand = Math.floor(Math.random() * 2);
  // On build time will be always equal to only one and html pages will be build regarding this values
  const randCar = rand === 0 ? 'lambo' : 'bmw';
  // const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const req = await fetch(`http://localhost:3000/${randCar}.json`);
  const data = await req.json();

  return {
    props: { car: data },
    // Will rebuild htmls every 15 seconds means that after 15 seconds we can get another randCar
    revalidate: 15,
  };
};

// For server side build. Server need to know about all possible pages on build time.
// So we provide all available paths for dynamic routes like [id] (cars/bmw, cars/lambo)
export async function getStaticPaths() {
  const req = await fetch(`http://localhost:3000/cars.json`);
  const data = await req.json();

  const paths = data.map(car => ({
    params: { id: car },
  }))

  return {
    paths,
    fallback: false,
  }
};

/*
// For server side rendering. Will re-render page on backend each time it is requested by user
// It is slower and useful for dynamic pages (connected with db or with infinite/uknown variants count)
export async function getServerSideProps() {
  const rand = Math.floor(Math.random() * 2);
  // This will change with every refresh user do as re-render of html will happen.
  const randCar = rand === 0 ? 'lambo' : 'bmw';
  // const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const req = await fetch(`http://localhost:3000/${randCar}.json`);
  const data = await req.json();

  return {
    props: { car: data }
  }
};
*/

const Car = ({ car }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>{car.color} {car.id}</title>
      </Head>
      <div>
        {id}
        <Image alt={car} src={car.image} width="300px" height="300px" />
      </div>
    </div>
  );
}

export default Car;