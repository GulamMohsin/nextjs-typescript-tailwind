/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Trash2, Mail, Phone, Building, Calendar } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Button from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { type Teacher } from "../shared/schema";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export default function TeacherDetailsModal({
  isOpen,
  onClose,
  teacher,
  onEdit,
  onDelete
}: TeacherDetailsModalProps) {
  if (!teacher) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'on-leave':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const subjects = teacher.subjects ? teacher.subjects.split(',').map((s: string) => s.trim()) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-6">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&background=e5e7eb&color=374151&size=96`}
              alt={`${teacher.firstName} ${teacher.lastName}`}
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900">
                {teacher.firstName} {teacher.lastName}
              </h4>
              <p className="text-lg text-gray-600">{teacher.title}</p>
              <div className="mt-2">
                <Badge className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(teacher.status)}`}>
                  <div className={`w-2 h-2 ${getStatusDotColor(teacher.status)} rounded-full mr-2`}></div>
                  {formatStatus(teacher.status)}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => onEdit(teacher)}
                style={{ backgroundColor: 'hsl(208, 79%, 51%)', color: 'white' }}
                className="hover:opacity-90"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => onDelete(teacher)}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-900">Contact Information</h5>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span>{teacher.email}</span>
                </div>
                {teacher.phone && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <span>{teacher.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-900">Professional Information</h5>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Building className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span>{teacher.department} Department</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span>Started: {formatDate(teacher.startDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {subjects.length > 0 && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-gray-900 mb-3">Subjects Taught</h5>
              <div className="flex flex-wrap gap-2">
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
                {subjects.map((subject: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                  <Badge
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {teacher.notes && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h5>
              <p className="text-gray-700">{teacher.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
