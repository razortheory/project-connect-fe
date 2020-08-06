import fs from 'fs';

export const root = fs.realpathSync(`${__dirname}/..`);

export const source = `${root}/src`;
export const build = `${root}/build`;

export const entryMain = `${source}/index.ts`;
export const indexHtml = `${source}/index.html`;
export const favicon = `${source}/favicon.png`;

export const extensions = ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'];
export const babelPattern = /\.(js|jsx|ts|tsx)$/;
export const filePattern = /\.(jpg|png|gif|woff2|svg)$/;
export const stylePattern = /\.(css)$/;

export const outputDev = {
  assets: '[path][name].[ext]',
  js: '[name].js',
  jsChunks: '[name].js',
  css: '[name].css',
  cssChunks: '[name].css',
};

export const outputProd = {
  assets: '[path][name].[contenthash:6].[ext]',
  js: '[name].[contenthash:6].js',
  jsChunks: '[name].[contenthash:6].js',
  css: '[name].[contenthash:6].css',
  cssChunks: '[name].[contenthash:6].css',
};

export const env = `${root}/.env`;
export const envRef = `${root}/.env.ref`;
