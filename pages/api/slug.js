// import fs from "fs"

import generateShortSlug from "../../utils/generateShortSlug"

export default async function handler(req, res) {
  const { n } = req.query

  // console.time("newSlugsApi")
  // console.time("generateCombinations")
  const combs = generateShortSlug(n)
  // console.timeEnd("generateCombinations")

  // console.time("check")
  // const check = combs.filter((e, i, a) => a.indexOf(e) !== i)
  // console.timeEnd("check")
  // console.log("check: ", check)

  // Write combinations to a file
  // const data = JSON.stringify(combs)
  // fs.writeFileSync("3-l-combinations.json", data)
  // console.timeEnd("newSlugsApi")
  // return res.status(200).json({
  //   message: "Generated all possible 2-L combs",
  //   success: true,
  //   count: combs.length,
  //   // check: check,
  //   combs: combs,
  // })
  console.log("combs: ", combs)
  return res.status(200).json({
    message: `Generated all possible 3-L combs up to ${n} combs array`,
    ok: "OK",
    count: combs.length,
    combs: combs,
  })
}
