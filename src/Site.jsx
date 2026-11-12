import React, { useEffect, useRef, useState } from "react";
import mattressShowroomImage from "../images/showroom-mattresses.jpeg";
import sofaShowroomImage from "../images/showroom-sofas.jpeg";
import storefrontImage from "../images/storefront.jpeg";
import teamPhoto from "../images/mcmullen-team.jpg";
import heroVideo from "../cleaned_click.mp4";
import latestNewsVideo from "../video-4k-60fps-share.mp4";

const pages = [
  { path: "/", label: "Home" },
  { path: "/about-us", label: "About Us" },
  { path: "/sofas-recliners", label: "Sofas & Recliners" },
  { path: "/bedding-mattresses", label: "Bedding & Mattresses" },
  { path: "/bedroom-sets", label: "Bedroom Sets" },
  { path: "/dining-entertainment", label: "Dining & Entertainment" },
  { path: "/contact", label: "Contact" },
];

const brands = [
  { name: "Jackson Catnapper", note: "Furniture & recliners", slug: "jackson-catnapper" },
  { name: "Liberty Furniture", note: "Furniture for every room", slug: "liberty-furniture" },
  { name: "Perdue Woodworks", note: "American-made wood furniture", slug: "perdue-woodworks" },
  { name: "Lancer", note: "Furniture", slug: "lancer" },
  { name: "Best Home Furnishings", note: "Comfort made for home", slug: "best-home-furnishings" },
  { name: "Home Elegance", note: "Furniture", slug: "home-elegance" },
  { name: "Hugh's Furniture", note: "Furniture", slug: "hughs-furniture" },
  { name: "Dutch Craft", note: "Handcrafted furniture", url: "https://dutchcraftfurniture.com/" },
];

const collections = {
  "sofas-recliners": {
    title: "Sofas & Recliners",
    kicker: "Put your feet up",
    description:
      "Find a comfortable new favorite for movie nights, slow Sundays, and everything in between. Our showroom features furniture from trusted makers, with a team ready to help you choose the right fit for your home.",
    image: sofaShowroomImage,
    alt: "Sofa and recliner on display in the McMullen Furniture showroom",
    brands: ["jackson-catnapper", "lancer"],
  },
  "bedding-mattresses": {
    title: "Bedding & Mattresses",
    kicker: "Rest easy",
    description:
      "A good night’s sleep starts with a space that feels comfortable and inviting. Explore our bedding and mattress selection in person, and ask our team to help you find an option that suits your needs.",
    image: mattressShowroomImage,
    alt: "Mattresses on display in the McMullen Furniture showroom",
    brands: ["best-home-furnishings", "jackson-catnapper"],
  },
  "bedroom-sets": {
    title: "Bedroom Sets",
    kicker: "Make room to unwind",
    description:
      "Create a bedroom that feels like your own. From foundational pieces to a more complete room refresh, browse trusted furniture makers and visit our Altoona showroom for a personal hand.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
    alt: "Calm bedroom with natural wood and soft neutral colors",
    brands: ["liberty-furniture", "hughs-furniture"],
  },
  "dining-entertainment": {
    title: "Dining & Entertainment",
    kicker: "Gather around",
    description:
      "Make space for weeknight dinners, celebrations, and good conversation. Discover dining and entertainment furniture from quality makers, with the friendly, local service McMullen has offered for generations.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=85",
    alt: "Wood dining table in a welcoming home",
    brands: ["perdue-woodworks", "home-elegance"],
  },
};

const hours = [
  ["Monday – Friday", "9:00 am – 7:00 pm"],
  ["Saturday", "9:00 am – 3:00 pm"],
  ["Sunday", "Closed"],
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 20 20" fill="none">
      {diagonal ? <path d="M5 15 15 5M6 5h9v9" /> : <path d="M3 10h13m-5-5 5 5-5 5" />}
    </svg>
  );
}

