import { useState, useEffect, useRef } from 'react'
import './App.css'
import { supabase } from './supabase'

// ─── LETTERS DATA ─────────────────────────────────────────────────────────────

const LETTERS = [
  {
    id: 'usa',
    flag: '🇺🇸',
    label: 'U.S. Proposal',
    badgeClass: 'badge-usa',
    badgeText: 'Outgoing — Top Secret-ish',
    subject: 'FINAL_v9_REAL_FINAL_use_this_one_NOT_THE_OTHER_ONE.docx',
    title: 'A Beautiful, Perfect Proposal',
    from: 'United States of America',
    dept: 'Dept. of Peace Through Extremely Expensive Hardware',
    pullQuote: '"Think of it less as giving up enrichment and more as a nuclear juice cleanse."',
    body: [
      { type: 'p', text: 'Dear Iran,' },
      { type: 'p', text: 'Hope you are well, or at least less uranium-adjacent than yesterday. After a productive internal review involving the President, twelve generals, three energy analysts, one guy from Treasury who kept saying "OFAC" like it was a magic spell, and a map of the Gulf that has now been aggressively circled in red marker — we propose the following reasonable, elegant, totally normal plan.' },
      { type: 'pull' },
      {
        type: 'demands',
        label: 'The Demands (Friendly Edition)',
        items: [
          'Stop enriching uranium for twenty years. Not ten. Not "let\'s see how the vibe is in 2029." Twenty.',
          'Dismantle the facilities. We mean it in the friendly way — like when a landlord says "minor renovation" and then removes the kitchen, staircase, and your will to live.',
          'Hand over the highly enriched uranium to a trusted third party. Candidates include: Switzerland, Norway, Tom Hanks, or a retired librarian named Margaret.',
          'Reopen the Strait of Hormuz. Brent crude has started texting its ex. Lloyd\'s of London just whispered, "Mother?"',
          'Stop doing missile things. We love objects. Some of our objects also explode at great velocity. But your objects are creating what our generals call Tuesday.',
        ],
      },
      { type: 'p', text: 'In exchange, we are prepared to consider beginning discussions about the possibility of eventually exploring a phased framework for conditional partial sanctions relief.' },
      { type: 'italic', text: 'Translation: we may loosen one screw on the sanctions machine, provided the machine feels emotionally safe.' },
      { type: 'p', text: 'Please accept this proposal by 5 p.m., or earlier if possible, because the President has television.' },
    ],
    signature: 'Warmly,',
    footnote: null,
  },
  {
    id: 'iran',
    flag: '🇮🇷',
    label: "Iran's Reply",
    badgeClass: 'badge-iran',
    badgeText: 'Incoming — Via Pakistan (Again)',
    subject: 'Re: Re: Re: Your Peace Proposal / Our Peace Proposal / Everyone Calm Down',
    title: 'We Accept Peace (Terms Apply)',
    from: 'Iran',
    dept: 'Ministry of No, But With Footnotes',
    pullQuote: '"This is the diplomatic equivalent of: before we discuss dinner, please remove your house."',
    body: [
      { type: 'p', text: 'Dear United States,' },
      { type: 'p', text: 'We have reviewed your proposal carefully — by which we mean we placed it on a very large table, stared at it in silence, moved it three centimeters to the left, and announced it was "not serious."' },
      { type: 'p', text: 'We accept peace. However, by "peace" we mean the following:' },
      {
        type: 'demands',
        label: 'Our Counterproposal (Non-Negotiable)',
        items: [
          'You stop the war.',
          'You lift the sanctions.',
          'You let our oil move freely.',
          'You acknowledge that the Strait of Hormuz is not your emotional support canal.',
          'You give us guarantees. The guarantees must have guarantees. The guarantees for the guarantees shall be stored with Margaret — provided Margaret signs a non-interference pledge.',
        ],
      },
      { type: 'pull' },
      { type: 'p', text: 'Regarding your nuclear facilities demand: we admire your confidence.' },
      { type: 'p', text: 'Regarding the twenty-year moratorium: twenty years is a long time. In twenty years, three different U.S. administrations will discover the Middle East for the first time. An iPhone becomes religious archaeology. We propose instead: we may possibly reduce certain activities temporarily, subject to review, with the right to resume with more paperwork and worse vibes if violated.' },
      { type: 'p', text: 'Regarding Hormuz: you call it a "strategic shipping lane." We call it the driveway. If someone parks three aircraft carriers in your driveway and says "we are ensuring freedom of navigation," you too may become sensitive.' },
      { type: 'p', text: 'In conclusion: we accept your proposal, provided you remove most of it and replace it with ours.' },
    ],
    signature: 'Respectfully,',
    footnote: "* Margaret's availability has not been confirmed. Her Tuesday bridge game remains a hard constraint.",
  },
  {
    id: 'trump',
    flag: '📱',
    label: "Trump's Response",
    badgeClass: 'badge-trump',
    badgeText: 'Truth Social — 3:17 a.m.',
    subject: null,
    title: 'TOTALLY UNACCEPTABLE',
    from: '@realDonaldTrump',
    dept: "The Only One Who Read The Whole Thing (He Didn't)",
    pullQuote: '"Later is when you clean the garage. Later is not for uranium."',
    body: [
      { type: 'trump-header' },
      { type: 'p', text: "I have read Iran's response." },
      { type: 'p', text: "Actually, I didn't need to read all of it. Very long. Too long. Too many commas. When a country uses that many commas, they are hiding uranium between the clauses." },
      { type: 'unacceptable' },
      { type: 'p', text: 'We gave them a beautiful proposal. A perfect proposal. People saw the proposal and said, "Sir, this proposal is so strong, so elegant, maybe the best proposal since the Louisiana Purchase — which was also a tremendous real estate deal, frankly underpriced."' },
      {
        type: 'demands',
        label: "What Iran Actually Asked For (His Read)",
        items: [
          'Sanctions lifted ✓',
          'Oil opened ✓',
          'Hormuz controlled ✓',
          'Guarantees for the guarantees ✓',
          'Nuclear talks: later',
        ],
      },
      { type: 'pull' },
      { type: 'p', text: 'They want control of Hormuz. Control of Hormuz! That is like the raccoon saying it owns the kitchen because it found the trash first.' },
      { type: 'p', text: 'Very bad response. Very weak response. Very unacceptable response. The formatting alone was an act of aggression.' },
      { type: 'unacceptable' },
      { type: 'italic', text: 'Also, Margaret is under review.' },
    ],
    signature: null,
    footnote: '* This post has been fact-checked. Results were inconclusive. The raccoon declined to comment.',
  },
]

