import Feed from "@components/Feed";


const Home = () => {
  return (
    <section>
        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden"/>
          <span className="orange_gradient ">Your IDEA-SPARK</span>
        </h1>

        <p className="desc text-center">
        Share your favorite snapshots and let your creativity shine. Whether it's a breathtaking sunset, a mouthwatering dish, or a heartwarming moment, your photos tell a unique story. Spread the joy by sharing your images on our platform!
        </p>

        {/* Feed */}
        <Feed/>
    </section>
  )
}

export default Home