'use client'

import localFont from 'next/font/local'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

const local = localFont({
    src: '../fonts/publica-sans/ZPublicaSans.otf',
    display: 'swap',
})

function Error({ error, reset }: Props) {
    return(
        <main className='h-full flex flex-col items-center justify-center font-semibold'>
            <h1 className={`${local.className} text-dark-900 text-9xl max-[400px]:text-8xl tracking-wide`}>Error</h1>

            <div className='flex flex-col items-center justify-center gap-5 max-[400px]:gap-4'>
                <p className='text-dark-500 text-xl max-[400px]:text-lg'>{error.message}</p>
                
                <button onClick={reset} className='text-light-50 tracking-wide text-base max-[400px]:text-sm bg-accent-500 hover:bg-accent-600 py-2 px-10 max-[400px]:px-8 rounded-lg outline-none focus-visible:outline-dark-500 transition-all ease-in-out duration-100 transform active:scale-90'>Try again</button>
            </div>
        </main>
    )
}

export default Error;