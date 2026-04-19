const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const existingPlugins = defaultConfig.plugins || [];

module.exports = {
    ...defaultConfig,
    plugins: [
        ...existingPlugins,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/blocks'),
                    to: path.resolve(__dirname, 'build/blocks'),
                    globOptions: { ignore: ['**/*.js', '**/*.scss', '**/*.css'] },
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    entry: {
        // Main editor entry
        'editor': path.resolve(__dirname, 'src/editor.js'),

        // Frontend entry
        'frontend': path.resolve(__dirname, 'src/frontend.js'),

        // Individual blocks
        'blocks/hero-section/index': path.resolve(__dirname, 'src/blocks/hero-section/index.js'),
        'blocks/hero-banner/index': path.resolve(__dirname, 'src/blocks/hero-banner/index.js'),
        'blocks/feature-box/index': path.resolve(__dirname, 'src/blocks/feature-box/index.js'),
        'blocks/testimonial/index': path.resolve(__dirname, 'src/blocks/testimonial/index.js'),
        'blocks/pricing-table/index': path.resolve(__dirname, 'src/blocks/pricing-table/index.js'),
        'blocks/team-member/index': path.resolve(__dirname, 'src/blocks/team-member/index.js'),
        'blocks/counter/index': path.resolve(__dirname, 'src/blocks/counter/index.js'),
        'blocks/call-to-action/index': path.resolve(__dirname, 'src/blocks/call-to-action/index.js'),
        'blocks/accordion/index': path.resolve(__dirname, 'src/blocks/accordion/index.js'),
        'blocks/tabs/index': path.resolve(__dirname, 'src/blocks/tabs/index.js'),
        'blocks/progress-bar/index': path.resolve(__dirname, 'src/blocks/progress-bar/index.js'),
        'blocks/cta-meeting/index': path.resolve(__dirname, 'src/blocks/cta-meeting/index.js'),
        'blocks/founder-vision/index': path.resolve(__dirname, 'src/blocks/founder-vision/index.js'),
        'blocks/team-members/index': path.resolve(__dirname, 'src/blocks/team-members/index.js'),
        'blocks/expertise-contact/index': path.resolve(__dirname, 'src/blocks/expertise-contact/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
};
