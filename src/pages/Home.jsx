import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ChevronLeft, X } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Sample data for the art gallery
const featuredArtworks = [
  {
    id: 1,
    title: "Ethereal Whispers",
    artist: "Elena Moretti",
    year: 2023,
    medium: "Oil on canvas",
    description: "An exploration of the boundary between dreams and reality, featuring ethereal figures emerging from a misty landscape.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Contemporary", "Surrealism", "Oil"]
  },
  {
    id: 2,
    title: "Urban Symphony",
    artist: "Marcus Chen",
    year: 2021,
    medium: "Acrylic and mixed media",
    description: "A vibrant depiction of city life, capturing the energy and rhythm of urban environments through bold colors and dynamic forms.",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Urban", "Abstract", "Mixed Media"]
  },
  {
    id: 3,
    title: "Solitude in Blue",
    artist: "Sophia Nakamura",
    year: 2022,
    medium: "Watercolor on paper",
    description: "A contemplative piece exploring themes of isolation and inner peace through a predominantly blue palette.",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Watercolor", "Minimalism", "Emotional"]
  },
  {
    id: 4,
    title: "Fractured Memories",
    artist: "James Wilson",
    year: 2020,
    medium: "Digital art",
    description: "A digital composition examining how memories fragment and reassemble over time, represented through geometric shapes and distorted imagery.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Digital", "Abstract", "Conceptual"]
  },
  {
    id: 5,
    title: "Autumn Reflections",
    artist: "Clara Fontaine",
    year: 2023,
    medium: "Oil on wood panel",
    description: "A serene landscape capturing the golden hues of autumn reflected in a still lake, evoking nostalgia and tranquility.",
    imageUrl: "https://images.unsplash.com/photo-1579541671172-43429ce17aca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Landscape", "Impressionism", "Seasonal"]
  },
  {
    id: 6,
    title: "Geometric Harmony",
    artist: "Rafael Mendez",
    year: 2022,
    medium: "Acrylic on canvas",
    description: "An exploration of balance and proportion through precise geometric forms and a harmonious color palette.",
    imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Geometric", "Minimalism", "Contemporary"]
  }
];

const collections = [
  { id: 1, name: "Contemporary Visions", count: 24 },
  { id: 2, name: "Abstract Expressions", count: 18 },
  { id: 3, name: "Figurative Masterpieces", count: 15 },
  { id: 4, name: "Digital Frontiers", count: 22 },
  { id: 5, name: "Landscape Perspectives", count: 19 }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState(featuredArtworks);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArtworks(featuredArtworks);
    } else {
      const filtered = featuredArtworks.filter(
        artwork =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredArtworks(filtered);
    }
  }, [searchQuery]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredArtworks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredArtworks.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-heading font-semibold text-primary dark:text-primary-light">
              Canvassence
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Exhibitions
            </a>
            <a href="#" className="font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Collections
            </a>
            <a href="#" className="font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Artists
            </a>
            <a href="#" className="font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              About
            </a>
          </div>
          
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artwork, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-light/30 w-full md:w-64 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900/30 to-surface-900/70 z-10"></div>
        
        <div className="relative h-full">
          {featuredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-3">
                {featuredArtworks[currentSlide].title}
              </h2>
              <p className="text-xl text-white/80 mb-2">
                {featuredArtworks[currentSlide].artist}, {featuredArtworks[currentSlide].year}
              </p>
              <p className="text-white/70 mb-6 max-w-xl">
                {featuredArtworks[currentSlide].description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedArtwork(featuredArtworks[currentSlide])}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300"
              >
                View Artwork
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {featuredArtworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Feature */}
      <section className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-12 text-center">
            Explore Our <span className="text-primary dark:text-primary-light">Virtual Gallery</span>
          </h2>
          
          <MainFeature />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-surface-800 dark:text-surface-100">
              Featured Artworks
            </h2>
            
            <div className="relative">
              <select 
                className="appearance-none bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-surface-500" size={16} />
            </div>
          </div>
          
          <div className="masonry-grid">
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="artwork-frame dark:artwork-frame-dark overflow-hidden rounded-lg">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-surface-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                  <h3 className="text-xl font-heading font-medium text-white">{artwork.title}</h3>
                  <p className="text-white/80">{artwork.artist}, {artwork.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredArtworks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-surface-600 dark:text-surface-400">No artworks found matching your search.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-12 text-center">
            Explore Our <span className="text-primary dark:text-primary-light">Collections</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-surface-700 rounded-xl overflow-hidden shadow-card dark:shadow-none border border-surface-200 dark:border-surface-600 group cursor-pointer"
              >
                <div className="h-48 bg-surface-200 dark:bg-surface-600 flex items-center justify-center">
                  <span className="text-6xl font-heading font-light text-primary dark:text-primary-light opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    {collection.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-medium text-surface-800 dark:text-surface-100 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300 mb-4">
                    {collection.count} artworks
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary dark:text-primary-light font-medium">
                      View Collection
                    </span>
                    <ChevronRight className="text-primary dark:text-primary-light transform group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">Canvassence</h3>
              <p className="text-surface-300 mb-6">
                Discover the world's finest art collections in our immersive virtual gallery experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white transition-colors">Exhibitions</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white transition-colors">Artists</a></li>
                <li><a href="#" className="text-surface-300 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Subscribe</h4>
              <p className="text-surface-300 mb-4">
                Join our newsletter to stay updated on new exhibitions and events.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-surface-700 dark:bg-surface-800 border border-surface-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-r-md transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>© {new Date().getFullYear()} Canvassence. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              <div className="relative">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface-900/50 text-white hover:bg-surface-900/80 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-surface-800 dark:text-surface-100 mb-2">
                  {selectedArtwork.title}
                </h2>
                <p className="text-lg text-surface-600 dark:text-surface-300 mb-4">
                  {selectedArtwork.artist}, {selectedArtwork.year}
                </p>
                <p className="text-surface-500 dark:text-surface-400 mb-2">
                  {selectedArtwork.medium}
                </p>
                <p className="text-surface-700 dark:text-surface-300 mb-6">
                  {selectedArtwork.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArtwork.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-surface-900 rounded-md transition-colors duration-300">
                    Add to Favorites
                  </button>
                  <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300">
                    View in 3D Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Missing components for the Home page
const ChevronDown = ({ className, size }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
};

const Instagram = ({ size }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
};

const Facebook = ({ size }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
};

const Twitter = ({ size }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
};

export default Home;