const SEED_JOKES = [
  { author: 'Margaret', country: '🇨🇭', text: "I agreed to hold the uranium but it conflicts with my Tuesday bridge game and my Thursday knitting circle. Also I have bridge on Saturdays too. I'm very busy.", votes: 47 },
  { author: 'The Strait of Hormuz', country: '🌊', text: "Nobody ever asks how I'm doing. I'm just a body of water, trying to connect two seas, and somehow I end up in every diplomatic crisis since 1979. I didn't ask for this.", votes: 89 },
  { author: "Lloyd's of London", country: '🇬🇧', text: "We've increased premiums on 'diplomatic shipping lane' policies by 400%. We've also introduced a new product: 'Geopolitical Irony Insurance.' It covers you if peace breaks out and you don't know what to do.", votes: 62 },
  { author: 'The Brent Crude Oil Barrel', country: '🛢️', text: "I just texted my ex. She's a natural gas pipeline in Kazakhstan. We had something real before the sanctions.", votes: 103 },
  { author: 'Pakistan (Group Chat Admin)', country: '🇵🇰', text: "I have muted this group for 8 hours. This is my 14th time muting this group. I am keeping count. I have a spreadsheet.", votes: 71 },
]

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function getSessionId() {
  try {
    let id = localStorage.getItem('gazette-session-id')
    if (!id) {
      id = 'sess-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
      localStorage.setItem('gazette-session-id', id)
    }
    return id
  } catch { return 'anon' }
}

function getMyJokeIds() {
  try {
    const s = localStorage.getItem('gazette-my-jokes')
    return s ? new Set(JSON.parse(s)) : new Set()
  } catch { return new Set() }
}

function saveMyJokeIds(set) {
  try { localStorage.setItem('gazette-my-jokes', JSON.stringify([...set])) } catch {}
}

