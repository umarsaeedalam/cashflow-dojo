"use client";

import localFont from 'next/font/local'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
  }

const local = localFont({
    src: '../fonts/handbuck/HandbuckRegular-R99xE.otf',
    display: 'swap',
})

function ErrorPage({ error, reset }: Props) {
    return (
        <main className='h-full flex flex-col items-center justify-center font-semibold'>
            <h1 className={`${local.className} text-accent text-9xl max-[400px]:text-8xl`}>Error</h1>

            <div className='flex flex-col items-center justify-center gap-5 max-[400px]:gap-4'>
                <p className='text-secondary text-xl max-[400px]:text-lg'>{error.message}</p>
                
                <button onClick={reset} className='text-accent hover:text-primary text-base max-[400px]:text-sm bg-primary hover:bg-accent border-accent border-2 py-2 px-10 max-[400px]:px-8 rounded-lg outline-none focus-visible:outline-secondary transition-all ease-in-out duration-200 transform active:scale-90'>Refresh</button>
            </div>
        </main>
    );
}

export default ErrorPage;
