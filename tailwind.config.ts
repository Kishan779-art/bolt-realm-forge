import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'exo': ['Exo 2', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk palette
				cyber: {
					blue: 'hsl(var(--cyber-blue))',
					purple: 'hsl(var(--cyber-purple))',
					violet: 'hsl(var(--cyber-violet))',
					green: 'hsl(var(--cyber-green))',
					pink: 'hsl(var(--cyber-pink))',
				}
			},
			backgroundImage: {
				'gradient-cyber': 'var(--gradient-cyber)',
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-hologram': 'var(--gradient-hologram)',
			},
			boxShadow: {
				'glow-blue': 'var(--glow-blue)',
				'glow-purple': 'var(--glow-purple)',
				'glow-violet': 'var(--glow-violet)',
				'glow-intense': 'var(--glow-intense)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: 'var(--glow-blue)' },
					'50%': { boxShadow: 'var(--glow-intense)' }
				},
				'cyber-slide': {
					'0%': { transform: 'translateX(-100%) skewX(15deg)', opacity: '0' },
					'100%': { transform: 'translateX(0) skewX(0deg)', opacity: '1' }
				},
				'portal-spin': {
					'0%': { transform: 'rotate(0deg) scale(0.8)', opacity: '0.5' },
					'100%': { transform: 'rotate(360deg) scale(1)', opacity: '1' }
				},
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'particle-float': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
					'33%': { transform: 'translate(30px, -30px) rotate(120deg)', opacity: '0.7' },
					'66%': { transform: 'translate(-20px, 20px) rotate(240deg)', opacity: '0.5' }
				},
				'warp-speed': {
					'0%': { transform: 'scale(1) perspective(1000px) rotateY(0deg)', filter: 'blur(0px)' },
					'50%': { transform: 'scale(0.1) perspective(1000px) rotateY(180deg)', filter: 'blur(10px)' },
					'100%': { transform: 'scale(1) perspective(1000px) rotateY(360deg)', filter: 'blur(0px)' }
				},
				'hologram-flicker': {
					'0%, 100%': { opacity: '1', transform: 'skew(0deg)' },
					'2%': { opacity: '0.8', transform: 'skew(1deg)' },
					'4%': { opacity: '1', transform: 'skew(0deg)' },
					'8%': { opacity: '0.9', transform: 'skew(-1deg)' },
					'10%': { opacity: '1', transform: 'skew(0deg)' }
				},
				'data-stream': {
					'0%': { transform: 'translateY(100vh)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-100vh)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'cyber-slide': 'cyber-slide 0.8s ease-out',
				'portal-spin': 'portal-spin 2s ease-in-out infinite',
				'typewriter': 'typewriter 2s steps(40, end)',
				'particle-float': 'particle-float 6s ease-in-out infinite',
				'warp-speed': 'warp-speed 1.5s ease-in-out',
				'hologram-flicker': 'hologram-flicker 3s ease-in-out infinite',
				'data-stream': 'data-stream 4s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
