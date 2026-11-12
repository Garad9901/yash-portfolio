import Nav from '@/components/Nav';
import Starfield from '@/components/Starfield';
import OrbitMap from '@/components/OrbitMap';
import Systems from '@/components/Systems';
import Contact from '@/components/Contact';
import AllRepos from '@/components/AllRepos';
import { getTelemetry } from '@/lib/github';
import {
  person, education, papers, projects, flightPath, honors, toolkit, credentials,
  statusLabel, type PaperStatus,
} from '@/data/site';

export const revalidate = 3600;

const stageIndex: Record<PaperStatus, number> = { 'in-preparation': 1, submitted: 2, 'under-revision': 3, presented: 4, published: 4 };
const stageColor: Record<PaperStatus, string> = {
  'in-preparation': 'var(--haze)', submitted: 'var(--telemetry)', 'under-revision': 'var(--ignition)', presented: 'var(--go)', published: 'var(--go)',
};
const order: PaperStatus[] = ['published', 'presented', 'under-revision', 'submitted', 'in-preparation'];

function Authors({ text }: { text: string }) {
  const parts = text.split('Yash Rajesh Garad');
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>{p}{i < parts.length - 1 && <strong>Yash Rajesh Garad</strong>}</span>
      ))}
    </>
  );
}

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'a month ago' : `${months} months ago`;
}

