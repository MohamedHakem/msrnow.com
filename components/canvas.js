import { useEffect, useRef, useState } from "react"

export default function CanvasComponent({ text, font, fontSize, width }) {
  // const canvasRef = useRef(null)
  // const [spans, setSpans] = useState([])

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext("2d")
  //   const maxWidth = canvas.width

  //   const font = "bold 48px Arial"
  //   const newSpans = splitText(text, maxWidth, font)
  //   setSpans(newSpans)

  //   context.font = font
  //   context.fillStyle = "black"
  //   context.textAlign = "center"

  //   let y = canvas.height / 2
  //   for (let i = 0; i < newSpans.length; i++) {
  //     const line = newSpans[i]
  //     context.fillText(line.innerText, canvas.width / 2, y)
  //     y += 50
  //   }
  // }, [text])

  // return (
  //   <div>
  //     <canvas ref={canvasRef} width={100} height={100} />
  //     <h3>{spans}</h3>
  //   </div>
  // )
  ////////////////////////////////////////////////////////////

  // const canvasRef = useRef(null)
  //   const spansRef = useRef([])

  //   useEffect(() => {
  //     const canvas = canvasRef.current
  //     const ctx = canvas.getContext("2d")

  //     ctx.font = `${fontSize}px ${font}`
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)

  //     const words = text.split(" ")
  //     let currentLine = words[0]

  //     for (let i = 1; i < words.length; i++) {
  //       const word = words[i]
  //       const width = ctx.measureText(currentLine + " " + word).width

  //       if (width < canvas.width) {
  //         currentLine += " " + word
  //       } else {
  //         spansRef.current.push(currentLine)
  //         currentLine = word
  //       }
  //     }

  //     spansRef.current.push(currentLine)
  //   }, [text, font, fontSize, width])

  //   return (
  //     <div style={{ display: "flex", flexDirection: "column" }}>
  //       {spansRef.current.map((line, index) => (
  //         <span key={index}>{line}</span>
  //       ))}
  //       <canvas
  //         ref={canvasRef}
  //         width={width}
  //         height={50}
  //         style={{ display: "none" }}
  //       />
  //     </div>
  //   )

  const canvasRef = useRef(null)
  const spansRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.font = `${fontSize}px ${font}`
    spansRef.current = splitTextIntoSpans(text, ctx, width)
  }, [text, font, fontSize, width])

  function splitTextIntoSpans(text, ctx, width) {
    const words = text.split(" ")
    let currentLine = words[0]
    const spans = []

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const currentWidth = ctx.measureText(currentLine + "" + word).width
      if (currentWidth < width) {
        currentLine += " " + word
      } else {
        spans.push(currentLine)
        currentLine = word
      }
    }
    spans.push(currentLine)
    return spans
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: "10",
      }}
    >
      {/* {console.log("spansRef.current: ", spansRef.current)} */}
      {spansRef.current.map((line, index) => (
        // <div
        //   key={index}
        //   style={{ backgroundColor: "#000", display: "inline-block" }}
        // >
        <span className="">
          {index === spansRef.current.length - 1 ? (
            <span
              className="inverted-border-radius relative w-fit rounded-bl-[15px] pl-3 pb-1"
              key={index}
            >
              {line}
            </span>
          ) : (
            <span key={index}>{line}</span>
          )}
          {/* <span
            className="inverted-border-radius relative w-fit rounded-bl-[15px] py-1 px-3"
            // className="w-fit rounded-bl-[15px] bg-[#f6f8fc] py-1 px-3 text-black"
            // style={{
            //   width: "fit-content",
            //   color: "white",
            //   background: "black",
            //   borderRadius: "15px",
            // }}
            key={index}
          >
            {line}
            {/* <span
          // className="w-fit rounded-bl-[15px] bg-[#f6f8fc] py-1 px-3 text-black"
          >
            {line}
          </span>
          <span className="bg-black"></span> */}
          {/* </span> */}
        </span>
      ))}
      <canvas
        ref={canvasRef}
        width={width}
        height={50}
        style={{ display: "none" }}
      />
    </div>
  )
}

function splitText(text, maxWidth, font) {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  context.font = font

  const words = text.split(" ")
  const lines = []
  let currentLine = ""

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const width = context.measureText(currentLine + " " + word).width

    if (width > maxWidth) {
      lines.push(currentLine.trim())
      currentLine = word + " "
    } else {
      currentLine += word + " "
    }
  }
  lines.push(currentLine.trim())

  const spans = lines.map((line, i) => <span key={i}>{line}</span>)
  return spans
}
