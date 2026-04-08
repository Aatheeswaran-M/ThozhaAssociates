import { formatDate } from '@/utils/helpers'

function LeadsInbox({ leads }) {
  return (
    <div className="panel custom-scrollbar max-h-[900px] overflow-y-auto p-6">
      <h2 className="font-display text-2xl font-semibold text-slate-900">
        Quote enquiries
      </h2>
      <div className="mt-6 space-y-4">
        {leads.length === 0 ? (
          <p className="text-slate-600">No leads have been submitted yet.</p>
        ) : null}

        {leads.map((lead) => (
          <article
            key={lead.id}
            className="rounded-[1.8rem] border border-slate-200 bg-white/88 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {lead.project_type}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-slate-900">
                  {lead.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{lead.message}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                {formatDate(lead.created_at)}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
              <span>{lead.phone}</span>
              <span>{lead.email}</span>
              <span>Status: {lead.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default LeadsInbox
