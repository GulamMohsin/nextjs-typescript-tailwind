import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold" style={{ color: 'hsl(221, 83%, 25%)' }}>
                EduAdmin
              </h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a 
                href="#" 
                className="border-b-2 px-1 pt-1 pb-4 text-sm font-medium"
                style={{ 
                  color: 'hsl(208, 79%, 51%)', 
                  borderColor: 'hsl(208, 79%, 51%)' 
                }}
              >
                Teachers
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 pb-4 text-sm font-medium">
                Students
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 pb-4 text-sm font-medium">
                Courses
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 pb-4 text-sm font-medium">
                Reports
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <img 
                className="h-8 w-8 rounded-full" 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" 
                alt="User avatar" 
              />
              <span className="text-sm font-medium text-gray-700">Dr. Sarah Johnson</span>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
