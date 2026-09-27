"use client"

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { X, ImageIcon, FileText, Loader2, AlertCircle } from "lucide-react";

const CATEGORIES = [
  { value: "healthcare",   label: "Healthcare" },
  { value: "education",    label: "Education" },
  { value: "fintech",      label: "Fintech" },
  { value: "b2b services", label: "B2B Services" },
  { value: "technology",   label: "Technology" },
  { value: "design",       label: "Design" },
  { value: "science",      label: "Science" },
  { value: "marketing",    label: "Marketing" },
  { value: "lifestyle",    label: "Lifestyle" },
];

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export default function CreateProblemPage() {
  const router = useRouter();
  const [posterType, setPosterType]   = useState("individual");
  const [projectType, setProjectType] = useState("paid");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [file, setFile]               = useState(null);
  const [preview, setPreview]         = useState(null);
  const [dragging, setDragging]       = useState(false);
  const [pdf, setPdf]                 = useState(null);
  const [pdfDragging, setPdfDragging] = useState(false);
  const fileRef = useRef(null);
  const pdfRef  = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, [handleFile]);

  const handlePdfDrop = useCallback((e) => {
    e.preventDefault();
    setPdfDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") setPdf(f);
  }, []);

  const removeFile = () => { setFile(null); setPreview(null); };
  const removePdf  = () => setPdf(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.target);
      let imageUrl    = null;
      let documentUrl = null;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetchApi("/api/upload", { method: "POST", body: fd });
        imageUrl = res.url;
      }

      if (pdf) {
        const fd = new FormData();
        fd.append("file", pdf);
        const res = await fetchApi("/api/upload", { method: "POST", body: fd });
        documentUrl = res.url;
      }

      await fetchApi("/api/problems", {
        method: "POST",
        body: JSON.stringify({
          title:        formData.get("title"),
          description:  formData.get("description"),
          details:      formData.get("description"),
          category:     formData.get("category"),
          project_type: projectType,
          timeline:     formData.get("timeline"),
          image_url:    imageUrl,
          document_url: documentUrl,
        }),
      });

      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to create problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Problem</h1>
        <p className="text-muted-foreground mt-2">
          Post a problem you want to solve, and find the right talent to collaborate with.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8 space-y-6">
          <FieldGroup>
            {/* ── Cover Image ── */}
            <Field>
              <FieldLabel className="text-base">
                Cover Image <span className="text-muted-foreground font-normal">(Optional)</span>
              </FieldLabel>
              <FieldDescription>Upload a cover image, flowchart, or screenshot for your post.</FieldDescription>

              {preview ? (
                <div className="mt-2 relative rounded-xl overflow-hidden border border-border">
                  <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white truncate max-w-[80%]">
                    {file?.name}
                  </div>
                </div>
              ) : (
                <div
                  className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors cursor-pointer select-none ${
                    dragging ? "border-primary bg-primary/5" : "border-input hover:bg-muted/40"
                  }`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted mb-3">
                    <ImageIcon className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10 MB</p>
                  <input
                    ref={fileRef}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                    disabled={loading}
                  />
                </div>
              )}
            </Field>

            {/* ── Problem Statement ── */}
            <Field>
              <FieldLabel htmlFor="title" className="text-base">Problem Statement</FieldLabel>
              <FieldDescription>A clear, concise statement of the problem.</FieldDescription>
              <Input
                id="title" name="title"
                placeholder="e.g., Need Hospital Queue Management System"
                className="h-12" required disabled={loading}
              />
            </Field>

            {/* ── Posting As + Category ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50 space-y-3">
                <FieldLabel className="text-base">Posting As</FieldLabel>
                <div className="flex gap-4">
                  {[["individual", "Individual"], ["organization", "Organization"]].map(([v, l]) => (
                    <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" value={v} checked={posterType === v}
                        onChange={() => setPosterType(v)} className="accent-primary h-4 w-4" />
                      {l}
                    </label>
                  ))}
                </div>
                {posterType === "organization" && (
                  <Input placeholder="Organization name" required disabled={loading} />
                )}
              </div>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select id="category" name="category" className={SELECT_CLASS} required defaultValue="" disabled={loading}>
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* ── Description ── */}
            <Field>
              <FieldLabel htmlFor="description" className="text-base">Description</FieldLabel>
              <FieldDescription>Provide all necessary details, context, and current pain points.</FieldDescription>
              <textarea
                id="description" name="description" rows={6}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the problem in detail..."
                required disabled={loading}
              />
            </Field>

            {/* ── Project Type + Timeline ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50 space-y-3">
                <FieldLabel className="text-base">Project Type</FieldLabel>
                <div className="flex gap-4">
                  {[["paid", "Paid Project"], ["open_source", "Open Source"]].map(([v, l]) => (
                    <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" value={v} checked={projectType === v}
                        onChange={() => setProjectType(v)} className="accent-primary h-4 w-4" />
                      {l}
                    </label>
                  ))}
                </div>
              </div>

              <Field>
                <FieldLabel htmlFor="timeline">Expected Timeline</FieldLabel>
                <select id="timeline" name="timeline" className={SELECT_CLASS} required defaultValue="" disabled={loading}>
                  <option value="" disabled>Select timeline</option>
                  <option value="1-week">Less than 1 week</option>
                  <option value="1-month">1 month</option>
                  <option value="3-months">1–3 months</option>
                  <option value="6-months">3–6 months</option>
                  <option value="ongoing">Ongoing project</option>
                </select>
              </Field>
            </div>

            {/* ── PDF Attachment ── */}
            <Field>
              <FieldLabel className="text-base">
                Detailed Document <span className="text-muted-foreground font-normal">(Optional)</span>
              </FieldLabel>
              <FieldDescription>
                Attach a PDF with full specs, requirements, or any detailed brief. Others can download it.
              </FieldDescription>

              {pdf ? (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{pdf.name}</p>
                    <p className="text-xs text-muted-foreground">{(pdf.size / 1024).toFixed(1)} KB · PDF</p>
                  </div>
                  <button
                    type="button"
                    onClick={removePdf}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors cursor-pointer select-none ${
                    pdfDragging ? "border-red-400 bg-red-50/50 dark:bg-red-900/10" : "border-input hover:bg-muted/40"
                  }`}
                  onClick={() => pdfRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setPdfDragging(true); }}
                  onDragLeave={() => setPdfDragging(false)}
                  onDrop={handlePdfDrop}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 mb-3">
                    <FileText className="h-6 w-6 text-red-500" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Click to attach PDF <span className="font-normal text-muted-foreground">or drag and drop</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF up to 10 MB</p>
                  <input
                    ref={pdfRef}
                    type="file"
                    className="sr-only"
                    accept="application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setPdf(f);
                    }}
                    disabled={loading}
                  />
                </div>
              )}
            </Field>

          </FieldGroup>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" type="button" onClick={() => router.push("/")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" size="lg" className="px-8" disabled={loading}>
            {loading
              ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Publishing...</>
              : "Publish Problem"
            }
          </Button>
        </div>
      </form>
    </div>
  );
}
