// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		experimental: {
			remoteFunctions: true,
		},
		alias: {
			$actions: 'src/actions',
			$components: 'src/components',
			$translations: 'src/translations',
			$utils: 'src/utils',
			$remote: 'src/routes/remote',
			$css: 'src/css',
			$paraglide: 'src/paraglide'
		},
	},
	compilerOptions: {
		runes: true,
		experimental: {
			async: true,
		}
	}
};

export default config;
