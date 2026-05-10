import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import {  useEffect, useRef, useState  } from 'react';
import useFixed from '../hooks/useFixed';

export default function HomePage() {

  const fixed = useFixed();
  
  useEffect(() => {
      document.title = `Autosalon`;
      getFirstResponse()
  }, []);

  const getFirstResponse = async () => { 
    const response = await fetch(`${process.env.REACT_APP_DEV_URL}/getData`);
    const data = await response.json();
    return data;
  };


  const refs:any = 
    {
      mainRef: useRef<HTMLDivElement>(null),
      autoRef: useRef<HTMLDivElement>(null),
      buyRef: useRef<HTMLDivElement>(null),
      teamRef: useRef<HTMLDivElement>(null),
      interestingRef: useRef<HTMLDivElement>(null),
    }
  

  const scrollToElements = 
    {
      mainScroll: () => {
        if (refs.mainRef.current) {
          refs.mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      autoScroll: () => {
        if (refs.autoRef.current) {
          refs.autoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      buyScroll: () => {
        if (refs.buyRef.current) {
          refs.buyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center'});
        }
      },
      teamScroll: () => {
        if (refs.teamRef.current) {
          refs.teamRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', });
        }
      },
      interestingScroll: () => {
        if (refs.interestingRef.current) {
          refs.interestingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
        }
      },
    }
  

  return (
    <>
    <Header scrollToElements={scrollToElements} fixed={fixed} />
    <Main ref={refs}  />
    <Footer />
    </>
  )
}