export default async function Home() {
  const tele = await getTelemetry();
  const sortedPapers = [...papers].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
  const inReview = papers.filter((p) => p.status === 'submitted' || p.status === 'under-revision').length;
  const presented = papers.filter((p) => p.status === 'presented' || p.status === 'published').length;
  const systemsCount = projects.length;

  return (
    <>
      <Starfield />
      <Nav />
      <div className="page" id="top">
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1>
                Yash Rajesh
                <span className="surname">Garad</span>
              </h1>
              <p className="tagline">{person.tagline}</p>
              <p className="intro">{person.intro}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#research">Read the research</a>
                <a className="btn btn-ghost" href="#systems">See the systems</a>
              </div>
              <dl className="manifest">
                <div><dt>Papers</dt><dd>{papers.length}</dd></div>
                <div><dt>Presented</dt><dd>{presented}</dd></div>
                <div><dt>In review</dt><dd>{inReview}</dd></div>
                <div><dt>Projects</dt><dd>{systemsCount}</dd></div>
                <div><dt>Hackathon wins</dt><dd>2</dd></div>
              </dl>
            </div>
            <OrbitMap />
          </div>
        </section>

        {/* Research */}
        <section className="section" id="research" aria-labelledby="research-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="research-h">Research</h2>
              <p>
                {papers.length} papers across agentic AI, explainable medical imaging, edge AI and geospatial modelling.
                Statuses are kept current, and nothing is marked presented or published until it is.
              </p>
            </div>
            <div>
              {sortedPapers.map((p) => (
                <article className="paper" key={p.title}>
                  <div className="stage">
                    <div className="stage-bar" aria-hidden="true">
                      {[1, 2, 3, 4].map((n) => (
                        <span key={n} style={n <= stageIndex[p.status] ? { background: stageColor[p.status] } : undefined} />
                      ))}
                    </div>
                    <span className="stage-label" style={{ color: stageColor[p.status] }}>{statusLabel[p.status]}</span>
                  </div>
                  <div>
                    <h3>{p.title}</h3>
                    <p className="authors"><Authors text={p.authors} /></p>
                    <div className="meta">
                      {p.venue && <span>{p.venue}</span>}
                      <span>{p.area}</span>
                      {p.note && <span>{p.note}</span>}
                      {p.code && <a href={p.code} target="_blank" rel="noreferrer">Code and data</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="research-foot">
              Stage bar: in preparation, submitted, under revision, presented or published. Full record on{' '}
              <a href={person.orcid} target="_blank" rel="noreferrer">ORCID {person.orcidId}</a>.
            </p>
          </div>
        </section>

        {/* Systems */}
        <section className="section" id="systems" aria-labelledby="systems-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="systems-h">Systems</h2>
              <p>Research code that backs the papers, and products built to be used. Every card links to its source.</p>
            </div>
            <Systems />
            <AllRepos repos={tele?.repos ?? null} profile={person.github} />
          </div>
        </section>

        {/* Flight path */}
        <section className="section" id="path" aria-labelledby="path-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="path-h">Flight path</h2>
              <p>Internships, research placements and roles, most recent first.</p>
            </div>
            <div className="path-grid">
              <ol className="timeline">
                {flightPath.map((r) => (
                  <li key={r.org + r.role} className={r.span.includes('present') ? '' : 'done'}>
                    <span className="span">{r.span}</span>
                    <h3>{r.role}</h3>
                    <p className="org">{r.org}</p>
                    <p className="detail">{r.detail}</p>
                  </li>
                ))}
              </ol>
              <aside className="edu" aria-label="Education">
                <div className="who">
                  <img src={person.photo} alt="Portrait of Yash Rajesh Garad" />
                  <div>
                    <h3>{education.degree}</h3>
                    <p className="school">{education.school}</p>
                  </div>
                </div>
                <dl>
                  <dt>Years</dt><dd>{education.span}</dd>
                  <dt>CGPA</dt><dd><span className="cgpa">{education.cgpa}</span> / 10</dd>
                  <dt>Based in</dt><dd>{person.location}</dd>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* Honors */}
        <section className="section" id="honors" aria-labelledby="honors-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="honors-h">Honors</h2>
              <p>Competitions and recognition.</p>
            </div>
            <div className="honors">
              {honors.map((h) => (
                <div className="honor" key={h.event}>
                  <div className="place">{h.place}</div>
                  <h3>{h.event}</h3>
                  <p>{h.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Toolkit & credentials */}
        <section className="section" aria-label="Toolkit and credentials">
          <div className="wrap two-col">
            <div>
              <h2 className="col-title">Toolkit</h2>
              <dl className="toolkit">
                {toolkit.map((t) => (
                  <div key={t.group}><dt>{t.group}</dt><dd>{t.items.join(', ')}</dd></div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="col-title">Credentials</h2>
              <ul className="creds">
                {credentials.map((c) => (
                  <li key={c.title}>
                    <span>{c.title}</span>
                    <span className="issuer">{c.issuer}</span>
                    <span className="date">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Telemetry */}
        <section className="section" id="telemetry" aria-labelledby="tele-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="tele-h">Live from GitHub</h2>
              <p>Read straight from the GitHub API, refreshed every hour. No number here is typed in by hand.</p>
            </div>
            {tele ? (
              <>
                <div className="telemetry">
                  <div className="tele-cell">
                    <h3><span className="live">Profile</span></h3>
                    <dl className="counts">
                      <div><dt>Public repos</dt><dd>{tele.publicRepos}</dd></div>
                      <div><dt>Followers</dt><dd>{tele.followers}</dd></div>
                      <div><dt>Pushed in 30 days</dt><dd>{tele.activeThisMonth}</dd></div>
                    </dl>
                  </div>
                  <div className="tele-cell">
                    <h3>Languages across active repos</h3>
                    <ul className="langs">
                      {tele.languages.map((l) => (
                        <li key={l.name}>
                          <span>{l.name}</span>
                          <span className="bar"><span style={{ width: `${l.share}%` }} /></span>
                          <span className="pct">{l.share}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tele-cell">
                    <h3>Most recent pushes</h3>
                    <ul className="pushes">
                      {tele.recent.map((r) => (
                        <li key={r.repo}>
                          <a href={r.url} target="_blank" rel="noreferrer">{r.repo}</a>
                          <time dateTime={r.pushedAt}>{ago(r.pushedAt)}</time>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="tele-foot">
                  Last read {new Date(tele.fetchedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST.
                </p>
              </>
            ) : (
              <p className="tele-foot">
                GitHub didn&apos;t respond on the last refresh, so live numbers are hidden. See the profile directly at{' '}
                <a href={person.github} style={{ color: 'var(--ignition)' }}>github.com/{person.githubUser}</a>.
              </p>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact" aria-labelledby="contact-h">
          <div className="wrap">
            <h2 id="contact-h" className="sr-only">Contact</h2>
            <Contact />
          </div>
        </section>

        <footer className="footer">
          <div className="wrap">
            <span>© {new Date().getFullYear()} {person.name}</span>
            <span>
              Press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere for the command menu.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
