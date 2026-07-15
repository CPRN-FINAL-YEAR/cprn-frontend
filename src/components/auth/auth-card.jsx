import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthCard({ title, description, children, footer }) {
  return (
    <Card className="w-full max-w-md border-border/40 shadow-sm rounded-xl">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-center text-sm text-muted-foreground pt-4 pb-6">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
