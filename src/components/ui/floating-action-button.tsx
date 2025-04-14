"use client"

import { useState, useEffect, useCallback, JSX } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Phone, ArrowUp, X, Plus } from "lucide-react"

// Types
interface ScrollTimeout extends Window {
  scrollTimeout?: number;
}

declare const window: ScrollTimeout;

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

const iconVariants: Variants = {
  hidden: { rotate: 0, opacity: 0 },
  visible: { rotate: 0, opacity: 1 },
  exit: { rotate: 90, opacity: 0 },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export default function FloatingActionButton(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Determine if user is actively scrolling
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      setIsScrolling(true)
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout)
      }

      window.scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }

    setLastScrollY(currentScrollY)

    if (currentScrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setIsExpanded(false)
    }
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout)
      }
    }
  }, [handleScroll])

  const toggleExpand = (): void => {
    setIsExpanded((prev) => !prev)
  }

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Only show when visible AND either expanded or actively scrolling
  const shouldShow = isVisible && (isExpanded || isScrolling)

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Main FAB Button */}
            <button
              onClick={toggleExpand}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              type="button"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isExpanded ? "close" : "open"}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? <X size={24} aria-hidden="true" /> : <Plus size={24} aria-hidden="true" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* FAB Menu Items */}
            <AnimatePresence>
              {isExpanded && (
                <>
                  <motion.a
                    href="tel:+1234567890"
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="absolute bottom-20 right-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Call me"
                  >
                    <Phone size={20} aria-hidden="true" />
                  </motion.a>

                  <motion.button
                    onClick={scrollToTop}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="absolute bottom-[5.5rem] right-[3.5rem] flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 transition-colors"
                    aria-label="Scroll to top"
                    type="button"
                  >
                    <ArrowUp size={20} aria-hidden="true" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
