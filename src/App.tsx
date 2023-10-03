import "./App.css";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

function App() {
  const [update, setUpdate] = useState(false);
  const comp = useRef<HTMLDivElement | null>(null); // <- create a ref for the component

  const itemToAnimate = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    const ctx = gsap.context(() => {
      gsap.from(itemToAnimate.current, {
        duration: 1,
        x: 100,
        y: 100,
        border: "2px solid green",
        padding: "20px",
        borderRadius: "10px",
        background: "yellow",
        ease: "elastic.inOut(1, 2)",
      });
    }, comp); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, [update]); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div ref={comp}>
      <h1 ref={itemToAnimate}>GSAP</h1>
      <button onClick={() => setUpdate(!update)}>Update</button>
    </div>
  );
}

export default App;
