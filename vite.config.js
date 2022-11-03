import { defineConfig } from 'vite'

export default defineConfig({
	environmentOptions: {
		jsdom: {
			url: 'http://localhost:5173/'
		}
	}
})