import React from 'react'
import HeroCarousel from './content-hero'
import Text from './text'
import FeaturedEvents from './featured-events'
import ExpertPredictions from './latest-expert-predictions'
import SeoContent from './dynamic-seo-content'

const Content: React.FC = () => {
    return (
        <div className='text-black'>
            <HeroCarousel />
            <Text />
            <FeaturedEvents />
            <ExpertPredictions />
            <SeoContent />
        </div>
    )
}

export default Content
