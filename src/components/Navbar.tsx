
import { Button } from '@/components/ui/button';
import { Label }  from '@/components/ui/label';
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function Navbar() {

    return (
        <main>
            <nav>
                <section className = 'flex justify-between p-6 shadow-xl'>
                    <div className='flex gap-2 ml-20'>
                    <Icon icon="mdi:file-document-outline" width="40" height="40" className='text-blue-500'/>
                    <p className = 'text-2xl font-semibold'>VersaDocs</p>
                    </div>
                    <div>
                        <Link href = '#'>Features</Link>
                        <Link href = '#' className = 'ml-6'>Templates</Link>
                        <Link href = '#' className = 'ml-6'>Pricing</Link>
                        <Link href = '#' className = 'ml-6 font-bold'>Sign in</Link>
                        <Link href = '#'><Button variant='default' className = 'ml-6'>Get Started </Button></Link>
                    </div>
                </section>
            </nav>
        </main>
    )
}