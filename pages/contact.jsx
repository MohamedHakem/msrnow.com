import Head from "next/head"

import { Layout } from "@/components/layout"

const ContactUsPage = () => {
  return (
    <Layout>
      <div
        dir="rtl"
        className="m-auto my-[85px] max-w-5xl items-center justify-center"
      >
        <div className="m-10 text-center">
          <h1 className="mb-6 text-4xl">اتصل بنا</h1>
        </div>
        <div className="mx-2 mt-10 mb-4">
          <article className="main-content mb">
            <p>
              يمكنك إرسال اقتراحاتك أو استفساراتك عن أي شيء يخص الموقع والخدمات
              التي نقدمها أو الإبلاغ عن محتوى غير لائق نشره أحد المصادر الموجودة
              لدينا، من خلال التواصل على:
            </p>
            <a href="mailto:info@msrnow.com">info@msrnow.com</a>
            <p>
              وبإمكانك الإعلان على الموقع من خلال التواصل معنا عبر البريد
              الإلكتروني:
            </p>
            <a href="mailto:info@msrnow.com">info@msrnow.com</a>
          </article>
        </div>
      </div>
    </Layout>
  )
}
export default ContactUsPage
