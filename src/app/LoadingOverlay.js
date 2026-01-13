"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow">
        Loading...
      </div>
    </div>
  );
}