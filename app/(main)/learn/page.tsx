import { StickyWrapper } from '@/components/Learn/sticky-wrapper';
import { FeedWrapper } from '@/components/Learn/feed-wrapper';
import { Header } from './header';
import { UserProgress } from '@/components/Learn/user-progress';

const learn = () => {
  return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
          <StickyWrapper>
            <UserProgress
              activeCourse={{title:"Level-1",imageSrc:"/level-buttons/level-1.svg"}}
              hearts={5}
              points={100}
              hasActiveSubscription={true}
            />
          </StickyWrapper>
          <FeedWrapper>
            <Header title="Level-1"/>
              <div className="space-y-4"> 
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
                <div className="h-[700px] bg-blue-500 w-full" />
              </div>
          </FeedWrapper>
      </div>
  )
}

export default learn