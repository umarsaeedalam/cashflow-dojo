import Link from 'next/link'
import localFont from 'next/font/local'

const local = localFont({
    src: '../fonts/publica-sans/ZPublicaSans.otf',
    display: 'swap',
})

function NotFound() {
    return(
        <main className='h-full flex flex-col items-center justify-center font-semibold'>
            <h1 className={`${local.className} text-dark-900 text-9xl max-[400px]:text-8xl`}>404</h1>

            <div className='flex flex-col items-center justify-center gap-5 max-[400px]:gap-4'>
                <p className='text-dark-500 text-xl max-[400px]:text-lg'>Sorry<span>!</span> There is nothing here...</p>
                
                <Link href="/" className='text-light-50 tracking-wide text-base max-[400px]:text-sm bg-accent-500 hover:bg-accent-600 border-accent-500 hover:border-accent-600 border-2 py-2 px-10 max-[400px]:px-8 rounded-lg outline-none focus-visible:outline-dark-500 transition-all ease-in-out duration-100 transform active:scale-90'>Home</Link>
            </div>
        </main>
    )
}

export default NotFound;