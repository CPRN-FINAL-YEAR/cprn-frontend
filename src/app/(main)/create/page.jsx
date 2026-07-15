import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Upload, X } from "lucide-react";

export default function CreateProblemPage() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Problem</h1>
        <p className="text-muted-foreground mt-2">
          Post a problem you want to solve, and find the right talent to collaborate with.
        </p>
      </div>

      <form className="space-y-8">
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
          <FieldGroup>
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title" className="text-base">Problem Title</FieldLabel>
              <FieldDescription>A clear, concise title for the problem.</FieldDescription>
              <Input id="title" placeholder="e.g., Need Hospital Queue Management System" className="h-12" required />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select 
                  id="category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled selected>Select a category</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="fintech">Fintech</option>
                </select>
              </Field>

              {/* Timeline */}
              <Field>
                <FieldLabel htmlFor="timeline">Expected Timeline</FieldLabel>
                <select 
                  id="timeline" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled selected>Select timeline</option>
                  <option value="1-week">Less than 1 week</option>
                  <option value="1-month">1 month</option>
                  <option value="3-months">1-3 months</option>
                  <option value="6-months">3-6 months</option>
                  <option value="ongoing">Ongoing project</option>
                </select>
              </Field>
            </div>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description" className="text-base">Description</FieldLabel>
              <FieldDescription>Provide all necessary details, context, and current pain points.</FieldDescription>
              <textarea 
                id="description" 
                rows={6}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="We currently handle 500 patients manually..."
                required
              />
            </Field>
            
            {/* Skills Needed */}
            <Field>
              <FieldLabel htmlFor="skills" className="text-base">Skills Needed</FieldLabel>
              <FieldDescription>Comma separated list of skills (e.g., React, Node, AWS)</FieldDescription>
              <Input id="skills" placeholder="React, Node.js, AWS, PostgreSQL" required />
            </Field>
            
            {/* Project Type (Open Source / Paid) & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="space-y-4">
                <FieldLabel className="text-base">Project Type</FieldLabel>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-input h-4 w-4 accent-primary" />
                    Paid Project
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-input h-4 w-4 accent-primary" defaultChecked />
                    Open Source
                  </label>
                </div>
              </div>
              
              <Field>
                <FieldLabel htmlFor="budget">Budget (if Paid)</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">₹</span>
                  <Input id="budget" type="number" placeholder="35,000" className="pl-7" />
                </div>
              </Field>
            </div>
            
            {/* Upload Images */}
            <Field>
              <FieldLabel className="text-base">Images or Mockups (Optional)</FieldLabel>
              <FieldDescription>Upload any reference images, flowcharts, or current system screenshots.</FieldDescription>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 transition-colors hover:bg-muted/50">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </Field>

          </FieldGroup>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" type="button">Cancel</Button>
          <Button type="submit" size="lg" className="px-8">Publish Problem</Button>
        </div>
      </form>
    </div>
  );
}
