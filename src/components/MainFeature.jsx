import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Info } from "lucide-react";

// Sample gallery data
const galleryExhibitions = [
  {
    id: 1,
    title: "Modern Expressions",
    description: "A curated collection of contemporary artworks exploring modern themes and techniques.",
    thumbnail: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworks: [
      {
        id: 101,
        title: "Urban Reflections",
        artist: "Maya Johnson",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An exploration of city life through fragmented mirror images."
      },
      {
        id: 102,
        title: "Digital Dreams",
        artist: "Theo Williams",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A digital artwork exploring the intersection of technology and consciousness."
      },
      {
        id: 103,
        title: "Geometric Harmony",
        artist: "Rafael Mendez",
        imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Precise geometric forms creating a sense of balance and proportion."
      }
    ]
  },
  {
    id: 2,
    title: "Classical Perspectives",
    description: "Timeless works that showcase traditional techniques and classical themes.",
    thumbnail: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworks: [
      {
        id: 201,
        title: "Autumn Reflections",
        artist: "Clara Fontaine",
        imageUrl: "https://images.unsplash.com/photo-1579541671172-43429ce17aca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A serene landscape capturing the golden hues of autumn reflected in a still lake."
      },
      {
        id: 202,
        title: "Portrait in Blue",
        artist: "Sophia Nakamura",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A contemplative portrait study using a predominantly blue palette."
      },
      {
        id: 203,
        title: "Still Life with Fruit",
        artist: "Vincent Moreau",
        imageUrl: "https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A traditional still life composition highlighting light and texture."
      }
    ]
  },
  {
    id: 3,
    title: "Abstract Visions",
    description: "Bold explorations of color, form, and emotion through abstract expression.",
    thumbnail: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    artworks: [
      {
        id: 301,
        title: "Color Fields",
        artist: "Elena Moretti",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An exploration of color relationships and emotional resonance."
      },
      {
        id: 302,
        title: "Dynamic Composition #7",
        artist: "Marcus Chen",
        imageUrl: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A vibrant composition exploring movement and energy through abstract forms."
      },
      {
        id: 303,
        title: "Textural Study",
        artist: "James Wilson",
        imageUrl: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An abstract exploration of texture and material."
      }
    ]
  }
];

