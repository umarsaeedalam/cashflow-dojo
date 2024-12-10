import type { Metadata } from "next"
import localFont from 'next/font/local'
import { FaGoogle, FaGithub } from "react-icons/fa"
import { signInGoogle, signInGithub } from "@/lib/actions"

// const local = localFont({
//     src: '../fonts/handbuck/HandbuckRegular-R99xE.otf',
//     display: 'swap',
// })

const local = localFont({
    src: '../fonts/publica-sans/PublicaSans-Bold.otf',
    display: 'swap',
})

const metadata: Metadata = {
    title: 'Welcome | Cashflow Dojo'
}

function LoginPage() {
    return (
        <div className="flex h-full items-center max-[550px]:justify-center">
            <div className="flex mx-24 gap-20 max-[1340px]:flex-col max-[1340px]:gap-10 max-[1340px]:mx-16 max-[mx-0]:">
                <div className="my-auto">
                    <h1 className={`${local.className} text-dark-900 text-8xl tracking-tighter font-bold max-[1340px]:text-center max-[700px]:text-7xl`}>Cashflow Dojo</h1>

                    <p className="text-3xl max-[700px]:text-2xl tracking-tight text-dark-500 font-normal mt-5 max-[1340px]:text-center max-[1340px]:mt-3 max-[550px]:hidden">Analyze your spending with comprehensive categorization and tracking for better financial control.</p>
                </div>

                <div className="max-w-md font-semibold rounded-3xl bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 text-dark-500 max-[550px]:bg-transparent py-16 max-[1340px]:py-12 max-[700px]:py-8 px-8 max-[700px]:px-5 max-[550px]:px-4 flex flex-col items-center max-[550px]:border-transparent max-[1340px]:self-center">
                    <h1 className="text-3xl text-dark-700 max-[700px]:text-2xl tracking-tight text-center max-[550px]:hidden">Enter your financial dojo & begin tracking</h1>    

                    <form action={signInGoogle}>
                        <button type="submit" className="flex items-center gap-2 mt-10 rounded-lg max-[550px]:mt-1 max-[700px]:mt-6 bg-accent-500 text-light-50 py-2 px-20 max-[700px]:px-16 max-[440px]:px-11 border border-accent-500 hover:border-accent-600 hover:bg-accent-600 outline-none focus-visible:outline-dark-500 transition-all ease-in-out duration-200 transform active:scale-90">
                            <span className="text-lg max-[700px]:text-base tracking-wide">Continue with</span>

                            <FaGoogle className="text-center text-lg max-[700px]:text-base"/>
                        </button>
                    </form>

                    <p className="mt-2 max-[700px]:text-sm max-[550px]:text-transparent tracking-wide">or</p>

                    <form action={signInGithub}>
                        <button type="submit" className="flex items-center rounded-lg gap-2 mt-2 bg-accent-500 text-light-50 py-2 px-20 max-[700px]:px-16 max-[440px]:px-11 border border-accent-500 hover:bg-accent-600 hover:border-accent-600 outline-none focus-visible:outline-dark-500 transition-all ease-in-out duration-200 transform active:scale-90">
                            <span className="text-lg max-[700px]:text-base tracking-wide">Continue with</span>
                            
                            <FaGithub className="text-center text-lg max-[700px]:text-base"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

export { metadata }