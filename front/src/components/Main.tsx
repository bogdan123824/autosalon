import { forwardRef } from "react";
import Order from "./Order";
import Cars from "./Cars";
import InterestingForUs from "./InterestingForUs";
import Intro from "./Intro";
import Team from "./Team";

const Main = forwardRef<HTMLDivElement>((props, ref:any) => {
    return (
        <>
        <Intro ref={ref?.mainRef} />
        <Cars ref={ref?.autoRef} />
        <Order ref={ref?.buyRef} />
        <Team ref={ref?.teamRef} />
        <InterestingForUs ref={ref?.interestingRef} />
        </>
    )
})

export default Main;