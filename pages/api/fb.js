// import puppeteer from "puppeteer"

// const email = "ahmedsaqrwebdeveloper@gmail.com"
// const password = "SQGC48Y5cneM!ru"
// const pageUrl = "https://www.facebook.com/profile.php?id=100080757289355"
// const messages = [
//   {
//     text: "Your first message here",
//     link: "https://example.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
//   },
//   {
//     text: "Your second message here",
//     link: "https://example.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
//   },
//   {
//     text: "Your third message here",
//     link: "https://example.com",
//     imageUrl:
//       "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
//   },
// ]

// export default async function handler(req, res) {
//   const browser = await puppeteer.launch({
//     headless: false, // set to false if you want to see the browser window
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   })

//   try {
//     const page = await browser.newPage()
//     await page.setViewport({ width: 1280, height: 800 })
//     await page.goto("https://www.facebook.com/")

//     // Login to Facebook
//     await page.type("#email", email)
//     await page.type("#pass", password)
//     await page.click('button[name="login"]')

//     // Wait for the page to load and navigate to the page's URL
//     await page.waitForNavigation({ waitUntil: "networkidle2" })
//     await page.goto(pageUrl)

//     // Post each message one by one with randomized delays
//     for (const message of messages) {
//       // Click on the "Create Post" button
//       await page.waitForSelector('[aria-label="Create a post"]')
//       await page.click('[aria-label="Create a post"]')

//       // Wait for the post dialog to appear and fill in the text, link, and image URL
//       await page.waitForSelector('[role="dialog"] [contenteditable="true"]')
//       await page.type('[role="dialog"] [contenteditable="true"]', message.text)
//       await page.type('[aria-label="Add a link"] [name="q"]', message.link)
//       await page.waitForSelector("._5iwm ._5qtn")
//       await page.click("._5iwm ._5qtn")
//       await page.waitForSelector("._59k._1k4d")
//       await page.type("._59k._1k4d", message.imageUrl)
//       await page.waitForSelector("._19n1._1fz0")
//       await page.click("._19n1._1fz0")

//       // Wait for the post to be submitted and add a randomized delay between 60 and 120 seconds
//       await page.waitForNavigation({ waitUntil: "networkidle2" })
//       const delaySeconds = Math.floor(Math.random() * 60) + 60
//       console.log(
//         `Posted message: ${message.text} (delay: ${delaySeconds} seconds)`
//       )
//       await page.waitForTimeout(delaySeconds * 1000)
//     }

//     res.status(200).json({ success: true })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ success: false, error: err.message })
//   } finally {
//     await browser.close()
//   }
// }
