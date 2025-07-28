
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { InfinityIcon } from 'lucide-react';

type props={
    activeCourse:{title:string;imageSrc:string,};
    hearts:number;
    points:number;
    hasActiveSubscription:boolean;
}

export const UserProgress  = ({
    activeCourse,
    points,
    hearts,
    hasActiveSubscription
    }:props) => {
    return(
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/dashboard">
              <Button variant="ghost">
                <Image 
                   src={activeCourse.imageSrc} 
                   alt={activeCourse.title} 
                   className='rounded-md border'
                   width={32} 
                   height={32} />
              </Button>
            </Link>
            <Link href="/shop">
               <Button variant="ghost" className='text-blue-500'>
                <Image 
                   src="icons/points.svg" 
                   alt="points" 
                   className='rounded-md border'
                   width={30} 
                   height={30} />
                   {points}
               </Button>
            </Link>
             <Link href="/shop">
               <Button variant="ghost" className='text-blue  -500'>
                <Image 
                   src="icons/heart.svg" 
                   alt="hearts" 
                   className='rounded-md border'
                   width={30}   
                   height={30} />
                   {hasActiveSubscription 
                   ?  hearts :<InfinityIcon 
                    className='w-10 h-10 stroke-[3px]'/>}
               </Button>
            </Link>

        </div>
    )
}