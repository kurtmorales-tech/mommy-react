import { useEffect, useState } from "react";

type Page = "card" | "videos";

type Petal = {
	x: number;
	y: number;
	r: number;
	color: string;
	vx: number;
	vy: number;
	angle: number;
	va: number;
	opacity: number;
	wobble: number;
	wobbleSpeed: number;
};

const images = [
	"20220726_172146.JPEG",
	"475115625_2049754348780059_185621722997190898_n.jpg",
	"489509417_9641686172561054_1068400923319504165_n.jpg",
	"645615387_26137023689267375_7114834268889657288_n.jpg",
	"659808669_26425765517059856_4038776549851551333_n.jpg",
	"665938466_26502488569387550_1438531920647394520_n.jpg",
];

const videoClips = [
	{
		title: "Birthday Memory Film",
		src: "/videos/birthday-memory-film.mp4",
		description:
			"A 1-minute photo montage with soft fades and a rose-gold birthday title.",
	},
	{
		title: "Rose-Gold Birthday Wish",
		src: "/videos/birthday-wish-card.mp4",
		description:
			"A 1-minute animated greeting card with birthday wishes for Mae.",
	},
];

function Ornament({ className }: { className: string }) {
	return (
		<div className={`corner ${className}`}>
			<svg
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M10 90 C10 40 40 10 90 10"
					stroke="#C9943A"
					strokeWidth="1.2"
					fill="none"
				/>
				<path
					d="M10 70 C10 50 50 10 70 10"
					stroke="#C9943A"
					strokeWidth="0.8"
					fill="none"
					opacity="0.6"
				/>
				<circle cx="10" cy="10" r="4" fill="#C9943A" opacity="0.5" />
				<circle cx="90" cy="10" r="2.5" fill="#C9943A" opacity="0.4" />
				<circle cx="10" cy="90" r="2.5" fill="#C9943A" opacity="0.4" />
				<ellipse
					cx="50"
					cy="10"
					rx="6"
					ry="10"
					fill="#C4536A"
					opacity="0.3"
					transform="rotate(-20 50 10)"
				/>
				<ellipse
					cx="10"
					cy="50"
					rx="6"
					ry="10"
					fill="#C4536A"
					opacity="0.3"
					transform="rotate(70 10 50)"
				/>
			</svg>
		</div>
	);
}

function Rule({ bottom = false }: { bottom?: boolean }) {
	return (
		<div className={`rule${bottom ? " bottom-rule" : ""}`}>
			<div className="rule-line"></div>
			<div className="rule-diamond"></div>
			<div className="rule-line"></div>
		</div>
	);
}

