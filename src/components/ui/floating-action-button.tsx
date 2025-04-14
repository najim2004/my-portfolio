"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, ArrowUp, X, Plus } from "lucide-react"

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if user is actively scrolling
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsScrolling(true)
        clearTimeout(window.scrollTimeout)

        window.scrollTimeout = setTimeout(() => {
          setIsScrolling(false)
        }, 1000) as unknown as number
      }

      setLastScrollY(currentScrollY)

      if (currentScrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(window.scrollTimeout)
    }
  }, [lastScrollY])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const scrollToTop = () => {
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Main FAB Button */}
            <button
              onClick={toggleExpand}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isExpanded ? "close" : "open"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? <X size={24} /> : <Plus size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* FAB Menu Items */}
            <AnimatePresence>
              {isExpanded && (
                <>
                  {/* Call Button */}
                  <motion.a
                    href="tel:+1234567890"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="absolute bottom-20 right-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Call me"
                  >
                    <Phone size={20} />
                  </motion.a>

                  {/* Scroll to Top Button */}
                  <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="absolute bottom-[5.5rem] right-[3.5rem] flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 transition-colors"
                    aria-label="Scroll to top"
                  >
                    <ArrowUp size={20} />
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
