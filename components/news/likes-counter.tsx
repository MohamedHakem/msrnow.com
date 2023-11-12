'use client';
import { increment } from '@/app/actions';
import { ArrowBigUp, ArrowUpSquare, ChevronUpSquare, Heart, Triangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoadingDots from '@/components/news/loading-dots';
// import confetti from 'canvas-confetti';

// call increment action in the article's single page, this is just a RSC views counter for display (check leerob's approach)
// I need useEffect to only call the above action once per article page, not with every re-render
// EDIT: I actually need to call this for every time a visitor clicks on an article, not just hard-reload or 1st-time request,
// but also subsequent clicks between articles and soft-navigations with Link comp.. or back/forth browser btns, all of that should count as new view

export default function LikesCounter({ slug, likes }: { slug: string; likes: number | null }) {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const addLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const buttonRect = e.currentTarget.getBoundingClientRect();
    // const originX = (buttonRect.left + buttonRect.right) / 2;
    // const originY = (buttonRect.top + buttonRect.bottom) / 2;

    setLoading(true);

    const res: {
      likes: number | null;
      views: number | null;
      shares: number | null;
    } = await increment(slug, 'like');

    // confetti({
    //   particleCount: 50,
    //   startVelocity: 10,
    //   spread: 180,
    //   gravity: 0.3,
    //   origin: {
    //     x: originX / window.innerWidth,
    //     y: originY / window.innerHeight
    //   }
    // });

    setCurrentLikes(res.likes);
    setClicked(true);
    setLoading(false);
  };

  return (
    <Button
      variant={'ghost'}
      onClick={(e) => addLike(e)}
      disabled={loading}
      className={`relative p-1 pr-0 rounded-md flex flex-row items-center min-w-[50px] transition-all duration-500 ease-in-out
      text-[#6b6b6b]/70 hover:text-[#6b6b6b] ${clicked ? 'text-green-500' : ''}`}
    >
      {loading ? (
        <LoadingDots className="bg-black" />
      ) : (
        <>
          <span>
          </span>
          <ArrowUpSquare
            strokeWidth={1}
          />
          <span
            className="mr-[2px] pt-[2px]"
          >
            {currentLikes}
          </span>
        </>
      )}
    </Button>
  );
}