function App() {
	const getPageFromLocation = () =>
		window.location.pathname === "/videos" || window.location.hash === "#videos"
			? "videos"
			: "card";
	const [page, setPage] = useState<Page>(getPageFromLocation);

	useEffect(() => {
		const handleLocationChange = () => setPage(getPageFromLocation());
		window.addEventListener("hashchange", handleLocationChange);
		window.addEventListener("popstate", handleLocationChange);
		return () => {
			window.removeEventListener("hashchange", handleLocationChange);
			window.removeEventListener("popstate", handleLocationChange);
		};
	}, []);

	useEffect(() => {
		const canvas = document.createElement("canvas");
		canvas.id = "petals";
		canvas.style.position = "fixed";
		canvas.style.inset = "0";
		canvas.style.zIndex = "2";
		canvas.style.pointerEvents = "none";
		document.body.appendChild(canvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) return undefined;

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		resize();
		window.addEventListener("resize", resize);

		const colors = [
			"#C4536A",
			"#E8A0AD",
			"#F7D6DC",
			"#C9943A",
			"#E8C46A",
			"#D4A0B0",
		];

		function randomPetal(): Petal {
			return {
				x: Math.random() * canvas.width,
				y: -20 - Math.random() * 100,
				r: 4 + Math.random() * 7,
				color: colors[Math.floor(Math.random() * colors.length)],
				vx: (Math.random() - 0.5) * 1.2,
				vy: 0.8 + Math.random() * 1.4,
				angle: Math.random() * Math.PI * 2,
				va: (Math.random() - 0.5) * 0.06,
				opacity: 0.5 + Math.random() * 0.45,
				wobble: Math.random() * Math.PI * 2,
				wobbleSpeed: 0.02 + Math.random() * 0.02,
			};
		}

		const petals = Array.from({ length: 38 }, randomPetal);
		let animationFrame = 0;

		function drawPetal(p: Petal) {
			if (!ctx) return;
			ctx.save();
			ctx.globalAlpha = p.opacity;
			ctx.translate(p.x, p.y);
			ctx.rotate(p.angle);
			ctx.beginPath();
			ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
			ctx.fillStyle = p.color;
			ctx.fill();
			ctx.restore();
		}

		function animatePetals() {
			if (!ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			petals.forEach((p) => {
				p.wobble += p.wobbleSpeed;
				p.x += p.vx + Math.sin(p.wobble) * 0.5;
				p.y += p.vy;
				p.angle += p.va;
				if (p.y > canvas.height + 30)
					Object.assign(p, randomPetal(), {
						y: -20,
						x: Math.random() * canvas.width,
					});
				drawPetal(p);
			});
			animationFrame = requestAnimationFrame(animatePetals);
		}

		animatePetals();

		const sparkleContainer = document.createElement("div");
		sparkleContainer.className = "sparkles";
		sparkleContainer.style.position = "fixed";
		sparkleContainer.style.inset = "0";
		sparkleContainer.style.zIndex = "3";
		sparkleContainer.style.pointerEvents = "none";
		sparkleContainer.style.overflow = "hidden";
		document.body.appendChild(sparkleContainer);

		for (let i = 0; i < 22; i += 1) {
			const el = document.createElement("div");
			el.className = "sparkle";
			el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${5 + Math.random() * 8}px;
        height: ${5 + Math.random() * 8}px;
        --dur: ${2.5 + Math.random() * 3}s;
        --delay: ${Math.random() * 4}s;
      `;
			sparkleContainer.appendChild(el);
		}

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener("resize", resize);
			document.body.removeChild(canvas);
			document.body.removeChild(sparkleContainer);
		};
	}, []);

	function goTo(nextPage: Page) {
		const nextPath = nextPage === "videos" ? "/videos" : "/";
		window.history.pushState(null, "", nextPath);
		setPage(nextPage);
	}

	return (
		<div className="birthday-container">
			<div className="bg-layer"></div>
			<Ornament className="tl" />
			<Ornament className="tr" />
			<Ornament className="bl" />
			<Ornament className="br" />

			<nav className="page-nav" aria-label="Birthday pages">
				<button
					className={page === "card" ? "active" : ""}
					onClick={() => goTo("card")}
				>
					Birthday Card
				</button>
				<button
					className={page === "videos" ? "active" : ""}
					onClick={() => goTo("videos")}
				>
					1-Minute Videos
				</button>
			</nav>

			{page === "card" ? (
				<main className="card">
					<Rule />
					<p className="happy">Happy Birthday</p>
					<h1 className="name">Mae Morales</h1>
					<div className="floral">✦ ✿ ✦</div>
					<div className="date-badge">
						<span>✦</span>May 21, 2026<span>✦</span>
					</div>
					<p className="message">
						"On this beautiful day, as you celebrate your 41st birthday, may
						every joy return to you a hundredfold. You are cherished,
						celebrated, and loved beyond all measure."
					</p>
					<button className="video-page-cta" onClick={() => goTo("videos")}>
						Watch her birthday films
					</button>
					<div className="gallery-title">A Journey Through Memories</div>
					<div className="gallery">
						{images.map((img, index) => (
							<img
								key={img}
								src={`/images/${img}`}
								alt={`Memory ${index + 1}`}
							/>
						))}
					</div>
					<Rule bottom />
					<p className="from-line">With all our love ♡</p>
				</main>
			) : (
				<main className="card video-card">
					<Rule />
					<p className="happy">Birthday Films</p>
					<h1 className="name video-name">1-Minute Clips</h1>
					<p className="message video-intro">
						Two rose-gold birthday videos made from the family photos and a
						custom animated greeting, ready to play right here.
					</p>
					<div className="video-grid">
						{videoClips.map((clip) => (
							<article className="video-panel" key={clip.src}>
								<video src={clip.src} controls preload="metadata" playsInline />
								<h2>{clip.title}</h2>
								<p>{clip.description}</p>
							</article>
						))}
					</div>
					<button
						className="video-page-cta secondary"
						onClick={() => goTo("card")}
					>
						Back to the birthday card
					</button>
					<Rule bottom />
					<p className="from-line">Press play and celebrate Mae ♡</p>
				</main>
			)}
		</div>
	);
}

export default App;
