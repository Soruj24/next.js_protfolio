"use client";

import { useState } from "react";
import { AlertTriangle, Mail } from "lucide-react";
import { useInbox } from "@/features/admin/hooks/useInbox";
import InboxToolbar from "@/features/admin/components/InboxToolbar";
import InboxBulkActions from "@/features/admin/components/InboxBulkActions";
import InboxTable from "@/features/admin/components/InboxTable";
import InboxDetailPanel from "@/features/admin/components/InboxDetailPanel";
import type { Inquiry } from "@/types/admin";

export default function InboxPage() {
  const {
    data, loading, error, page, setPage, search, setSearch,
    statusFilter, setStatusFilter, selectedIds, selectedInquiry,
    setSelectedInquiry, actionLoading, fetchData, updateStatus,
    bulkUpdateStatus, bulkDelete, deleteMessage, toggleSelect,
    toggleSelectAll, clearSelection,
  } = useInbox();

  const [showDetail, setShowDetail] = useState(false);

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setShowDetail(true);
    if (inq.status === "pending") {
      updateStatus(inq._id, "read");
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedInquiry(null);
  };

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Failed to load messages</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{error}</p>
        <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Mail size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Inbox</h1>
            <p className="text-xs text-gray-500 font-medium">
              {data ? `${data.total} message${data.total !== 1 ? "s" : ""}` : "Loading..."}
              {data && data.unreadCount > 0 && (
                <span className="ml-2 text-cyan-400">{data.unreadCount} unread</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <InboxToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <InboxBulkActions
        count={selectedIds.size}
        actionLoading={actionLoading}
        onMarkRead={() => bulkUpdateStatus("read")}
        onMarkUnread={() => bulkUpdateStatus("pending")}
        onArchive={() => bulkUpdateStatus("archived")}
        onDelete={bulkDelete}
        onClear={clearSelection}
      />

      <div className="flex flex-1 gap-4 min-h-0">
        <InboxTable
          data={data}
          loading={loading}
          page={page}
          selectedIds={selectedIds}
          selectedInquiry={selectedInquiry}
          search={search}
          statusFilter={statusFilter}
          onSelectInquiry={handleSelectInquiry}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          onPageChange={setPage}
          onStatusChange={updateStatus}
          onDelete={deleteMessage}
          onClearSearch={() => setSearch("")}
        />

        {showDetail && selectedInquiry && (
          <InboxDetailPanel
            inquiry={selectedInquiry}
            onClose={handleCloseDetail}
            onStatusChange={updateStatus}
            onDelete={deleteMessage}
          />
        )}
      </div>
    </div>
  );
}
