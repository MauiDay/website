import { config as baseConfig } from '../mauiday.config.mjs';
import path from 'path';

async function loadConfig() {
    const conference = baseConfig.USE_CONFIG || 'default';
    const configPath = path.resolve('src/data/configs', `${conference}-config.ts`);

    try {
        // Dynamically import the specific configuration file
        const { default: specificConfig } = await import(configPath);
        return { ...baseConfig, ...specificConfig };
    } catch (error) {
        console.error(`Failed to load configuration for ${conference}:`, error);
        throw new Error('Could not load the specific configuration');
    }
}

export default loadConfig;