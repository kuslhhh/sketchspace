"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/dist/Draggable"

type Proptype = {
   children: React.ReactNode,
   classname?: string
}

export default function DraggableText({ children }: Proptype) {
   const sketchRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (!sketchRef.current) return

      gsap.registerPlugin(Draggable)

      const original = { x: 0, y: 0 }

      Draggable.create(sketchRef.current, {
         type: "x,y",
         edgeResistance: 0.65,
         bounds: document.body,
         inertia: true,
         onDragEnd: function () {
            gsap.to(this.target, {
               x: 0,
               y: 0,
               duration: 1,
               ease: "elastic.out(1,0.5)"
            })
         }
      })
   }, [])

   return (
      <div className="">
         <div
            ref={sketchRef}
            className="text-6xl text-orange-400 pb-2 no-underline hover:underline font-bold cursor-move"
         >
            {children}
         </div>
      </div>
   )
}
