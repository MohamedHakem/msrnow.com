import { Layout } from "@/components/layout"

const AboutPage = () => {
  return (
    <Layout>
      <div
        dir="rtl"
        className="m-auto my-[85px] max-w-5xl items-center justify-center"
      >
        <div className="m-10 text-center">
          <h1 className="mb-6 text-4xl">عن الموقع</h1>
        </div>
        <div className="mx-2 mt-10 mb-4">
          <article class="main-content mb">
            {/* <h2 className="text-4xl mt-12 mb-6">
              <span
                class="translation_missing"
                title="translation missing: ar.v2.common.page_titles.static.privacy"
              >
                عن الموقع
              </span>
            </h2> */}

            <p>
              يتيح موقع مصرالان.كوم msrnow.com لمستخدميه التمتع بتجربة معلوماتية
              مميزة من خلال مئات الألبومات من الصور وكذلك الفيديوهات التي تغطي
              كافة الجوانب المحلية والعالمية إضافة إلى المحتوى التفاعلي المميز
              والذي يقدم لك المعلومات بطريقة مُبسطة في مجالات الفن والسيارات
              والمنوعات والرياضة والمرأة والموضوعات العامة.
            </p>
            <br />
            <p>
              ويتيح مصرالان.كوم msrnow.com لمستخدميه تجربة بصرية ممتعة عبر آلاف
              الألبومات بالإضافة إلى الفيديوهات الرائجة. وكذلك يقدم لك
              &quot;تريندات&quot; محتوى دائم مميز لا غنى عنه من نصائح يومية تغطي
              كل ما تبحث عنه.
            </p>
            <br />
            <p>
              كما يوفر موقع مصرالان.كوم msrnow.com لمتابعيه مجموعة من الخدمات
              اليومية يأتي في مقدمتها درجات الحرارة ومواقيت الصلاة وأسعار
              العملات وخدمة بالإضافة إلى المزيد من الخدمات الأخرى والتي سنمد بها
              القارئ العربي قريبًا
            </p>
            <br />
            <p className="mb-4">
              الأخبار على الموقع هي من مصادر خارجية وعلى مسؤولية مقدم المحتوى،
              ولا يتحمل مصرالان.كوم أدنى مسؤولية عن صحة أو دقة تلك الأخبار.
            </p>
            <br />
            <p>
              يمكنك التواصل معنا وإرسال اقتراحاتك واستفساراتك عن الخدمات التي
              يقدمها الموقع عبر البريد الإلكتروني:
              <br />
              info (@) msrnow.com
            </p>
            <p>
              للإعلان على الموقع يرجى التواصل معنا عبر البريد الإلكتروني: <br />
              info (@) msrnow.com
            </p>
          </article>
        </div>
      </div>
    </Layout>
  )
}
export default AboutPage
