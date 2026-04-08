import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import AdminDashboard from '@/components/AdminDashboard'
import AuthPanel from '@/components/AuthPanel'
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

function AdminPage() {
  const auth = useSupabaseAuth()

  return (
    <div className="min-h-screen bg-canvas py-8">
      <div className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="cta-secondary px-5 py-2.5 text-sm">
            <ArrowLeft size={16} />
            Back to website
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {auth.isAuthenticated ? (
            <AdminDashboard session={auth.session} />
          ) : (
            <AuthPanel
              loading={auth.loading}
              isConfigured={auth.isConfigured}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPage
