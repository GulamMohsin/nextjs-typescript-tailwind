import { X } from "lucide-react";
import Button from "../components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkEdit: () => void;
  onBulkChangeStatus: () => void;
  onBulkDelete: () => void;
}

export default function BulkActions({
  selectedCount,
  onClearSelection,
  onBulkEdit,
  onBulkChangeStatus,
  onBulkDelete
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-blue-800">
            {selectedCount} teachers selected
          </span>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
              onClick={onBulkEdit}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
              onClick={onBulkChangeStatus}
            >
              Change Status
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
              onClick={onBulkDelete}
            >
              Delete
            </Button>
          </div>
        </div>
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={onClearSelection}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
