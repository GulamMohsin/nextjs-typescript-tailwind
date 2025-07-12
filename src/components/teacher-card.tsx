import { MoreVertical, Mail, Phone, Building, Edit, Eye } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Button from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { type Teacher } from "../shared/schema";

interface TeacherCardProps {
  teacher: Teacher;
  isSelected: boolean;
  onSelect: (teacherId: number, selected: boolean) => void;
  onEdit: (teacher: Teacher) => void;
  onView: (teacher: Teacher) => void;
}

export default function TeacherCard({
  teacher,
  isSelected,
  onSelect,
  onEdit,
  onView
}: TeacherCardProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={isSelected}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onCheckedChange={(checked: any) => onSelect(teacher.id, !!checked)}
              className="mt-1"
            />
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&background=e5e7eb&color=374151`}
              alt={`${teacher.firstName} ${teacher.lastName}`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {teacher.firstName} {teacher.lastName}
              </h3>
              <p className="text-sm text-gray-500">{teacher.title}</p>
            </div>
          </div>
          <div className="relative">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="truncate">{teacher.email}</span>
          </div>
          {teacher.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <span>{teacher.phone}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span>{teacher.department}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
            <div className={`w-1.5 h-1.5 ${getStatusDotColor(teacher.status)} rounded-full mr-1`}></div>
            {formatStatus(teacher.status)}
          </Badge>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-400 hover:text-blue-600"
              onClick={() => onEdit(teacher)}
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-400 hover:text-blue-600"
              onClick={() => onView(teacher)}
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
