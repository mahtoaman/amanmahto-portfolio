import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Rocket, Headset, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CollaborationSection = () => {
  return (
    <section className="py-8 relative overflow-hidden bg-[#E0F2FE]">
      {/* Background Gradient matching the reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE] to-[#F0F9FF] pointer-events-none"></div>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-8">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">
            Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Simple & Transparent Process
          </h2>
        </div>

        {/* Desktop Radial Layout */}
        <div className="relative max-w-5xl mx-auto min-h-[600px] hidden lg:block">
            {/* Center Logo/Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-50 z-20 relative flex-shrink-0 aspect-square">
                    <span className="text-xl font-bold font-display text-slate-900">
                        Aman<span className="text-blue-600">.Dev</span>
                    </span>
                    
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full -z-10 animate-ping opacity-20 duration-1000"></div>
                </div>
                
                {/* Concentric Circles Background - Using absolute width/height guarantees squareness if parent allows, but adding aspect-square is safer */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-blue-200 rounded-full -z-20 opacity-50 pointer-events-none flex-shrink-0 aspect-square"></div>
            </div>

            {/* Step 1: Top Left */}
            <div className="absolute top-20 left-[10%] max-w-xs text-right group">
                <div className="flex flex-col items-end gap-4">
                    <div className="bg-white p-4 rounded-full shadow-lg border border-blue-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 aspect-square flex items-center justify-center w-16 h-16">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Consultation</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We start with a brief, focused consultation to quickly understand your project needs and goals.
                    </p>
                </div>
            </div>

            {/* Step 2: Bottom Left */}
            <div className="absolute bottom-20 left-[10%] max-w-xs text-right group">
                 {/* Reordered for visual flow bottom-up implies text then icon? No, consistent top-down is better usually, but let's match the visual weight */}
                 <div className="flex flex-col items-end gap-4">
                     <div className="mt-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Proposal</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            I swiftly provide a customized proposal outlining the project scope, timeline, and cost.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-full shadow-lg border border-blue-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 aspect-square flex items-center justify-center w-16 h-16">
                        <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Step 3: Top Right */}
            <div className="absolute top-20 right-[10%] max-w-xs text-left group">
                <div className="flex flex-col items-start gap-4">
                    <div className="bg-white p-4 rounded-full shadow-lg border border-blue-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 aspect-square flex items-center justify-center w-16 h-16">
                        <Rocket className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Immediate Kickoff</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Once you approve the proposal, we jump straight into the project with a kickoff meeting.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 4: Bottom Right */}
            <div className="absolute bottom-20 right-[10%] max-w-xs text-left group">
                <div className="flex flex-col items-start gap-4">
                    <div className="mt-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Continuous Support</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Throughout the project, I maintain regular, efficient communication to provide updates and gather feedback.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-full shadow-lg border border-blue-100 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 aspect-square flex items-center justify-center w-16 h-16">
                        <Headset className="w-6 h-6 text-cyan-600" />
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile Linear Layout */}
        <div className="grid grid-cols-1 gap-12 lg:hidden max-w-md mx-auto relative px-4">
             {/* Vertical Line */}
             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100 -z-10"></div>

             {[
                { icon: MessageSquare, title: "Quick Consultation", desc: "We start with a brief, focused consultation to quickly understand your project needs and goals." },
                { icon: FileText, title: "Fast Proposal", desc: "I swiftly provide a customized proposal outlining the project scope, timeline, and cost." },
                { icon: Rocket, title: "Immediate Kickoff", desc: "Once you approve the proposal, we jump straight into the project with a kickoff meeting." },
                { icon: Headset, title: "Continuous Support", desc: "Throughout the project, I maintain regular, efficient communication to provide updates and gather feedback." }
             ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-white rounded-full shadow-md border border-blue-100 flex items-center justify-center flex-shrink-0 aspect-square">
                        <step.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="pt-2">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                </div>
             ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 relative z-10">
            <Button asChild size="lg" className="h-14 px-8 rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none">
                <Link to="/contact">
                    Connect With Me For More Details <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
