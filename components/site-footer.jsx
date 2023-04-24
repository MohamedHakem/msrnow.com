import Image from "next/image"
import Link from "next/link"
import footerImg from "@/public/assets/images/footer-img.png"

export function SiteFooter() {
  return (
    <footer className="relative mt-10 border-0 border-slate-300 bg-[#f8f8f8] dark:border-slate-700 dark:bg-[#353d50] dark:text-gray-400">
      <div className="footerImgStyle relative overflow-hidden">
        <Image
          className="m-auto mb-9"
          src={footerImg}
          alt={"MsrNow.com - مصر الان لجميع الاخبار حول الساعة"}
        />
      </div>
      {/* <section className="m-auto flex h-auto items-center justify-center bg-[#f9f9f9] py-10 text-center">
        <div className="py-9 px-4 2xl:container md:py-12 md:px-6 lg:px-20 2xl:mx-auto">
          <div className="mb-8 text-center">
            <h2 className="mx-auto w-9/12 text-3xl font-semibold leading-9 text-gray-800 md:w-full md:leading-7 lg:text-4xl lg:leading-9">
              تابعنا علي فيسبوك
            </h2>
          </div>
          <div className="lg:gap-8 mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <div className="group relative">
              <img
                src="https://i.pinimg.com/564x/5e/85/35/5e8535e4d9520cd8d973211871cd9720.jpg"
                alt="A picture of a sitting dog"
                className=" hidden w-full lg:block "
              />
              <img
                src="https://i.ibb.co/mNPBgQN/pexels-alana-sousa-3294250-1-1.png"
                alt="A picture of a sitting dog"
                className="block w-full lg:hidden "
              />
              <div className=" to-opacity-30 absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-gray-800 via-gray-800 opacity-0 group-hover:opacity-50" />
              <div className=" absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6665 10.6665H21.3332C15.4421 10.6665 10.6665 15.4421 10.6665 21.3332V42.6665C10.6665 48.5575 15.4421 53.3332 21.3332 53.3332H42.6665C48.5575 53.3332 53.3332 48.5575 53.3332 42.6665V21.3332C53.3332 15.4421 48.5575 10.6665 42.6665 10.6665Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M44 20V20.001"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="group relative">
              <img
                src="https://i.ibb.co/T8jgRy3/pexels-leah-kelley-1449667-1.png"
                alt="Smiling Girl"
                className=" hidden w-full lg:block "
              />
              <img
                src="https://i.ibb.co/YD8nNMR/pexels-leah-kelley-1449667-1-1.png"
                alt="Smiling Girl"
                className="block w-full lg:hidden "
              />
              <div className="to-opacity-30 absolute top-0 left-0 h-full w-full bg-gradient-to-t from-gray-800 via-gray-800 opacity-0 group-hover:opacity-50" />
              <div className=" absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6665 10.6665H21.3332C15.4421 10.6665 10.6665 15.4421 10.6665 21.3332V42.6665C10.6665 48.5575 15.4421 53.3332 21.3332 53.3332H42.6665C48.5575 53.3332 53.3332 48.5575 53.3332 42.6665V21.3332C53.3332 15.4421 48.5575 10.6665 42.6665 10.6665Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M44 20V20.001"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="group relative">
              <img
                src="https://i.ibb.co/F3dzNWD/pexels-spencer-selover-775358-1.png"
                alt="Men Posing"
                className=" hidden w-full lg:block "
              />
              <img
                src="https://i.ibb.co/myWxfSm/pexels-spencer-selover-775358-1-1.png"
                alt="Men Posing"
                className="block w-full lg:hidden "
              />
              <div className="to-opacity-30 absolute top-0 left-0 h-full w-full bg-gradient-to-t from-gray-800 via-gray-800 opacity-0 group-hover:opacity-50" />
              <div className=" absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6665 10.6665H21.3332C15.4421 10.6665 10.6665 15.4421 10.6665 21.3332V42.6665C10.6665 48.5575 15.4421 53.3332 21.3332 53.3332H42.6665C48.5575 53.3332 53.3332 48.5575 53.3332 42.6665V21.3332C53.3332 15.4421 48.5575 10.6665 42.6665 10.6665Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M44 20V20.001"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="group relative">
              <img
                src="https://i.ibb.co/DwcwgDP/pexels-chevanon-photography-1108099-1.png"
                alt="2 puppies"
                className=" hidden w-full lg:block "
              />
              <img
                src="https://i.ibb.co/5cDQZ2r/pexels-chevanon-photography-1108099-1-1.png"
                alt="2 puppies"
                className="block w-full lg:hidden "
              />
              <div className="to-opacity-30 absolute top-0 left-0 h-full w-full bg-gradient-to-t from-gray-800 via-gray-800 opacity-0 group-hover:opacity-50" />
              <div className=" absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                <svg
                  width={64}
                  height={64}
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6665 10.6665H21.3332C15.4421 10.6665 10.6665 15.4421 10.6665 21.3332V42.6665C10.6665 48.5575 15.4421 53.3332 21.3332 53.3332H42.6665C48.5575 53.3332 53.3332 48.5575 53.3332 42.6665V21.3332C53.3332 15.4421 48.5575 10.6665 42.6665 10.6665Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M44 20V20.001"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="relative z-20 w-full overflow-hidden bg-black pt-10 lg:pt-16">
        <div className="relative m-auto max-w-3xl text-white">
          <div className="absolute z-20 w-full">
            <h2 className="display-title mb-14 text-center tracking-tighter">
              Wander your way
            </h2>
          </div>
          <div className="relative grid md:grid-cols-2">
            <a
              className="absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-slate-200 md:block"
              href="#"
            >
              Find your happy place
            </a>
            <div className="absolute top-0 z-10 h-1/2 w-full bg-gradient-to-b from-black to-transparent"></div>
            <div className="absolute top-0 z-10 h-full w-full bg-black/30"></div>
            <div className="relative flex h-64 items-end md:h-96 md:items-center 2xl:h-[25vw]">
              <div className="absolute h-full w-full">
                <img
                  alt="Feature image"
                  loading="lazy"
                  width="900"
                  height="454"
                  decoding="async"
                  data-nimg="1"
                  className="h-full w-full object-cover"
                  src="https://i.pinimg.com/564x/d9/18/ad/d918ad26a7df990e382cf4db8fc1bdf0.jpg"
                />
              </div>
             
            </div>
            <div className="relative flex h-64 items-end justify-end md:h-96 md:items-center 2xl:h-[25vw]">
              <div className="absolute h-full w-full">
                <img
                  alt="Feature image"
                  loading="lazy"
                  width="900"
                  height="454"
                  decoding="async"
                  data-nimg="1"
                  className="h-full w-full object-cover"
                  // style="color:transparent"
                  src="https://i.pinimg.com/564x/dc/90/8e/dc908ee34e8cc6303efd608372ad60a4.jpg"
                />
              </div>
              
            </div>
            <div className="relative flex h-64 items-end md:h-96 md:items-center 2xl:h-[25vw]">
              <div className="absolute h-full w-full">
                <img
                  alt="Feature image"
                  loading="lazy"
                  width="900"
                  height="454"
                  decoding="async"
                  data-nimg="1"
                  className="h-full w-full object-cover"
                  // style="color:transparent"
                  src="https://i.pinimg.com/564x/5e/85/35/5e8535e4d9520cd8d973211871cd9720.jpg"
                />
              </div>
              
            </div>
            <div className="relative flex h-64 items-end justify-end md:h-96 md:items-center 2xl:h-[25vw]">
              <div className="absolute h-full w-full">
                <img
                  alt="Feature image"
                  loading="lazy"
                  width="900"
                  height="454"
                  decoding="async"
                  data-nimg="1"
                  className="h-full w-full object-cover"
                  // style="color:transparent"
                  src="https://i.pinimg.com/564x/5e/85/35/5e8535e4d9520cd8d973211871cd9720.jpg"
                />
              </div>
             
            </div>
            <div className="absolute bottom-0 z-10 h-1/2 w-full bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>
      </section> */}

      <div className="border-0 border-slate-300 dark:border-slate-700">
        <div className="container my-8">
          <h3 className="text-6xl font-black">مصر الان</h3>
          {/* <svg width="124" height="32" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor" fill-rule="evenodd">
                <path d="M13.29.71c12.26-2.16 15.792.217 17.972 12.586 2.181 12.368-.038 15.76-12.583 17.973C6.133 33.48 2.889 31.056.707 18.684-1.474 6.312 1.032 2.873 13.291.71zm1.413 5.465c-2.347.414-4.044 1.492-5.02 3.058-.767 1.23-1.011 2.671-.79 3.838.489 2.573 2.613 4.193 6.917 4.52l.336.024.334.027.318.03c1.5.15 2.46.405 2.99.733.354.218.496.456.597 1.033.193 1.095-.66 2.087-2.906 2.483-1.485.262-3.07-.053-4.803-.998a1.875 1.875 0 10-1.795 3.293c2.445 1.333 4.879 1.817 7.25 1.399 4.139-.73 6.533-3.51 5.948-6.828-.556-3.151-2.778-4.557-7.68-4.914l-.323-.023c-1.579-.121-2.567-.428-3.089-.818-.258-.194-.353-.365-.41-.66-.049-.263.033-.745.288-1.155.392-.628 1.156-1.113 2.49-1.348 1.182-.209 2.325-.008 3.496.628a1.875 1.875 0 101.791-3.295c-1.903-1.035-3.905-1.386-5.939-1.027z"></path>
                <path
                  d="M44.984 22.525c2.794 0 4.751-1.471 4.751-3.943v-.037c0-2.189-1.444-3.189-4.257-3.868-2.566-.603-3.174-1.056-3.174-2.075v-.038c0-.867.798-1.565 2.167-1.565 1.045 0 2.033.34 3.06 1 .19.113.38.17.608.17.608 0 1.102-.472 1.102-1.076 0-.453-.247-.774-.513-.925-1.197-.792-2.547-1.226-4.22-1.226-2.641 0-4.541 1.566-4.541 3.83v.038c0 2.433 1.596 3.263 4.428 3.943 2.47.565 3.002 1.075 3.002 2.018v.038c0 .98-.912 1.66-2.356 1.66-1.445 0-2.623-.49-3.725-1.358-.152-.113-.361-.208-.684-.208-.608 0-1.103.472-1.103 1.076 0 .377.19.698.457.886a8.323 8.323 0 004.998 1.66zm10.096.02c1.539 0 2.584-.642 3.268-1.453v.377c0 .51.457.962 1.122.962.627 0 1.121-.472 1.121-1.094v-4.905c0-1.302-.342-2.358-1.083-3.075-.703-.717-1.825-1.113-3.326-1.113-1.311 0-2.28.226-3.231.585a.997.997 0 00-.627.905c0 .528.437.943.97.943a1.3 1.3 0 00.36-.056c.627-.246 1.35-.396 2.224-.396 1.615 0 2.49.754 2.49 2.17v.244a8.44 8.44 0 00-2.7-.415c-2.45 0-4.142 1.057-4.142 3.207v.038c0 2 1.672 3.075 3.554 3.075zm.646-1.66c-1.103 0-1.958-.548-1.958-1.51v-.038c0-1.038.874-1.66 2.357-1.66.912 0 1.691.17 2.28.396v.68c0 1.263-1.159 2.131-2.68 2.131zm11.445 1.64c.627 0 1.045-.415 1.311-1l3.345-7.621a1.36 1.36 0 00.133-.547c0-.623-.494-1.094-1.121-1.094-.608 0-.912.396-1.083.792l-2.623 6.64-2.585-6.602c-.19-.472-.513-.83-1.14-.83-.627 0-1.14.528-1.14 1.094 0 .207.076.396.133.566l3.345 7.602c.266.604.684 1 1.31 1h.115zm10.818 0c.627 0 1.045-.415 1.311-1l3.345-7.621a1.36 1.36 0 00.133-.547c0-.623-.494-1.094-1.121-1.094-.608 0-.912.396-1.083.792l-2.623 6.64-2.585-6.602c-.19-.472-.513-.83-1.14-.83-.627 0-1.14.528-1.14 1.094 0 .207.076.396.133.566l3.344 7.602c.267.604.685 1 1.312 1h.114zm8.461 2.887c1.616 0 2.528-.755 3.383-2.792l3.668-8.735c.038-.113.095-.358.095-.547 0-.604-.494-1.075-1.102-1.075-.59 0-.913.396-1.103.867l-2.508 6.622-2.699-6.622c-.209-.528-.532-.867-1.121-.867-.646 0-1.14.471-1.14 1.113 0 .15.056.377.133.547l3.724 8.263-.076.207c-.38.774-.74 1.057-1.425 1.057-.323 0-.532-.057-.798-.132-.114-.038-.228-.076-.418-.076a.922.922 0 00-.931.944c0 .547.38.83.722.943.475.188.95.283 1.596.283zm15.74-2.849c2.148 0 3.573-.68 4.828-1.773.209-.189.38-.472.38-.83 0-.585-.513-1.076-1.103-1.076-.285 0-.532.114-.703.264-.969.812-1.92 1.264-3.326 1.264-2.546 0-4.39-2.094-4.39-4.678v-.038c0-2.585 1.863-4.66 4.39-4.66 1.274 0 2.262.453 3.174 1.189.152.113.38.226.703.226.647 0 1.16-.49 1.16-1.132 0-.415-.21-.735-.456-.924-1.16-.887-2.509-1.49-4.562-1.49-4.029 0-6.86 3.075-6.86 6.829v.038c0 3.791 2.888 6.791 6.765 6.791zm10.438-.019c1.54 0 2.585-.641 3.27-1.452v.377c0 .51.455.962 1.12.962.628 0 1.122-.472 1.122-1.094v-4.905c0-1.302-.342-2.358-1.084-3.075-.703-.717-1.824-1.113-3.325-1.113-1.312 0-2.281.226-3.231.585a.997.997 0 00-.628.905c0 .528.438.943.97.943a1.3 1.3 0 00.36-.056c.628-.246 1.35-.396 2.224-.396 1.616 0 2.49.754 2.49 2.17v.244a8.44 8.44 0 00-2.699-.415c-2.451 0-4.143 1.057-4.143 3.207v.038c0 2 1.673 3.075 3.554 3.075zm.646-1.66c-1.102 0-1.957-.547-1.957-1.51v-.037c0-1.038.874-1.66 2.356-1.66.913 0 1.692.17 2.281.396v.68c0 1.263-1.16 2.131-2.68 2.131zm8.86 1.547c.647 0 1.16-.49 1.16-1.132V9.603c0-.623-.513-1.132-1.16-1.132-.645 0-1.14.509-1.14 1.132v11.696c0 .642.514 1.132 1.14 1.132z"
                  fill-rule="nonzero"
                ></path>
              </g>
            </svg> */}
        </div>
      </div>

      <div className="container mx-auto">
        <div className="pb-16">
          {/* <div className="gap-0 pt-16 pb-5 sm:grid sm:grid-cols-2 sm:py-0 lg:grid-cols-4 lg:text-lg">
            <div className="er-slate-300 dark:border-slate-700 md:border-l md:pb-0">
              <div className=" border-slate-300 px-4 dark:border-slate-700 md:border-b">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90 sm:pt-8">
                  أخبار
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      أخر الأخبار
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أخبار عالمية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      مصر
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أخبار محلية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أخبار اقتصادية ومالية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أخبار سياسية
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-slate-300 px-4 dark:border-slate-700 md:pt-8">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90">
                  رياضة
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" data-turbo="false" href="#">
                      مشاهدة المباريات بث حي
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" data-turbo="false" href="#">
                      أهداف المباريات
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" data-turbo="false" href="#">
                      تفاصيل وملخصات
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" data-turbo="false" href="#">
                      التنس
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="er-slate-300 dark:border-slate-700 md:border-l md:pb-0">
              <div className="border-slate-300 px-4 dark:border-slate-700 md:border-b">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90 sm:pt-8">
                  تكنولوجيا
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      أخر أخبار التقنية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أحدث المقالات
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-slate-300 px-4 dark:border-slate-700 md:pt-8">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90">
                  إسلاميات
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      أدعية واذكار
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أقوال وحكم
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="er-slate-300 dark:border-slate-700 md:border-l md:pb-0">
              <div className="border-slate-300 px-4 dark:border-slate-700 md:border-b">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90 sm:pt-8">
                  المطبخ
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      وصفات
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أكلات مصرية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أكلات عربية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      حلويات
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      قوائم طعام
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-slate-300 px-4 dark:border-slate-700 md:pt-8">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90">
                  العناية بالذات والجمال
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      العناية بالذات
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      أفكار ونصائح
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      الزفاف
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      ميكب
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:pb-0">
              <div className="border-slate-300 px-4 dark:border-slate-700 md:border-b">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90 sm:pt-8">
                  فن ومشاهير
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      مشاهير العرب
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      مشاهير العالم
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      فن وتلفزيون
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      نجوم ومسلسلات رمضان
                    </a>
                  </li>
                </ul>
              </div>
              <div className="px-4 md:pb-10 md:pt-8">
                <h4 className="mb-3 pb-3 text-2xl font-bold leading-5 text-black opacity-70 dark:text-gray-200 dark:opacity-90">
                  خدمات مجانية
                </h4>
                <ul className="space-y-1 pb-14 text-xl md:h-60">
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات يوتيوب
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات التيكتوك بدون علامة مائية
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات الانستجرام
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات لينكدان
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات فيسبوك
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات تويتر
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      تحميل فيديوهات Pinterest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="flex items-center border-t border-slate-300 pt-10 text-black dark:border-slate-700 dark:text-gray-400 md:space-x-6">
            <div className="grow">
              © 2023 <span className="mr-3">مصر الان | MsrNow.com</span>
              {/* <span className="mr-5">news-4.vercel.app</span> */}
            </div>
            <div className="flex flex-row gap-4">
              <span>
                <Link href="/about">عنا</Link>
              </span>
              <span>
                <Link href="/contact">اتصل بنا</Link>
              </span>
              <span>
                <Link href="/terms">شروط</Link>
              </span>
              <span>
                <Link href="/privacy-policy">الخصوصية</Link>
              </span>
            </div>
            {/* <div>
              <a href="/rss">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-rss"
                >
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
                <span className="sr-only">RSS Feed</span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
