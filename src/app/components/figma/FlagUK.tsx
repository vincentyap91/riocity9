import React from "react";
import svgPaths from "../../../imports/svg-rb6etug06m";
import { imgGroup1, imgGroup3 } from "../../../imports/svg-6c3hb";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 512 512" className="block w-full h-full">
      <g id="Group">{children}</g>
    </svg>
  );
}

export function FlagUK({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
        <div className="w-full h-full relative" style={{ maskImage: `url('${imgGroup3}'), url('${imgGroup1}')`, WebkitMaskImage: `url('${imgGroup3}'), url('${imgGroup1}')`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}>
            <Wrapper>
                  <path d={svgPaths.p219f5a00} fill="var(--fill-0, white)" id="Vector" />
                  <path d={svgPaths.p5541300} fill="var(--fill-0, #C8102E)" id="Vector_2" />
                  <path d={svgPaths.p10990080} fill="var(--fill-0, #C8102E)" id="Vector_3" />
                  <path d={svgPaths.p13510a00} fill="var(--fill-0, #C8102E)" id="Vector_4" />
                  <path d={svgPaths.pdd0e680} fill="var(--fill-0, #C8102E)" id="Vector_5" />
                  <path d={svgPaths.p1c2ff3b0} fill="var(--fill-0, #012169)" id="Vector_6" />
                  <path d={svgPaths.pee9d000} fill="var(--fill-0, #012169)" id="Vector_7" />
                  <path d={svgPaths.p9762700} fill="var(--fill-0, #012169)" id="Vector_8" />
                  <path d={svgPaths.p220ce6f0} fill="var(--fill-0, #012169)" id="Vector_9" />
                  <path d={svgPaths.p1ebc2d00} fill="var(--fill-0, #012169)" id="Vector_10" />
                  <path d={svgPaths.p22883980} fill="var(--fill-0, #012169)" id="Vector_11" />
                  <path d={svgPaths.p2f5ee670} fill="var(--fill-0, #012169)" id="Vector_12" />
                  <path d={svgPaths.p1c689a70} fill="var(--fill-0, #012169)" id="Vector_13" />
                  <path d={svgPaths.p264b300} fill="var(--fill-0, #C8102E)" id="Vector_14" />
            </Wrapper>
        </div>
    </div>
  );
}
