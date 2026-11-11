(() => {
  'use strict';

  const STORAGE_POSTS_KEY = 'hackpulse_custom_posts_v1';
  const STORAGE_SAVED_KEY = 'hackpulse_saved_posts_v1';

  const CATEGORY_COVERS = {
    'AI Agents': './assets/post-ai-agents.jpg',
    'Pitch & Demo': './assets/post-pitch-stage.jpg',
    'Web3 & Infra': './assets/post-web3-infra.jpg',
    'Team Ops': './assets/post-sprint-team.jpg',
    'Startup Scale': './assets/post-startup-scale.jpg',
  };

  const DEFAULT_ARTICLES = [
    {
      id: 'pulseguard-ai-reviewer',
      title: 'Building PulseGuard: A Multi-Agent PR Reviewer in 36 Hours',
      category: 'AI Agents',
      readTime: '7 min read',
      date: 'Nov 08, 2026',
      author: { name: 'Rohan Kulkarni', initials: 'RK', role: 'Grand Prize Winner' },
      image: './assets/post-ai-agents.jpg',
      tags: ['Gemini 2.5', 'TypeScript', 'Edge Queues'],
      excerpt:
        'How a 3-person squad orchestrated parallel AST parsing and context caching to cut automated code-review latency down to 1.4 seconds during live judging.',
      sections: [
        {
          heading: 'Why Single-Prompt Agents Fail Under Hackathon Demo Pressure',
          paragraphs: [
            'Most AI hackathon entries rely on one bloated system prompt that takes 18 seconds to stream back a wall of markdown. On a live demo stage, 18 seconds of staring at a spinner kills momentum.',
            'We split PulseGuard into three focused micro-agents: a deterministic diff parser, a security rule scanner, and a fast reasoning synthesizer running concurrently with structured JSON output.',
          ],
        },
        {
          heading: 'The Streaming Parallel Pipeline Pattern',
          paragraphs: [
            'Running AST extraction locally before calling the model trimmed our token payload by 68%. Here is the exact orchestrator pattern we used in production:',
          ],
          codeTitle: 'orchestrator.ts',
          code: `export async function reviewPullRequest(diffChunks: DiffChunk[]) {
  const [securityFindings, perfNotes] = await Promise.all([
    scanSecurityPatterns(diffChunks),
    analyzeComplexityHotspots(diffChunks),
  ]);

  return synthesizeSummary({
    securityFindings,
    perfNotes,
    maxTokens: 600,
    temperature: 0.2,
  });
}`,
        },
        {
          heading: 'Key Takeaway for Your Next Sprint',
          bullets: [
            'Pre-compute deterministic heuristics before touching an LLM endpoint.',
            'Cache three realistic sample PR payloads locally so stage Wi-Fi never breaks your demo.',
            'Show live token latency and step status badges—judges love visible engineering rigor.',
          ],
        },
      ],
      quote:
        'Judges reward responsiveness and architectural clarity far more than prompt length.',
    },
    {
      id: 'three-minute-stage-playbook',
      title: 'The 180-Second Stage Blueprint: Winning Over Tired Hackathon Judges',
      category: 'Pitch & Demo',
      readTime: '5 min read',
      date: 'Nov 04, 2026',
      author: { name: 'Ananya Rao', initials: 'AR', role: '3x MLH Finalist' },
      image: './assets/post-pitch-stage.jpg',
      tags: ['Pitch Deck', 'Live Demo', 'Storytelling'],
      excerpt:
        'After judging 40 projects in two hours, attention spans drop fast. Here is the second-by-second choreography that turned a crowded room into a unanimous podium win.',
      sections: [
        {
          heading: 'Skip the Login Screen—Start at the Magic Moment',
          paragraphs: [
            'Watching a presenter type an email address into an auth modal burns 25 precious seconds. Always open your browser tab directly inside a pre-populated workspace with realistic data.',
            'Lead with one sharp sentence about the human bottleneck, then immediately trigger the signature interaction on screen before explaining your tech stack.',
          ],
        },
        {
          heading: 'Exact Time Split That Works Every Time',
          bullets: [
            '0:00 – 0:25: Name the concrete pain point with one memorable metric.',
            '0:25 – 1:50: Live interactive walkthrough showing the core user transformation.',
            '1:50 – 2:30: Clean architecture diagram highlighting sponsor integrations and reliability.',
            '2:30 – 3:00: Concrete next milestone, beta signups, or open-source roadmap.',
          ],
        },
      ],
      quote:
        'A crisp 90-second live workflow beats 14 slides of bullet points every single weekend.',
    },
    {
      id: 'zero-downtime-edge-mesh',
      title: 'Zero-Cold-Start Hackathon Backends with Global Edge Workers',
      category: 'Web3 & Infra',
      readTime: '6 min read',
      date: 'Oct 29, 2026',
      author: { name: 'Marcus Chen', initials: 'MC', role: 'Systems Architect' },
      image: './assets/post-edge-deploy.jpg',
      tags: ['Edge Workers', 'Supabase', 'SSL Preview'],
      excerpt:
        'Localhost demos fail the moment judges open your submission link on mobile. Learn how to ship self-healing edge previews with resilient fallback mocks.',
      sections: [
        {
          heading: 'Why Judges Open Your URL Hours After Demos End',
          paragraphs: [
            'Async judging rounds happen long after you pack up your laptop. If a third-party webhook or free-tier database sleeps overnight, your submission looks broken.',
            'Adding an automatic stale-while-revalidate layer plus deterministic demo mode ensures every interactive screen responds in under 80 milliseconds.',
          ],
          codeTitle: 'resilient-fetch.ts',
          code: `export async function fetchWithDemoFallback<T>(
  endpoint: string,
  fallbackData: T
): Promise<{ data: T; mode: 'live' | 'cached' }> {
  try {
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error('Upstream error');
    return { data: await res.json(), mode: 'live' };
  } catch {
    return { data: fallbackData, mode: 'cached' };
  }
}`,
        },
        {
          heading: 'Pre-Submission Uptime Checklist',
          bullets: [
            'Generate a scannable QR code on your final slide pointing to the live HTTPS URL.',
            'Verify CORS headers and environment secrets on a clean incognito browser window.',
            'Seed 12 realistic rows in Postgres so charts and tables look rich on first load.',
          ],
        },
      ],
      quote:
        'A working live URL at 3 AM is worth twice as much as an ambitious architecture that crashes on click.',
    },
    {
      id: 'zk-bounty-architecture',
      title: 'Unlocking Dual Sponsor Bounties Without Bloating Your Core UX',
      category: 'Web3 & Infra',
      readTime: '8 min read',
      date: 'Oct 22, 2026',
      author: { name: 'Sofia Lindqvist', initials: 'SL', role: 'ETHGlobal Winner' },
      image: './assets/post-web3-infra.jpg',
      tags: ['Polygon zkEVM', 'Sponsor SDK', 'Verification'],
      excerpt:
        'Stuffing five unrelated APIs into one app confuses users. Here is how we wove verifiable audit proofs invisibly beneath a fast Web2 interface.',
      sections: [
        {
          heading: 'Design for the User First, Anchor Proofs in the Background',
          paragraphs: [
            'When chasing sponsor bounties, teams often force users to sign three wallet popups just to view a dashboard. That ruins UX scores.',
            'Instead, keep the primary interface instant and optimistic while batching verifiable state hashes to testnet asynchronously with a subtle status pill.',
          ],
        },
        {
          heading: 'Bounty Alignment Rules',
          bullets: [
            'Read the sponsor rubric line-by-line during Hour 1 and bookmark exact SDK criteria.',
            'Include direct links to verified contract transactions in your README submission.',
            'Keep integration wrappers modular so they never block your main user journey.',
          ],
        },
      ],
      quote:
        'Invisible infrastructure paired with effortless UX wins both the main track and sponsor prizes.',
    },
    {
      id: 'hour-24-war-room-ops',
      title: 'Surviving Hour 24: Scope Discipline for 4-Person Engineering Teams',
      category: 'Team Ops',
      readTime: '5 min read',
      date: 'Oct 16, 2026',
      author: { name: 'Devika Sharma', initials: 'DS', role: 'Product Lead' },
      image: './assets/post-sprint-team.jpg',
      tags: ['Sprint Ops', 'Git Flow', 'Feature Freeze'],
      excerpt:
        'More hackathons are lost to merge conflicts at Hour 44 than lack of talent. A practical contract-first workflow that keeps frontend and backend shipping cleanly.',
      sections: [
        {
          heading: 'Freeze API Shapes by Hour 6',
          paragraphs: [
            'Nothing stalls a weekend sprint faster than waiting for a backend endpoint to finish before building the UI. Define shared TypeScript interfaces early and build against typed fixtures immediately.',
            'Enforce a hard feature freeze four hours before submission deadline so the final block goes purely to copy polish, bug sweeps, and video capture.',
          ],
        },
        {
          heading: 'The 48-Hour Checkpoint Cadence',
          bullets: [
            'Hour 4: Lock typed JSON contracts and deploy an empty skeleton to production.',
            'Hour 20: Integrate real APIs behind feature flags with graceful error states.',
            'Hour 40: Hard feature freeze—focus solely on polish, seed data, and pitch script.',
          ],
        },
      ],
      quote:
        'A clean vertical slice shipped at Hour 40 beats five half-wired features at Hour 47.',
    },
    {
      id: 'weekend-mvp-to-seed-round',
      title: 'From 48-Hour Prototype to 1,200 Beta Users in Four Weeks',
      category: 'Startup Scale',
      readTime: '6 min read',
      date: 'Oct 09, 2026',
      author: { name: 'Kabir Verma', initials: 'KV', role: 'Co-Founder, TraceFlow' },
      image: './assets/post-startup-scale.jpg',
      tags: ['Launch Strategy', 'Open Source', 'Growth'],
      excerpt:
        'Winning the hackathon trophy is day zero, not the finish line. The exact post-event cleanup, launch post checklist, and customer interview playbook we used.',
      sections: [
        {
          heading: 'Turning Weekend Code Into Maintainable Software',
          paragraphs: [
            'Right after the awards ceremony, resist rewriting everything from scratch. Fix the top three friction points users hit during testing, add clean onboarding docs, and ship a public waitlist.',
            'Publishing an honest engineering postmortem on HackPulse brought our first 400 developer signups within 72 hours—before we spent a single dollar on ads.',
          ],
        },
        {
          heading: 'First-Week Post-Hackathon Checklist',
          bullets: [
            'Replace hardcoded sprint tokens with proper user authentication and rate limits.',
            'Record a crisp 60-second walkthrough GIF for your repository README and social launch.',
            'Message every judge and mentor with your live v1 changelog within 5 days.',
          ],
        },
      ],
      quote:
        'Your hackathon build log is the highest-trust launch story your startup will ever tell.',
    },
  ];

  // Utility: Safe HTML escaping for user-generated story entries
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function loadCustomPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_POSTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCustomPosts(posts) {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // Ignore quota errors
    }
  }

  function loadSavedIds() {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function persistSavedIds(ids) {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(ids));
    } catch {
      // Ignore quota errors
    }
  }

  let articles = [...loadCustomPosts(), ...DEFAULT_ARTICLES];
  let savedIds = new Set(loadSavedIds());
  let activeCategory = 'All';
  let searchQuery = '';

  // ==========================================================================
  // 1. PRELOADER & PARTICLES INITIALIZATION
  // ==========================================================================
  const loaderEl = document.getElementById('loading-screen');
  const loaderParticles = document.getElementById('loader-particles');
  if (loaderParticles) {
    loaderParticles.innerHTML = Array.from({ length: 16 })
      .map((_, i) => `<span style="--i:${i}"></span>`)
      .join('');
  }

  const dismissLoader = () => {
    if (!loaderEl) return;
    loaderEl.classList.add('loaded');
    loaderEl.setAttribute('aria-hidden', 'true');
  };

  setTimeout(dismissLoader, 680);
  window.addEventListener('load', () => setTimeout(dismissLoader, 350), { once: true });

  const heroParticles = document.getElementById('hero-particles');
  if (heroParticles) {
    heroParticles.innerHTML = Array.from({ length: 38 })
      .map((_, i) => {
        const x = (i * 37) % 100;
        const y = (i * 53) % 100;
        const d = 5 + (i % 8);
        const s = 2 + (i % 4);
        return `<span style="--x:${x}%;--y:${y}%;--d:${d}s;--s:${s}px"></span>`;
      })
      .join('');
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(open));
      mobileDrawer.setAttribute('aria-hidden', String(!open));
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ==========================================================================
  // 3. SCROLL REVEAL OBSERVER (Graceful, never traps elements invisible)
  // ==========================================================================
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
    // Safety sweep in case user jumps straight to a hash anchor
    setTimeout(() => {
      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.1) {
          el.classList.add('is-visible');
        }
      });
    }, 300);
  }

  // ==========================================================================
  // 4. BLOG RENDERING, FILTERING, SEARCH & BOOKMARKS
  // ==========================================================================
  const blogGrid = document.getElementById('blog-grid');
  const blogEmpty = document.getElementById('blog-empty');
  const savedCountEl = document.getElementById('saved-count');
  const filterContainer = document.getElementById('blog-filters');
  const searchInput = document.getElementById('blog-search');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  function updateSavedCount() {
    if (savedCountEl) {
      savedCountEl.textContent = String(savedIds.size);
    }
  }

  function renderArticles() {
    if (!blogGrid) return;
    const query = searchQuery.trim().toLowerCase();

    const filtered = articles.filter((item) => {
      const catMatch =
        activeCategory === 'All' ||
        (activeCategory === 'Saved' && savedIds.has(item.id)) ||
        item.category === activeCategory;
      if (!catMatch) return false;
      if (!query) return true;
      const haystack = [
        item.title,
        item.category,
        item.excerpt,
        item.author?.name || '',
        ...(item.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });

    if (filtered.length === 0) {
      blogGrid.innerHTML = '';
      if (blogEmpty) blogEmpty.hidden = false;
      return;
    }

    if (blogEmpty) blogEmpty.hidden = true;

    blogGrid.innerHTML = filtered
      .map((post) => {
        const isSaved = savedIds.has(post.id);
        const safeTags = (post.tags || [])
          .slice(0, 3)
          .map((t) => `<span>${escapeHtml(t)}</span>`)
          .join('');
        return `
          <article class="blog-card" data-article-id="${escapeHtml(post.id)}">
            <div class="blog-cover">
              <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />
              <span class="blog-cat-chip">${escapeHtml(post.category)}</span>
              <button
                class="bookmark-btn ${isSaved ? 'saved' : ''}"
                type="button"
                data-bookmark="${escapeHtml(post.id)}"
                aria-label="${isSaved ? 'Remove bookmark' : 'Bookmark story'}"
                title="${isSaved ? 'Saved' : 'Save story'}"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </button>
            </div>
            <div class="blog-body">
              <div class="blog-meta">
                <span>${escapeHtml(post.date)}</span>
                <span>${escapeHtml(post.readTime)}</span>
              </div>
              <h3>${escapeHtml(post.title)}</h3>
              <p>${escapeHtml(post.excerpt)}</p>
              <div class="blog-tags">${safeTags}</div>
              <div class="blog-footer">
                <div class="author-mini">
                  <span class="author-avatar">${escapeHtml(post.author.initials)}</span>
                  <div>
                    <strong>${escapeHtml(post.author.name)}</strong>
                    <small>${escapeHtml(post.author.role)}</small>
                  </div>
                </div>
                <button class="read-post-btn" type="button" data-read-article="${escapeHtml(post.id)}">
                  Read Note &rarr;
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      activeCategory = btn.dataset.category || 'All';
      filterContainer.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      renderArticles();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderArticles();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (filterContainer) {
        filterContainer.querySelectorAll('.filter-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.category === 'All');
        });
      }
      renderArticles();
    });
  }

  // ==========================================================================
  // 5. MODALS (DEMO MODAL, ARTICLE READER MODAL, STORY COMPOSER MODAL)
  // ==========================================================================
  const demoModal = document.getElementById('demo-modal');
  const articleModal = document.getElementById('article-modal');
  const articleContent = document.getElementById('article-modal-content');
  const composerModal = document.getElementById('composer-modal');

  function closeAllModals() {
    [demoModal, articleModal, composerModal].forEach((m) => {
      if (m) {
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
      }
    });
    document.body.classList.remove('modal-open');
  }

  function openModal(modal) {
    closeAllModals();
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function openArticleReader(id) {
    const post = articles.find((a) => a.id === id) || articles[0];
    if (!post || !articleContent) return;

    const isSaved = savedIds.has(post.id);
    const sectionsHtml = (post.sections || [])
      .map((sec) => {
        const paras = (sec.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
        const bullets = sec.bullets
          ? `<ul>${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
          : '';
        const codeBlock = sec.code
          ? `<div class="code-block-wrap">
              <div class="code-block-head">
                <span>${escapeHtml(sec.codeTitle || 'snippet.ts')}</span>
                <button class="copy-snippet-btn" type="button" data-copy-code>Copy Code</button>
              </div>
              <pre><code>${escapeHtml(sec.code)}</code></pre>
            </div>`
          : '';
        return `<h3>${escapeHtml(sec.heading)}</h3>${paras}${bullets}${codeBlock}`;
      })
      .join('');

    const quoteHtml = post.quote ? `<blockquote>"${escapeHtml(post.quote)}"</blockquote>` : '';

    articleContent.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-bottom:10px;">
        <span class="section-kicker">${escapeHtml(post.category)}</span>
        <span style="color:var(--muted); font-size:0.86rem;">&bull; ${escapeHtml(post.date)} &bull; ${escapeHtml(post.readTime)}</span>
      </div>
      <h2 id="article-modal-title" style="font-size:clamp(1.7rem, 3vw, 2.5rem); margin-bottom:14px;">${escapeHtml(post.title)}</h2>
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px;">
        <div class="author-mini">
          <span class="author-avatar">${escapeHtml(post.author.initials)}</span>
          <div>
            <strong>${escapeHtml(post.author.name)}</strong>
            <small>${escapeHtml(post.author.role)}</small>
          </div>
        </div>
        <button class="button secondary small" type="button" data-modal-bookmark="${escapeHtml(post.id)}">
          ${isSaved ? '★ Saved to Bookmarks' : '☆ Save Field Note'}
        </button>
      </div>
      <img class="article-hero-img" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" />
      <div class="article-body-prose">
        <p style="font-size:1.08rem; color:#e2e8f0;"><strong>Summary:</strong> ${escapeHtml(post.excerpt)}</p>
        ${sectionsHtml}
        ${quoteHtml}
      </div>
    `;

    openModal(articleModal);
  }

  // Global click delegation for cards, bookmarks, modals, copy buttons
  document.addEventListener('click', (e) => {
    const closeTrigger = e.target.closest('[data-close-modal]');
    if (closeTrigger || e.target.classList.contains('modal-backdrop')) {
      closeAllModals();
      return;
    }

    const demoTrigger = e.target.closest('[data-open-demo]');
    if (demoTrigger) {
      e.preventDefault();
      openModal(demoModal);
      return;
    }

    const bookmarkBtn = e.target.closest('[data-bookmark]');
    if (bookmarkBtn) {
      e.stopPropagation();
      const id = bookmarkBtn.dataset.bookmark;
      if (savedIds.has(id)) {
        savedIds.delete(id);
      } else {
        savedIds.add(id);
      }
      persistSavedIds([...savedIds]);
      updateSavedCount();
      renderArticles();
      return;
    }

    const modalBookmarkBtn = e.target.closest('[data-modal-bookmark]');
    if (modalBookmarkBtn) {
      const id = modalBookmarkBtn.dataset.modalBookmark;
      if (savedIds.has(id)) {
        savedIds.delete(id);
        modalBookmarkBtn.textContent = '☆ Save Field Note';
      } else {
        savedIds.add(id);
        modalBookmarkBtn.textContent = '★ Saved to Bookmarks';
      }
      persistSavedIds([...savedIds]);
      updateSavedCount();
      renderArticles();
      return;
    }

    const readTrigger = e.target.closest('[data-read-article]');
    if (readTrigger) {
      openArticleReader(readTrigger.dataset.readArticle);
      return;
    }

    const cardClick = e.target.closest('.blog-card');
    if (cardClick && !e.target.closest('button')) {
      openArticleReader(cardClick.dataset.articleId);
      return;
    }

    const copyBtn = e.target.closest('[data-copy-code]');
    if (copyBtn) {
      const codeEl = copyBtn.closest('.code-block-wrap')?.querySelector('code');
      if (codeEl && navigator.clipboard) {
        navigator.clipboard.writeText(codeEl.textContent || '').then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy Code';
          }, 1600);
        });
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Modal quick action buttons
  document.getElementById('modal-read-featured')?.addEventListener('click', () => {
    openArticleReader(articles[0]?.id);
  });

  const openComposer = () => openModal(composerModal);
  document.getElementById('open-composer-btn')?.addEventListener('click', openComposer);
  document.getElementById('demo-composer-trigger')?.addEventListener('click', openComposer);
  document.getElementById('cta-compose-btn')?.addEventListener('click', openComposer);
  document.getElementById('float-compose-btn')?.addEventListener('click', openComposer);
  document.getElementById('modal-open-composer')?.addEventListener('click', openComposer);

  // ==========================================================================
  // 6. PROCESS FLOW STAGE INTERACTIVE PREVIEW
  // ==========================================================================
  const flowPublishBtn = document.getElementById('flow-publish-btn');
  const flowReadBtn = document.getElementById('flow-read-btn');
  const flowPreviewTitle = document.getElementById('flow-preview-title');
  const flowToast = document.getElementById('flow-live-toast');
  let flowIndex = 0;

  if (flowPublishBtn && flowPreviewTitle) {
    flowPublishBtn.addEventListener('click', () => {
      flowIndex = (flowIndex + 1) % articles.length;
      const next = articles[flowIndex];
      flowPreviewTitle.textContent = next.title;
      if (flowToast) {
        flowToast.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Synced "${escapeHtml(next.category)}" story to live feed
        `;
      }
    });
  }

  if (flowReadBtn) {
    flowReadBtn.addEventListener('click', () => {
      openArticleReader(articles[flowIndex]?.id || articles[0]?.id);
    });
  }

  // ==========================================================================
  // 7. COMPOSER FORM SUBMISSION (PUBLISH NEW BLOG POST LIVE)
  // ==========================================================================
  const composerForm = document.getElementById('composer-form');
  if (composerForm) {
    composerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('comp-title').value.trim();
      const category = document.getElementById('comp-category').value;
      const authorRaw = document.getElementById('comp-author').value.trim();
      const tagsRaw = document.getElementById('comp-tags').value.trim();
      const excerpt = document.getElementById('comp-excerpt').value.trim();
      const body = document.getElementById('comp-body').value.trim();

      const [authorName, authorRole] = authorRaw.split('•').map((s) => s.trim());
      const nameClean = authorName || 'Community Builder';
      const initials = nameClean
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() || '')
        .join('') || 'CB';

      const newPost = {
        id: 'custom-' + Date.now(),
        title,
        category,
        readTime: '4 min read',
        date: 'Just now',
        author: {
          name: nameClean,
          initials,
          role: authorRole || 'Hackathon Author',
        },
        image: CATEGORY_COVERS[category] || './assets/post-ai-agents.jpg',
        tags: tagsRaw
          ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
          : [category, '48h Sprint'],
        excerpt,
        sections: [
          {
            heading: 'Field Notes & Architecture',
            paragraphs: body.split(/\n+/).filter(Boolean),
          },
        ],
      };

      const custom = [newPost, ...loadCustomPosts()];
      saveCustomPosts(custom);
      articles = [newPost, ...articles];

      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (filterContainer) {
        filterContainer.querySelectorAll('.filter-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.category === 'All');
        });
      }

      renderArticles();
      composerForm.reset();
      closeAllModals();
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 8. CONTACT PITCH FORM
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactSubmitBtn) contactSubmitBtn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
        if (contactSubmitBtn) contactSubmitBtn.disabled = false;
        formStatus.className = 'form-status success';
        formStatus.textContent =
          'Pitch received! Our editors will review your hackathon story and reply within 24 hours.';
      }, 450);
    });
  }

  // Initial render
  updateSavedCount();
  renderArticles();
})();

