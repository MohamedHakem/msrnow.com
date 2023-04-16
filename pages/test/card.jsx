import { Layout } from "@/components/layout"
import Cardx360Animated from "../../components/cards/cardx360Animated"

const Card = () => {
  return (
    <Layout>
      <div
        dir="rtl"
        className="m-auto my-[85px] max-w-5xl items-center justify-center"
      >
        {/* <div className="m-10 text-center"></div> */}
        <div className="mx-2 mt-10 mb-4">
          <article className="main-content">
            <Cardx360Animated />
          </article>
        </div>
      </div>
    </Layout>
  )
}
export default Card
