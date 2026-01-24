
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import Link from 'next/link'

export default function Navbar() {

    return (
        <main>
            <nav>
                <section className = 'flex justify-between p-6 shadow-xl'>
                    <div className='flex gap-2 ml-20'>
                    <FileText className='size-10 text-blue-500'/>
                    <p className = 'text-2xl font-semibold'>VersaDocs</p>
                    </div>
                    <div>
                        <Link href = '#'>Features</Link>
                        <Link href = '#' className = 'ml-6'>Templates</Link>
                        <Link href = '#' className = 'ml-6'>Pricing</Link>
                        <Link href = '#' className = 'ml-6 font-bold'>Sign in</Link>
                        <Button asChild variant='default' className = 'ml-6'> 
                        <Link href = '#'>Get Started</Link>
                        </Button>
                    </div>
                </section>
            </nav>
        </main>
    )
}