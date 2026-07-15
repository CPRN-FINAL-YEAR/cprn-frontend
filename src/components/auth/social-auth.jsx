import { Button } from "@/components/ui/button";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.2 5.2 0 0 0-1.5-3.8 4.8 4.8 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C4.3 2.6 3 3 3 3a4.8 4.8 0 0 0-.1 3.8A5.2 5.2 0 0 0 1.4 10.6c0 5.26 3 6.46 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
      <path d="M9 18c-3.14 1-3.9-1.4-5-2" />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function SocialAuth() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full text-foreground/80 hover:text-foreground" type="button">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full text-foreground/80 hover:text-foreground" type="button">
          <GithubIcon className="mr-2 h-4 w-4" fill="none" />
          GitHub
        </Button>
      </div>
    </div>
  );
}
