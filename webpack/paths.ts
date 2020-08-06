import fs from 'fs';

export const root = fs.realpathSync(`${__dirname}/..`);

export const source = `${root}/src`;
export const build = `${root}/build`;

export const entryMain = `${source}/index.ts`;
export const indexHtml = `${source}/index.html`;
export const favicon = `${source}/favicon.png`;

export const extensions = ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'];
export const babelPattern = /\.(js|jsx|ts|tsx)$/;
export const filePattern = /\.(jpg|png|gif|woff2)$/;
export const svgPattern = /\.(svg)$/;
export const stylePattern = /\.(css)$/;

export const outputDev = {
  assets: '[path][name].[ext]',
  js: 'js/[name].js',
  jsChunks: 'js/[name].js',
  css: 'css/[name].css',
  cssChunks: 'css/[name].css',
};

export const outputProd = {
  assets: '[path][name].[contenthash:6].[ext]',
  js: 'js/[name].[contenthash:6].js',
  jsChunks: 'js/[name].[contenthash:6].js',
  css: 'css/[name].[contenthash:6].css',
  cssChunks: 'css/[name].[contenthash:6].css',
};

export const env = `${root}/.env`;
export const envRef = `${root}/.env.ref`;
