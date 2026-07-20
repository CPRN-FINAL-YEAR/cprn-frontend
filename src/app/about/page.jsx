import { Navbar } from "@/components/layout/navbar";
import { 
  Users, 
  Target, 
  Eye, 
  Lightbulb, 
  CheckCircle, 
  MessageSquare, 
  Shield, 
  Activity,
  Globe,
  Award,
  Zap,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/30 pt-24 pb-32">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
          
          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              About CommUnity
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-serif">
              Building Better Communities <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Through Collaboration
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              CommUnity is a collaborative platform that connects communities, students, and experts to solve real-world problems through innovation and teamwork.
            </p>
          </div>
        </section>

        {/* The Problem & Our Solution */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-serif">Bridging the Gap</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Many valuable community challenges remain unresolved because people with ideas, technical skills, and domain expertise often work in isolation. 
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  CommUnity bridges this gap by providing a structured ecosystem where communities can post problems, students can form teams and propose innovative solutions, experts can review and guide projects, and approved teams can implement solutions while tracking their progress from start to finish.
                </p>
              </div>
              <div className="relative rounded-2xl p-8 bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-sm">
                <div className="absolute -top-6 -right-6 text-primary opacity-10">
                  <Globe size={120} />
                </div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" /> Transformative Impact
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform transforms community needs into meaningful learning opportunities, enabling students to gain hands-on experience while creating measurable social impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                <Target className="h-10 w-10 text-primary mb-6" />
                <h2 className="text-2xl font-bold mb-4 font-serif">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To empower communities by connecting them with talented students and experienced experts, fostering innovation that creates sustainable and impactful solutions.
                </p>
              </div>
              <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:bg-blue-500/10 transition-colors" />
                <Eye className="h-10 w-10 text-blue-500 mb-6" />
                <h2 className="text-2xl font-bold mb-4 font-serif">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To become the leading collaborative innovation platform where every community challenge finds the right team, every student gains practical experience, and every successful solution contributes to a better society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">What We Offer</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A structured process that ensures accountability and successful project delivery.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Community Problem Posting", desc: "Share real-world challenges that need innovative solutions.", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
                { title: "Team Collaboration", desc: "Students can discover problems, form teams, and work together effectively.", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                { title: "Expert Review", desc: "Experienced professionals evaluate proposals and provide constructive guidance.", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
                { title: "Progress Tracking", desc: "Monitor every stage of implementation from idea to completion.", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
                { title: "Transparent Workflow", desc: "A structured process that ensures accountability and successful project delivery.", icon: Shield, color: "text-primary", bg: "bg-primary/10" },
              ].map((feature, i) => (
                <div key={i} className="rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Innovations & Core Values */}
        <section className="py-20 bg-muted/20 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16">
              
              {/* Future Innovations */}
              <div>
                <h2 className="text-3xl font-bold mb-8 font-serif">Future Innovations</h2>
                <p className="text-muted-foreground mb-8">CommUnity is designed to evolve with intelligent technologies, including:</p>
                
                <ul className="space-y-4">
                  {[
                    "AI-Powered Team Recommendations",
                    "Expert Recommendation System",
                    "AI-Assisted Proposal Review",
                    "RAG-Based Knowledge Assistant",
                    "Intelligent Progress Analytics",
                    "Knowledge Graph Integration"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-foreground/80 font-medium">
                      <div className="mr-4 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <CheckCircle size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Values */}
              <div>
                <h2 className="text-3xl font-bold mb-8 font-serif">Our Core Values</h2>
                <div className="flex flex-wrap gap-4">
                  {[
                    { text: "Collaboration", icon: Users },
                    { text: "Innovation", icon: Lightbulb },
                    { text: "Community Impact", icon: Globe },
                    { text: "Trust & Transparency", icon: Shield },
                    { text: "Continuous Learning", icon: BookOpen },
                  ].map((val, i) => (
                    <div key={i} className="flex items-center bg-background border border-border shadow-sm rounded-full px-5 py-3">
                      <val.icon className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium text-sm">{val.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Join the Movement</h2>
            <p className="text-xl md:text-2xl font-medium text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              "Every great solution begins with a problem worth solving."
            </p>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're a community seeking change, a student eager to make an impact, or an expert willing to mentor the next generation, CommUnity provides the platform to transform ideas into meaningful solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" variant="secondary" className="font-semibold px-8 h-12 w-full sm:w-auto rounded-full">
                  Together, we build stronger communities <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
