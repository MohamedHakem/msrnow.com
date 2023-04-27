import { Layout } from "@/components/layout"

export default function Video() {
  return (
    <Layout>
      <div
        dir="rtl"
        className="m-auto mb-10 min-h-screen w-[952px] items-center justify-center align-middle"
      >
        <div className="my-10">
          <h1 className="my-14 text-4xl">
            مشاهدة بث مباشر مباراة الأهلي و الهلال بتاريخ 2023-04-01 كورة باصي
            في دوري دوري أبطال إفريقيا
          </h1>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">
              بث مباشر مباراة الأهلي و الهلال اليوم 2023-04-01 في بطولة دوري
              أبطال إفريقيا علي ملعب استاد القاهرة الدولي
            </h2>
            <h2 className="text-3xl">
              <strong>موعد مباراة </strong>الأهلي و الهلال
            </h2>
            <p>
              تلعب اليوم مباراة الأهلي و الهلال في تمام الساعة 21:00 بتاريخ
              2023-04-01
            </p>

            <h2 className="text-3xl">
              {" "}
              القنوات الناقلة لمباراة الأهلي و الهلال
            </h2>
            <p>
              تنقل أحداث المباراة في الوطن العربي فضائيا على قناة ويتم إستضافة
              المباراه في ملعب استاد القاهرة الدولي
            </p>

            <h2 className="text-3xl"> معلق مباراة الأهلي و الهلال</h2>
            <p>يقوم المعلق الرياضى بالتعليق على مباراة الأهلي و الهلال</p>
          </div>
        </div>
        <div
          className="m-auto flex h-[500px] w-[952px] items-center justify-center align-middle"
          style={{
            msTransform: "translate(-50%, -50%)",
            transform: "translateY(-50%, -50%)",
          }}
        >
          <iframe
            allowFullScreen="true"
            frameBorder="0"
            height="500px"
            scrolling="1"
            // src="https://stad.yalla-shoot.io/albaplayer/bien-sport-1-hd/"
            src="https://live.online-koora.live/albaplayer/sport-4/"
            width="100%"
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}
