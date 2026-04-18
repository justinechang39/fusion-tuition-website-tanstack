import { cn } from '@/lib/utils'

export const Meteors = ({
  number,
  className,
}: {
  number?: number
  className?: string
}) => {
  const meteors = new Array(number || 50).fill(true)
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={`meteor${idx}`}
          className={cn(
            'absolute h-0.5 w-0.5 animate-meteor-up rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffa50010]',
            "before:absolute before:left-1/2 before:top-full before:h-[50px] before:w-px before:-translate-x-1/2 before:bg-gradient-to-b before:from-[#FFA500] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            bottom: '-50px', // Start below the screen
            left: `${Math.floor(Math.random() * 800)}px`,
            animationDelay: `${(Math.random() * 0.2).toFixed(2)}s`,
            animationDuration: `${(Math.random() * 3 + 1).toFixed(2)}s`,
          }}
        ></span>
      ))}
    </>
  )
}
