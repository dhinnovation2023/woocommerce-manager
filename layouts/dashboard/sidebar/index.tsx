import SidebarMenu from './sidebar-menu'
import { motion } from "framer-motion";

const DashboardSidebar = () => {
  return (
    <motion.div
      className='bg-background w-60 h-full shrink-0 absolute top-0 left-0 md:relative mt-16.25 md:mt-0 z-50 shadow-md'
      initial={{
        x: -20,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -20,
        opacity: 0,
      }}
    >
      <SidebarMenu />
    </motion.div>
  )
}

export default DashboardSidebar