const MainFeature = () => {
  const [selectedExhibition, setSelectedExhibition] = useState(galleryExhibitions[0]);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const imageRef = useRef(null);
  const viewerRef = useRef(null);
  
  const currentArtwork = selectedExhibition.artworks[currentArtworkIndex];

  useEffect(() => {
    // Reset zoom and position when changing artwork
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  }, [currentArtworkIndex, selectedExhibition]);

  useEffect(() => {
    // Check if we're in mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobileView);
    
    // Clean up listener on component unmount
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  };

  const handleNextArtwork = () => {
    setCurrentArtworkIndex(prev => 
      prev === selectedExhibition.artworks.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevArtwork = () => {
    setCurrentArtworkIndex(prev => 
      prev === 0 ? selectedExhibition.artworks.length - 1 : prev - 1
    );
  };

  // Mouse events
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartDragPosition({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startDragPosition.x;
      const newY = e.clientY - startDragPosition.y;
      
      // Calculate boundaries based on zoom level
      const maxX = (imageRef.current?.offsetWidth * (zoomLevel - 1)) / 2 || 0;
      const maxY = (imageRef.current?.offsetHeight * (zoomLevel - 1)) / 2 || 0;
      
      setDragPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setStartDragPosition({
        x: e.touches[0].clientX - dragPosition.x,
        y: e.touches[0].clientY - dragPosition.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      const newX = e.touches[0].clientX - startDragPosition.x;
      const newY = e.touches[0].clientY - startDragPosition.y;
      
      // Calculate boundaries based on zoom level
      const maxX = (imageRef.current?.offsetWidth * (zoomLevel - 1)) / 2 || 0;
      const maxY = (imageRef.current?.offsetHeight * (zoomLevel - 1)) / 2 || 0;
      
      setDragPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
      
      // Prevent default to avoid page scrolling while dragging
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700">
      <div className="relative flex flex-col md:flex-row md:grid md:grid-cols-4">
        {/* Mobile Exhibition Selector Toggle */}
        {isMobileView && (
          <button 
            onClick={toggleSidebar}
            className="flex items-center justify-between w-full p-4 bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-100"
          >
            <span className="font-medium">{selectedExhibition.title}</span>
            <span className={`transition-transform duration-300 ${showSidebar ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        )}
        
        {/* Exhibition Sidebar */}
        <div className={`
          bg-surface-100 dark:bg-surface-700 
          ${isMobileView ? (showSidebar ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden') : ''}
          transition-all duration-300 ease-in-out
          md:col-span-1 md:max-h-none md:block
        `}>
          <div className="p-4 md:p-6">
            <h3 className="text-xl font-heading font-medium text-surface-800 dark:text-surface-100 mb-4">
              Virtual Exhibitions
            </h3>
            
            <div className="space-y-4">
              {galleryExhibitions.map((exhibition) => (
                <motion.div
                  key={exhibition.id}
                  whileHover={{ x: 4 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedExhibition.id === exhibition.id
                      ? "bg-primary/10 dark:bg-primary/20 border-l-4 border-primary dark:border-primary-light"
                      : "hover:bg-surface-200 dark:hover:bg-surface-600"
                  }`}
                  onClick={() => {
                    setSelectedExhibition(exhibition);
                    setCurrentArtworkIndex(0);
                    if (isMobileView) {
                      setShowSidebar(false);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={exhibition.thumbnail}
                        alt={exhibition.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        selectedExhibition.id === exhibition.id
                          ? "text-primary dark:text-primary-light"
                          : "text-surface-700 dark:text-surface-200"
                      }`}>
                        {exhibition.title}
                      </h4>
                      <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-1">
                        {exhibition.artworks.length} artworks
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Viewer */}
        <div className="md:col-span-3">
          <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-surface-900 overflow-hidden" ref={viewerRef}>
            {/* Artwork Viewer */}
            <div 
              className="h-full w-full flex items-center justify-center overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentArtwork.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  <img
                    ref={imageRef}
                    src={currentArtwork.imageUrl}
                    alt={currentArtwork.title}
                    className="max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-surface-900 to-transparent">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex space-x-1 sm:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleZoomIn}
                    className="p-1.5 sm:p-2 rounded-full bg-surface-800/80 text-white hover:bg-surface-700/80 transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={16} className="sm:size-18" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className={`p-1.5 sm:p-2 rounded-full ${
                      zoomLevel <= 1
                        ? "bg-surface-800/50 text-surface-500 cursor-not-allowed"
                        : "bg-surface-800/80 text-white hover:bg-surface-700/80"
                    } transition-colors`}
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={16} className="sm:size-18" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleReset}
                    disabled={zoomLevel === 1 && dragPosition.x === 0 && dragPosition.y === 0}
                    className={`p-1.5 sm:p-2 rounded-full ${
                      zoomLevel === 1 && dragPosition.x === 0 && dragPosition.y === 0
                        ? "bg-surface-800/50 text-surface-500 cursor-not-allowed"
                        : "bg-surface-800/80 text-white hover:bg-surface-700/80"
                    } transition-colors`}
                    aria-label="Reset view"
                  >
                    <RotateCcw size={16} className="sm:size-18" />
                  </motion.button>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="text-white text-xs sm:text-sm">
                    {currentArtworkIndex + 1} / {selectedExhibition.artworks.length}
                  </div>
                  
                  <div className="flex space-x-1 sm:space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevArtwork}
                      className="p-1.5 sm:p-2 rounded-full bg-surface-800/80 text-white hover:bg-surface-700/80 transition-colors"
                      aria-label="Previous artwork"
                    >
                      <ChevronLeft size={16} className="sm:size-18" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextArtwork}
                      className="p-1.5 sm:p-2 rounded-full bg-surface-800/80 text-white hover:bg-surface-700/80 transition-colors"
                      aria-label="Next artwork"
                    >
                      <ChevronRight size={16} className="sm:size-18" />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-1.5 sm:p-2 rounded-full ${
                      showInfo
                        ? "bg-primary text-white"
                        : "bg-surface-800/80 text-white hover:bg-surface-700/80"
                    } transition-colors`}
                    aria-label="Show information"
                  >
                    <Info size={16} className="sm:size-18" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Information Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 right-0 w-full sm:w-3/4 md:w-72 bg-surface-800/90 backdrop-blur-sm p-3 sm:p-4 m-0 sm:m-2 md:m-4 rounded-lg"
                >
                  <h3 className="text-lg sm:text-xl font-heading font-medium text-white mb-1 sm:mb-2">
                    {currentArtwork.title}
                  </h3>
                  <p className="text-surface-300 text-sm sm:text-base mb-1">
                    by {currentArtwork.artist}
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 sm:mt-4">
                    {currentArtwork.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Exhibition Description */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-2 sm:mb-3">
              {selectedExhibition.title}
            </h2>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-300 mb-4 sm:mb-6">
              {selectedExhibition.description}
            </p>
            
            {/* Artwork Thumbnails */}
            <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {selectedExhibition.artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative cursor-pointer flex-shrink-0 ${
                    index === currentArtworkIndex ? "ring-2 ring-primary dark:ring-primary-light" : ""
                  }`}
                  onClick={() => setCurrentArtworkIndex(index)}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {index === currentArtworkIndex && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-primary dark:bg-primary-light rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;