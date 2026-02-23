import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, FileText, Clock, Settings2 } from "lucide-react"

/**
 * The primary Dashboard view for authenticated users.
 * Displays a grid of previously generated resumes.
 * Uses Server Components to check Clerk session tokens securely before rendering.
 */
export default async function DashboardPage() {
    // 1. Enforce Authentication Barrier securely on the server
    const { userId } = await auth()

    // 2. Redirect intruders or timed-out sessions directly to the home marketing page
    if (!userId) {
        redirect("/")
    }

    // 3. (Mock Data) Soon, this will be a Drizzle query `await db.select().from(resumes).where(eq(resumes.userId, userId))`
    const mockResumes = [
        { id: "1", title: "Software Engineer - Tech Corp", template: "Formal Template", lastEdited: "2 hours ago" },
        { id: "2", title: "Freelance Designer", template: "Filipino Biodata", lastEdited: "4 days ago" },
    ]

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* 1. Global Navigation */}
            <section className='fixed top-0 left-0 w-full z-50 pointer-events-none'>
                <div className="pointer-events-auto">
                    <Navbar />
                </div>
            </section>

            {/* 2. Dashboard Layout Shell */}
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Dashboard Header Array */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">My Resumes</h1>
                            <p className="text-slate-500">Manage, edit, and export your saved documents.</p>
                        </div>
                        <Button asChild size="lg" className="rounded-full shadow-sm">
                            <Link href="/editor">
                                <PlusCircle className="mr-2" />
                                Create New Resume
                            </Link>
                        </Button>
                    </div>

                    {/* 3. Resume Grid (Empty State vs Populated State) */}
                    {mockResumes.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <FileText className="size-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No resumes yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                You haven't built any resumes. Create your first document to stand out from the crowd!
                            </p>
                            <Button asChild>
                                <Link href="/editor">Start Building Now</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockResumes.map((resume) => (
                                <div key={resume.id} className="group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">

                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                            <FileText className="size-6 text-indigo-600" />
                                        </div>
                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Settings2 className="size-4 text-slate-400" />
                                        </Button>
                                    </div>

                                    {/* Card Body Details */}
                                    <h3 className="font-semibold text-slate-900 text-lg mb-1 truncate">{resume.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-xs font-medium">{resume.template}</span>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="size-3.5" />
                                            {resume.lastEdited}
                                        </div>
                                        <span className="text-indigo-600 group-hover:underline">Edit Document →</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </main>
    )
}
