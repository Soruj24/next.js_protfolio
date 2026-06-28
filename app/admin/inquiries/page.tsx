"use client";
import { useInquiries } from "@/hooks/admin/useInquiries";
import InquiryList from "@/components/features/admin/InquiryList";
import InquiryDetail from "@/components/features/admin/InquiryDetail";
import InquiryEmptyState from "@/components/features/admin/InquiryEmptyState";

export default function AdminInquiriesPage() {
  const {
    loading, searchQuery, setSearchQuery,
    selectedInquiry, setSelectedInquiry,
    filteredInquiries, handleDelete,
  } = useInquiries();

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <InquiryList
        inquiries={[]}
        filteredInquiries={filteredInquiries}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedInquiry={selectedInquiry}
        setSelectedInquiry={setSelectedInquiry}
      />
      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl relative">
        {selectedInquiry ? (
          <InquiryDetail inquiry={selectedInquiry} onDelete={handleDelete} />
        ) : (
          <InquiryEmptyState />
        )}
      </div>
    </div>
  );
}
