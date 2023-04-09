import { useEffect } from "react"

import { Layout } from "@/components/layout"
import generateShortSlug from "../utils/generateShortSlug"

const AboutPage = () => {
  // const slugs = generateShortSlug()
  // console.log("new short slug: ", slugs)

  // const slugs = generateShortSlug(10)
  // console.log("new short slug: ", slugs)

  return (
    <Layout>
      <div
        dir="rtl"
        className="m-auto my-[85px] max-w-5xl items-center justify-center"
      >
        <div className="m-10 pt-3 text-center">
          <h1 className="mt-12 mb-6 text-4xl">شروط الخدمة</h1>
        </div>
        <div className="mx-2 mt-10 mb-4">
          <article className="main-content mb">
            <h2 className="mt-12 mb-6 text-4xl">
              <span className="translation_missing">شروط الخدمة</span>
            </h2>
            <p>
              باستخدام كل أخبارك، فإنك توافق على الامتثال لشروط خدمتنا. تتضمن
              هذه الشروط:
            </p>
            <br />
            <ul>
              <li>
                لا يمكنك استخدام موقعنا لأي غرض غير قانوني أو غير مصرح به.
              </li>
              <li>
                لا يمكنك نشر أو توزيع أي محتوى غير قانوني أو ضار أو يشكل تهديدًا
                أو يسيء للآخرين أو مسيءًا أو يحتوي على ألفاظ نابية أو غير لائقة
                بأي شكل من الأشكال.
              </li>
              <li>
                لا يمكنك المشاركة في أي نشاط يمكن أن يتسبب في إلحاق ضرر بموقعنا،
                بما في ذلك القرصنة أو البريد العشوائي.
              </li>
              <li>
                نحتفظ بالحق في إنهاء وصولك إلى موقعنا في أي وقت دون إشعار.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </Layout>
  )
}
export default AboutPage
