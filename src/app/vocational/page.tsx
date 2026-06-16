"use client";

import { useState } from "react";
import Link from "next/link";

export default function VocationalPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    { src: "/University pdf/vocational.png", alt: "Vocational" },
    { src: "/University pdf/vocational2.png", alt: "Vocational 2" },
  ];

  return (
    <>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        padding: "40px 20px",
      }}>
        {/* Back Button */}
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "#a78bfa",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: 600,
          marginBottom: "20px",
          padding: "10px 20px",
          border: "1px solid rgba(167,139,250,0.4)",
          borderRadius: "8px",
          transition: "all 0.3s",
        }}>
          ← Back to Website
        </Link>

        {/* Header */}
        <h1 style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: "10px",
          letterSpacing: "1px",
        }}>
          Vocational Training Provider
        </h1>
        <p style={{
          textAlign: "center",
          color: "#a78bfa",
          fontSize: "1.1rem",
          marginBottom: "40px",
          fontWeight: 500,
        }}>
          and Admission Counselor
        </p>

        {/* Image Gallery */}
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImg(img.src)}
              style={{
                cursor: "pointer",
                borderRadius: "12px",
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                background: "#1a1a2e",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(167,139,250,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", display: "block" }}
              />
              <p style={{
                textAlign: "center",
                color: "#c4b5fd",
                padding: "10px",
                margin: 0,
                fontSize: "0.9rem",
                fontWeight: 600,
              }}>
                {img.alt}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div style={{
          maxWidth: "600px",
          margin: "50px auto 0",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "30px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 700, marginBottom: "15px" }}>
            📞 Contact Us
          </h2>
          <p style={{ color: "#e2e8f0", fontSize: "1.1rem", margin: "8px 0" }}>
            📱 <a href="tel:9258410701" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>9258410701</a>
          </p>
          <p style={{ color: "#e2e8f0", fontSize: "1.1rem", margin: "8px 0" }}>
            📧 <a href="mailto:goodlucksunil212@gmail.com" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>goodlucksunil212@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              border: "3px solid rgba(167,139,250,0.5)",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#1a1a2e",
            }}
          >
            <button
              onClick={() => setSelectedImg(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "1.2rem",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              ✕
            </button>
            <img
              src={selectedImg}
              alt="Enlarged"
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
