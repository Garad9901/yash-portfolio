// Live GitHub data, fetched on the server and refreshed at most once an hour.
// If GitHub is unreachable we return null and the UI says so; we never show invented numbers.

export type PublicRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  homepage: string | null;
  pushedAt: string;
  stars: number;
};

export type Telemetry = {
  publicRepos: number;
  followers: number;
  stars: number;
  activeThisMonth: number;
  languages: { name: string; share: number }[];
  recent: { repo: string; pushedAt: string; description: string | null; url: string }[];
  repos: PublicRepo[];
  fetchedAt: string;
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  size: number;
  pushed_at: string;
  topics?: string[];
  homepage: string | null;
};

const USER = 'Garad9901';

export async function getTelemetry(): Promise<Telemetry | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    // Local visual testing only: point GITHUB_FIXTURE at a saved API snapshot.
    if (process.env.GITHUB_FIXTURE) {
      const fs = await import('node:fs/promises');
      const fx = JSON.parse(await fs.readFile(process.env.GITHUB_FIXTURE, 'utf8'));
      return shape(fx.user, fx.repos);
    }
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate: 3600 } }),
    ]);
    if (!uRes.ok || !rRes.ok) return null;
    return shape(await uRes.json(), await rRes.json());
  } catch {
    return null;
  }
}

function shape(user: { public_repos: number; followers: number }, all: Repo[]): Telemetry {
  {
    const repos = all.filter((r) => !r.fork && r.name !== USER);
    const active = repos.filter((r) => !r.archived);

    const bytes = new Map<string, number>();
    for (const r of active) {
      if (!r.language) continue;
      bytes.set(r.language, (bytes.get(r.language) ?? 0) + Math.max(r.size, 1));
    }
    const total = [...bytes.values()].reduce((a, b) => a + b, 0) || 1;
    const languages = [...bytes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, v]) => ({ name, share: Math.round((v / total) * 100) }));

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      stars: repos.reduce((a, r) => a + r.stargazers_count, 0),
      activeThisMonth: active.filter((r) => Date.now() - new Date(r.pushed_at).getTime() < 30 * 86_400_000).length,
      languages,
      recent: active.slice(0, 5).map((r) => ({
        repo: r.name,
        pushedAt: r.pushed_at,
        description: r.description,
        url: r.html_url,
      })),
      repos: active.map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        topics: r.topics ?? [],
        homepage: r.homepage || null,
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
      })),
      fetchedAt: new Date().toISOString(),
    };
  }
}
