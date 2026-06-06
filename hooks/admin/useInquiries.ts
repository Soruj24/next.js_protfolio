"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export function useInquiries() {
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
    } catch {
      toast.error("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Inquiry deleted successfully");
        setInquiries((prev) => prev.filter((inq) => inq._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
      } else {
        toast.error("Failed to delete inquiry");
      }
    } catch {
      toast.error("Error deleting inquiry");
    }
  };

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    inquiries, loading, searchQuery, setSearchQuery,
    selectedInquiry, setSelectedInquiry,
    filteredInquiries, handleDelete,
  };
}