function getVotedSet() {
  try {
    const s = localStorage.getItem('gazette-voted-v2')
    return s ? new Set(JSON.parse(s)) : new Set()
  } catch { return new Set() }
}

function saveVotedSet(set) {
  try { localStorage.setItem('gazette-voted-v2', JSON.stringify([...set])) } catch {}
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function LetterBody({ body, pullQuote }) {
  return (
    <div className="body-text">
      {body.map((block, i) => {
        if (block.type === 'p') return <p key={i}>{block.text}</p>
        if (block.type === 'italic') return <p key={i} className="italic-note">{block.text}</p>
        if (block.type === 'pull') return <blockquote key={i} className="pull-quote">{pullQuote}</blockquote>
        if (block.type === 'unacceptable') return <div key={i} className="unacceptable">TOTALLY UNACCEPTABLE!</div>
        if (block.type === 'trump-header') return (
          <div key={i} className="trump-platform-bar">
            <span className="truth-dot" />
            <span>Posted · 3:17 AM · Truth Social</span>
          </div>
        )
        if (block.type === 'demands') return (
          <div key={i} className="demand-block">
            <div className="demand-label">{block.label}</div>
            {block.items.map((item, j) => (
              <div key={j} className="demand-item">
                <span className="demand-num">{j + 1}.</span>{item}
              </div>
            ))}
          </div>
        )
        return null
      })}
    </div>
  )
}

function JokeCard({ joke, onVote, hasVoted, isOwn, onDelete }) {
  const [confirming, setConfirming] = useState(false)

  function handleDelete() {
    if (!confirming) { setConfirming(true); return }
    onDelete(joke.id)
  }

  return (
    <div className="joke-card fade-in">
      <div className="joke-meta">
        <span className="joke-flag">{joke.country}</span>
        <span className="joke-author">{joke.author}</span>
        <span className="joke-time">{timeAgo(joke.created_at)}</span>
      </div>
      <p className="joke-text">{joke.text}</p>
      <div className="joke-footer">
        <button
          className={`vote-btn ${hasVoted ? 'voted' : ''}`}
          onClick={() => onVote(joke.id)}
          aria-label={hasVoted ? 'Already voted' : 'Upvote'}
        >
          <span className="vote-arrow">{hasVoted ? '▲' : '△'}</span>
          <span className="vote-count">{joke.votes}</span>
        </button>
        {hasVoted && <span className="voted-label">dispatched</span>}
        {isOwn && (
          <button
            className={`delete-btn ${confirming ? 'confirming' : ''}`}
            onClick={handleDelete}
            onBlur={() => setConfirming(false)}
            aria-label="Delete dispatch"
          >
            {confirming ? 'Confirm?' : '✕'}
          </button>
        )}
      </div>
    </div>
  )
}

function SubmitJokeForm({ onSubmit, onCancel, submitting }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [country, setCountry] = useState('🌍')
  const [error, setError] = useState('')
  const textRef = useRef(null)

  useEffect(() => { textRef.current?.focus() }, [])

  const EMOJIS = ['🌍','🇺🇸','🇮🇷','🇵🇰','🇨🇭','🇳🇴','🌊','🛢️','💣','🕊️','📱','🦝','👴','📰','🔬','💼','🎪','🇬🇧','🇷🇺','🇨🇳','🇮🇱','🇸🇦']

  function handleSubmit() {
    if (!text.trim() || text.trim().length < 10) {
      setError('Your dispatch must be at least 10 characters. Diplomacy requires effort.')
      return
    }
    if (!author.trim()) {
      setError('Who are you? Even anonymous sources have codenames.')
      return
    }
    onSubmit({ text: text.trim(), author: author.trim(), country })
  }

  return (
    <div className="submit-form fade-in">
      <div className="submit-form-header">
        <h3 className="submit-form-title">File a Diplomatic Dispatch</h3>
        <p className="submit-form-sub">Your intelligence will be published immediately. No editorial oversight. This is intentional.</p>
      </div>
      <div className="form-field">
        <label className="form-label">Your allegiance / handle</label>
        <input className="form-input" type="text"
          placeholder="e.g. The Raccoon, Anonymous Oil Barrel, Margaret..."
          value={author} onChange={e => setAuthor(e.target.value)} maxLength={40} />
      </div>
      <div className="form-field">
        <label className="form-label">Flag / entity symbol</label>
        <div className="emoji-picker">
          {EMOJIS.map(e => (
            <button key={e} className={`emoji-btn ${country === e ? 'selected' : ''}`}
              onClick={() => setCountry(e)} type="button">{e}</button>
          ))}
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Your dispatch</label>
        <textarea ref={textRef} className="form-textarea"
          placeholder="Add your joke, observation, or diplomatic incident to the record. Margaret is watching."
          value={text} onChange={e => { setText(e.target.value); setError('') }}
          maxLength={500} rows={4} />
        <div className="char-count">{text.length}/500</div>
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel} type="button" disabled={submitting}>Abort Mission</button>
        <button className="btn-submit" onClick={handleSubmit} type="button" disabled={submitting}>
          {submitting ? 'Transmitting...' : 'Dispatch →'}
        </button>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('usa')
  const [jokes, setJokes] = useState([])
  const [loading, setLoading] = useState(true)
  const [voted, setVoted] = useState(getVotedSet)
  const [myJokeIds, setMyJokeIds] = useState(getMyJokeIds)
  const sessionId = getSessionId()
  const [showSubmit, setShowSubmit] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sortBy, setSortBy] = useState('votes')
  const [successMsg, setSuccessMsg] = useState('')
  const [dbError, setDbError] = useState(false)

  useEffect(() => {
    loadJokes()

    const channel = supabase
      .channel('jokes-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jokes' }, payload => {
        setJokes(prev => {
          if (prev.find(j => j.id === payload.new.id)) return prev
          return [payload.new, ...prev]
        })
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'jokes' }, payload => {
        setJokes(prev => prev.map(j => j.id === payload.new.id ? payload.new : j))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function loadJokes() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('jokes')
        .select('*')
        .order('votes', { ascending: false })
      if (error) throw error
      if (data.length === 0) { await seedJokes(); return }
      setJokes(data)
      setDbError(false)
    } catch (err) {
      console.error('Supabase error:', err)
      setDbError(true)
    } finally {
      setLoading(false)
    }
  }

  async function seedJokes() {
    const { data } = await supabase
      .from('jokes')
      .insert(SEED_JOKES.map(j => ({ author: j.author, country: j.country, text: j.text, votes: j.votes })))
      .select()
    if (data) setJokes(data.sort((a, b) => b.votes - a.votes))
    setLoading(false)
  }

  async function handleVote(id) {
    if (voted.has(id)) return
    setJokes(prev => prev.map(j => j.id === id ? { ...j, votes: j.votes + 1 } : j))
    const newVoted = new Set([...voted, id])
    setVoted(newVoted)
    saveVotedSet(newVoted)
    const { error } = await supabase.rpc('increment_votes', { joke_id: id })
    if (error) {
      console.error('Vote error:', error)
      setJokes(prev => prev.map(j => j.id === id ? { ...j, votes: j.votes - 1 } : j))
      const rolled = new Set([...newVoted])
      rolled.delete(id)
      setVoted(rolled)
      saveVotedSet(rolled)
    }
  }

  async function handleSubmitJoke({ text, author, country }) {
    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('jokes').insert([{ text, author, country, votes: 0 }]).select().single()
      if (error) throw error
      setJokes(prev => [data, ...prev])
      const newMyIds = new Set([...myJokeIds, data.id])
      setMyJokeIds(newMyIds)
      saveMyJokeIds(newMyIds)
      setShowSubmit(false)
      setSortBy('recent')
      setSuccessMsg('Your dispatch has been filed. Margaret has been notified.')
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err) {
      console.error('Submit error:', err)
      alert('Transmission failed. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    setJokes(prev => prev.filter(j => j.id !== id))
    const { error } = await supabase.from('jokes').delete().eq('id', id)
    if (error) {
      console.error('Delete error:', error)
      loadJokes()
    }
  }

  const sortedJokes = [...jokes].sort((a, b) =>
    sortBy === 'votes' ? b.votes - a.votes : new Date(b.created_at) - new Date(a.created_at)
  )

  const letter = LETTERS.find(l => l.id === activeTab)

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-eyebrow">Est. This Crisis · All Sources Unverified</div>
          <h1 className="masthead-title">The Diplomatic Gazette</h1>
          <p className="masthead-tagline">PEACE, PROBABLY</p>
          <div className="masthead-rule-triple"><span /><span /><span /></div>
          <div className="issue-line">
            <span>Vol. XLVII, No. 9</span>
            <span>Correspondence from the Axis of Mixed Signals</span>
            <span>Price: One Barrel of Crude</span>
          </div>
        </div>
      </header>

      <main className="main-layout">
        <section className="letters-col">
          <div className="tab-bar" role="tablist">
            {LETTERS.map(l => (
              <button key={l.id} role="tab" aria-selected={activeTab === l.id}
                className={`tab-btn ${activeTab === l.id ? 'active' : ''}`}
                onClick={() => setActiveTab(l.id)}>
                <span className="tab-flag">{l.flag}</span>
                <span className="tab-label">{l.label}</span>
              </button>
            ))}
          </div>

          <article className={`letter letter-${letter.id} fade-in`} key={letter.id}>
            <div className="letter-header">
              <span className={`badge ${letter.badgeClass}`}>{letter.badgeText}</span>
              {letter.subject && (
                <p className="letter-subject">
                  <span className="letter-subject-key">Subject:</span> {letter.subject}
                </p>
              )}
              <h2 className="letter-title">{letter.title}</h2>
              <p className="letter-from">
                <strong>{letter.from}</strong><br />
                <span className="letter-dept">{letter.dept}</span>
              </p>
            </div>
            <div className="letter-rule-triple"><span /><span /><span /></div>
            <LetterBody body={letter.body} pullQuote={letter.pullQuote} />
            {letter.signature && (
              <div className="letter-signature">
                <p className="sig-close">{letter.signature}</p>
                <p className="sig-name">{letter.from}</p>
                <p className="sig-dept">{letter.dept}</p>
              </div>
            )}
            {letter.footnote && <p className="letter-footnote">{letter.footnote}</p>}
          </article>
        </section>

        <aside className="jokes-col">
          <div className="jokes-header">
            <div className="jokes-header-top">
              <h2 className="jokes-title">Intelligence Dispatches</h2>
              <span className="jokes-count">{jokes.length} filed</span>
            </div>
            <p className="jokes-subtitle">
              Community intelligence. Shared by all visitors in real time. Accuracy not guaranteed.
            </p>
          </div>

          {dbError && (
            <div className="db-error">
              Connection issue — dispatches temporarily unavailable. The satellites are probably involved.
            </div>
          )}

          <div className="jokes-controls">
            <div className="sort-toggle">
              <button className={`sort-btn ${sortBy === 'votes' ? 'active' : ''}`} onClick={() => setSortBy('votes')}>Top</button>
              <button className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`} onClick={() => setSortBy('recent')}>Recent</button>
            </div>
            <button className="add-joke-btn" onClick={() => { setShowSubmit(!showSubmit); setSuccessMsg('') }}>
              {showSubmit ? '✕ Cancel' : '+ File Dispatch'}
            </button>
          </div>

          {successMsg && <div className="success-msg fade-in">✓ {successMsg}</div>}
          {showSubmit && (
            <SubmitJokeForm onSubmit={handleSubmitJoke} onCancel={() => setShowSubmit(false)} submitting={submitting} />
          )}

          <div className="jokes-list">
            {loading ? (
              <div className="loading-state">
                <div className="loading-dots"><span /><span /><span /></div>
                <p>Decrypting dispatches...</p>
              </div>
            ) : sortedJokes.map(joke => (
              <JokeCard key={joke.id} joke={joke} onVote={handleVote} hasVoted={voted.has(joke.id)} isOwn={myJokeIds.has(joke.id)} onDelete={handleDelete} />
            ))}
          </div>

          <div className="jokes-footer">
            <p>Dispatches are shared between all visitors in real time.</p>
            <p>Margaret has bridge on Tuesdays.</p>
          </div>
        </aside>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-rule" />
          <p>The Diplomatic Gazette · All correspondence satirical · No uranium was enriched in the making of this publication</p>
          <p>© {new Date().getFullYear()} · Margaret declines all responsibility</p>
        </div>
      </footer>
    </div>
  )
}
