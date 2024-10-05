import React from 'react'
import StoriesHot from '../components/HotStories'
import StoryNew from '../components/StoryNew'
import StoryCompleted from '../components/StoryCompleted'
import StoryRating from '../components/StoryRating'
import StoryFollow from '../components/StoryFollow'

const Home = () => {
  return (
    <div className="body">
        <main className="main-home">
          <StoriesHot/>
          <StoryNew/>
          <StoryCompleted/>
          <StoryRating/>
          <StoryFollow/>
        </main>

    </div>
  )
}

export default Home