function PageLink({ to, navigate, className, children, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function BrandGrid({ selectedBrands = brands }) {
  return (
    <div className="brand-grid">
      {selectedBrands.map((brand, index) => {
        const url = brand.url || `https://www.mcmullenfurniture.com/${brand.slug}`;
        return (
          <a
            className={`brand-card brand-card-${(index % 8) + 1}`}
            href={url}
            target="_blank"
            rel="noreferrer"
            key={brand.name}
            aria-label={`Visit ${brand.name} page`}
          >
            <span className="brand-name">{brand.name}</span>
            <span className="brand-note">{brand.note}</span>
            <ArrowIcon diagonal />
          </a>
        );
      })}
    </div>
  );
}

function SiteHeader({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  function followLink(to) {
    closeMenu();
    navigate(to);
  }

  return (
    <>
      <div className="announcement">
        <span>Family-owned. Hometown trusted. Serving Altoona for over 80 years.</span>
        <a href="tel:8149421202">Call the store: (814) 942-1202</a>
      </div>
      <header className="site-header">
        <PageLink className="wordmark" to="/" navigate={followLink} aria-label="McMullen Furniture home">
          <span className="wordmark-name">McMullen</span>
          <span className="wordmark-subtitle">FURNITURE · ALTOONA, PA</span>
        </PageLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {pages.map((page) => (
            <PageLink
              key={page.path}
              to={page.path}
              navigate={followLink}
              className={`nav-link${path === page.path ? " is-active" : ""}`}
              aria-current={path === page.path ? "page" : undefined}
            >
              {page.label}
            </PageLink>
          ))}
        </nav>
      </header>
    </>
  );
}

function PageHero({ kicker, title, description, image, alt, video, navigate, actions = true, variant = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    const resumeVideo = () => {
      if (document.visibilityState !== "visible" || !videoRef.current || !videoRef.current.paused) return;
      videoRef.current.play().catch((error) => {
        console.error("Could not resume hero video playback:", error);
      });
    };

    document.addEventListener("visibilitychange", resumeVideo);
    resumeVideo();
    return () => document.removeEventListener("visibilitychange", resumeVideo);
  }, [video]);

  return (
    <section className={`hero page-shell${variant ? ` hero-${variant}` : ""}`}>
      <div className="hero-photo">
        <img src={image} alt={alt} />
        {video && (
          <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" poster={image} aria-hidden="true" tabIndex="-1">
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="hero-shade" />
        <div className="hero-topline">
          <span className="round-stamp">A GOOD HOME<br />STARTS HERE</span>
          <span className="hero-kicker">Your home, your way</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">{kicker}</p>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>
          {actions && (
            <div className="hero-actions">
              <PageLink className="button button-light" to="/sofas-recliners" navigate={navigate}>
                Explore our furniture <ArrowIcon />
              </PageLink>
              <PageLink className="text-link text-link-light" to="/contact" navigate={navigate}>
                Come see us <ArrowIcon diagonal />
              </PageLink>
            </div>
          )}
        </div>
        <div className="hero-caption">
          <span>McMullen Furniture</span>
          <span>Comfortable living, made personal</span>
          <span className="caption-line" />
        </div>
      </div>
    </section>
  );
}

function FinancingPanel() {
  return (
    <section className="financing" id="financing">
      <div className="finance-photo">
        <img
          src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1100&q=85"
          alt="A welcoming living room with comfortable furniture"
          loading="lazy"
        />
      </div>
      <div className="finance-copy">
        <p className="eyebrow eyebrow-light">A little more comfortable</p>
        <h2>Good furniture.<br />A payment plan<br />that feels good, too.</h2>
        <p>
          McMullen has offered straightforward, in-store financing since the beginning. Ask
          about buying directly through the store, without a bank or credit card.
        </p>
        <ul className="finance-details">
          <li>In-store financing up to $2,000</li>
          <li>1.7% monthly interest rate</li>
          <li>Pay in full at purchase and receive 10% off all items</li>
          <li>Cash and major credit cards accepted</li>
        </ul>
        <p className="finance-footnote">
          McMullen also works with Lendmark Financial. Ask in-store for details.
        </p>
        <a className="button button-outline-light" href="tel:8149421202">
          Ask us about financing <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function formatFacebookDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Facebook post";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function FacebookFeed() {
  const [posts, setPosts] = useState([]);
  const [feedError, setFeedError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const feedRef = useRef(null);
  const sentinelRef = useRef(null);
  const cursorRef = useRef("");
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    async function loadMorePosts() {
      if (loadingRef.current || !hasMoreRef.current) return;

      loadingRef.current = true;
      setIsLoading(true);
      setFeedError("");

      try {
        const query = new URLSearchParams();
        if (cursorRef.current) query.set("after", cursorRef.current);
        const queryString = query.toString();
        const response = await fetch(`/api/facebook-posts${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not load Facebook posts.");
        if (!Array.isArray(result.posts)) throw new Error("Facebook returned an invalid posts response.");

        setPosts((currentPosts) => [...currentPosts, ...result.posts]);
        cursorRef.current = result.nextCursor || "";
        hasMoreRef.current = Boolean(result.nextCursor);
        setHasMore(hasMoreRef.current);
      } catch (error) {
        hasMoreRef.current = false;
        setHasMore(false);
        setFeedError(error instanceof Error ? error.message : "Could not load Facebook posts.");
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
      }
    }

    loadMoreRef.current = loadMorePosts;
    loadMorePosts();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMoreRef.current?.();
      },
      { root: feedRef.current, rootMargin: "160px 0px" },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  function retryLoading() {
    hasMoreRef.current = true;
    setHasMore(true);
    loadMoreRef.current?.();
  }

  return (
    <div className="facebook-feed-scroll" ref={feedRef} role="region" aria-label="McMullen Furniture Facebook posts" tabIndex="0">
      <div className="facebook-feed-topbar">
        <span className="facebook-brand-icon" aria-hidden="true">f</span>
        <div>
          <strong>McMullen Furniture</strong>
          <span>Facebook posts</span>
        </div>
        <a href="https://www.facebook.com/mcmullen.furniture/" target="_blank" rel="noreferrer">Follow</a>
      </div>
      {posts.map((post) => (
        <article className="facebook-post" key={post.id}>
          <div className="facebook-post-header">
            <span className="facebook-post-avatar" aria-hidden="true">M</span>
            <div>
              <strong>McMullen Furniture</strong>
              <time dateTime={post.createdAt}>{formatFacebookDate(post.createdAt)}</time>
            </div>
          </div>
          {post.message && <p className="facebook-post-message">{post.message}</p>}
          {post.images.map((image, index) => (
            <img
              className="facebook-post-image"
              key={`${post.id}-${index}`}
              src={image}
              alt={post.message ? `Photo shared by McMullen Furniture: ${post.message.slice(0, 100)}` : "Photo shared by McMullen Furniture"}
              loading="lazy"
            />
          ))}
          <a className="facebook-post-link" href={post.permalink} target="_blank" rel="noreferrer">
            View post on Facebook <ArrowIcon diagonal />
          </a>
        </article>
      ))}
      {isLoading && <p className="facebook-feed-status" role="status">Loading posts…</p>}
      {feedError && (
        <div className="facebook-feed-error" role="alert">
          <p>{feedError}</p>
          <button type="button" onClick={retryLoading}>Try again</button>
        </div>
      )}
      {!isLoading && !feedError && posts.length === 0 && (
        <p className="facebook-feed-status">No public posts were returned by Facebook.</p>
      )}
      {!isLoading && !feedError && posts.length > 0 && !hasMore && (
        <p className="facebook-feed-status">You’re all caught up.</p>
      )}
      <div className="facebook-feed-sentinel" ref={sentinelRef} aria-hidden="true" />
    </div>
  );
}

function NewsletterSection() {
  const [signupMessage, setSignupMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSignupMessage("Newsletter sign-up is not connected yet. Call us at (814) 942-1202 to subscribe.");
  }

  return (
    <section className="latest-news content-width" aria-labelledby="latest-news-title">
      <div className="latest-news-heading">
        <p className="eyebrow">From our store</p>
        <h2 id="latest-news-title">Latest News</h2>
        <p>Get updates from McMullen Furniture and follow along with what’s happening in our showroom.</p>
      </div>
      <div className="latest-news-video">
        <video controls playsInline preload="metadata">
          <source src={latestNewsVideo} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
      <div className="latest-news-grid">
        <div className="newsletter-panel">
          <h3>Our newsletter</h3>
          <p>Sign up with your email to hear the latest from our store.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <button className="button button-dark" type="submit">Sign up <ArrowIcon /></button>
          </form>
          <p className="newsletter-message" aria-live="polite">
            {signupMessage || "Newsletter sign-ups are not being saved until a signup service is connected."}
          </p>
        </div>
        <div className="facebook-panel">
          <div className="facebook-panel-heading">
            <h3>Latest from Facebook</h3>
            <a href="https://www.facebook.com/mcmullen.furniture/" target="_blank" rel="noreferrer">
              Visit our page <ArrowIcon diagonal />
            </a>
          </div>
          <p className="facebook-feed-hint">Scroll through the feed to load older posts.</p>
          <FacebookFeed />
        </div>
      </div>
    </section>
  );
}

function FinancingPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => setIsVisible(true), 25000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="financing-popup" aria-label="Pay financing">
      <button
        className="financing-popup-close"
        type="button"
        aria-label="Close financing message"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
      <p className="eyebrow">Pay financing</p>
      <p>Ask us about in-store financing to make a little more room in your budget.</p>
      <a
        className="button button-dark"
        href="https://www.mcmullenfurniture.com/financing"
        target="_blank"
        rel="noreferrer"
        onClick={() => setIsVisible(false)}
      >
        Learn more <ArrowIcon />
      </a>
    </aside>
  );
}

function HomePage({ navigate }) {
  const categoryCards = pages.slice(2, 6);
  return (
    <>
      <FinancingPopup />
      <PageHero
        kicker="Furniture for real life"
        title={<>Make yourself<br />at home.</>}
        description="Quality furniture, familiar faces, and a little help finding just the right fit."
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
        alt="Warm, thoughtfully furnished living room"
        video={heroVideo}
        navigate={navigate}
      />
      <section className="intro content-width">
        <div className="intro-heading">
          <p className="eyebrow">A little about us <span className="eyebrow-rule" /></p>
          <h2>For the life<br />you live at home.</h2>
        </div>
        <div className="intro-copy">
          <p>
            McMullen Furniture has been helping families make a house feel like home for over
            80 years. We offer a wide selection of quality furniture from trusted names like
            Jackson, Perdue, Dutch Craft, and Lancer.
          </p>
          <p>
            Stop by our Altoona showroom for friendly, personal help—or browse furniture from
            our leading brands online. We’re here to help you find pieces that feel right for
            your home and budget.
          </p>
          <PageLink className="text-link" to="/about-us" navigate={navigate}>
            Get to know your local furniture store <ArrowIcon />
          </PageLink>
        </div>
      </section>
      <section className="facts content-width" aria-label="McMullen Furniture at a glance">
        <article className="fact">
          <p className="fact-number">80<span>+</span></p>
          <p className="fact-label">Years serving our community</p>
        </article>
        <article className="fact">
          <p className="fact-number"><span className="fact-prefix">$</span>2,000</p>
          <p className="fact-label">In-store financing available</p>
        </article>
        <article className="fact">
          <p className="fact-number">10<span>%</span></p>
          <p className="fact-label">Off when you pay in full at purchase</p>
        </article>
      </section>
      <section className="collections content-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your next favorite</p>
            <h2>Furniture for<br className="desktop-break" /> every room.</h2>
          </div>
          <p className="section-note">
            From a place to unwind to a table that brings everyone together, we’ll help you
            make your space your own.
          </p>
        </div>
        <div className="category-grid">
          {categoryCards.map((page, index) => {
            const collection = collections[page.path.slice(1)];
            return (
              <PageLink className="category-card" to={page.path} navigate={navigate} key={page.path}>
                <div className="category-image">
                  <img src={collection.image} alt="" loading="lazy" />
                  <span className="category-index">0{index + 1}</span>
                  <span className="category-arrow"><ArrowIcon diagonal /></span>
                </div>
                <h3>{page.label}</h3>
                <p>{collection.kicker}</p>
              </PageLink>
            );
          })}
        </div>
      </section>
      <section className="home-brands content-width">
        <div className="brands-heading">
          <div>
            <p className="eyebrow">Good company</p>
            <h2>Brands we’re<br />proud to bring home.</h2>
          </div>
          <p>Explore the furniture makers we work with and visit their websites.</p>
        </div>
        <BrandGrid />
      </section>
      <NewsletterSection />
      <section className="home-contact content-width">
        <div>
          <p className="eyebrow">Come on in</p>
          <h2>Your local<br />furniture store.</h2>
        </div>
        <div>
          <p>Visit us in the Juniata area of Altoona for friendly, personal help finding the right pieces for your home.</p>
          <PageLink className="button button-dark" to="/contact" navigate={navigate}>
            Store details & hours <ArrowIcon />
          </PageLink>
        </div>
        <iframe
          className="home-storefront"
          title="McMullen Furniture location map"
          src="https://www.google.com/maps?q=601+N+2nd+St,+Altoona,+PA&z=15&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="A family tradition"
        title={<>Neighbors first.<br />Furniture people, too.</>}
        description="A hometown furniture store, built on generations of family and community."
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
        alt="Comfortable living space with natural wood details"
        navigate={navigate}
        actions={false}
        variant="about"
      />
      <section className="about-content content-width">
        <div className="about-story-aside">
          <div className="about-lead">
            <p className="eyebrow">Our story</p>
            <h2>More than 80 years<br />of helping make a home.</h2>
          </div>
          <img
            className="about-team-image"
            src={teamPhoto}
            alt="Three McMullen Furniture team members in the showroom"
            loading="lazy"
          />
        </div>
        <div className="about-copy">
          <p>
            McMullen Furniture is and always has been a family business. In the 1940s, John
            “Harry” McMullen and his mother, Mary, founded and operated their first store in
            Saxton, Pennsylvania. Harry’s brothers, Russ and Mike, joined the business after
            returning from World War II, and the family opened stores in Mount Union and Altoona.
          </p>
          <p>
            Harry’s nephew and manager, Ed Miller, later incorporated the business. Ed’s son,
            Ryan Miller, now serves as president and owner after his father’s passing and
            manages the daily operations of the family’s remaining store on N. 2nd Street in
            Altoona’s Juniata area.
          </p>
          <p>
            On April 30, 1978, a devastating fire destroyed the building. The building was lost,
            but Harry and Ed’s dedication to their customers brought them back to business in
            the store warehouse the very next day.
          </p>
          <p>
            McMullen Furniture brings more than 80 years of combined experience to helping you
            bring your dream home to life. We understand that home is where life happens, and
            we’re committed to helping you find furniture that complements your vision.
          </p>
          <PageLink className="text-link" to="/contact" navigate={navigate}>
            Come visit our family store <ArrowIcon />
          </PageLink>
        </div>
      </section>
      <section className="about-values">
        <div className="content-width about-values-inner">
          <div><p className="eyebrow eyebrow-light">Local roots</p><h3>Family-owned<br />since the 1940s.</h3></div>
          <div><p className="eyebrow eyebrow-light">A personal touch</p><h3>Friendly help<br />finding your fit.</h3></div>
          <div><p className="eyebrow eyebrow-light">Our community</p><h3>Proud to call<br />Altoona home.</h3></div>
        </div>
      </section>
      <section className="brands content-width">
        <div className="brands-heading">
          <div><p className="eyebrow">Good company</p><h2>Trusted furniture<br />makers.</h2></div>
          <p>Our selection includes quality names like Jackson, Perdue, Dutch Craft, Lancer, and more.</p>
        </div>
        <BrandGrid />
      </section>
    </>
  );
}

function CollectionPage({ path, navigate }) {
  const collection = collections[path.slice(1)];
  const featuredBrands = brands.filter((brand) => collection.brands.includes(brand.slug));

  return (
    <>
      <PageHero
        kicker={collection.kicker}
        title={collection.title}
        description={collection.description}
        image={collection.image}
        alt={collection.alt}
        navigate={navigate}
        actions={false}
      />
      <section className="collection-detail content-width">
        <div className="collection-detail-heading">
          <p className="eyebrow">Explore the collection</p>
          <h2>A good fit<br />for your home.</h2>
        </div>
        <div className="collection-detail-copy">
          <p>
            Our in-store selection offers a variety of styles and options. We also connect you
            with a wider online selection from our leading furniture brands. Visit the showroom
            to see what’s available and get help choosing.
          </p>
          <PageLink className="text-link" to="/contact" navigate={navigate}>
            Ask about current availability <ArrowIcon />
          </PageLink>
        </div>
      </section>
      <section className="collection-brands content-width">
        <div className="brands-heading">
          <div><p className="eyebrow">Selected makers</p><h2>Explore Ours<br />furniture brands.</h2></div>
          <p>Visit our partners online for a closer look at their furniture and collections.</p>
        </div>
        <BrandGrid selectedBrands={featuredBrands} />
      </section>
      <section className="collection-cta">
        <p className="eyebrow eyebrow-light">Personal service, close to home</p>
        <h2>Come see what<br />feels right.</h2>
        <PageLink className="button button-outline-light" to="/contact" navigate={navigate}>
          Visit our Altoona showroom <ArrowIcon />
        </PageLink>
      </section>
    </>
  );
}

function ContactPage() {
  const [contactMessage, setContactMessage] = useState("");

  function handleContactSubmit(event) {
    event.preventDefault();
    setContactMessage("This form is not connected to a messaging service yet. Please use the official contact form below or call (814) 942-1202.");
  }

  return (
    <>
      <PageHero
        kicker="Come on in"
        title={<>We’re right<br />here in Altoona.</>}
        description="Questions about a piece, a brand, or financing? We’d be happy to help."
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
        alt="A welcoming home interior"
        actions={false}
      />
      <section className="contact-content content-width">
        <div className="contact-aside">
          <div className="contact-heading">
            <p className="eyebrow">We’d love to hear from you</p>
            <h2>Let’s talk<br />furniture.</h2>
            <p>Have a question about furniture, availability, delivery, or financing? Get in touch with our team.</p>
          </div>
          <div className="contact-information">
            <div className="contact-card">
              <p className="eyebrow">Our store</p>
              <address>601 N. 2nd St.<br />Altoona, PA</address>
              <a className="text-link" href="tel:8149421202">(814) 942-1202 <ArrowIcon diagonal /></a>
              <a
                className="social-link"
                href="https://www.google.com/maps/search/?api=1&query=601+N+2nd+St%2C+Altoona%2C+PA"
                target="_blank"
                rel="noreferrer"
              >
                Get directions <ArrowIcon diagonal />
              </a>
              <a className="social-link" href="https://www.facebook.com/mcmullen.furniture" target="_blank" rel="noreferrer">
                Follow along on Facebook <ArrowIcon diagonal />
              </a>
            </div>
            <div className="contact-card hours">
              <p className="eyebrow">Store hours</p>
              {hours.map(([day, time]) => (
                <div className="hours-row" key={day}><span>{day}</span><span>{time}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="contact-form-panel">
          <h3>Send us a message</h3>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form-field">
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-phone">Phone number <span>(optional)</span></label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="contact-form-field">
              <label htmlFor="contact-subject">What can we help with?</label>
              <select id="contact-subject" name="subject" defaultValue="">
                <option value="">Choose a topic</option>
                <option value="product">Furniture or product question</option>
                <option value="availability">Availability</option>
                <option value="delivery">Delivery</option>
                <option value="financing">Financing</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div className="contact-form-field contact-form-message-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" name="message" rows="5" required />
            </div>
            <button className="button button-dark" type="submit">Send message <ArrowIcon /></button>
            <p className="contact-form-status" aria-live="polite">{contactMessage}</p>
          </form>
          <p className="contact-form-note">
            This website form is not connected to a messaging service yet. You can also use our{" "}
            <a href="https://www.mcmullenfurniture.com/contact" target="_blank" rel="noreferrer">
              official contact form <ArrowIcon diagonal />
            </a>.
          </p>
        </div>
      </section>
      <FinancingPanel />
    </>
  );
}

function SiteFooter({ navigate }) {
  return (
    <footer className="site-footer">
      <PageLink className="wordmark footer-wordmark" to="/" navigate={navigate}>
        <span className="wordmark-name">McMullen,</span>
        <span className="wordmark-subtitle">FURNITURE · ALTOONA, PA</span>
      </PageLink>
      <p>Helping you make yourself at home since the 1940s.</p>
      <a className="footer-phone" href="tel:8149421202">(814) 942-1202 <ArrowIcon /></a>
      <span className="copyright">© {new Date().getFullYear()} McMullen Furniture</span>
      <div className="footer-links">
        {pages.map((page) => (
          <PageLink key={page.path} to={page.path} navigate={navigate}>{page.label}</PageLink>
        ))}
        <a href="https://www.mcmullenfurniture.com/financing" target="_blank" rel="noreferrer">Original financing page</a>
      </div>
    </footer>
  );
}

function Site() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, "") || "/");
  const routePath = pages.some((page) => page.path === path) ? path : "/";

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname.replace(/\/+$/, "") || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const titles = {
      "/": "McMullen Furniture | Altoona, PA",
      "/about-us": "About Us | McMullen Furniture",
      "/sofas-recliners": "Sofas & Recliners | McMullen Furniture",
      "/bedding-mattresses": "Bedding & Mattresses | McMullen Furniture",
      "/bedroom-sets": "Bedroom Sets | McMullen Furniture",
      "/dining-entertainment": "Dining & Entertainment | McMullen Furniture",
      "/contact": "Contact | McMullen Furniture",
    };
    document.title = titles[routePath];
    window.scrollTo(0, 0);
  }, [routePath]);

  function navigate(to) {
    if (to === window.location.pathname) return;
    window.history.pushState({}, "", to);
    setPath(to);
  }

  let page;
  if (routePath === "/") page = <HomePage navigate={navigate} />;
  else if (routePath === "/about-us") page = <AboutPage navigate={navigate} />;
  else if (routePath === "/contact") page = <ContactPage />;
  else page = <CollectionPage path={routePath} navigate={navigate} />;

  return (
    <>
      <SiteHeader path={routePath} navigate={navigate} />
      <main>{page}</main>
      <SiteFooter navigate={navigate} />
    </>
  );
}

export default Site;
