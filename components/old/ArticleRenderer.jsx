import { useEffect, useState } from "react"

const ArticleRenderer = ({ html, origin }) => {
  const [styledHtml, setStyledHtml] = useState("")

  html = html.replace(/&amp;nbsp;/g, " ")

  useEffect(() => {
    console.log("html: ", html)
    html.replace("nbsp;", " ")
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    // Style h2 elements
    const h2Elements = doc.querySelectorAll("h2")
    for (let h2 of h2Elements) {
      h2.setAttribute("class", "")
      h2.setAttribute(
        "class",
        "text-red-500 underline underline-offset-[6px] text-lg py-2"
      )
    }

    // Style iframe elements
    const iframeElements = doc.querySelectorAll("iframe")
    for (let iframe of iframeElements) {
      const wrapper = document.createElement("div")
      wrapper.setAttribute(
        "class",
        "bg-black p-[40px] my-[20px] rounded-[30px]"
      )
      wrapper.style.display = "inline-block"
      const newIframe = iframe.cloneNode(true)
      newIframe.setAttribute("class", "m-auto rounded-[15px]")
      wrapper.appendChild(newIframe)
      iframe.parentNode.replaceChild(wrapper, iframe)
    }

    // Style p elements
    const pElements = doc.querySelectorAll("p")
    for (let p of pElements) {
      p.setAttribute("class", "")
      p.setAttribute("class", "mb-[20px]")
    }
    setStyledHtml(doc.documentElement.innerHTML)
  }, [html])

  return <div dangerouslySetInnerHTML={{ __html: styledHtml }} />
}

export default ArticleRenderer
