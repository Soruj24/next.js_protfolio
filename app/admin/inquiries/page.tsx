"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Search, User, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else {
        toast.error("Failed to fetch inquiries");
      }
    } catch (error) {
      toast.error("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Inquiry deleted successfully");
        setInquiries(inquiries.filter((inq) => inq._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
      } else {
        toast.error("Failed to delete inquiry");
      }
    } catch (error) {
      toast.error("Error deleting inquiry");
    }
  };

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar - Inquiries List */}
      <div className="w-96 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Mail className="text-cyan-400" size={20} />
            Contact Inquiries
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-black/40 border-white/10 text-white h-12 rounded-2xl focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Loading Inquiries...
              </p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gray-600">
                <Mail size={24} />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No inquiries found.
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq._id}
                onClick={() => setSelectedInquiry(inq)}
                className={cn(
                  "p-6 border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/5 relative group",
                  selectedInquiry?._id === inq._id &&
                    "bg-cyan-500/10 border-l-4 border-l-cyan-500"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white text-sm truncate max-w-[150px]">
                    {inq.name}
                  </span>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-cyan-400 font-bold mb-1 truncate">
                  {inq.subject}
                </p>
                <p className="text-[10px] text-gray-500 truncate font-medium">
                  {inq.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-xl relative">
        {selectedInquiry ? (
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-white/10 bg-white/5">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                    <User className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {selectedInquiry.name}
                    </h2>
                    <p className="text-cyan-400 font-bold text-sm tracking-wide">
                      {selectedInquiry.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(selectedInquiry._id)}
                    className="h-12 w-12 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Clock className="text-gray-500" size={18} />
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Received At</p>
                    <p className="text-sm font-bold text-white">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <AlertCircle className="text-gray-500" size={18} />
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                      {selectedInquiry.status || "Unread"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
              <div className="max-w-3xl">
                <div className="mb-8">
                  <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Subject Line</h3>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-xl font-bold text-white leading-relaxed">
                      {selectedInquiry.subject}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Transmission Content</h3>
                  <div className="p-8 bg-black/40 rounded-[32px] border border-white/10 min-h-[200px]">
                    <p className="text-gray-300 font-medium leading-[1.8] whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <MessageSquare className="text-cyan-400" size={20} />
                   </div>
                   <p className="text-sm text-gray-400 font-medium">
                     Reply to this inquiry by clicking the email address above to open your mail client.
                   </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group">
              <Mail className="h-10 w-10 text-gray-700 group-hover:text-cyan-500 transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Select an Inquiry
            </h3>
            <p className="text-gray-500 max-w-xs font-medium">
              Choose a contact form submission from the list to view full details and manage the transmission.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
