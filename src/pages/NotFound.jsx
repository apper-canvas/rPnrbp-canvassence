import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-surface-50 dark:bg-surface-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <span className="inline-block text-9xl font-heading font-bold text-primary dark:text-primary-light">404</span>
        </div>
        
        <h1 className="text-3xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-30 rounded-lg"></div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300"
            >
              <Home size={18} className="mr-2" />
              Return to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default NotFound;