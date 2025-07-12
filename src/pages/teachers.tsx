
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { type Teacher, type InsertTeacher } from "../shared/schema";

// Sample data with IDs added
const sampleTeachers: Teacher[] = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Carter",
    email: "emily.carter@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    title: "Mathematics Department Head",
    status: "active",
    subjects: "Algebra II, Calculus, Statistics",
    startDate: "2020-09-01",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@school.edu",
    phone: "+1 (555) 234-5678",
    department: "Science",
    title: "Physics Teacher",
    status: "on-leave",
    subjects: "Physics, Advanced Physics",
    startDate: "2019-08-15",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Rodriguez",
    email: "sarah.rodriguez@school.edu",
    phone: "+1 (555) 345-6789",
    department: "English",
    title: "English Literature",
    status: "active",
    subjects: "English Literature, Creative Writing",
    startDate: "2021-01-10",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@school.edu",
    phone: "+1 (555) 456-7890",
    department: "History",
    title: "History Department",
    status: "inactive",
    subjects: "World History, American History",
    startDate: "2018-09-01",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    firstName: "Lisa",
    lastName: "Chen",
    email: "lisa.chen@school.edu",
    phone: "+1 (555) 567-8901",
    department: "Art",
    title: "Art & Design",
    status: "active",
    subjects: "Visual Arts, Digital Design",
    startDate: "2022-02-15",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@school.edu",
    phone: "+1 (555) 678-9012",
    department: "Science",
    title: "Chemistry Lab",
    status: "active",
    subjects: "Chemistry, Organic Chemistry",
    startDate: "2020-01-20",
    notes: "",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  }
];

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTeachers, setSelectedTeachers] = useState<Set<number>>(new Set());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const limit = 6; // Matches our sample data size

  const { data: teachersData, isLoading } = useQuery({
    queryKey: ['teachers', {
      search: searchQuery,
      department: departmentFilter,
      status: statusFilter,
      page: currentPage,
      limit
    }],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter logic
      let filteredTeachers = [...sampleTeachers];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTeachers = filteredTeachers.filter(teacher =>
          teacher.firstName.toLowerCase().includes(query) ||
          teacher.lastName.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query)
        );
      }

      if (departmentFilter !== "all") {
        filteredTeachers = filteredTeachers.filter(
          teacher => teacher.department === departmentFilter
        );
      }

      if (statusFilter !== "all") {
        filteredTeachers = filteredTeachers.filter(
          teacher => teacher.status === statusFilter
        );
      }

      // Pagination logic
      const startIndex = (currentPage - 1) * limit;
      const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + limit);

      return {
        teachers: paginatedTeachers,
        total: filteredTeachers.length
      };
    },
  });

  const teachers = teachersData?.teachers || [];
  const totalCount = teachersData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleTeacherSelect = (id: number, selected: boolean) => {
    const newSelection = new Set(selectedTeachers);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selected ? newSelection.add(id) : newSelection.delete(id);
    setSelectedTeachers(newSelection);
  };

  const handleFormSubmit = (data: InsertTeacher) => {
    if (editingTeacher) {
      // In a real app, you would call your API here
      console.log("Would update teacher:", editingTeacher.id, data);
    } else {
      // In a real app, you would call your API here
      console.log("Would create teacher:", data);
    }
    setIsFormModalOpen(false);
    setEditingTeacher(null);
  };

  const handleExport = () => {
    console.log("Exporting teachers data...");
    // In a real app, implement actual export logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
            <p className="text-sm text-gray-600 mt-2">Manage your institution's teaching staff</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </button>
            <button
              onClick={() => {
                setEditingTeacher(null);
                setIsFormModalOpen(true);
              }}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Teacher
            </button>
          </div>
        </div>

        {/* Search and Filter UI */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search teachers..."
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Art">Art</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTeachers.size > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-700">
                  {selectedTeachers.size} selected
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedTeachers(new Set())}
                  className="text-sm text-yellow-700 hover:text-yellow-600"
                >
                  Clear selection
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${selectedTeachers.size} teacher(s)?`)) {
                      console.log("Would delete teachers:", Array.from(selectedTeachers));
                      setSelectedTeachers(new Set());
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Delete selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teachers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse h-64">
                <div className="flex space-x-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={teacher.avatar}
                      alt={`${teacher.firstName} ${teacher.lastName}`}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{teacher.title}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Department:</span> {teacher.department}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${teacher.status === "active"
                        ? "bg-green-100 text-green-800"
                        : teacher.status === "on-leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {teacher.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Subjects:</span> {teacher.subjects}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.has(teacher.id)}
                      onChange={(e) => handleTeacherSelect(teacher.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingTeacher(teacher);
                        setIsFormModalOpen(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${teacher.firstName} ${teacher.lastName}?`)) {
                          console.log("Would delete teacher:", teacher.id);
                        }
                      }}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && teachers.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No teachers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsFormModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Teacher
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8 px-4 py-3 bg-white rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * limit, totalCount)}</span> of{" "}
              <span className="font-medium">{totalCount}</span> teachers
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Teacher Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries()) as unknown as InsertTeacher;
                handleFormSubmit(data);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      defaultValue={editingTeacher?.firstName || ""}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      defaultValue={editingTeacher?.lastName || ""}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={editingTeacher?.email || ""}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue={editingTeacher?.phone || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <select
                      id="department"
                      name="department"
                      defaultValue={editingTeacher?.department || ""}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Art">Art</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title/Position
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={editingTeacher?.title || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Department Head"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={editingTeacher?.status || "active"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      defaultValue={editingTeacher?.startDate || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects Taught
                  </label>
                  <textarea
                    id="subjects"
                    name="subjects"
                    defaultValue={editingTeacher?.subjects || ""}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List subjects separated by commas"
                  />
                </div>
                <div className="mt-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    defaultValue={editingTeacher?.notes || ""}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional information about the teacher"
                  />
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormModalOpen(false);
                      setEditingTeacher(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {editingTeacher ? "Update Teacher" : "Add Teacher"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}