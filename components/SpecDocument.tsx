
import React from 'react';

export const SpecDocument: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
      <h1 className="text-2xl font-black text-indigo-900 mb-2">MVP Spesifikasjon: MinMenighet</h1>
      <p className="text-slate-500 text-sm mb-8 italic">Levert av Senior Produktdesigner & Fullstack-arkitekt</p>

      <h2 className="text-lg font-bold border-b pb-2 mb-4 text-slate-800">1. Prioriterte Brukerhistorier</h2>
      <ul className="text-xs space-y-3 list-none p-0">
        {[
          "Som admin vil jeg koble til en iCal-lenke slik at aktiviteter automatisk importeres.",
          "Som admin vil jeg se ukevisning for å planlegge bemanning for kommende søndag.",
          "Som admin vil jeg tildele en 'Lydtekniker'-rolle til Ola på 'Gudstjeneste' 25. mai.",
          "Som admin vil jeg tildele 'Lovsang-team' til en hel aktivitet for å spare tid.",
          "Som frivillig vil jeg motta en magic link på e-post for å logge inn sikkert og raskt.",
          "Som frivillig vil jeg se en personlig liste over mine kommende vakter på mobilen.",
          "Som frivillig vil jeg markere en oppgave som 'Done' for å signalisere at jeg er klar.",
          "Som admin vil jeg se revisjonshistorikk for å se hvem som fjernet en vakt.",
          "Som admin vil jeg angre en sletting (Soft-delete) hvis jeg gjorde en feil.",
          "Som admin vil jeg filtrere ukeplanen på rolle (f.eks. kun 'Teknikk') for fokus.",
          "Som admin vil jeg manuelt opprette et styremøte som ikke ligger i felleskalenderen.",
          "Som frivillig vil jeg se tid og sted for vakten min for å møte opp riktig.",
          "Som admin vil jeg vite at lokale endringer av oppgaver består selv om iCal oppdateres.",
          "Som admin vil jeg enkelt se hvilke roller som mangler bemanning (TODO status).",
          "Som admin vil jeg kunne slette roller fra en aktivitet uten å slette selve aktiviteten."
        ].map((story, i) => (
          <li key={i} className="flex gap-2 items-start bg-slate-50 p-2 rounded border border-slate-100">
            <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">{i+1}</span>
            <span className="text-slate-700">{story}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold border-b pb-2 mb-4 mt-8 text-slate-800">2. Datamodell (PostgreSQL)</h2>
      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg text-[10px] font-mono overflow-x-auto">
        <pre>{`
Table Person {
  id uuid [pk]
  name text
  email text [unique]
  roles uuid[] // Preferred roles
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
  updated_by_id uuid
}

Table Activity {
  id uuid [pk]
  title text
  start_time timestamp
  end_time timestamp
  location text
  external_source text // 'ical' | 'manual'
  external_id text // Source system ID
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
  updated_by_id uuid
}

Table Task {
  id uuid [pk]
  activity_id uuid [ref: > Activity.id]
  role_id uuid [ref: > Role.id]
  assignee_type text // 'PERSON' | 'TEAM'
  assignee_id uuid
  status text // 'TODO' | 'DONE'
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
  updated_by_id uuid
}
        `}</pre>
      </div>

      <h2 className="text-lg font-bold border-b pb-2 mb-4 mt-8 text-slate-800">3. iCal Synk-Logikk</h2>
      <div className="text-xs text-slate-700 space-y-2">
        <p><strong>Idempotent Import:</strong> Bruker <code>external_id</code> for å koble iCal-eventer mot lokale <code>Activity</code> rader.</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Update:</strong> Hvis <code>external_id</code> finnes, overskriv tid/sted/tittel med data fra iCal.</li>
          <li><strong>Delete:</strong> Hvis et event har <code>external_id</code> men ikke lenger finnes i iCal-strømmen -> <code>deleted_at = now()</code>.</li>
          <li><strong>Persistence:</strong> Lokale <code>Task</code>-koblinger er knyttet til vår interne <code>activity.id</code>, så de overlever endringer i iCal-meta-data.</li>
        </ul>
      </div>

      <h2 className="text-lg font-bold border-b pb-2 mb-4 mt-8 text-slate-800">4. Tech-Stack Anbefaling</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 mb-1">Frontend & API</h4>
            <p className="text-[10px] text-indigo-700">Next.js (App Router) for rask SSR og API-ruter i samme prosjekt.</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-900 mb-1">Backend & Auth</h4>
            <p className="text-[10px] text-emerald-700">Supabase for Postgres, Magic Link Auth, og sanntids-oppdateringer.</p>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
            <h4 className="text-xs font-bold text-sky-900 mb-1">Styling</h4>
            <p className="text-[10px] text-sky-700">Tailwind CSS for ekstremt rask mobilvennlig UI-utvikling.</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <h4 className="text-xs font-bold text-rose-900 mb-1">ORM</h4>
            <p className="text-[10px] text-rose-700">Prisma for typesikker databasehåndtering og enkel migrering.</p>
        </div>
      </div>
    </div>
  );
};
