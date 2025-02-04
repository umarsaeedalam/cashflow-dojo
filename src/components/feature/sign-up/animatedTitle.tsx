import { motion } from "framer-motion"

const letterVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

type Props = {
    className: string
    children: string
}

function AnimatedTitle({ className, children } : Props) {
    return (
        <motion.h1 variants={letterVariants} initial='hidden' animate='visible' className={className}>
            {children.split("").map((char, index) => (
                <motion.span 
                    key={index}
                    variants={letterVariants}
                >
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    )
}

export default AnimatedTitle;